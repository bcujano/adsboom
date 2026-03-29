'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import {
  Megaphone, DollarSign, Users, TrendingUp, Plus,
  BarChart3, Target, LayoutDashboard, ArrowUpRight,
  Eye, MousePointerClick,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassSkeleton } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/components/providers/AuthProvider'
import { useTranslations } from 'next-intl'

const recentCampaigns = [
  { name: 'Black Friday - Conversiones', platform: 'Meta', status: 'active', roas: '4.8x', spent: '$342' },
  { name: 'Lanzamiento Producto Q1', platform: 'Google', status: 'active', roas: '3.2x', spent: '$612' },
  { name: 'Brand Awareness LATAM', platform: 'TikTok', status: 'paused', roas: '1.8x', spent: '$150' },
  { name: 'Retargeting Carrito', platform: 'Meta', status: 'active', roas: '7.2x', spent: '$179' },
]

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500',
  paused: 'bg-orange-500/10 text-orange-500',
  draft: 'bg-gray-500/10 text-gray-500',
}

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const { user } = useAuth()
  const router = useRouter()
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'User'

  const metrics = [
    { label: t('activeCampaigns'), value: '12', change: '+2', positive: true, icon: <Megaphone size={20} /> },
    { label: t('totalSpend'), value: '$4,280', change: '+12%', positive: true, icon: <DollarSign size={20} /> },
    { label: t('totalLeads'), value: '342', change: '+28%', positive: true, icon: <Users size={20} /> },
    { label: t('avgRoas'), value: '5.2x', change: '+0.4x', positive: true, icon: <TrendingUp size={20} /> },
  ]

  return (
    <div className="min-h-screen">
      <Header title={t('title')} />

      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-text-primary">{t('welcomeBack', { name: displayName })}</h2>
          <p className="text-text-secondary mt-1">{t('todayOverview')}</p>
        </motion.div>

        {/* Section Description */}
        <GlassCard padding="md" className="border-l-4 border-accent" hover={false}>
          <div className="flex items-start gap-3">
            <LayoutDashboard size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Panel de Control</p>
              <p className="text-xs text-text-muted mt-1">Vista general de tu cuenta. Aquí ves el rendimiento de todas tus campañas, accesos rápidos a las herramientas principales y un resumen de tu actividad reciente.</p>
            </div>
          </div>
        </GlassCard>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric, i) => (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
              <GlassCard padding="md" className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-accent">{metric.icon}</div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${metric.positive ? 'text-success bg-success/10' : 'text-error bg-error/10'}`}>{metric.positive ? '+' : ''}{metric.change}</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
                <p className="text-sm text-text-muted mt-1">{metric.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions + Recent Campaigns */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <GlassCard padding="lg">
              <h3 className="text-lg font-semibold text-text-primary mb-5">{t('quickActions')}</h3>
              <div className="flex flex-col gap-3">
                <GlassButton variant="gradient-red" className="w-full justify-start" size="md" pill={false} icon={<Plus size={18} />} onClick={() => router.push('/campaigns/new')}>
                  {t('createCampaign')}
                </GlassButton>
                <GlassButton variant="glass" className="w-full justify-start" size="md" pill={false} icon={<BarChart3 size={18} />} onClick={() => router.push('/analytics')}>
                  {t('viewAnalytics')}
                </GlassButton>
                <GlassButton variant="glass" className="w-full justify-start" size="md" pill={false} icon={<Target size={18} />} onClick={() => router.push('/leads')}>
                  {t('manageLeads')}
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Campaigns */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2">
            <GlassCard padding="lg">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-text-primary">{t('recentCampaigns')}</h3>
                <GlassButton variant="ghost" size="sm" onClick={() => router.push('/campaigns')}>Ver todas <ArrowUpRight size={14} /></GlassButton>
              </div>
              <div className="space-y-3">
                {recentCampaigns.map((campaign, i) => (
                  <motion.div key={campaign.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.05 }} className="glass-sm rounded-xl p-4 flex items-center gap-4 hover:bg-[var(--glass-bg-hover)] transition-colors cursor-pointer" onClick={() => router.push('/campaigns')}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent-secondary/10 flex items-center justify-center text-accent shrink-0">
                      <Megaphone size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{campaign.name}</p>
                      <p className="text-xs text-text-muted">{campaign.platform} Ads</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[campaign.status]}`}>
                      {campaign.status === 'active' ? 'Activa' : 'Pausada'}
                    </span>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-green-500">{campaign.roas}</p>
                      <p className="text-xs text-text-muted">{campaign.spent}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
