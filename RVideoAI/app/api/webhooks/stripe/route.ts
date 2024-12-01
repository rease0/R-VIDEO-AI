import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // Handle successful payment intent
      await handleSuccessfulPayment(paymentIntent)
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  // Retrieve the customer from the payment intent
  const customerId = paymentIntent.customer as string
  if (!customerId) {
    console.error('No customer found for payment intent:', paymentIntent.id)
    return
  }

  // Fetch the customer from your database using the Stripe customer ID
  // const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } })
  // if (!user) {
  //   console.error('No user found for Stripe customer:', customerId)
  //   return
  // }

  // Calculate the number of minutes to add (assuming $1 = 2 minutes)
  const amountPaid = paymentIntent.amount / 100 // Convert cents to dollars
  const minutesToAdd = amountPaid * 2

  // Update the user's credit in your database
  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { videoMinutesCredit: { increment: minutesToAdd } }
  // })

  console.log(`Added ${minutesToAdd} minutes to user's account`)
}

