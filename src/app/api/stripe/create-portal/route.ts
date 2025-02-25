import { auth } from '@/app/lib/auth'
import stripe from '@/app/lib/stripe'
import { getUser } from '@/app/services/get-user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { customerId } = await getUser(userId)

  if (!customerId) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get('origin')}`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
