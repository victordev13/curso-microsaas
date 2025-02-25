import stripe from '@/app/lib/stripe'
import WebhookError, { ErrorType } from './WebhookError'
import { db } from '@/app/lib/firebase'
import Stripe from 'stripe'
import { Timestamp } from 'firebase-admin/firestore'

export async function processStripeEvent(
  body: string,
  signature: null | string,
) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !secret) {
    throw new WebhookError(ErrorType.INVALID_SIGNATURE)
  }

  const event = stripe.webhooks.constructEvent(body, signature, secret)

  switch (event.type) {
    case 'checkout.session.completed':
      if (event.data.object.payment_status === 'paid') {
        await processPaimentCompleted(event)
      }

      if (
        event.data.object.payment_status === 'unpaid' &&
        event.data.object.payment_intent
      ) {
        await handlePaymentBoleto(event)
      }

      break
    case 'checkout.session.async_payment_succeeded':
      if (event.data.object.payment_status === 'paid') {
        await processPaimentCompleted(event)
      }
      break
    case 'customer.subscription.deleted':
      await processSubscriptionCanceled(event)
      break
  }
}

async function handlePaymentBoleto(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  const paymentIntentId = event.data.object.payment_intent?.toString() || ''
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  const hostedVoucherUrl =
    paymentIntent.next_action?.boleto_display_details?.hosted_voucher_url
  if (hostedVoucherUrl) {
    const userEmail = event.data.object.customer_details?.email
    // TODO: Enviar email para o cliente com o boleto
  }
}

async function processPaimentCompleted(
  event:
    | Stripe.CheckoutSessionCompletedEvent
    | Stripe.CheckoutSessionAsyncPaymentSucceededEvent,
) {
  const userId = event.data.object.client_reference_id
  if (!userId) {
    throw new Error()
  }

  await db.collection('users').doc(userId).update({
    isSubscribed: true,
    paidAt: Timestamp.now().toMillis(),
  })
}

async function processSubscriptionCanceled(
  event: Stripe.CustomerSubscriptionDeletedEvent,
) {
  const subscription = event.data.object
  const customerId = String(subscription.customer)

  const customer = (await stripe.customers.retrieve(
    customerId,
  )) as Stripe.Customer

  if (customer?.metadata.userId) {
    const userId = customer.metadata.userId
    await db.collection('users').doc(userId).update({
      isSubscribed: false,
    })
  }
}
