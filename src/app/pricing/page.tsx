'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Rocket, ArrowLeft } from 'lucide-react'
import { GlassButton } from '@/components/glass'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { PricingTable } from '@/components/checkout/PricingTable'
import { CheckoutModal } from '@/components/checkout/CheckoutModal'
import { useTranslations } from 'next-intl'
import type { PlanTier, BillingPeriod } from '@/types'

export default function PricingPage() {
  const t = useTranslations('pricing')

  const [checkout, setCheckout] = useState<{
    open: boolean
    plan: PlanTier
    period: BillingPeriod
    type: 'subscription' | 'license'
  }>({
    open: false,
    plan: 'basic',
    period: 'monthly',
    type: 'subscription',
  })

  const handleSelectPlan = (plan: PlanTier, period: BillingPeriod, type: 'subscription' | 'license') => {
    setCheckout({ open: true, plan, period, type })
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass !rounded-none !border-t-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20">
                <Rocket size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">AdsBoom</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/">
              <GlassButton variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
                {t('back')}
              </GlassButton>
            </Link>
            <Link href="/login">
              <GlassButton variant="ghost" size="sm">
                Iniciar sesión
              </GlassButton>
            </Link>
            <Link href="/register">
              <GlassButton variant="gradient-blue" size="sm">
                Crear cuenta
              </GlassButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <PricingTable onSelectPlan={handleSelectPlan} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--glass-border-bottom)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-text-muted">
          <span>© 2026 AdsBoom. Todos los derechos reservados.</span>
          <span>Powered by Emprendimientum</span>
        </div>
      </footer>

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
