import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  const sig = event.headers['stripe-signature']

  try {
    const webhookEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // Handle the checkout.session.completed event
    if (webhookEvent.type === 'checkout.session.completed') {
      const session = webhookEvent.data.object

      console.log('Payment successful for session:', session.id)
      console.log('Scripts session ID:', session.metadata?.scriptsSessionId)

      // Here you could:
      // - Send confirmation email
      // - Log the transaction
      // - Update analytics
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    }

  } catch (error) {
    console.error('Webhook error:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Webhook signature verification failed',
        details: error.message 
      })
    }
  }
}
