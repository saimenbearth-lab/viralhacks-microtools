import Stripe from 'stripe'
import { sessions } from './generateScripts.mjs'

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

    // Get the scripts session ID from metadata
    const scriptsSessionId = checkoutSession.metadata?.scriptsSessionId

    if (!scriptsSessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Scripts session not found' })
      }
    }

    // Retrieve the full scripts from session storage
    const sessionData = sessions.get(scriptsSessionId)

    if (!sessionData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Scripts expired or not found. Please generate scripts again.' })
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullScripts: sessionData.fullScripts
      })
    }

  } catch (error) {
    console.error('Get scripts error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to retrieve scripts',
        details: error.message 
      })
    }
  }
}
