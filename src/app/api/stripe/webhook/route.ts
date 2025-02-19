import { processStripeEvent } from '@/app/services/stripe/webhook/process-stripe-event'
import WebhookError, {
  ErrorType,
} from '@/app/services/stripe/webhook/WebhookError'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    const signature = req.headers.get('stripe-signature')

    await processStripeEvent(body, signature)

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error processing Stripe webhook:', error)

    if (
      error instanceof WebhookError &&
      ErrorType.INVALID_SIGNATURE === error.type
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.error()
  }
}
