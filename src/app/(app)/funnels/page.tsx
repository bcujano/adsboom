'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Plus, Globe, Eye, MousePointerClick, TrendingUp,
  Copy, Trash2, ExternalLink, BarChart3, Sparkles,
  Layout, Palette, Code, Loader2,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput, GlassModal } from '@/components/glass'
import { Header } from '@/components/layout/Header'

interface FunnelPage {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  visits: number
  conversions: number
  convRate: number
  campaign: string | null
  template: string
  createdAt: string
}

const mockPages: FunnelPage[] = [
  { id: '1', title: 'Black Friday Landing', slug: 'black-friday-2026', status: 'published', visits: 12400, conversions: 892, convRate: 7.2, campaign: 'Black Friday - Conversiones', template: 'Ventas', createdAt: '2026-03-15' },
  { id: '2', title: 'Webinar IA Marketing', slug: 'webinar-ia-marketing', status: 'published', visits: 5600, conversions: 423, convRate: 7.6, campaign: 'Lead Gen B2B', template: 'Webinar', createdAt: '2026-03-20' },
  { id: '3', title: 'Ebook Gratis: Guía Ads', slug: 'ebook-guia-ads', status: 'draft', visits: 0, conversions: 0, convRate: 0, campaign: null, template: 'Lead Magnet', createdAt: '2026-03-28' },
  { id: '4', title: 'Lanzamiento Producto Q2', slug: 'lanzamiento-q2', status: 'published', visits: 3200, conversions: 156, convRate: 4.9, campaign: 'Lanzamiento Producto Q1', template: 'Producto', createdAt: '2026-03-10' },
]

const templates = [
  { id: 'sales', name: 'Página de Ventas', desc: 'Hero + beneficios + testimonios + CTA', icon: <TrendingUp size={20} />, color: 'from-red-500 to-orange-400' },
  { id: 'leadmagnet', name: 'Lead Magnet', desc: 'Captura de email con descargable', icon: <MousePointerClick size={20} />, color: 'from-blue-500 to-cyan-400' },
  { id: 'webinar', name: 'Webinar/Evento', desc: 'Registro a evento con countdown', icon: <Globe size={20} />, color: 'from-purple-500 to-violet-400' },
  { id: 'product', name: 'Lanzamiento', desc: 'Producto nuevo con video y features', icon: <Sparkles size={20} />, color: 'from-amber-500 to-yellow-400' },
  { id: 'waitlist', name: 'Lista de Espera', desc: 'Pre-registro con contador social', icon: <Layout size={20} />, color: 'from-green-500 to-emerald-400' },
  { id: 'blank', name: 'En Blanco', desc: 'Empieza desde cero con IA', icon: <Code size={20} />, color: 'from-gray-500 to-gray-400' },
]

export default function FunnelsPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [newPage, setNewPage] = useState({ title: '', description: '' })

  const totalVisits = mockPages.reduce((s, p) => s + p.visits, 0)
  const totalConversions = mockPages.reduce((s, p) => s + p.conversions, 0)
  const avgConvRate = mockPages.filter((p) => p.convRate > 0).reduce((s, p) => s + p.convRate, 0) / mockPages.filter((p) => p.convRate > 0).length

  const handleCreateWithAI = () => {
    if (!newPage.title || !selectedTemplate) {
      alert('Ingresa un nombre y selecciona una plantilla')
      return
    }
    setGenerating(true)
    // TODO: Call Claude API to generate landing page HTML
    setTimeout(() => {
      setGenerating(false)
      setShowCreate(false)
      setNewPage({ title: '', description: '' })
      setSelectedTemplate('')
      // In production, this would add the page to the list
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      <Header title="Embudos" />
      <div className="p-6 lg:p-8 space-y-8">
        {/* Section Description */}
        <GlassCard padding="md" className="border-l-4 border-accent">
          <div className="flex items-start gap-3">
            <Layout size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Constructor de Embudos</p>
              <p className="text-xs text-text-muted mt-1">
                Crea landing pages optimizadas para conversión usando IA. Describe tu oferta, elige una plantilla y la IA genera la página completa con copy persuasivo, diseño profesional y formularios de captura. Vincula cada landing page a una campaña para trackear conversiones automáticamente.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Landing Pages', value: mockPages.length.toString(), icon: <Layout size={18} />, color: 'text-blue-500' },
            { label: 'Visitas Totales', value: totalVisits.toLocaleString(), icon: <Eye size={18} />, color: 'text-green-500' },
            { label: 'Conversiones', value: totalConversions.toLocaleString(), icon: <MousePointerClick size={18} />, color: 'text-purple-500' },
            { label: 'Tasa Promedio', value: `${avgConvRate.toFixed(1)}%`, icon: <BarChart3 size={18} />, color: 'text-amber-500' },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard padding="sm" className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl glass-sm flex items-center justify-center ${m.color}`}>{m.icon}</div>
                <div><p className="text-lg font-bold text-text-primary">{m.value}</p><p className="text-xs text-text-muted">{m.label}</p></div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Mis Landing Pages</h2>
          <GlassButton variant="gradient-blue" size="md" icon={<Plus size={18} />} onClick={() => setShowCreate(true)}>
            Nueva Landing Page
          </GlassButton>
        </div>

        {/* Pages Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {mockPages.map((page, i) => (
            <motion.div key={page.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard padding="md" className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary">{page.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${page.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                        {page.status === 'published' ? 'Publicada' : 'Borrador'}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">/{page.slug} • {page.template}</p>
                  </div>
                </div>

                {page.campaign && (
                  <p className="text-xs text-accent mb-3">Vinculada a: {page.campaign}</p>
                )}

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="glass-sm rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-text-primary">{page.visits.toLocaleString()}</p>
                    <p className="text-xs text-text-muted">Visitas</p>
                  </div>
                  <div className="glass-sm rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-text-primary">{page.conversions}</p>
                    <p className="text-xs text-text-muted">Conversiones</p>
                  </div>
                  <div className="glass-sm rounded-lg p-2 text-center">
                    <p className={`text-sm font-bold ${page.convRate >= 5 ? 'text-green-500' : 'text-text-primary'}`}>{page.convRate}%</p>
                    <p className="text-xs text-text-muted">Tasa Conv.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <GlassButton variant="glass" size="sm" className="flex-1" icon={<Palette size={14} />}>Editar</GlassButton>
                  {page.status === 'published' && (
                    <GlassButton variant="ghost" size="sm" icon={<ExternalLink size={14} />}>Ver</GlassButton>
                  )}
                  <GlassButton variant="ghost" size="sm" icon={<Copy size={14} />} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Create Modal */}
        <GlassModal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Crear Landing Page con IA" size="xl">
          <div className="space-y-5">
            <GlassInput label="Nombre de la página" placeholder="Ej: Promoción de Verano" value={newPage.title} onChange={(e) => setNewPage({ ...newPage, title: e.target.value })} />
            <GlassInput label="Describe tu oferta" placeholder="Ej: Vendo cursos de marketing digital para emprendedores..." value={newPage.description} onChange={(e) => setNewPage({ ...newPage, description: e.target.value })} />

            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">Elige una plantilla</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {templates.map((t) => (
                  <button key={t.id} onClick={() => setSelectedTemplate(t.id)} className={`glass-sm rounded-xl p-4 text-left hover:scale-[1.02] transition-all ${selectedTemplate === t.id ? 'ring-2 ring-accent bg-accent/5' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white mb-2`}>{t.icon}</div>
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <GlassButton variant="gradient-purple" size="lg" className="w-full" icon={generating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />} loading={generating} onClick={handleCreateWithAI}>
              {generating ? 'Generando con IA...' : 'Crear con IA'}
            </GlassButton>
          </div>
        </GlassModal>
      </div>
    </div>
  )
}
