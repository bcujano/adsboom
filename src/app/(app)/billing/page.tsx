'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  CreditCard,
  Crown,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Key,
  Receipt,
  X,
} from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import { PricingTable } from '@/components/checkout/PricingTable'
import { CheckoutModal } from '@/components/checkout/CheckoutModal'
import { PLANS, type PlanTier, type BillingPeriod } from '@/types'
import { useTranslations } from 'next-intl'

export default function BillingPage() {
  const t = useTranslations('billing')
  const searchParams = useSearchParams()
  const isSuccess = searchParams.get('success') === 'true'
  const licenseKey = searchParams.get('key')
  const paymentType = searchParams.get('type')

  const [showSuccess, setShowSuccess] = useState(isSuccess)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const [checkout, setCheckout] = useState<{
    open: boolean
    plan: PlanTier
    period: BillingPeriod
    type: 'subscription' | 'license'
  }>({
    open: false,
    plan: 'pro',
    period: 'monthly',
    type: 'subscription',
  })

  // Mock current plan (will use real data from Supabase when configured)
  const currentPlan = PLANS.find((p) => p.tier === 'basic')!
  const currentPeriodEnd = new Date()
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

  // Mock payment history
  const payments = [
    { id: '1', date: '2026-03-28', amount: 49, plan: 'Basic', provider: 'PayPal', status: 'completed' },
  ]

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 8000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const handleSelectPlan = (plan: PlanTier, period: BillingPeriod, type: 'subscription' | 'license') => {
    setCheckout({ open: true, plan, period, type })
    setShowUpgrade(false)
  }

  return (
    <div className="min-h-screen">
      <Header title={t('title')} />

      <div className="p-6 space-y-6">
        {/* Success Banner */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-xl p-5 border-l-4 border-green-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-green-500 mt-0.5" />
                  <div>
                    <h3 className="text-text-primary font-semibold">
                      {paymentType === 'license' ? t('licenseActivated') : t('subscriptionActivated')}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {t('thankYou')}
                    </p>
                    {licenseKey && (
                      <div className="mt-3 glass-sm rounded-lg p-3 flex items-center gap-2">
                        <Key size={16} className="text-accent" />
                        <code className="text-sm font-mono text-text-primary">{licenseKey}</code>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="p-1 hover:bg-[var(--glass-bg-hover)] rounded-full"
                >
                  <X size={16} className="text-text-muted" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard variant="iridescent" padding="lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white">
                  <Crown size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">
                    {t('currentPlan')}: {currentPlan.name}
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    ${currentPlan.price_monthly}{t('perMonth')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar size={14} className="text-text-muted" />
                    <span className="text-xs text-text-muted">
                      {t('nextBilling')}: {currentPeriodEnd.toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <GlassButton
                  variant="gradient-purple"
                  size="md"
                  icon={<ArrowUpRight size={18} />}
                  onClick={() => setShowUpgrade(!showUpgrade)}
                >
                  {t('upgradePlan')}
                </GlassButton>
              </div>
            </div>

            {/* Plan Usage */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--glass-border-bottom)]">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">{t('users')}</p>
                <p className="text-lg font-bold text-text-primary mt-1">
                  1 / {currentPlan.max_users === -1 ? '∞' : currentPlan.max_users}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">{t('campaigns')}</p>
                <p className="text-lg font-bold text-text-primary mt-1">
                  0 / {currentPlan.max_campaigns_monthly === -1 ? '∞' : currentPlan.max_campaigns_monthly}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">{t('platforms')}</p>
                <p className="text-lg font-bold text-text-primary mt-1">
                  0 / {currentPlan.max_platforms}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Upgrade Section */}
        <AnimatePresence>
          {showUpgrade && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="py-4">
                <PricingTable onSelectPlan={handleSelectPlan} showLicense={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard padding="md">
            <div className="flex items-center gap-2 mb-5">
              <Receipt size={20} className="text-accent" />
              <h3 className="text-lg font-semibold text-text-primary">
                {t('paymentHistory')}
              </h3>
            </div>

            {payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--glass-border-bottom)]">
                      <th className="text-left py-3 px-2 text-text-muted font-medium">{t('date')}</th>
                      <th className="text-left py-3 px-2 text-text-muted font-medium">{t('plan')}</th>
                      <th className="text-left py-3 px-2 text-text-muted font-medium">{t('provider')}</th>
                      <th className="text-right py-3 px-2 text-text-muted font-medium">{t('amount')}</th>
                      <th className="text-right py-3 px-2 text-text-muted font-medium">{t('status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b border-[var(--glass-border-bottom)] last:border-0">
                        <td className="py-3 px-2 text-text-secondary">{p.date}</td>
                        <td className="py-3 px-2 text-text-primary font-medium">{p.plan}</td>
                        <td className="py-3 px-2">
                          <span className="inline-flex items-center gap-1.5">
                            <CreditCard size={14} className="text-text-muted" />
                            <span className="text-text-secondary">{p.provider}</span>
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right text-text-primary font-medium">${p.amount}</td>
                        <td className="py-3 px-2 text-right">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                            {t('completed')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-text-muted text-center py-8">
                {t('noPayments')}
              </p>
            )}
          </GlassCard>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard padding="md">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-accent" />
              <h3 className="text-lg font-semibold text-text-primary">
                {t('paymentMethods')}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-sm rounded-xl p-4 flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#0070ba]/10 flex items-center justify-center">
                  <CreditCard size={20} className="text-[#0070ba]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">PayPal</p>
                  <p className="text-xs text-text-muted">{t('availableInternational')}</p>
                </div>
              </div>
              <div className="glass-sm rounded-xl p-4 flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#ff6b00]/10 flex items-center justify-center">
                  <CreditCard size={20} className="text-[#ff6b00]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">PayPhone</p>
                  <p className="text-xs text-text-muted">{t('availableLatam')}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkout.open}
        onClose={() => setCheckout((prev) => ({ ...prev, open: false }))}
        plan={checkout.plan}
        billingPeriod={checkout.period}
        type={checkout.type}
      />
    </div>
  )
}
