import formidable from 'formidable'
import fs from 'fs'
import sharp from 'sharp'
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
        body: JSON.stringify({ error: 'No image file provided' })
      }
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    
    // Read the uploaded image
    const imageBuffer = fs.readFileSync(file.filepath)
    
    // Get original image metadata
    const metadata = await sharp(imageBuffer).metadata()
    
    // Create full HD upscaled version (4x upscale)
    const fullImage = await sharp(imageBuffer)
      .resize(
        Math.min(metadata.width * 4, 4096),
        Math.min(metadata.height * 4, 4096),
        {
          kernel: sharp.kernel.lanczos3,
          fit: 'inside'
        }
      )
      .sharpen()
      .png({ quality: 100 })
      .toBuffer()
    
    // Create preview version (2x upscale, lower quality)
    const previewImage = await sharp(imageBuffer)
      .resize(
        Math.min(metadata.width * 2, 1024),
        Math.min(metadata.height * 2, 1024),
        {
          kernel: sharp.kernel.lanczos3,
          fit: 'inside'
        }
      )
      .sharpen()
      .png({ quality: 70 })
      .toBuffer()
    
    // Clean up uploaded file
    fs.unlinkSync(file.filepath)
    
    // Create session ID and store full image
    const sessionId = crypto.randomUUID()
    sessions.set(sessionId, {
      fullImage,
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
        'Content-Type': 'image/png',
        'X-Session-ID': sessionId
      },
      body: previewImage.toString('base64'),
      isBase64Encoded: true
    }

  } catch (error) {
    console.error('Upscale error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to upscale image',
        details: error.message 
      })
    }
  }
}

// Export sessions for other functions to access
export { sessions }
