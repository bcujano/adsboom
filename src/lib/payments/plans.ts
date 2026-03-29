// ===== Plan Activation & Subscription Management =====

import { PLANS, type PlanTier, type BillingPeriod, type PaymentProvider } from '@/types'
import { createServiceClient } from '@/lib/supabase/server'

// --- Get plan price ---
export function getPlanPrice(tier: PlanTier, period: BillingPeriod): number {
  const plan = PLANS.find((p) => p.tier === tier)
  if (!plan) throw new Error(`Plan not found: ${tier}`)
  return period === 'monthly' ? plan.price_monthly : plan.price_annual
}

export function getLicensePrice(tier: PlanTier): number {
  const plan = PLANS.find((p) => p.tier === tier)
  if (!plan) throw new Error(`Plan not found: ${tier}`)
  return plan.price_license
}

export function getPlanByTier(tier: PlanTier) {
  return PLANS.find((p) => p.tier === tier)
}

// --- Calculate period end ---
export function calculatePeriodEnd(startDate: Date, period: BillingPeriod): Date {
  const end = new Date(startDate)
  if (period === 'monthly') {
    end.setMonth(end.getMonth() + 1)
  } else {
    end.setFullYear(end.getFullYear() + 1)
  }
  return end
}

// --- Check if Supabase is configured ---
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  return !url.includes('PASTE_') && url.startsWith('https://')
}

// --- Record Payment ---
export async function recordPayment(params: {
  orgId: string
  amount: number
  currency: string
  provider: PaymentProvider
  type: 'subscription' | 'one_time'
  providerPaymentId: string
  plan: PlanTier
  billingPeriod?: BillingPeriod
}): Promise<{ id: string } | null> {
  if (!isSupabaseConfigured()) {
    console.log('[DEV] Payment recorded:', params)
    return { id: `dev-payment-${Date.now()}` }
  }

  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from('payments')
    .insert({
      org_id: params.orgId,
      amount: params.amount,
      currency: params.currency,
      provider: params.provider,
      type: params.type,
      status: 'completed',
      provider_payment_id: params.providerPaymentId,
      metadata: {
        plan: params.plan,
        billing_period: params.billingPeriod,
      },
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error recording payment:', error)
    throw error
  }

  return data
}

// --- Activate Subscription ---
export async function activateSubscription(params: {
  orgId: string
  plan: PlanTier
  billingPeriod: BillingPeriod
  provider: PaymentProvider
  providerPaymentId: string
}): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.log('[DEV] Subscription activated:', params)
    return
  }

  const supabase = await createServiceClient()
  const now = new Date()
  const periodEnd = calculatePeriodEnd(now, params.billingPeriod)

  // Deactivate existing subscriptions
  await supabase
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('org_id', params.orgId)
    .eq('status', 'active')

  // Create new subscription
  const { error: subError } = await supabase
    .from('subscriptions')
    .insert({
      org_id: params.orgId,
      provider: params.provider,
      provider_subscription_id: params.providerPaymentId,
      plan: params.plan,
      status: 'active',
      billing_period: params.billingPeriod,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
    })

  if (subError) {
    console.error('Error creating subscription:', subError)
    throw subError
  }

  // Update organization plan
  const { error: orgError } = await supabase
    .from('organizations')
    .update({ plan: params.plan, status: 'active' })
    .eq('id', params.orgId)

  if (orgError) {
    console.error('Error updating org plan:', orgError)
    throw orgError
  }
}

// --- Activate License ---
export async function activateLicense(params: {
  orgId: string
  plan: PlanTier
  provider: PaymentProvider
  providerPaymentId: string
}): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    const key = generateLicenseKey()
    console.log('[DEV] License activated:', { ...params, licenseKey: key })
    return key
  }

  const supabase = await createServiceClient()
  const licenseKey = generateLicenseKey()

  const { error: licError } = await supabase
    .from('licenses')
    .insert({
      org_id: params.orgId,
      license_key: licenseKey,
      plan: params.plan,
      issued_at: new Date().toISOString(),
      valid_until: null, // perpetual
    })

  if (licError) {
    console.error('Error creating license:', licError)
    throw licError
  }

  // Update organization
  const { error: orgError } = await supabase
    .from('organizations')
    .update({
      plan: params.plan,
      license_type: 'perpetual',
      status: 'active',
    })
    .eq('id', params.orgId)

  if (orgError) {
    console.error('Error updating org:', orgError)
    throw orgError
  }

  return licenseKey
}

// --- Get Current Subscription ---
export async function getCurrentSubscription(orgId: string) {
  if (!isSupabaseConfigured()) {
    return null
  }

  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('org_id', orgId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return data
}

// --- Get Payment History ---
export async function getPaymentHistory(orgId: string) {
  if (!isSupabaseConfigured()) {
    return []
  }

  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('payments')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

// --- Helper: Generate License Key ---
function generateLicenseKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const segments: string[] = []
  for (let s = 0; s < 5; s++) {
    let segment = ''
    for (let i = 0; i < 5; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    segments.push(segment)
  }
  return `ADS-${segments.join('-')}`
}
