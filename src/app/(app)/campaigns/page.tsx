'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Plus, Search, Filter, MoreHorizontal, Play, Pause,
  Megaphone, TrendingUp, Eye, MousePointerClick, DollarSign,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import type { AdPlatform, CampaignStatus } from '@/types'

interface CampaignRow {
  id: string
  name: string
  platform: AdPlatform
  status: CampaignStatus
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  roas: number
}

const platformColors: Record<AdPlatform, string> = {
  meta: 'from-blue-500 to-blue-600',
  google: 'from-red-500 to-yellow-500',
  tiktok: 'from-gray-900 to-pink-500',
  linkedin: 'from-blue-700 to-blue-800',
  pinterest: 'from-red-600 to-red-700',
  youtube: 'from-red-600 to-red-500',
}

const platformLabels: Record<AdPlatform, string> = {
  meta: 'Meta', google: 'Google', tiktok: 'TikTok',
  linkedin: 'LinkedIn', pinterest: 'Pinterest', youtube: 'YouTube',
}

const statusConfig: Record<CampaignStatus, { label: string; color: string }> = {
  draft: { label: 'Borrador', color: 'bg-gray-500/10 text-gray-500' },
  pending_review: { label: 'En revisión', color: 'bg-yellow-500/10 text-yellow-500' },
  active: { label: 'Activa', color: 'bg-green-500/10 text-green-500' },
  paused: { label: 'Pausada', color: 'bg-orange-500/10 text-orange-500' },
  completed: { label: 'Completada', color: 'bg-blue-500/10 text-blue-500' },
  failed: { label: 'Fallida', color: 'bg-red-500/10 text-red-500' },
}

const mockCampaigns: CampaignRow[] = [
  { id: '1', name: 'Black Friday - Conversiones', platform: 'meta', status: 'active', budget: 500, spent: 342.50, impressions: 45200, clicks: 1823, conversions: 89, roas: 4.8 },
  { id: '2', name: 'Lanzamiento Producto Q1', platform: 'google', status: 'active', budget: 800, spent: 612.00, impressions: 28400, clicks: 956, conversions: 42, roas: 3.2 },
  { id: '3', name: 'Brand Awareness LATAM', platform: 'tiktok', status: 'paused', budget: 300, spent: 150.00, impressions: 120000, clicks: 4500, conversions: 15, roas: 1.8 },
  { id: '4', name: 'Retargeting Carrito', platform: 'meta', status: 'active', budget: 200, spent: 178.90, impressions: 12300, clicks: 890, conversions: 67, roas: 7.2 },
  { id: '5', name: 'Campaña Navidad 2026', platform: 'google', status: 'draft', budget: 1000, spent: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0 },
  { id: '6', name: 'Lead Gen B2B', platform: 'linkedin', status: 'completed', budget: 600, spent: 595.00, impressions: 8900, clicks: 312, conversions: 28, roas: 5.1 },
]

export default function CampaignsPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = mockCampaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalSpent = mockCampaigns.reduce((s, c) => s + c.spent, 0)
  const totalConversions = mockCampaigns.reduce((s, c) => s + c.conversions, 0)
  const avgRoas = mockCampaigns.filter((c) => c.roas > 0).reduce((s, c) => s + c.roas, 0) / mockCampaigns.filter((c) => c.roas > 0).length

  return (
    <div className="min-h-screen">
      <Header title="Campañas" />
      <div className="p-6 lg:p-8 space-y-8">
        {/* Section Description */}
        <GlassCard padding="md" className="border-l-4 border-accent">
          <div className="flex items-start gap-3">
            <Megaphone size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Estudio de Campañas</p>
              <p className="text-xs text-text-muted mt-1">
                Gestiona todas tus campañas publicitarias desde un solo lugar. Crea nuevas campañas con IA, monitorea el rendimiento en tiempo real, pausa o escala según resultados. La IA optimiza automáticamente el copy, las imágenes y la segmentación.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Campañas Activas', value: mockCampaigns.filter((c) => c.status === 'active').length.toString(), icon: <Megaphone size={18} />, color: 'text-green-500' },
            { label: 'Gasto Total', value: `$${totalSpent.toLocaleString('en', { minimumFractionDigits: 2 })}`, icon: <DollarSign size={18} />, color: 'text-blue-500' },
            { label: 'Conversiones', value: totalConversions.toString(), icon: <MousePointerClick size={18} />, color: 'text-purple-500' },
            { label: 'ROAS Promedio', value: `${avgRoas.toFixed(1)}x`, icon: <TrendingUp size={18} />, color: 'text-amber-500' },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard padding="sm" className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl glass-sm flex items-center justify-center ${m.color}`}>{m.icon}</div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{m.value}</p>
                  <p className="text-xs text-text-muted">{m.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 w-full sm:w-auto">
            <GlassInput placeholder="Buscar campañas..." icon={<Search size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'active', 'paused', 'draft', 'completed'].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterStatus === s ? 'glass text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}>
                {s === 'all' ? 'Todas' : statusConfig[s as CampaignStatus]?.label}
              </button>
            ))}
          </div>
          <Link href="/campaigns/new">
            <GlassButton variant="gradient-red" size="md" icon={<Plus size={18} />}>
              Nueva Campaña
            </GlassButton>
          </Link>
        </div>

        {/* Campaign Table */}
        <GlassCard padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--glass-border-bottom)]">
                  <th className="text-left py-4 px-5 text-text-muted font-medium">Campaña</th>
                  <th className="text-left py-4 px-3 text-text-muted font-medium">Estado</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium">Presupuesto</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium">Gastado</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium hidden md:table-cell">Impresiones</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium hidden md:table-cell">Clicks</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium">Conv.</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium">ROAS</th>
                  <th className="py-4 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-[var(--glass-border-bottom)] last:border-0 hover:bg-[var(--glass-bg-hover)] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platformColors[c.platform]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {platformLabels[c.platform].slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{c.name}</p>
                          <p className="text-xs text-text-muted">{platformLabels[c.platform]} Ads</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[c.status].color}`}>
                        {statusConfig[c.status].label}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right text-text-secondary">${c.budget}</td>
                    <td className="py-3.5 px-3 text-right text-text-primary font-medium">${c.spent.toFixed(2)}</td>
                    <td className="py-3.5 px-3 text-right text-text-secondary hidden md:table-cell">{c.impressions.toLocaleString()}</td>
                    <td className="py-3.5 px-3 text-right text-text-secondary hidden md:table-cell">{c.clicks.toLocaleString()}</td>
                    <td className="py-3.5 px-3 text-right text-text-primary font-medium">{c.conversions}</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={`text-sm font-bold ${c.roas >= 3 ? 'text-green-500' : c.roas > 0 ? 'text-amber-500' : 'text-text-muted'}`}>
                        {c.roas > 0 ? `${c.roas}x` : '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1">
                        {c.status === 'active' && (
                          <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-orange-500 transition-colors"><Pause size={14} /></button>
                        )}
                        {c.status === 'paused' && (
                          <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-green-500 transition-colors"><Play size={14} /></button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-text-primary transition-colors"><Eye size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted transition-colors"><MoreHorizontal size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
