import Stripe from 'stripe'

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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${event.headers.origin || 'https://viralhacks.ch/explain'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: event.headers.origin || 'https://viralhacks.ch/explain',
      metadata: {
        explanationSessionId: sessionId
      }
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: session.url })
    }

  } catch (error) {
    console.error('Checkout error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      })
    }
  }
}
