import { GoogleGenerativeAI } from '@google/generative-ai'
import formidable from 'formidable'
import fs from 'fs'
import pdfParse from 'pdf-parse'
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
    
    let contractText = ''
    const language = fields.language?.[0] || 'English'

    // Extract text from PDF or use provided text
    if (files.file) {
      const file = Array.isArray(files.file) ? files.file[0] : files.file
      const dataBuffer = fs.readFileSync(file.filepath)
      const pdfData = await pdfParse(dataBuffer)
      contractText = pdfData.text
      
      // Clean up uploaded file
      fs.unlinkSync(file.filepath)
    } else if (fields.text) {
      contractText = Array.isArray(fields.text) ? fields.text[0] : fields.text
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No contract text or file provided' })
      }
    }

    if (!contractText.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Contract text is empty' })
      }
    }

    // Generate AI analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const systemPrompt = `You are an AI assistant performing structured contract analysis. You are NOT a lawyer and do NOT provide legal advice. You highlight potential risks, vague wording, one-sided obligations and ambiguities. You never say a contract is valid/invalid or legal/illegal. You always remind the user to consult a qualified lawyer before making decisions.

Analyze the contract and provide:
1. A preview section with 2-3 bullet points highlighting the biggest potential risks and unclear clauses
2. A full report with:
   - Plain-language summary of the contract
   - List of risky or one-sided clauses (with clause numbers/quotes and explanations)
   - List of unclear or ambiguous terms
   - Suggested questions to ask a lawyer
   - Final reminder that this is not legal advice

Format your response as JSON with this structure:
{
  "preview": "HTML formatted preview with <h3> and <ul><li> tags",
  "fullReport": "HTML formatted full report with <h3>, <p>, <ul><li> tags"
}`

    const userPrompt = `Contract language: ${language}\n\nContract text:\n${contractText}`

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt }
    ])

    const responseText = result.response.text()
    
    // Extract JSON from response (handle markdown code blocks)
    let analysisData
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0])
      } else {
        // Fallback: create structured response from plain text
        analysisData = {
          preview: `<h3>Analysis Preview</h3><p>${responseText.substring(0, 500)}...</p>`,
          fullReport: `<h3>Full Analysis</h3><p>${responseText}</p>`
        }
      }
    } catch (parseError) {
      analysisData = {
        preview: `<h3>Analysis Preview</h3><p>${responseText.substring(0, 500)}...</p>`,
        fullReport: `<h3>Full Analysis</h3><p>${responseText}</p>`
      }
    }

    // Create session ID and store data
    const sessionId = crypto.randomUUID()
    sessions.set(sessionId, {
      preview: analysisData.preview,
      fullReport: analysisData.fullReport,
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
        preview: analysisData.preview,
        sessionId
      })
    }

  } catch (error) {
    console.error('Analysis error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to analyze contract',
        details: error.message 
      })
    }
  }
}

// Export sessions for other functions to access
export { sessions }
