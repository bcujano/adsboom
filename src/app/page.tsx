'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Rocket, Zap, Brain, Target, BarChart3, ArrowRight, DollarSign } from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useTranslations } from 'next-intl'

export default function LandingPage() {
  const t = useTranslations()

  const features = [
    { icon: <Brain size={24} />, title: t('landing.feature1Title'), description: t('landing.feature1Desc') },
    { icon: <Zap size={24} />, title: t('landing.feature2Title'), description: t('landing.feature2Desc') },
    { icon: <Target size={24} />, title: t('landing.feature3Title'), description: t('landing.feature3Desc') },
    { icon: <BarChart3 size={24} />, title: t('landing.feature4Title'), description: t('landing.feature4Desc') },
  ]

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass !rounded-none !border-t-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              AdsBoom
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/pricing">
              <GlassButton variant="ghost" size="sm" icon={<DollarSign size={16} />}>
                {t('landing.seePricing')}
              </GlassButton>
            </Link>
            <Link href="/login">
              <GlassButton variant="ghost" size="sm">
                {t('auth.login')}
              </GlassButton>
            </Link>
            <Link href="/register">
              <GlassButton variant="gradient-blue" size="sm">
                {t('auth.register')}
              </GlassButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass-pill px-5 py-2 mb-8">
              <Zap size={14} className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">
                {t('landing.badge')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
              {t('landing.heroTitle1')}{' '}
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                {t('landing.heroTitle2')}
              </span>{' '}
              {t('landing.heroTitle3')}{' '}
              <span className="bg-gradient-to-r from-accent-secondary to-[#ec4899] bg-clip-text text-transparent">
                {t('landing.heroTitle4')}
              </span>
              <br />
              {t('landing.heroTitle5')}
            </h1>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('landing.heroDescription')}
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/register">
                <GlassButton variant="gradient-red" size="lg" icon={<Rocket size={20} />}>
                  {t('landing.startTrial')}
                </GlassButton>
              </Link>
              <Link href="#features">
                <GlassButton variant="glass" size="lg">
                  {t('landing.seeFeatures')}
                  <ArrowRight size={18} />
                </GlassButton>
              </Link>
            </div>
          </motion.div>

          {/* Hero Metrics Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16"
          >
            <GlassCard
              variant="iridescent"
              padding="lg"
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: '18.4x', label: 'ROAS Promedio' },
                  { value: '85%', label: 'Ahorro de Tiempo' },
                  { value: '52s', label: 'Crear Campaña' },
                  { value: '6', label: 'Plataformas' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {t('landing.featuresTitle')}
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              {t('landing.featuresSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <GlassCard padding="lg" className="h-full glass-prismatic">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl glass-sm flex items-center justify-center shrink-0 text-accent">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--glass-border-bottom)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-text-muted">
          <span>{t('common.allRights')}</span>
          <span>{t('common.poweredBy')}</span>
        </div>
      </footer>
    </div>
  )
}
