import { NextRequest, NextResponse } from 'next/server'
import { preparePayment, dollarsToCents } from '@/lib/payments/payphone'
import { getPlanPrice, getLicensePrice } from '@/lib/payments/plans'
import type { PlanTier, BillingPeriod } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan, billingPeriod, type, orgId, email } = body as {
      plan: PlanTier
      billingPeriod: BillingPeriod
      type: 'subscription' | 'license'
      orgId?: string
      email?: string
    }

    if (!plan || (!billingPeriod && type !== 'license')) {
      return NextResponse.json({ error: 'Missing plan or billingPeriod' }, { status: 400 })
    }

    const amountUSD = type === 'license'
      ? getLicensePrice(plan)
      : getPlanPrice(plan, billingPeriod)

    const amountCents = dollarsToCents(amountUSD)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // clientTransactionId encodes the plan info for the confirm endpoint
    const clientTransactionId = JSON.stringify({
      plan,
      billingPeriod: billingPeriod || 'perpetual',
      type,
      orgId: orgId || 'dev-org',
      timestamp: Date.now(),
    })

    const result = await preparePayment({
      amount: amountCents,
      clientTransactionId,
      responseUrl: `${appUrl}/api/payments/payphone/confirm`,
      cancellationUrl: `${appUrl}/pricing?cancelled=true`,
      reference: `AdsBoom ${plan} ${type}`,
      email,
    })

    return NextResponse.json({
      paymentId: result.paymentId,
      payWithCard: result.payWithCard,
      payWithPayPhone: result.payWithPayPhone,
    })
  } catch (error) {
    console.error('PayPhone prepare error:', error)
    return NextResponse.json(
      { error: 'Error al preparar el pago con PayPhone' },
      { status: 500 }
    )
  }
}
