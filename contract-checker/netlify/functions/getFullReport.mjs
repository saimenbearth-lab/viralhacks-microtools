import Stripe from 'stripe'
import { sessions } from './analyzeContract.mjs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Store paid session IDs
const paidSessions = new Set()

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

    // Get the analysis session ID from metadata
    const analysisSessionId = checkoutSession.metadata?.analysisSessionId

    if (!analysisSessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Analysis session not found' })
      }
    }

    // Retrieve the full report from session storage
    const sessionData = sessions.get(analysisSessionId)

    if (!sessionData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Report expired or not found. Please analyze the contract again.' })
      }
    }

    // Mark this checkout session as paid
    paidSessions.add(sessionId)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullReport: sessionData.fullReport
      })
    }

  } catch (error) {
    console.error('Get report error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to retrieve report',
        details: error.message 
      })
    }
  }
}
