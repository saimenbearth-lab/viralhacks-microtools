import Stripe from 'stripe'
import { sessions } from './upscaleImage.mjs'

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

    // Get the image session ID from metadata
    const imageSessionId = checkoutSession.metadata?.imageSessionId

    if (!imageSessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Image session not found' })
      }
    }

    // Retrieve the full image from session storage
    const sessionData = sessions.get(imageSessionId)

    if (!sessionData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Image expired or not found. Please upload and process the image again.' })
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="upscaled-image.png"'
      },
      body: sessionData.fullImage.toString('base64'),
      isBase64Encoded: true
    }

  } catch (error) {
    console.error('Get image error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to retrieve image',
        details: error.message 
      })
    }
  }
}
