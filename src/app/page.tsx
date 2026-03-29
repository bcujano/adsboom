'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Rocket, Zap, Brain, Target, BarChart3, ArrowRight } from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useTranslations } from 'next-intl'

const features = [
  {
    icon: <Brain size={24} />,
    title: 'AI Campaign Studio',
    description: 'Generate copy, images, and video ads with AI in seconds.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Autopilot Mode',
    description: 'Automated A/B testing, budget optimization, and rules engine.',
  },
  {
    icon: <Target size={24} />,
    title: 'Funnel Builder',
    description: 'AI-powered landing pages that convert clicks into customers.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Intelligence Suite',
    description: 'Competitor spy, ROI predictor, and ad fatigue detection.',
  },
]

export default function LandingPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass !rounded-none border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              AdsBoom
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
            <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-8">
              <Zap size={14} className="text-accent" />
              <span className="text-sm text-text-secondary">
                AI-Powered Ad Management
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
              From{' '}
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Ad
              </span>{' '}
              to{' '}
              <span className="bg-gradient-to-r from-accent-secondary to-[#ec4899] bg-clip-text text-transparent">
                Client
              </span>
              <br />
              Fully Automated
            </h1>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Create, optimize, and scale advertising campaigns across Meta,
              Google, TikTok, and more. AI does the work. You get the results.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link href="/register">
                <GlassButton variant="gradient-red" size="lg" icon={<Rocket size={20} />}>
                  Start Free Trial
                </GlassButton>
              </Link>
              <Link href="#features">
                <GlassButton variant="glass" size="lg">
                  See Features
                  <ArrowRight size={18} />
                </GlassButton>
              </Link>
            </div>
          </motion.div>

          {/* Glass Loader Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <GlassCard
              variant="iridescent"
              padding="lg"
              className="max-w-3xl w-full min-h-[300px] flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="glass-loader-orb glass-loader-orb-lg" />
                <div className="space-y-2 text-center">
                  <p className="text-sm text-text-muted">
                    Campaign dashboard preview coming soon
                  </p>
                  <div className="flex gap-3 justify-center">
                    <span className="glass-skeleton h-3 w-20 block" />
                    <span className="glass-skeleton h-3 w-32 block" />
                    <span className="glass-skeleton h-3 w-16 block" />
                  </div>
                </div>
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
              Everything you need to dominate ads
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              8 powerful modules. One platform. Zero guesswork.
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
                <GlassCard padding="lg" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center shrink-0 text-accent">
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
      <footer className="py-8 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-text-muted">
          <span>2026 AdsBoom. All rights reserved.</span>
          <span>Powered by AI</span>
        </div>
      </footer>
    </div>
  )
}
