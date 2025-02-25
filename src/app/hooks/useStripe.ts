import { useEffect, useState } from 'react'
import { loadStripe, type Stripe } from '@stripe/stripe-js'

// TODO: come back here
export type Metadata = {
  profileId: string
}

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>()

  useEffect(() => {
    loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)).then(
      setStripe,
    )
  }, [])

  async function createStripeCheckout({
    metadata,
    isSubscription,
  }: {
    metadata: Metadata
    isSubscription: boolean
  }) {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ metadata, isSubscription }),
      })
      const data = await response.json()
      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      })
    } catch (error) {
      console.error(error)
      return { error }
    }
  }

  async function handleCreateStripePortal() {
    const response = await fetch('/api/stripe/create-portal', {
      method: 'POST',
    })

    const body = await response.json()
    if (response.status !== 200) {
      throw new Error(body.error)
    }

    return body.url
  }

  return { createStripeCheckout, handleCreateStripePortal }
}
