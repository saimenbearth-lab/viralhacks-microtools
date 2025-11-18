import PDFDocument from 'pdfkit'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { report } = JSON.parse(event.body)

    if (!report) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Report content required' })
      }
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 })
    const chunks = []

    doc.on('data', (chunk) => chunks.push(chunk))

    // Add content to PDF
    doc.fontSize(20).text('AI Contract Analysis Report', { align: 'center' })
    doc.moveDown()
    doc.fontSize(10).text(new Date().toLocaleDateString(), { align: 'center' })
    doc.moveDown(2)

    // Strip HTML tags and add content
    const plainText = report
      .replace(/<h3>/g, '\n\n')
      .replace(/<\/h3>/g, '\n')
      .replace(/<p>/g, '\n')
      .replace(/<\/p>/g, '\n')
      .replace(/<ul>/g, '\n')
      .replace(/<\/ul>/g, '\n')
      .replace(/<li>/g, '• ')
      .replace(/<\/li>/g, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')

    doc.fontSize(12).text(plainText, { align: 'justify' })

    doc.moveDown(3)
    doc.fontSize(10)
      .fillColor('gray')
      .text('Disclaimer: This is AI-generated analysis and does not constitute legal advice. Please consult with a qualified lawyer before making any decisions.', {
        align: 'center'
      })

    doc.end()

    // Wait for PDF to be fully generated
    const pdfBuffer = await new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="contract-analysis-report.pdf"'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    }

  } catch (error) {
    console.error('PDF generation error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate PDF',
        details: error.message 
      })
    }
  }
}
