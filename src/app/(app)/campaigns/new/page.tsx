'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft, ArrowRight, Sparkles, Target, DollarSign,
  Image, Type, Video, Send, Check, Loader2, Globe,
  Users, Calendar,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput, GlassSelect } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import type { AdPlatform, CampaignObjective } from '@/types'

const platforms: { id: AdPlatform; name: string; gradient: string }[] = [
  { id: 'meta', name: 'Meta Ads', gradient: 'from-blue-500 to-blue-600' },
  { id: 'google', name: 'Google Ads', gradient: 'from-red-500 to-yellow-500' },
  { id: 'tiktok', name: 'TikTok Ads', gradient: 'from-gray-900 to-pink-500' },
  { id: 'linkedin', name: 'LinkedIn Ads', gradient: 'from-blue-700 to-blue-800' },
  { id: 'pinterest', name: 'Pinterest Ads', gradient: 'from-red-600 to-red-700' },
  { id: 'youtube', name: 'YouTube Ads', gradient: 'from-red-600 to-red-500' },
]

const objectives: { id: CampaignObjective; name: string; desc: string; icon: React.ReactNode }[] = [
  { id: 'traffic', name: 'Tráfico', desc: 'Llevar visitas a tu sitio web', icon: <Globe size={20} /> },
  { id: 'conversions', name: 'Conversiones', desc: 'Acciones valiosas en tu sitio', icon: <Target size={20} /> },
  { id: 'leads', name: 'Generación de Leads', desc: 'Captar información de contacto', icon: <Users size={20} /> },
  { id: 'awareness', name: 'Reconocimiento', desc: 'Aumentar visibilidad de marca', icon: <Globe size={20} /> },
  { id: 'engagement', name: 'Interacción', desc: 'Likes, comentarios, compartidos', icon: <Users size={20} /> },
  { id: 'sales', name: 'Ventas', desc: 'Vender productos directamente', icon: <DollarSign size={20} /> },
]

const steps = ['Plataforma', 'Objetivo', 'IA Creativa', 'Audiencia', 'Presupuesto', 'Revisar']

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const [campaign, setCampaign] = useState({
    name: '',
    platform: '' as AdPlatform | '',
    objective: '' as CampaignObjective | '',
    budgetDaily: 50,
    budgetTotal: 500,
    startDate: '',
    endDate: '',
    locations: 'Ecuador, Colombia, México',
    ageMin: 25,
    ageMax: 55,
    interests: 'marketing digital, emprendimiento, negocios',
  })

  const [aiContent, setAiContent] = useState({
    headlines: ['Duplica tus ventas con IA publicitaria', 'La plataforma que tus competidores no conocen', 'De $0 a $10K en 30 días con anuncios IA'],
    descriptions: ['AdsBoom automatiza toda tu publicidad digital. Crea campañas en 52 segundos y obtén un ROAS de hasta 18x. Prueba gratis hoy.'],
    cta: 'Comenzar Ahora',
    imageGenerated: true,
  })

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setStep(3)
    }, 2500)
  }

  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      router.push('/campaigns')
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      <Header title="Nueva Campaña" />
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white' : i === step ? 'bg-gradient-to-r from-accent to-accent-secondary text-white' : 'glass-sm text-text-muted'}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-text-primary font-medium' : 'text-text-muted'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-green-500' : 'bg-[var(--glass-border)]'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Platform */}
          {step === 0 && (
            <motion.div key="platform" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-xl font-bold text-text-primary mb-2">¿En qué plataforma quieres anunciar?</h2>
                <p className="text-sm text-text-muted mb-6">Selecciona la plataforma donde publicarás tu campaña</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {platforms.map((p) => (
                    <button key={p.id} onClick={() => { setCampaign({ ...campaign, platform: p.id }); setStep(1) }} className={`glass-sm rounded-xl p-5 flex flex-col items-center gap-3 hover:scale-[1.02] transition-all ${campaign.platform === p.id ? 'ring-2 ring-accent' : ''}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-bold`}>
                        {p.name.slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-text-primary">{p.name}</span>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 1: Objective */}
          {step === 1 && (
            <motion.div key="objective" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-xl font-bold text-text-primary mb-2">¿Cuál es tu objetivo?</h2>
                <p className="text-sm text-text-muted mb-6">La IA optimizará la campaña según tu objetivo</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {objectives.map((o) => (
                    <button key={o.id} onClick={() => { setCampaign({ ...campaign, objective: o.id }); setStep(2) }} className={`glass-sm rounded-xl p-5 text-left hover:scale-[1.02] transition-all ${campaign.objective === o.id ? 'ring-2 ring-accent' : ''}`}>
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3">{o.icon}</div>
                      <p className="text-sm font-semibold text-text-primary">{o.name}</p>
                      <p className="text-xs text-text-muted mt-1">{o.desc}</p>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 2: AI Creative */}
          {step === 2 && (
            <motion.div key="ai-creative" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard variant="iridescent" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white"><Sparkles size={20} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">IA Creativa</h2>
                    <p className="text-xs text-text-muted">La IA generará copy, imágenes y estrategia</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <GlassInput label="Nombre de la campaña" placeholder="Ej: Black Friday 2026" value={campaign.name} onChange={(e) => setCampaign({ ...campaign, name: e.target.value })} required />
                  <GlassInput label="Describe tu producto o servicio" placeholder="Ej: Plataforma SaaS de gestión de anuncios con IA" />
                  <GlassInput label="Tono de comunicación" placeholder="Ej: Profesional pero cercano, orientado a resultados" />
                </div>
                <div className="flex items-center gap-4">
                  <GlassButton variant="gradient-purple" size="lg" className="flex-1" icon={generating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />} loading={generating} onClick={handleGenerate}>
                    {generating ? 'Generando con IA...' : 'Generar Contenido con IA'}
                  </GlassButton>
                </div>
                {!generating && aiContent.headlines.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1"><Type size={12} /> Titulares generados</p>
                      {aiContent.headlines.map((h, i) => (
                        <div key={i} className="glass-sm rounded-lg px-4 py-2.5 mb-2 text-sm text-text-primary flex items-center gap-2">
                          <Check size={14} className="text-green-500 shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1"><Type size={12} /> Descripción</p>
                      <div className="glass-sm rounded-lg px-4 py-3 text-sm text-text-secondary">{aiContent.descriptions[0]}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="glass-sm rounded-lg px-4 py-3 flex items-center gap-2 text-sm"><Image size={16} className="text-accent" /><span className="text-text-primary">Imagen generada con Nano Banana</span></div>
                      <div className="glass-sm rounded-lg px-4 py-3 flex items-center gap-2 text-sm"><Video size={16} className="text-purple-500" /><span className="text-text-primary">Video generado con Google Veo 3</span></div>
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          )}

          {/* Step 3: Audience */}
          {step === 3 && (
            <motion.div key="audience" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-xl font-bold text-text-primary mb-6">Audiencia Objetivo</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <GlassInput label="Ubicaciones" value={campaign.locations} onChange={(e) => setCampaign({ ...campaign, locations: e.target.value })} icon={<Globe size={16} />} />
                  <GlassInput label="Intereses" value={campaign.interests} onChange={(e) => setCampaign({ ...campaign, interests: e.target.value })} icon={<Target size={16} />} />
                  <div className="grid grid-cols-2 gap-3">
                    <GlassInput label="Edad mínima" type="number" value={campaign.ageMin.toString()} onChange={(e) => setCampaign({ ...campaign, ageMin: +e.target.value })} />
                    <GlassInput label="Edad máxima" type="number" value={campaign.ageMax.toString()} onChange={(e) => setCampaign({ ...campaign, ageMax: +e.target.value })} />
                  </div>
                  <GlassSelect label="Género" options={[{ value: 'all', label: 'Todos' }, { value: 'male', label: 'Masculino' }, { value: 'female', label: 'Femenino' }]} />
                </div>
                <div className="glass-sm rounded-xl p-4 mt-4">
                  <p className="text-xs text-text-muted mb-1">Alcance estimado por IA</p>
                  <p className="text-2xl font-bold text-text-primary">1.2M — 3.8M <span className="text-sm font-normal text-text-muted">personas</span></p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <motion.div key="budget" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-xl font-bold text-text-primary mb-6">Presupuesto y Calendario</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <GlassInput label="Presupuesto diario (USD)" type="number" value={campaign.budgetDaily.toString()} onChange={(e) => setCampaign({ ...campaign, budgetDaily: +e.target.value })} icon={<DollarSign size={16} />} />
                  <GlassInput label="Presupuesto total (USD)" type="number" value={campaign.budgetTotal.toString()} onChange={(e) => setCampaign({ ...campaign, budgetTotal: +e.target.value })} icon={<DollarSign size={16} />} />
                  <GlassInput label="Fecha de inicio" type="date" value={campaign.startDate} onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })} icon={<Calendar size={16} />} />
                  <div>
                    <GlassInput label="Fecha de fin" type="date" value={campaign.endDate} onChange={(e) => setCampaign({ ...campaign, endDate: e.target.value })} icon={<Calendar size={16} />} disabled={campaign.endDate === 'indefinido'} />
                    <label className="flex items-center gap-2 mt-2 ml-1 cursor-pointer">
                      <input type="checkbox" checked={campaign.endDate === 'indefinido'} onChange={(e) => setCampaign({ ...campaign, endDate: e.target.checked ? 'indefinido' : '' })} className="rounded border-[var(--glass-border)] accent-accent" />
                      <span className="text-xs text-text-muted">Sin fecha de fin (correr indefinidamente)</span>
                    </label>
                  </div>
                </div>
                <div className="glass-sm rounded-xl p-4 mt-4 grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-xs text-text-muted">CPC Estimado</p><p className="text-lg font-bold text-text-primary">$0.45</p></div>
                  <div><p className="text-xs text-text-muted">Conv. Estimadas</p><p className="text-lg font-bold text-green-500">89-142</p></div>
                  <div><p className="text-xs text-text-muted">ROAS Estimado</p><p className="text-lg font-bold text-accent">4.2x</p></div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-xl font-bold text-text-primary mb-6">Revisar y Publicar</h2>
                <div className="space-y-4">
                  <div className="glass-sm rounded-xl p-4 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                    <div><span className="text-text-muted">Campaña:</span> <span className="text-text-primary font-medium ml-2">{campaign.name || 'Sin nombre'}</span></div>
                    <div><span className="text-text-muted">Plataforma:</span> <span className="text-text-primary font-medium ml-2">{platforms.find((p) => p.id === campaign.platform)?.name}</span></div>
                    <div><span className="text-text-muted">Objetivo:</span> <span className="text-text-primary font-medium ml-2">{objectives.find((o) => o.id === campaign.objective)?.name}</span></div>
                    <div><span className="text-text-muted">Presupuesto:</span> <span className="text-text-primary font-medium ml-2">${campaign.budgetDaily}/día — ${campaign.budgetTotal} total</span></div>
                    <div><span className="text-text-muted">Audiencia:</span> <span className="text-text-primary font-medium ml-2">{campaign.ageMin}-{campaign.ageMax} años</span></div>
                    <div><span className="text-text-muted">Ubicación:</span> <span className="text-text-primary font-medium ml-2">{campaign.locations}</span></div>
                  </div>
                  <div className="glass-sm rounded-xl p-4">
                    <p className="text-xs font-semibold text-text-muted uppercase mb-2">Contenido IA</p>
                    <p className="text-sm text-text-primary font-medium">{aiContent.headlines[0]}</p>
                    <p className="text-xs text-text-secondary mt-1">{aiContent.descriptions[0]}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <GlassButton variant="glass" size="lg" className="flex-1" onClick={() => router.push('/campaigns')}>Guardar Borrador</GlassButton>
                  <GlassButton variant="gradient-red" size="lg" className="flex-1" icon={publishing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />} loading={publishing} onClick={handlePublish}>
                    {publishing ? 'Publicando...' : 'Publicar Campaña'}
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <GlassButton variant="ghost" size="md" icon={<ArrowLeft size={16} />} onClick={() => step > 0 ? setStep(step - 1) : router.push('/campaigns')}>
            {step === 0 ? 'Cancelar' : 'Anterior'}
          </GlassButton>
          {step > 2 && step < 5 && (
            <GlassButton variant="gradient-blue" size="md" icon={<ArrowRight size={16} />} onClick={() => setStep(step + 1)}>
              Siguiente
            </GlassButton>
          )}
        </div>
      </div>
    </div>
  )
}
