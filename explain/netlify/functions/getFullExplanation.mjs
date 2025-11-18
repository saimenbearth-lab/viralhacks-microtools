import Stripe from 'stripe'
import { sessions } from './explainContent.mjs'

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

    // Get the explanation session ID from metadata
    const explanationSessionId = checkoutSession.metadata?.explanationSessionId

    if (!explanationSessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Explanation session not found' })
      }
    }

    // Retrieve the full explanation from session storage
    const sessionData = sessions.get(explanationSessionId)

    if (!sessionData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Explanation expired or not found. Please try explaining again.' })
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullExplanation: sessionData.fullExplanation
      })
    }

  } catch (error) {
    console.error('Get explanation error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to retrieve explanation',
        details: error.message 
      })
    }
  }
}
