import Stripe from 'stripe'

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: '2025-01-27.acacia',
})

export default stripe

export const MODE_SUBSCRIPTION = 'subscription'
export const MODE_PAYMENT = 'payment'
