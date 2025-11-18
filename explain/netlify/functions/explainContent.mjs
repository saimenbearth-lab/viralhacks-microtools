import { GoogleGenerativeAI } from '@google/generative-ai'
import formidable from 'formidable'
import fs from 'fs'
import pdfParse from 'pdf-parse'
import fetch from 'node-fetch'
import crypto from 'crypto'

// In-memory storage for session data
const sessions = new Map()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Parse multipart form data
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 }) // 10MB limit
    
    const parseForm = () => new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) reject(err)
        else resolve({ fields, files })
      })
    })

    const { fields, files } = await parseForm()
    
    const type = Array.isArray(fields.type) ? fields.type[0] : fields.type
    let contentToExplain = ''

    // Extract content based on type
    if (type === 'text') {
      contentToExplain = Array.isArray(fields.text) ? fields.text[0] : fields.text
    } else if (type === 'pdf') {
      if (!files.file) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'No PDF file provided' })
        }
      }
      const file = Array.isArray(files.file) ? files.file[0] : files.file
      const dataBuffer = fs.readFileSync(file.filepath)
      const pdfData = await pdfParse(dataBuffer)
      contentToExplain = pdfData.text
      fs.unlinkSync(file.filepath)
    } else if (type === 'url') {
      const urlToFetch = Array.isArray(fields.url) ? fields.url[0] : fields.url
      
      try {
        const response = await fetch(urlToFetch)
        const html = await response.text()
        
        // Simple HTML to text conversion (remove tags)
        contentToExplain = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 10000) // Limit to first 10k chars
      } catch (fetchError) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Failed to fetch URL content' })
        }
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid type specified' })
      }
    }

    if (!contentToExplain.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No content to explain' })
      }
    }

    // Generate explanation using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const systemPrompt = `You are an AI explainer. You explain complex content in simple, clear language for non-experts. You do not give legal, medical or financial advice. You use short paragraphs and bullet points. You always end with 3-5 key takeaways.

Analyze the content and provide:
1. A preview with the first 2-3 bullet points from the explanation
2. A full explanation with:
   - Short summary (2-3 sentences)
   - Main points (bulleted)
   - Optional implications or context
   - 3-5 key takeaways

Format your response as JSON with this structure:
{
  "preview": "HTML formatted preview with <h3> and <ul><li> tags",
  "fullExplanation": "HTML formatted full explanation with <h3>, <p>, <ul><li> tags"
}`

    const userPrompt = `Please explain this content in simple language:\n\n${contentToExplain.substring(0, 15000)}`

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt }
    ])

    const responseText = result.response.text()
    
    // Extract JSON from response
    let explanationData
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        explanationData = JSON.parse(jsonMatch[0])
      } else {
        // Fallback: create structured response from plain text
        explanationData = {
          preview: `<h3>Explanation Preview</h3><p>${responseText.substring(0, 500)}...</p>`,
          fullExplanation: `<h3>Full Explanation</h3><p>${responseText}</p>`
        }
      }
    } catch (parseError) {
      explanationData = {
        preview: `<h3>Explanation Preview</h3><p>${responseText.substring(0, 500)}...</p>`,
        fullExplanation: `<h3>Full Explanation</h3><p>${responseText}</p>`
      }
    }

    // Create session ID and store data
    const sessionId = crypto.randomUUID()
    sessions.set(sessionId, {
      fullExplanation: explanationData.fullExplanation,
      timestamp: Date.now()
    })

    // Clean up old sessions (older than 1 hour)
    const oneHourAgo = Date.now() - 3600000
    for (const [id, data] of sessions.entries()) {
      if (data.timestamp < oneHourAgo) {
        sessions.delete(id)
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preview: explanationData.preview,
        sessionId
      })
    }

  } catch (error) {
    console.error('Explanation error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to explain content',
        details: error.message 
      })
    }
  }
}

// Export sessions for other functions to access
export { sessions }
