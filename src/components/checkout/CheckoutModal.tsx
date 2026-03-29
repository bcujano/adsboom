'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { CreditCard, Smartphone, Shield, Check, Loader2 } from 'lucide-react'
import { GlassModal, GlassButton } from '@/components/glass'
import { PLANS, type PlanTier, type BillingPeriod } from '@/types'
import { useTranslations } from 'next-intl'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  plan: PlanTier
  billingPeriod: BillingPeriod
  type: 'subscription' | 'license'
}

export function CheckoutModal({
  isOpen,
  onClose,
  plan,
  billingPeriod,
  type,
}: CheckoutModalProps) {
  const t = useTranslations('checkout')
  const [loadingProvider, setLoadingProvider] = useState<'paypal' | 'payphone' | null>(null)
  const [error, setError] = useState('')

  const planConfig = PLANS.find((p) => p.tier === plan)
  if (!planConfig) return null

  const price = type === 'license'
    ? planConfig.price_license
    : billingPeriod === 'monthly'
      ? planConfig.price_monthly
      : planConfig.price_annual

  const periodLabel = type === 'license'
    ? t('licenseOnce')
    : billingPeriod === 'monthly'
      ? t('perMonth')
      : t('perYear')

  // --- PayPal Payment ---
  const handlePayPal = async () => {
    setLoadingProvider('paypal')
    setError('')

    try {
      // 1. Create order
      const res = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billingPeriod, type }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear la orden')

      // 2. Find approval URL and redirect
      const approvalLink = data.links?.find(
        (l: { rel: string }) => l.rel === 'payer-action' || l.rel === 'approve'
      )

      if (approvalLink?.href) {
        window.location.href = approvalLink.href
      } else {
        throw new Error('No se encontró enlace de aprobación de PayPal')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error con PayPal')
      setLoadingProvider(null)
    }
  }

  // --- PayPhone Payment ---
  const handlePayPhone = async () => {
    setLoadingProvider('payphone')
    setError('')

    try {
      const res = await fetch('/api/payments/payphone/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billingPeriod, type }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al preparar el pago')

      // Redirect to PayPhone payment page
      if (data.payWithCard) {
        window.location.href = data.payWithCard
      } else {
        throw new Error('No se recibió URL de pago de PayPhone')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error con PayPhone')
      setLoadingProvider(null)
    }
  }

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={loadingProvider ? () => {} : onClose}
      title={t('title')}
      size="lg"
    >
      <div className="space-y-6">
        {/* Plan Summary */}
        <div className="glass-sm rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                AdsBoom {planConfig.name}
              </h3>
              <p className="text-sm text-text-muted">
                {type === 'license' ? t('licensePerpetual') : t('subscriptionLabel')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-text-primary">${price}</p>
              <p className="text-xs text-text-muted">{periodLabel}</p>
            </div>
          </div>

          {/* Key features */}
          <div className="flex flex-wrap gap-2 mt-3">
            {planConfig.features.slice(0, 4).map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 text-xs glass-pill px-2.5 py-1 text-text-secondary"
              >
                <Check size={11} className="text-green-500" />
                {f.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-text-secondary">
            {t('selectPaymentMethod')}
          </p>

          {/* PayPal */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handlePayPal}
            disabled={!!loadingProvider}
            className="w-full glass-sm rounded-xl p-4 flex items-center gap-4 hover:bg-[var(--glass-bg-hover)] transition-all disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0070ba]/10 flex items-center justify-center shrink-0">
              {loadingProvider === 'paypal' ? (
                <Loader2 size={22} className="text-[#0070ba] animate-spin" />
              ) : (
                <CreditCard size={22} className="text-[#0070ba]" />
              )}
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-text-primary">PayPal</p>
              <p className="text-xs text-text-muted">{t('paypalDesc')}</p>
            </div>
            <span className="text-xs font-bold text-[#0070ba] bg-[#0070ba]/10 px-2.5 py-1 rounded-full">
              {t('international')}
            </span>
          </motion.button>

          {/* PayPhone */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handlePayPhone}
            disabled={!!loadingProvider}
            className="w-full glass-sm rounded-xl p-4 flex items-center gap-4 hover:bg-[var(--glass-bg-hover)] transition-all disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-xl bg-[#ff6b00]/10 flex items-center justify-center shrink-0">
              {loadingProvider === 'payphone' ? (
                <Loader2 size={22} className="text-[#ff6b00] animate-spin" />
              ) : (
                <Smartphone size={22} className="text-[#ff6b00]" />
              )}
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-text-primary">PayPhone</p>
              <p className="text-xs text-text-muted">{t('payphoneDesc')}</p>
            </div>
            <span className="text-xs font-bold text-[#ff6b00] bg-[#ff6b00]/10 px-2.5 py-1 rounded-full">
              LATAM
            </span>
          </motion.button>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-error bg-error/10 rounded-xl px-4 py-3"
          >
            {error}
          </motion.div>
        )}

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted pt-2">
          <Shield size={14} />
          <span>{t('securePayment')}</span>
        </div>
      </div>
    </GlassModal>
  )
}
