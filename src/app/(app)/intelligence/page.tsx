'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Brain, Eye, TrendingUp, TrendingDown, AlertTriangle,
  Search, BarChart3, Target, Zap, Shield, Loader2,
  ArrowUpRight, ArrowDownRight, Minus,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput } from '@/components/glass'
import { Header } from '@/components/layout/Header'

const competitors = [
  { name: 'Competidor A', domain: 'saleads.ai', adSpend: 12400, adCount: 45, platforms: ['Meta', 'Google'], trend: 'up' as const, change: '+23%' },
  { name: 'Competidor B', domain: 'adcreative.ai', adSpend: 28000, adCount: 120, platforms: ['Meta', 'Google', 'TikTok'], trend: 'up' as const, change: '+8%' },
  { name: 'Competidor C', domain: 'smartly.io', adSpend: 45000, adCount: 200, platforms: ['Meta', 'Google', 'LinkedIn'], trend: 'down' as const, change: '-5%' },
  { name: 'Competidor D', domain: 'adespresso.com', adSpend: 8900, adCount: 32, platforms: ['Meta'], trend: 'same' as const, change: '0%' },
]

const fatigueAlerts = [
  { campaign: 'Black Friday - Conversiones', platform: 'Meta', severity: 'high' as const, message: 'CTR cayó 42% en 7 días. La audiencia muestra fatiga. Renueva las creatividades.', metric: 'CTR: 1.2% → 0.7%' },
  { campaign: 'Brand Awareness LATAM', platform: 'TikTok', severity: 'medium' as const, message: 'Frecuencia alta (4.8x). Riesgo de fatiga en 3-5 días.', metric: 'Frecuencia: 4.8' },
  { campaign: 'Retargeting Carrito', platform: 'Meta', severity: 'low' as const, message: 'CPC aumentó 15% esta semana. Monitorear.', metric: 'CPC: $0.38 → $0.44' },
]

const severityColors = {
  high: 'border-red-500 bg-red-500/5',
  medium: 'border-amber-500 bg-amber-500/5',
  low: 'border-blue-500 bg-blue-500/5',
}

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState('spy')
  const [analyzing, setAnalyzing] = useState(false)
  const [roiInput, setRoiInput] = useState({ budget: '1000', platform: 'meta', objective: 'conversions' })
  const [roiResult, setRoiResult] = useState<{ impressions: string; clicks: string; conversions: string; roas: string; revenue: string } | null>(null)

  const handlePredict = () => {
    setAnalyzing(true)
    setTimeout(() => {
      const budget = parseFloat(roiInput.budget) || 1000
      setRoiResult({
        impressions: (budget * 45).toLocaleString(),
        clicks: (budget * 1.8).toFixed(0),
        conversions: (budget * 0.09).toFixed(0),
        roas: '4.2x',
        revenue: `$${(budget * 4.2).toLocaleString('en', { minimumFractionDigits: 2 })}`,
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Header title="Inteligencia" />
      <div className="p-6 space-y-6">
        {/* Description */}
        <GlassCard padding="md" className="border-l-4 border-accent">
          <div className="flex items-start gap-3">
            <Brain size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Suite de Inteligencia</p>
              <p className="text-xs text-text-muted mt-1">
                Analiza a tu competencia, predice el ROI de tus campañas antes de lanzarlas, y detecta cuándo tus anuncios están perdiendo efectividad.
                La IA analiza datos de mercado, tu historial de campañas y tendencias de la industria para darte ventaja competitiva.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex items-center gap-1 glass-sm rounded-xl p-1 w-fit">
          {[
            { id: 'spy', icon: <Eye size={16} />, label: 'Espía Competencia' },
            { id: 'roi', icon: <TrendingUp size={16} />, label: 'Predictor ROI' },
            { id: 'fatigue', icon: <AlertTriangle size={16} />, label: 'Fatiga Publicitaria' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'glass text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Competitor Spy */}
        {activeTab === 'spy' && <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><Eye size={20} className="text-accent" /> Espía de Competencia</h2>
              <GlassButton variant="glass" size="sm" icon={<Search size={14} />}>Analizar Nuevo</GlassButton>
            </div>
            {competitors.map((comp, i) => (
              <motion.div key={comp.domain} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard padding="md" className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass-sm flex items-center justify-center text-lg font-bold text-accent shrink-0">
                    {comp.name.split(' ')[1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-text-primary">{comp.name}</p>
                      <span className="text-xs text-text-muted">{comp.domain}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-text-muted">{comp.adCount} anuncios activos</span>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-muted">{comp.platforms.join(', ')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-primary">${comp.adSpend.toLocaleString()}/mes</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${comp.trend === 'up' ? 'text-green-500' : comp.trend === 'down' ? 'text-red-500' : 'text-text-muted'}`}>
                      {comp.trend === 'up' ? <ArrowUpRight size={12} /> : comp.trend === 'down' ? <ArrowDownRight size={12} /> : <Minus size={12} />}
                      {comp.change}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* ROI Predictor */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><BarChart3 size={20} className="text-accent" /> Predictor de ROI</h2>
            <GlassCard variant="iridescent" padding="md">
              <div className="space-y-3">
                <GlassInput label="Presupuesto (USD)" type="number" value={roiInput.budget} onChange={(e) => setRoiInput({ ...roiInput, budget: e.target.value })} icon={<Target size={16} />} />
                <GlassButton variant="gradient-purple" size="md" className="w-full" icon={analyzing ? <Loader2 size={18} className="animate-spin" /> : <Brain size={18} />} loading={analyzing} onClick={handlePredict}>
                  {analyzing ? 'Analizando...' : 'Predecir ROI con IA'}
                </GlassButton>
              </div>
              {roiResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2">
                  {[
                    { label: 'Impresiones', value: roiResult.impressions },
                    { label: 'Clicks', value: roiResult.clicks },
                    { label: 'Conversiones', value: roiResult.conversions },
                    { label: 'ROAS', value: roiResult.roas },
                    { label: 'Revenue estimado', value: roiResult.revenue },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between text-sm">
                      <span className="text-text-muted">{r.label}</span>
                      <span className="text-text-primary font-medium">{r.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>

        }

        {/* Ad Fatigue */}
        {(activeTab === 'fatigue' || activeTab === 'spy') && <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><AlertTriangle size={20} className="text-amber-500" /> Alertas de Fatiga Publicitaria</h2>
          <div className="space-y-3">
            {fatigueAlerts.map((alert, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <GlassCard padding="md" className={`border-l-4 ${severityColors[alert.severity]}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-text-primary text-sm">{alert.campaign}</p>
                        <span className="text-xs glass-pill px-2 py-0.5 text-text-muted">{alert.platform}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{alert.message}</p>
                    </div>
                    <span className="text-xs font-mono text-text-muted shrink-0 ml-4">{alert.metric}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <GlassButton variant="gradient-blue" size="sm">Renovar Creatividades</GlassButton>
                    <GlassButton variant="ghost" size="sm">Ignorar</GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>}

        {/* ROI Predictor Full (when tab selected) */}
        {activeTab === 'roi' && (
          <GlassCard variant="iridescent" padding="lg">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-2"><BarChart3 size={20} className="text-accent" /> Predictor de ROI con IA</h2>
            <p className="text-sm text-text-muted mb-6">Ingresa tu presupuesto y la IA predice los resultados basándose en datos de tu industria, historial de campañas y benchmarks del mercado.</p>
            <div className="max-w-md space-y-3">
              <GlassInput label="Presupuesto mensual (USD)" type="number" value={roiInput.budget} onChange={(e) => setRoiInput({ ...roiInput, budget: e.target.value })} icon={<Target size={16} />} />
              <GlassButton variant="gradient-purple" size="lg" className="w-full" icon={analyzing ? <Loader2 size={18} className="animate-spin" /> : <Brain size={18} />} loading={analyzing} onClick={handlePredict}>
                {analyzing ? 'Analizando con IA...' : 'Predecir ROI'}
              </GlassButton>
            </div>
            {roiResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-5 gap-4">
                {[
                  { label: 'Impresiones', value: roiResult.impressions },
                  { label: 'Clicks', value: roiResult.clicks },
                  { label: 'Conversiones', value: roiResult.conversions },
                  { label: 'ROAS', value: roiResult.roas },
                  { label: 'Revenue', value: roiResult.revenue },
                ].map((r) => (
                  <div key={r.label} className="glass-sm rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-text-primary">{r.value}</p>
                    <p className="text-xs text-text-muted mt-1">{r.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  )
}
