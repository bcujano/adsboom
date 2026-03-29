'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Zap, Play, Pause, Plus, ArrowRight, FlaskConical,
  DollarSign, TrendingUp, Settings, Check, X, BarChart3,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassToggle } from '@/components/glass'
import { Header } from '@/components/layout/Header'

const automationRules = [
  { id: '1', name: 'Pausar si CPC > $2.00', trigger: 'CPC supera umbral', action: 'Pausar campaña', active: true, triggered: 3, campaign: 'Black Friday' },
  { id: '2', name: 'Aumentar presupuesto si ROAS > 5x', trigger: 'ROAS supera 5x', action: 'Incrementar presupuesto +20%', active: true, triggered: 7, campaign: 'Retargeting Carrito' },
  { id: '3', name: 'Alerta si frecuencia > 4', trigger: 'Frecuencia supera 4', action: 'Enviar notificación', active: false, triggered: 1, campaign: 'Brand Awareness' },
  { id: '4', name: 'Escalar campaña ganadora', trigger: 'ROAS > 3x por 3 días', action: 'Duplicar presupuesto', active: true, triggered: 2, campaign: 'Todas' },
]

const abTests = [
  {
    id: '1', name: 'Titulares - Black Friday', status: 'running' as const, campaign: 'Black Friday', daysRunning: 5,
    variants: [
      { name: 'Control', headline: 'Ofertas Black Friday -50%', ctr: 2.4, conversions: 45, confidence: 0 },
      { name: 'Variante A', headline: 'Solo hoy: Mitad de precio', ctr: 3.1, conversions: 58, confidence: 92 },
      { name: 'Variante B', headline: '🔥 Flash Sale Black Friday', ctr: 2.8, conversions: 52, confidence: 78 },
    ],
  },
  {
    id: '2', name: 'Imágenes - Retargeting', status: 'completed' as const, campaign: 'Retargeting Carrito', daysRunning: 14,
    variants: [
      { name: 'Control', headline: 'Producto sobre fondo blanco', ctr: 1.8, conversions: 22, confidence: 0 },
      { name: 'Variante A', headline: 'Producto en contexto de uso', ctr: 2.6, conversions: 34, confidence: 97 },
    ],
  },
]

const budgetSuggestions = [
  { campaign: 'Retargeting Carrito', current: 200, suggested: 340, reason: 'ROAS consistente de 7.2x en los últimos 7 días', impact: '+67 conversiones estimadas' },
  { campaign: 'Brand Awareness LATAM', current: 300, suggested: 150, reason: 'CPC alto y baja conversión. Reducir hasta optimizar creatividades.', impact: 'Ahorro de $150/día' },
  { campaign: 'Lead Gen B2B', current: 600, suggested: 750, reason: 'El CPA bajó 30% esta semana. Oportunidad de escalar.', impact: '+12 leads estimados' },
]

export default function AutopilotPage() {
  const [rules, setRules] = useState(automationRules)

  const toggleRule = (id: string) => {
    setRules(rules.map((r) => r.id === id ? { ...r, active: !r.active } : r))
  }

  return (
    <div className="min-h-screen">
      <Header title="Autopiloto" />
      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Reglas Activas', value: rules.filter((r) => r.active).length.toString(), icon: <Zap size={18} />, color: 'text-green-500' },
            { label: 'Tests A/B', value: abTests.filter((t) => t.status === 'running').length.toString(), icon: <FlaskConical size={18} />, color: 'text-purple-500' },
            { label: 'Ahorro Automático', value: '$2,340', icon: <DollarSign size={18} />, color: 'text-blue-500' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard padding="sm" className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl glass-sm flex items-center justify-center ${s.color}`}>{s.icon}</div>
                <div><p className="text-lg font-bold text-text-primary">{s.value}</p><p className="text-xs text-text-muted">{s.label}</p></div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Automation Rules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><Settings size={20} className="text-accent" /> Reglas de Automatización</h2>
              <GlassButton variant="gradient-green" size="sm" icon={<Plus size={14} />}>Nueva Regla</GlassButton>
            </div>
            <div className="space-y-3">
              {rules.map((rule, i) => (
                <motion.div key={rule.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <GlassCard padding="md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-text-primary text-sm">{rule.name}</p>
                          <span className="text-xs glass-pill px-2 py-0.5 text-text-muted">{rule.campaign}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-muted">
                          <span className="glass-pill px-2 py-0.5">Si: {rule.trigger}</span>
                          <ArrowRight size={10} />
                          <span className="glass-pill px-2 py-0.5">Entonces: {rule.action}</span>
                        </div>
                        <p className="text-xs text-text-muted mt-1.5">Activada {rule.triggered} veces</p>
                      </div>
                      <GlassToggle checked={rule.active} onChange={() => toggleRule(rule.id)} />
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* A/B Tests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><FlaskConical size={20} className="text-purple-500" /> Pruebas A/B</h2>
              <GlassButton variant="gradient-purple" size="sm" icon={<Plus size={14} />}>Nuevo Test</GlassButton>
            </div>
            <div className="space-y-4">
              {abTests.map((test, i) => (
                <motion.div key={test.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <GlassCard variant="iridescent" padding="md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-text-primary text-sm">{test.name}</p>
                        <p className="text-xs text-text-muted">{test.campaign} • {test.daysRunning} días</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${test.status === 'running' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {test.status === 'running' ? 'En curso' : 'Completado'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {test.variants.map((v, vi) => {
                        const isWinner = v.confidence >= 95
                        const isBest = v.conversions === Math.max(...test.variants.map((x) => x.conversions))
                        return (
                          <div key={vi} className={`glass-sm rounded-lg px-3 py-2 flex items-center gap-3 ${isWinner ? 'ring-1 ring-green-500/50' : ''}`}>
                            <span className="text-xs font-medium text-text-muted w-20">{v.name}</span>
                            <div className="flex-1">
                              <div className="h-2 rounded-full bg-[var(--glass-bg)] overflow-hidden">
                                <div className={`h-full rounded-full ${isBest ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-[var(--glass-border)]'}`} style={{ width: `${(v.conversions / Math.max(...test.variants.map((x) => x.conversions))) * 100}%` }} />
                              </div>
                            </div>
                            <span className="text-xs text-text-primary font-medium w-14 text-right">CTR {v.ctr}%</span>
                            <span className="text-xs text-text-primary font-medium w-10 text-right">{v.conversions}</span>
                            {v.confidence > 0 && <span className={`text-xs font-medium w-12 text-right ${v.confidence >= 95 ? 'text-green-500' : 'text-text-muted'}`}>{v.confidence}%</span>}
                          </div>
                        )
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Optimizer */}
        <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><TrendingUp size={20} className="text-blue-500" /> Optimizador de Presupuesto</h2>
          <div className="space-y-3">
            {budgetSuggestions.map((sug, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard padding="md" className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sug.suggested > sug.current ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {sug.suggested > sug.current ? <TrendingUp size={20} /> : <BarChart3 size={20} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary text-sm">{sug.campaign}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{sug.reason}</p>
                    <p className="text-xs text-accent mt-0.5">{sug.impact}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-text-muted">Actual → Sugerido</p>
                    <p className="text-sm font-bold text-text-primary">${sug.current} → <span className="text-accent">${sug.suggested}</span></p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <GlassButton variant="gradient-green" size="sm"><Check size={14} /></GlassButton>
                    <GlassButton variant="ghost" size="sm"><X size={14} /></GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
