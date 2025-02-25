'use client'

import { useStripe } from '@/app/hooks/useStripe'

export function PortalButton() {
  const { handleCreateStripePortal } = useStripe()

  async function handleOpenStripePortal() {
    const url = await handleCreateStripePortal()
    window.location.href = url
  }

  return <button onClick={handleOpenStripePortal}>Portal</button>
}
