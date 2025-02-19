import { auth } from '@/app/lib/auth'
import { db } from '@/app/lib/firebase'
import stripe, { MODE_PAYMENT, MODE_SUBSCRIPTION } from '@/app/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { isSubscription, metadata: rawMetadata } = await req.json()

  const metadata = {
    profileId: String(rawMetadata.profileId || ''),
  }

  const userSession = await auth()

  const [userId, userEmail, userName] = [
    userSession?.user?.id,
    userSession?.user?.email,
    userSession?.user?.name,
  ]

  if (!userId || !userEmail || !userName) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userRef = db.collection('users').doc(userId)
  const userDoc = await userRef.get()

  let customerId: string | undefined

  if (userDoc.exists && userDoc.data()?.customerId) {
    customerId = userDoc.data()?.customerId
  } else {
    const newCustomer = await stripe.customers.create({
      email: userEmail,
      name: userName || 'Sem nome',
      metadata: { userId },
    })

    customerId = newCustomer.id

    await userRef.update({ customerId })
  }

  const session = await stripe.checkout.sessions.create({
    customer: String(customerId),
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
    client_reference_id: userId,
    metadata,
  })

  return NextResponse.json({
    sessionId: session.id,
  })
}
