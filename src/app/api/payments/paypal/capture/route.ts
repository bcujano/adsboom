import { NextRequest, NextResponse } from 'next/server'
import { captureOrder } from '@/lib/payments/paypal'
import { recordPayment, activateSubscription, activateLicense } from '@/lib/payments/plans'
import type { PlanTier, BillingPeriod } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderID, plan, billingPeriod, type, orgId } = body as {
      orderID: string
      plan: PlanTier
      billingPeriod: BillingPeriod
      type: 'subscription' | 'license'
      orgId: string
    }

    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 })
    }

    // Capture the payment
    const capture = await captureOrder(orderID)

    if (capture.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'El pago no fue completado', status: capture.status },
        { status: 400 }
      )
    }

    const captureData = capture.purchase_units[0]?.payments?.captures[0]
    const amount = parseFloat(captureData?.amount?.value || '0')
    const captureId = captureData?.id || orderID

    // Record the payment
    await recordPayment({
      orgId: orgId || 'dev-org',
      amount,
      currency: 'USD',
      provider: 'paypal',
      type: type === 'license' ? 'one_time' : 'subscription',
      providerPaymentId: captureId,
      plan,
      billingPeriod,
    })

    // Activate plan
    if (type === 'license') {
      const licenseKey = await activateLicense({
        orgId: orgId || 'dev-org',
        plan,
        provider: 'paypal',
        providerPaymentId: captureId,
      })
      return NextResponse.json({
        success: true,
        licenseKey,
        message: 'Licencia activada exitosamente',
      })
    } else {
      await activateSubscription({
        orgId: orgId || 'dev-org',
        plan,
        billingPeriod,
        provider: 'paypal',
        providerPaymentId: captureId,
      })
      return NextResponse.json({
        success: true,
        message: 'Suscripción activada exitosamente',
      })
    }
  } catch (error) {
    console.error('PayPal capture error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}
