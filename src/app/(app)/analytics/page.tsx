'use client'

import { motion } from 'motion/react'
import {
  BarChart3, TrendingUp, DollarSign, MousePointerClick, Eye,
  Target, ArrowUpRight, ArrowDownRight, Calendar, Download,
} from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { Header } from '@/components/layout/Header'

const overviewMetrics = [
  { label: 'Impresiones', value: '284,500', change: '+12.4%', positive: true, icon: <Eye size={18} /> },
  { label: 'Clicks', value: '8,420', change: '+8.2%', positive: true, icon: <MousePointerClick size={18} /> },
  { label: 'Conversiones', value: '241', change: '+22.1%', positive: true, icon: <Target size={18} /> },
  { label: 'Gasto Total', value: '$1,878', change: '+5.3%', positive: true, icon: <DollarSign size={18} /> },
  { label: 'ROAS', value: '5.2x', change: '+0.8x', positive: true, icon: <TrendingUp size={18} /> },
  { label: 'CTR', value: '2.96%', change: '-0.1%', positive: false, icon: <BarChart3 size={18} /> },
]

const channelPerformance = [
  { channel: 'Meta Ads', impressions: 145000, clicks: 4800, conversions: 128, spend: 890, roas: 5.8, color: 'from-blue-500 to-blue-600' },
  { channel: 'Google Ads', impressions: 89000, clicks: 2100, conversions: 72, spend: 612, roas: 4.2, color: 'from-red-500 to-yellow-500' },
  { channel: 'TikTok Ads', impressions: 42000, clicks: 1320, conversions: 28, spend: 226, roas: 3.1, color: 'from-gray-800 to-pink-500' },
  { channel: 'LinkedIn Ads', impressions: 8500, clicks: 200, conversions: 13, spend: 150, roas: 6.2, color: 'from-blue-700 to-blue-800' },
]

const funnelStages = [
  { stage: 'Impresiones', value: 284500, percent: 100 },
  { stage: 'Clicks', value: 8420, percent: 3.0 },
  { stage: 'Landing Page', value: 6120, percent: 2.2 },
  { stage: 'Lead/Formulario', value: 1840, percent: 0.65 },
  { stage: 'Conversión', value: 241, percent: 0.08 },
]

const topCampaigns = [
  { name: 'Retargeting Carrito', roas: 7.2, spend: 178.90, conversions: 67, trend: 'up' },
  { name: 'Black Friday - Conversiones', roas: 4.8, spend: 342.50, conversions: 89, trend: 'up' },
  { name: 'Lead Gen B2B', roas: 5.1, spend: 595.00, conversions: 28, trend: 'stable' },
  { name: 'Lanzamiento Producto Q1', roas: 3.2, spend: 612.00, conversions: 42, trend: 'down' },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <Header title="Analítica" />
      <div className="p-6 lg:p-8 space-y-8">
        {/* Section Description */}
        <GlassCard padding="md" className="border-l-4 border-accent">
          <div className="flex items-start gap-3">
            <BarChart3 size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Analítica Avanzada</p>
              <p className="text-xs text-text-muted mt-1">
                Métricas en tiempo real de todas tus campañas. Visualiza el rendimiento por canal, el embudo de conversión completo, identifica las campañas más rentables y exporta reportes PDF para tu equipo o clientes.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Date Range + Export */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['7D', '30D', '90D', 'YTD'].map((r, i) => (
              <button key={r} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i === 1 ? 'glass text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}>{r}</button>
            ))}
          </div>
          <GlassButton variant="glass" size="sm" icon={<Download size={14} />}>Exportar PDF</GlassButton>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {overviewMetrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard padding="sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-muted">{m.icon}</span>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${m.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {m.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{m.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-text-primary">{m.value}</p>
                <p className="text-xs text-text-muted">{m.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart Area (visual bars) */}
        <GlassCard variant="iridescent" padding="lg">
          <h3 className="text-lg font-bold text-text-primary mb-4">Rendimiento por Día (Últimos 30 días)</h3>
          <div className="flex items-end gap-1 h-48">
            {Array.from({ length: 30 }, (_, i) => {
              const height = 20 + Math.random() * 80
              const isToday = i === 29
              return (
                <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.02, duration: 0.4 }} className={`flex-1 rounded-t-sm ${isToday ? 'bg-gradient-to-t from-accent to-accent-secondary' : 'bg-accent/20 hover:bg-accent/40'} transition-colors relative group`}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass-pill px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ${(Math.random() * 100 + 20).toFixed(0)}
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>Mar 1</span><span>Mar 10</span><span>Mar 20</span><span>Hoy</span>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Channel Performance */}
          <GlassCard padding="md">
            <h3 className="text-lg font-bold text-text-primary mb-4">Rendimiento por Canal</h3>
            <div className="space-y-4">
              {channelPerformance.map((ch, i) => {
                const maxSpend = Math.max(...channelPerformance.map((c) => c.spend))
                return (
                  <motion.div key={ch.channel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${ch.color}`} />
                        <span className="text-sm font-medium text-text-primary">{ch.channel}</span>
                      </div>
                      <span className="text-sm font-bold text-accent">{ch.roas}x ROAS</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--glass-bg)] overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(ch.spend / maxSpend) * 100}%` }} transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }} className={`h-full rounded-full bg-gradient-to-r ${ch.color}`} />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-text-muted">
                      <span>${ch.spend} gastado</span>
                      <span>{ch.conversions} conv.</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>

          {/* Funnel Visualization */}
          <GlassCard padding="md">
            <h3 className="text-lg font-bold text-text-primary mb-4">Embudo de Conversión</h3>
            <div className="space-y-3">
              {funnelStages.map((stage, i) => {
                const width = i === 0 ? 100 : Math.max(15, (stage.value / funnelStages[0].value) * 100 * (i < 3 ? 10 : 30))
                return (
                  <motion.div key={stage.stage} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-28 text-right shrink-0">{stage.stage}</span>
                    <div className="flex-1 flex items-center">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(width, 100)}%` }} transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }} className="h-8 rounded-lg bg-gradient-to-r from-accent/30 to-accent-secondary/20 flex items-center px-3 min-w-fit">
                        <span className="text-xs font-bold text-text-primary whitespace-nowrap">{stage.value.toLocaleString()}</span>
                      </motion.div>
                    </div>
                    <span className="text-xs text-text-muted w-12 text-right">{stage.percent}%</span>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>
        </div>

        {/* Top Campaigns */}
        <GlassCard padding="md">
          <h3 className="text-lg font-bold text-text-primary mb-4">Top Campañas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--glass-border-bottom)]">
                  <th className="text-left py-3 px-2 text-text-muted font-medium">Campaña</th>
                  <th className="text-right py-3 px-2 text-text-muted font-medium">ROAS</th>
                  <th className="text-right py-3 px-2 text-text-muted font-medium">Gasto</th>
                  <th className="text-right py-3 px-2 text-text-muted font-medium">Conversiones</th>
                  <th className="text-right py-3 px-2 text-text-muted font-medium">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {topCampaigns.map((c) => (
                  <tr key={c.name} className="border-b border-[var(--glass-border-bottom)] last:border-0">
                    <td className="py-3 px-2 text-text-primary font-medium">{c.name}</td>
                    <td className="py-3 px-2 text-right"><span className={`font-bold ${c.roas >= 5 ? 'text-green-500' : 'text-text-primary'}`}>{c.roas}x</span></td>
                    <td className="py-3 px-2 text-right text-text-secondary">${c.spend.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right text-text-primary font-medium">{c.conversions}</td>
                    <td className="py-3 px-2 text-right">
                      {c.trend === 'up' ? <ArrowUpRight size={16} className="text-green-500 inline" /> : c.trend === 'down' ? <ArrowDownRight size={16} className="text-red-500 inline" /> : <span className="text-text-muted">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
