'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { PLANS, type PlanTier, type BillingPeriod } from '@/types'
import { useTranslations } from 'next-intl'

interface PricingTableProps {
  onSelectPlan: (plan: PlanTier, period: BillingPeriod, type: 'subscription' | 'license') => void
  showLicense?: boolean
}

const planIcons: Record<PlanTier, React.ReactNode> = {
  basic: <Star size={22} />,
  pro: <Zap size={22} />,
  premium: <Crown size={22} />,
  enterprise: <Building2 size={22} />,
}

const planGradients: Record<PlanTier, string> = {
  basic: 'from-blue-500 to-cyan-400',
  pro: 'from-violet-500 to-purple-400',
  premium: 'from-amber-500 to-orange-400',
  enterprise: 'from-rose-500 to-pink-400',
}

const featureLabels: Record<string, { es: string; en: string }> = {
  ai_copy_generation: { es: 'Generación de Copy con IA', en: 'AI Copy Generation' },
  ai_image_generation: { es: 'Generación de Imágenes con IA', en: 'AI Image Generation' },
  ai_video_generation: { es: 'Generación de Video con IA', en: 'AI Video Generation' },
  campaign_publishing: { es: 'Publicación de Campañas', en: 'Campaign Publishing' },
  basic_analytics: { es: 'Analítica Básica', en: 'Basic Analytics' },
  advanced_analytics: { es: 'Analítica Avanzada', en: 'Advanced Analytics' },
  ab_testing: { es: 'Pruebas A/B Automáticas', en: 'Automated A/B Testing' },
  competitor_spy: { es: 'Espía de Competencia', en: 'Competitor Spy' },
  roi_predictor: { es: 'Predictor de ROI', en: 'ROI Predictor' },
  ad_fatigue_detection: { es: 'Detección de Fatiga', en: 'Ad Fatigue Detection' },
  trend_radar: { es: 'Radar de Tendencias', en: 'Trend Radar' },
  automation_rules: { es: 'Reglas de Automatización', en: 'Automation Rules' },
  funnel_builder: { es: 'Constructor de Embudos', en: 'Funnel Builder' },
  lead_bridge: { es: 'Lead Bridge (CRM)', en: 'Lead Bridge (CRM)' },
  agency_hub: { es: 'Hub de Agencias', en: 'Agency Hub' },
  white_label: { es: 'Marca Blanca', en: 'White Label' },
  custom_domain: { es: 'Dominio Personalizado', en: 'Custom Domain' },
  client_portal: { es: 'Portal de Clientes', en: 'Client Portal' },
  email_notifications: { es: 'Notificaciones Email', en: 'Email Notifications' },
  whatsapp_notifications: { es: 'Notificaciones WhatsApp', en: 'WhatsApp Notifications' },
  pdf_reports: { es: 'Reportes PDF', en: 'PDF Reports' },
  api_access: { es: 'Acceso API', en: 'API Access' },
  dedicated_support: { es: 'Soporte Dedicado', en: 'Dedicated Support' },
}

export function PricingTable({ onSelectPlan, showLicense = true }: PricingTableProps) {
  const t = useTranslations('pricing')
  const [period, setPeriod] = useState<BillingPeriod>('monthly')

  const annualSavings = 17 // ~17% savings on annual

  return (
    <div>
      {/* Period Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <button
          onClick={() => setPeriod('monthly')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            period === 'monthly'
              ? 'glass text-text-primary shadow-lg'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {t('monthly')}
        </button>
        <button
          onClick={() => setPeriod('annual')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            period === 'annual'
              ? 'glass text-text-primary shadow-lg'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {t('annual')}
          <span className="text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
            {t('savePercent', { percent: annualSavings })}
          </span>
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan, i) => {
          const isPopular = plan.tier === 'pro'
          const price = period === 'monthly' ? plan.price_monthly : plan.price_annual

          return (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-purple-400 shadow-lg">
                    {t('mostPopular')}
                  </span>
                </div>
              )}

              <GlassCard
                variant={isPopular ? 'iridescent' : 'default'}
                padding="lg"
                className={`h-full flex flex-col ${isPopular ? 'ring-2 ring-accent/30' : ''}`}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${planGradients[plan.tier]} flex items-center justify-center text-white mb-4`}>
                    {planIcons[plan.tier]}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-primary">${price}</span>
                    <span className="text-text-muted text-sm">
                      {period === 'annual' ? `/${t('billedAnnually')}` : t('perMonth')}
                    </span>
                  </div>
                  {period === 'annual' && (
                    <p className="text-xs text-text-muted mt-1">
                      ${(price / 12).toFixed(0)}{t('perMonth')}
                    </p>
                  )}
                </div>

                {/* Limits */}
                <div className="glass-sm rounded-xl p-3 mb-5 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Usuarios</span>
                    <span className="text-text-primary font-medium">
                      {plan.max_users === -1 ? 'Ilimitados' : plan.max_users}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Campañas/mes</span>
                    <span className="text-text-primary font-medium">
                      {plan.max_campaigns_monthly === -1 ? 'Ilimitadas' : plan.max_campaigns_monthly}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Plataformas</span>
                    <span className="text-text-primary font-medium">{plan.max_platforms}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 mb-6">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                    {t('features')}
                  </p>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 8).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check size={15} className="text-green-500 mt-0.5 shrink-0" />
                        <span className="text-text-secondary">
                          {featureLabels[feature]?.es || feature}
                        </span>
                      </li>
                    ))}
                    {plan.features.length > 8 && (
                      <li className="text-xs text-text-muted pl-6">
                        +{plan.features.length - 8} más...
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 mt-auto">
                  <GlassButton
                    variant={isPopular ? 'gradient-purple' : 'gradient-blue'}
                    size="md"
                    className="w-full"
                    onClick={() => onSelectPlan(plan.tier, period, 'subscription')}
                  >
                    {plan.tier === 'enterprise' ? t('contactUs') : t('getStarted')}
                  </GlassButton>

                  {showLicense && (
                    <button
                      onClick={() => onSelectPlan(plan.tier, period, 'license')}
                      className="w-full text-center text-xs text-text-muted hover:text-accent transition-colors py-1"
                    >
                      {t('oneTimeLicense')}: ${plan.price_license.toLocaleString()}
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
