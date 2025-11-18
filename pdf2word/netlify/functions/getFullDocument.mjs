import Stripe from 'stripe'
import { sessions } from './convertPDF.mjs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { sessionId } = JSON.parse(event.body)

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Session ID required' })
      }
    }

    // Verify payment was completed
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    if (checkoutSession.payment_status !== 'paid') {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Payment not completed' })
      }
    }

    // Get the conversion session ID from metadata
    const conversionSessionId = checkoutSession.metadata?.conversionSessionId

    if (!conversionSessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Conversion session not found' })
      }
    }

    // Retrieve the document from session storage
    const sessionData = sessions.get(conversionSessionId)

    if (!sessionData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Document expired or not found. Please convert the PDF again.' })
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="converted-document.docx"'
      },
      body: sessionData.docxBuffer.toString('base64'),
      isBase64Encoded: true
    }

  } catch (error) {
    console.error('Get document error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to retrieve document',
        details: error.message 
      })
    }
  }
}
