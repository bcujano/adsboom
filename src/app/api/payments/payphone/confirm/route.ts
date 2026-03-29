import { NextRequest, NextResponse } from 'next/server'
import { confirmPayment, isPaymentSuccessful } from '@/lib/payments/payphone'
import { recordPayment, activateSubscription, activateLicense } from '@/lib/payments/plans'
import type { PlanTier, BillingPeriod } from '@/types'

// PayPhone redirects here after payment (GET with query params)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const transactionId = searchParams.get('id')
  const clientTransactionId = searchParams.get('clientTransactionId')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  if (!transactionId) {
    return NextResponse.redirect(`${appUrl}/pricing?error=missing_transaction`)
  }

  try {
    // Verify with PayPhone
    const result = await confirmPayment(transactionId)

    if (!isPaymentSuccessful(result)) {
      console.error('[PayPhone] Payment not successful:', result)
      return NextResponse.redirect(`${appUrl}/pricing?error=payment_failed`)
    }

    // Decode plan info from clientTransactionId
    let planInfo: {
      plan: PlanTier
      billingPeriod: BillingPeriod | 'perpetual'
      type: 'subscription' | 'license'
      orgId: string
    }

    try {
      planInfo = JSON.parse(clientTransactionId || result.clientTransactionId || '{}')
    } catch {
      console.error('[PayPhone] Could not parse clientTransactionId')
      return NextResponse.redirect(`${appUrl}/billing?success=true&manual=true`)
    }

    const amountUSD = result.amount / 100 // cents to dollars

    // Record payment
    await recordPayment({
      orgId: planInfo.orgId,
      amount: amountUSD,
      currency: result.currency || 'USD',
      provider: 'payphone',
      type: planInfo.type === 'license' ? 'one_time' : 'subscription',
      providerPaymentId: transactionId,
      plan: planInfo.plan,
      billingPeriod: planInfo.billingPeriod === 'perpetual' ? undefined : planInfo.billingPeriod,
    })

    // Activate plan
    if (planInfo.type === 'license') {
      const licenseKey = await activateLicense({
        orgId: planInfo.orgId,
        plan: planInfo.plan,
        provider: 'payphone',
        providerPaymentId: transactionId,
      })
      return NextResponse.redirect(
        `${appUrl}/billing?success=true&type=license&key=${encodeURIComponent(licenseKey || '')}`
      )
    } else {
      await activateSubscription({
        orgId: planInfo.orgId,
        plan: planInfo.plan,
        billingPeriod: planInfo.billingPeriod as BillingPeriod,
        provider: 'payphone',
        providerPaymentId: transactionId,
      })
      return NextResponse.redirect(`${appUrl}/billing?success=true&type=subscription`)
    }
  } catch (error) {
    console.error('[PayPhone Confirm] Error:', error)
    return NextResponse.redirect(`${appUrl}/pricing?error=server_error`)
  }
}
