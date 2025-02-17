import stripe, { MODE_PAYMENT, MODE_SUBSCRIPTION } from '@/app/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { isSubscription, metadata: rawMetadata } = await req.json()

  const metadata = {
    profileId: String(rawMetadata.profileId || ''),
  }

  const session = await stripe.checkout.sessions.create({
    // customer: '',
    line_items: [
      {
        price: isSubscription
          ? process.env.STRIPE_MONTHLY_PRICE_ID
          : process.env.STRIPE_LIFETIME_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: isSubscription ? MODE_SUBSCRIPTION : MODE_PAYMENT,
    payment_method_types: isSubscription ? ['card'] : ['card', 'boleto'],
    success_url: `${process.env.NEXT_PUBLIC_URL}/${metadata.profileId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/${metadata.profileId}/upgrade`,
    metadata,
  })

  return NextResponse.json({
    sessionId: session.id,
  })
}
