'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  FileText, Download, Calendar, BarChart3, TrendingUp,
  Eye, Loader2, Check, Plus, Clock,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassSelect } from '@/components/glass'
import { Header } from '@/components/layout/Header'

const reportTemplates = [
  { id: 'performance', name: 'Rendimiento General', desc: 'Métricas de todas las campañas activas', icon: <BarChart3 size={20} />, color: 'from-blue-500 to-cyan-400' },
  { id: 'roi', name: 'Análisis de ROI', desc: 'Retorno por canal, campaña y período', icon: <TrendingUp size={20} />, color: 'from-green-500 to-emerald-400' },
  { id: 'audience', name: 'Audiencia e Insights', desc: 'Demografía, intereses y comportamiento', icon: <Eye size={20} />, color: 'from-purple-500 to-violet-400' },
  { id: 'executive', name: 'Resumen Ejecutivo', desc: 'Reporte de alto nivel para directivos', icon: <FileText size={20} />, color: 'from-amber-500 to-orange-400' },
]

const previousReports = [
  { id: '1', name: 'Rendimiento General - Marzo 2026', template: 'performance', createdAt: '2026-03-28', pages: 12, status: 'ready' },
  { id: '2', name: 'Análisis ROI - Q1 2026', template: 'roi', createdAt: '2026-03-25', pages: 8, status: 'ready' },
  { id: '3', name: 'Resumen Ejecutivo - Febrero', template: 'executive', createdAt: '2026-02-28', pages: 6, status: 'ready' },
  { id: '4', name: 'Audiencia Insights - Marzo', template: 'audience', createdAt: '2026-03-20', pages: 15, status: 'ready' },
]

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null)

  const handleGenerate = (templateId: string) => {
    setGenerating(templateId)
    setTimeout(() => setGenerating(null), 3000)
  }

  return (
    <div className="min-h-screen">
      <Header title="Reportes" />
      <div className="p-6 space-y-6">
        {/* Quick Generate */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">Generar Nuevo Reporte</h2>
            <div className="flex gap-2">
              <GlassSelect options={[
                { value: '7d', label: 'Últimos 7 días' },
                { value: '30d', label: 'Últimos 30 días' },
                { value: '90d', label: 'Últimos 90 días' },
                { value: 'ytd', label: 'Año actual' },
                { value: 'custom', label: 'Personalizado' },
              ]} icon={<Calendar size={16} />} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard padding="md" className="h-full flex flex-col">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white mb-3`}>{t.icon}</div>
                  <h3 className="font-semibold text-text-primary text-sm">{t.name}</h3>
                  <p className="text-xs text-text-muted mt-1 flex-1">{t.desc}</p>
                  <GlassButton variant="glass" size="sm" className="w-full mt-4" icon={generating === t.id ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />} loading={generating === t.id} onClick={() => handleGenerate(t.id)}>
                    {generating === t.id ? 'Generando...' : 'Generar PDF'}
                  </GlassButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Previous Reports */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">Reportes Anteriores</h2>
          <GlassCard padding="none">
            <div className="divide-y divide-[var(--glass-border-bottom)]">
              {previousReports.map((report, i) => (
                <motion.div key={report.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--glass-bg-hover)] transition-colors">
                  <div className="w-10 h-10 rounded-xl glass-sm flex items-center justify-center text-accent shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate">{report.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={10} />{report.createdAt}</span>
                      <span className="text-xs text-text-muted">{report.pages} páginas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 flex items-center gap-1"><Check size={10} />Listo</span>
                    <GlassButton variant="glass" size="sm" icon={<Download size={14} />}>Descargar</GlassButton>
                    <GlassButton variant="ghost" size="sm" icon={<Eye size={14} />}>Ver</GlassButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Scheduled Reports */}
        <GlassCard padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2"><Clock size={20} className="text-accent" /> Reportes Programados</h3>
            <GlassButton variant="gradient-blue" size="sm" icon={<Plus size={14} />}>Programar</GlassButton>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Rendimiento Semanal', frequency: 'Cada lunes a las 9:00 AM', recipients: 'byron@emprendimientum.com', active: true },
              { name: 'Resumen Ejecutivo Mensual', frequency: 'Primer día del mes', recipients: 'equipo@emprendimientum.com', active: true },
            ].map((sched, i) => (
              <div key={i} className="glass-sm rounded-xl p-4 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{sched.name}</p>
                  <p className="text-xs text-text-muted">{sched.frequency} • {sched.recipients}</p>
                </div>
                <GlassButton variant="ghost" size="sm">Editar</GlassButton>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
