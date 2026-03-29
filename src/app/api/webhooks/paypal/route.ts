import { NextRequest, NextResponse } from 'next/server'

// PayPal Webhook Handler
// Register this URL in PayPal Developer Dashboard → Webhooks
// URL: https://adsboom.emprendimientum.com/api/webhooks/paypal

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const eventType = body.event_type as string

    console.log(`[PayPal Webhook] Event: ${eventType}`, body.id)

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const resource = body.resource
        console.log('[PayPal] Payment captured:', resource.id, resource.amount)
        // Payment already handled in capture endpoint
        // This is a backup confirmation
        break
      }

      case 'PAYMENT.CAPTURE.DENIED': {
        const resource = body.resource
        console.log('[PayPal] Payment denied:', resource.id)
        // TODO: Update payment status to failed in DB
        break
      }

      case 'PAYMENT.CAPTURE.REFUNDED': {
        const resource = body.resource
        console.log('[PayPal] Payment refunded:', resource.id)
        // TODO: Update payment status to refunded, deactivate plan
        break
      }

      default:
        console.log(`[PayPal Webhook] Unhandled event: ${eventType}`)
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[PayPal Webhook] Error:', error)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
