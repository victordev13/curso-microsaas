'use client'

import { Button } from '@/app/components/ui/button'
import { useStripe } from '@/app/hooks/useStripe'
import { VALOR_MENSAL, VALOR_VITALICIO } from '@/app/lib/config'
import { useParams } from 'next/navigation'

export function ChoosePlanButtons() {
  const { profileId } = useParams()
  const { createStripeCheckout } = useStripe()

  async function handleCreateStripeCheckout(isSubscription: boolean) {
    if (!profileId) {
      console.error('`profileId` not found')
      return
    }

    createStripeCheckout({
      metadata: { profileId: String(profileId) },
      isSubscription,
    })
  }

  return (
    <>
      <Button onClick={() => handleCreateStripeCheckout(true)}>
        {VALOR_MENSAL} / Mês
      </Button>
      <Button onClick={() => handleCreateStripeCheckout(false)}>
        {VALOR_VITALICIO} / Vitalício
      </Button>
    </>
  )
}
