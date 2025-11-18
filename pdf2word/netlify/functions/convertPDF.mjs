import formidable from 'formidable'
import fs from 'fs'
import pdfParse from 'pdf-parse'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import crypto from 'crypto'

// In-memory storage for session data
const sessions = new Map()

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

    const { files } = await parseForm()
    
    if (!files.file) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No PDF file provided' })
      }
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    
    // Read and parse PDF
    const dataBuffer = fs.readFileSync(file.filepath)
    const pdfData = await pdfParse(dataBuffer)
    const text = pdfData.text
    
    // Clean up uploaded file
    fs.unlinkSync(file.filepath)

    if (!text.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'PDF appears to be empty or contains only images' })
      }
    }

    // Split text into paragraphs and detect headings
    const lines = text.split('\n').filter(line => line.trim())
    const paragraphs = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      // Simple heuristic: short lines in ALL CAPS or Title Case might be headings
      const isHeading = (trimmed.length < 80 && trimmed === trimmed.toUpperCase()) ||
                       (trimmed.length < 60 && /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(trimmed))

      if (isHeading) {
        paragraphs.push(
          new Paragraph({
            text: trimmed,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        )
      } else {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun(trimmed)],
            spacing: { before: 100, after: 100 }
          })
        )
      }
    }

    // Create Word document
    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs
      }]
    })

    // Generate DOCX buffer
    const docxBuffer = await Packer.toBuffer(doc)

    // Create preview (first 300-500 words as HTML)
    const words = text.split(/\s+/)
    const previewWords = words.slice(0, 500)
    const previewText = previewWords.join(' ')
    
    const previewHtml = `
      <h3>Document Preview</h3>
      <p style="white-space: pre-wrap; line-height: 1.6;">${previewText}${words.length > 500 ? '...' : ''}</p>
      <p style="margin-top: 1rem; color: var(--text-secondary); font-style: italic;">
        Total words: ${words.length} | Total pages: ${pdfData.numpages}
      </p>
    `

    // Create session ID and store document
    const sessionId = crypto.randomUUID()
    sessions.set(sessionId, {
      docxBuffer,
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
        preview: previewHtml,
        sessionId
      })
    }

  } catch (error) {
    console.error('Conversion error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to convert PDF',
        details: error.message 
      })
    }
  }
}

// Export sessions for other functions to access
export { sessions }
