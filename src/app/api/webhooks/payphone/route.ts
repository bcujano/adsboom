import { NextRequest, NextResponse } from 'next/server'

// PayPhone Webhook / Notification Handler
// Register this URL in PayPhone Developer Dashboard
// URL: https://adsboom.emprendimientum.com/api/webhooks/payphone

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('[PayPhone Webhook] Received:', JSON.stringify(body, null, 2))

    const { transactionId, statusCode, transactionStatus, amount } = body

    if (statusCode === 3 || transactionStatus === 'Approved') {
      console.log(`[PayPhone] Payment approved: ${transactionId}, $${amount / 100}`)
      // Payment already handled in confirm endpoint
      // This is a backup confirmation
    } else {
      console.log(`[PayPhone] Payment status ${statusCode}: ${transactionStatus}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[PayPhone Webhook] Error:', error)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
