'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import {
  Megaphone,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  BarChart3,
  Target,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassSkeleton } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/components/providers/AuthProvider'
import { useTranslations } from 'next-intl'

interface MetricCardProps {
  label: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
  delay: number
}

function MetricCard({ label, value, change, positive, icon, delay }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <GlassCard padding="md" className="h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-accent">
            {icon}
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              positive
                ? 'text-success bg-success/10'
                : 'text-error bg-error/10'
            }`}
          >
            {positive ? '+' : ''}{change}
          </span>
        </div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-muted mt-1">{label}</p>
      </GlassCard>
    </motion.div>
  )
}

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const { user } = useAuth()
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'User'

  const metrics = [
    {
      label: t('activeCampaigns'),
      value: '12',
      change: '2',
      positive: true,
      icon: <Megaphone size={20} />,
    },
    {
      label: t('totalSpend'),
      value: '$4,280',
      change: '12%',
      positive: true,
      icon: <DollarSign size={20} />,
    },
    {
      label: t('totalLeads'),
      value: '342',
      change: '28%',
      positive: true,
      icon: <Users size={20} />,
    },
    {
      label: t('avgRoas'),
      value: '5.2x',
      change: '0.4x',
      positive: true,
      icon: <TrendingUp size={20} />,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header title={t('title')} />

      <div className="p-6 space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-text-primary">
            {t('welcomeBack', { name: displayName })}
          </h2>
          <p className="text-text-secondary mt-1">
            {t('todayOverview')}
          </p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} {...metric} delay={i * 0.1} />
          ))}
        </div>

        {/* Quick Actions + Recent */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard padding="md">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {t('quickActions')}
              </h3>
              <div className="space-y-3">
                <Link href="/campaigns/new">
                  <GlassButton
                    variant="gradient-red"
                    className="w-full justify-start"
                    size="md"
                    pill={false}
                    icon={<Plus size={18} />}
                  >
                    {t('createCampaign')}
                  </GlassButton>
                </Link>
                <Link href="/analytics">
                  <GlassButton
                    variant="glass"
                    className="w-full justify-start"
                    size="md"
                    pill={false}
                    icon={<BarChart3 size={18} />}
                  >
                    {t('viewAnalytics')}
                  </GlassButton>
                </Link>
                <Link href="/leads">
                  <GlassButton
                    variant="glass"
                    className="w-full justify-start"
                    size="md"
                    pill={false}
                    icon={<Target size={18} />}
                  >
                    {t('manageLeads')}
                  </GlassButton>
                </Link>
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <GlassCard padding="md">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {t('recentCampaigns')}
              </h3>
              <div className="space-y-4">
                {/* Placeholder skeleton */}
                <GlassSkeleton lines={4} />
                <p className="text-sm text-text-muted text-center mt-4">
                  {t('noCampaigns')}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
