import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/payments/paypal'
import { getPlanPrice, getLicensePrice } from '@/lib/payments/plans'
import type { PlanTier, BillingPeriod } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan, billingPeriod, type } = body as {
      plan: PlanTier
      billingPeriod: BillingPeriod
      type: 'subscription' | 'license'
    }

    if (!plan || (!billingPeriod && type !== 'license')) {
      return NextResponse.json({ error: 'Missing plan or billingPeriod' }, { status: 400 })
    }

    const amount = type === 'license'
      ? getLicensePrice(plan)
      : getPlanPrice(plan, billingPeriod)

    const description = type === 'license'
      ? `AdsBoom ${plan.charAt(0).toUpperCase() + plan.slice(1)} - Licencia Permanente`
      : `AdsBoom ${plan.charAt(0).toUpperCase() + plan.slice(1)} - ${billingPeriod === 'monthly' ? 'Mensual' : 'Anual'}`

    const referenceId = `${type}-${plan}-${billingPeriod || 'perpetual'}-${Date.now()}`

    const order = await createOrder({
      amount,
      currency: 'USD',
      description,
      referenceId,
    })

    return NextResponse.json({
      id: order.id,
      status: order.status,
      links: order.links,
    })
  } catch (error) {
    console.error('PayPal create order error:', error)
    return NextResponse.json(
      { error: 'Error al crear la orden de PayPal' },
      { status: 500 }
    )
  }
}
