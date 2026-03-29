'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  Building2, ShoppingBag, Users, Globe, Link2, Megaphone,
  DollarSign, ArrowRight, ArrowLeft, Check, Rocket, Sparkles,
  AtSign, Loader2, Store, Monitor, Smartphone,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput, GlassSelect } from '@/components/glass'
import type { AdPlatform } from '@/types'

const steps = [
  { title: 'Tu Negocio', icon: <Building2 size={18} /> },
  { title: 'Productos', icon: <ShoppingBag size={18} /> },
  { title: 'Cliente Ideal', icon: <Users size={18} /> },
  { title: 'Presencia Digital', icon: <Globe size={18} /> },
  { title: 'Plataformas', icon: <Megaphone size={18} /> },
  { title: 'Presupuesto', icon: <DollarSign size={18} /> },
]

const industries = [
  { value: 'ecommerce', label: 'E-commerce / Tienda en línea' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'services', label: 'Servicios profesionales' },
  { value: 'education', label: 'Educación / Cursos' },
  { value: 'health', label: 'Salud y bienestar' },
  { value: 'food', label: 'Alimentación / Restaurantes' },
  { value: 'real_estate', label: 'Bienes raíces' },
  { value: 'fashion', label: 'Moda / Belleza' },
  { value: 'tech', label: 'Tecnología' },
  { value: 'agency', label: 'Agencia de marketing' },
  { value: 'finance', label: 'Finanzas / Seguros' },
  { value: 'travel', label: 'Turismo / Viajes' },
  { value: 'other', label: 'Otro' },
]

const adPlatforms: { id: AdPlatform; name: string; color: string }[] = [
  { id: 'meta', name: 'Meta Ads (Facebook + Instagram)', color: 'from-blue-500 to-blue-600' },
  { id: 'google', name: 'Google Ads (Search + Display + YouTube)', color: 'from-red-500 to-yellow-500' },
  { id: 'tiktok', name: 'TikTok Ads', color: 'from-gray-900 to-pink-500' },
  { id: 'linkedin', name: 'LinkedIn Ads', color: 'from-blue-700 to-blue-800' },
  { id: 'pinterest', name: 'Pinterest Ads', color: 'from-red-600 to-red-700' },
  { id: 'youtube', name: 'YouTube Ads', color: 'from-red-600 to-red-500' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  const [dna, setDna] = useState({
    companyName: '',
    industry: '',
    description: '',
    websiteUrl: '',
    onlineStoreUrl: '',
    storePlatform: 'none',
    productsServices: '',
    priceRange: '',
    targetAgeMin: 25,
    targetAgeMax: 55,
    targetLocations: '',
    targetInterests: '',
    targetGender: 'all',
    socialInstagram: '',
    socialFacebook: '',
    socialTiktok: '',
    socialLinkedin: '',
    socialYoutube: '',
    monthlyAdBudget: 500,
    adPlatforms: [] as AdPlatform[],
  })

  const updateDna = (field: string, value: unknown) => {
    setDna((prev) => ({ ...prev, [field]: value }))
  }

  const togglePlatform = (id: AdPlatform) => {
    setDna((prev) => ({
      ...prev,
      adPlatforms: prev.adPlatforms.includes(id)
        ? prev.adPlatforms.filter((p) => p !== id)
        : [...prev.adPlatforms, id],
    }))
  }

  const handleFinish = () => {
    setSaving(true)
    // TODO: Save to Supabase organizations + business_dna table
    console.log('[Onboarding] Business DNA:', dna)
    setTimeout(() => {
      setSaving(false)
      router.push('/dashboard')
    }, 2000)
  }

  const canNext = () => {
    switch (step) {
      case 0: return dna.companyName.length > 0 && dna.industry.length > 0
      case 1: return dna.productsServices.length > 0
      case 2: return dna.targetLocations.length > 0
      case 3: return true
      case 4: return dna.adPlatforms.length > 0
      case 5: return true
      default: return true
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass-pill px-5 py-2 mb-4">
            <Sparkles size={14} className="text-accent" />
            <span className="text-sm font-medium text-text-secondary">Configuración Inicial</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Cuéntanos sobre tu negocio</h1>
          <p className="text-text-secondary mt-2">La IA necesita entender tu ADN para crear campañas que conviertan</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <button onClick={() => i <= step && setStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i === step ? 'glass text-text-primary' : i < step ? 'text-green-500' : 'text-text-muted'}`}>
                {i < step ? <Check size={12} /> : s.icon}
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-green-500' : 'bg-[var(--glass-border)]'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Business Info */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-lg font-bold text-text-primary mb-1">Información del Negocio</h2>
                <p className="text-sm text-text-muted mb-6">Datos básicos de tu empresa o marca</p>
                <div className="space-y-4">
                  <GlassInput label="Nombre de la empresa" placeholder="Ej: Emprendimientum" icon={<Building2 size={16} />} value={dna.companyName} onChange={(e) => updateDna('companyName', e.target.value)} required />
                  <GlassSelect label="Industria" options={industries} value={dna.industry} onChange={(e) => updateDna('industry', e.target.value)} />
                  <GlassInput label="Describe tu negocio en una frase" placeholder="Ej: Plataforma de automatización de anuncios con IA para PYMES en LATAM" value={dna.description} onChange={(e) => updateDna('description', e.target.value)} />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 1: Products/Services */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-lg font-bold text-text-primary mb-1">¿Qué vendes?</h2>
                <p className="text-sm text-text-muted mb-6">Describe tus productos o servicios principales</p>
                <div className="space-y-4">
                  <GlassInput label="Productos o servicios principales" placeholder="Ej: Cursos de marketing digital, consultoría 1:1, ebooks" icon={<ShoppingBag size={16} />} value={dna.productsServices} onChange={(e) => updateDna('productsServices', e.target.value)} required />
                  <GlassSelect label="Rango de precios" options={[
                    { value: 'free', label: 'Gratis / Freemium' },
                    { value: 'low', label: '$1 - $50' },
                    { value: 'mid', label: '$50 - $500' },
                    { value: 'high', label: '$500 - $5,000' },
                    { value: 'premium', label: 'Más de $5,000' },
                    { value: 'custom', label: 'Personalizado / Cotización' },
                  ]} value={dna.priceRange} onChange={(e) => updateDna('priceRange', e.target.value)} />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 2: Target Audience */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-lg font-bold text-text-primary mb-1">¿A quién le vendes?</h2>
                <p className="text-sm text-text-muted mb-6">Define tu cliente ideal para que la IA sepa a quién dirigirse</p>
                <div className="space-y-4">
                  <GlassInput label="Ubicaciones objetivo" placeholder="Ej: Ecuador, Colombia, México, Estados Unidos" icon={<Globe size={16} />} value={dna.targetLocations} onChange={(e) => updateDna('targetLocations', e.target.value)} required />
                  <div className="grid grid-cols-2 gap-3">
                    <GlassInput label="Edad mínima" type="number" value={dna.targetAgeMin.toString()} onChange={(e) => updateDna('targetAgeMin', +e.target.value)} />
                    <GlassInput label="Edad máxima" type="number" value={dna.targetAgeMax.toString()} onChange={(e) => updateDna('targetAgeMax', +e.target.value)} />
                  </div>
                  <GlassSelect label="Género" options={[
                    { value: 'all', label: 'Todos' },
                    { value: 'male', label: 'Masculino' },
                    { value: 'female', label: 'Femenino' },
                  ]} value={dna.targetGender} onChange={(e) => updateDna('targetGender', e.target.value)} />
                  <GlassInput label="Intereses de tu audiencia" placeholder="Ej: marketing digital, emprendimiento, tecnología, redes sociales" icon={<Users size={16} />} value={dna.targetInterests} onChange={(e) => updateDna('targetInterests', e.target.value)} />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 3: Digital Presence */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-lg font-bold text-text-primary mb-1">Tu Presencia Digital</h2>
                <p className="text-sm text-text-muted mb-6">Sitio web, tienda en línea y redes sociales</p>
                <div className="space-y-4">
                  <GlassInput label="Sitio web" placeholder="https://tu-sitio.com" icon={<Monitor size={16} />} value={dna.websiteUrl} onChange={(e) => updateDna('websiteUrl', e.target.value)} />
                  <GlassInput label="Tienda en línea (si aplica)" placeholder="https://tu-tienda.com" icon={<Store size={16} />} value={dna.onlineStoreUrl} onChange={(e) => updateDna('onlineStoreUrl', e.target.value)} />
                  <GlassSelect label="Plataforma de tienda" options={[
                    { value: 'none', label: 'No tengo tienda en línea' },
                    { value: 'shopify', label: 'Shopify' },
                    { value: 'woocommerce', label: 'WooCommerce' },
                    { value: 'custom', label: 'Desarrollo propio / Otra' },
                  ]} value={dna.storePlatform} onChange={(e) => updateDna('storePlatform', e.target.value)} />
                  <div className="border-t border-[var(--glass-border-bottom)] pt-4">
                    <p className="text-sm font-medium text-text-secondary mb-3">Redes Sociales</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <GlassInput placeholder="@tu_instagram" icon={<AtSign size={16} />} value={dna.socialInstagram} onChange={(e) => updateDna('socialInstagram', e.target.value)} />
                      <GlassInput placeholder="facebook.com/tu-pagina" icon={<Globe size={16} />} value={dna.socialFacebook} onChange={(e) => updateDna('socialFacebook', e.target.value)} />
                      <GlassInput placeholder="@tu_tiktok" icon={<Smartphone size={16} />} value={dna.socialTiktok} onChange={(e) => updateDna('socialTiktok', e.target.value)} />
                      <GlassInput placeholder="linkedin.com/company/tu-empresa" icon={<Link2 size={16} />} value={dna.socialLinkedin} onChange={(e) => updateDna('socialLinkedin', e.target.value)} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 4: Ad Platforms */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-lg font-bold text-text-primary mb-1">¿Dónde quieres anunciar?</h2>
                <p className="text-sm text-text-muted mb-6">Selecciona las plataformas donde publicarás campañas</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {adPlatforms.map((p) => {
                    const isSelected = dna.adPlatforms.includes(p.id)
                    return (
                      <button key={p.id} onClick={() => togglePlatform(p.id)} className={`glass-sm rounded-xl p-4 flex items-center gap-3 text-left transition-all hover:scale-[1.01] ${isSelected ? 'ring-2 ring-accent bg-accent/5' : ''}`}>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {p.name.slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium text-text-primary flex-1">{p.name}</span>
                        {isSelected && <Check size={18} className="text-accent" />}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-text-muted mt-4">Podrás vincular tus cuentas publicitarias después en Configuración → Cuentas Vinculadas</p>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 5: Budget */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <GlassCard variant="iridescent" padding="lg">
                <h2 className="text-lg font-bold text-text-primary mb-1">Presupuesto Publicitario</h2>
                <p className="text-sm text-text-muted mb-6">¿Cuánto planeas invertir mensualmente en publicidad?</p>
                <div className="space-y-4">
                  <GlassSelect label="Presupuesto mensual aproximado (USD)" options={[
                    { value: '100', label: '$100 - $500' },
                    { value: '500', label: '$500 - $1,000' },
                    { value: '1000', label: '$1,000 - $5,000' },
                    { value: '5000', label: '$5,000 - $10,000' },
                    { value: '10000', label: '$10,000 - $50,000' },
                    { value: '50000', label: 'Más de $50,000' },
                  ]} value={dna.monthlyAdBudget.toString()} onChange={(e) => updateDna('monthlyAdBudget', +e.target.value)} icon={<DollarSign size={16} />} />
                </div>

                {/* Summary */}
                <div className="glass-sm rounded-xl p-5 mt-6">
                  <p className="text-sm font-semibold text-text-primary mb-3">Resumen de tu ADN de Negocio</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div><span className="text-text-muted">Empresa:</span> <span className="text-text-primary ml-1">{dna.companyName || '—'}</span></div>
                    <div><span className="text-text-muted">Industria:</span> <span className="text-text-primary ml-1">{industries.find((i) => i.value === dna.industry)?.label || '—'}</span></div>
                    <div><span className="text-text-muted">Productos:</span> <span className="text-text-primary ml-1">{dna.productsServices?.slice(0, 40) || '—'}{dna.productsServices?.length > 40 ? '...' : ''}</span></div>
                    <div><span className="text-text-muted">Audiencia:</span> <span className="text-text-primary ml-1">{dna.targetAgeMin}-{dna.targetAgeMax} años</span></div>
                    <div><span className="text-text-muted">Ubicación:</span> <span className="text-text-primary ml-1">{dna.targetLocations?.slice(0, 30) || '—'}</span></div>
                    <div><span className="text-text-muted">Plataformas:</span> <span className="text-text-primary ml-1">{dna.adPlatforms.join(', ') || '—'}</span></div>
                  </div>
                </div>

                <GlassButton variant="gradient-red" size="lg" className="w-full mt-6" icon={saving ? <Loader2 size={20} className="animate-spin" /> : <Rocket size={20} />} loading={saving} onClick={handleFinish}>
                  {saving ? 'Guardando tu perfil...' : 'Completar y Entrar a AdsBoom'}
                </GlassButton>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <GlassButton variant="ghost" size="md" icon={<ArrowLeft size={16} />} onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}>
            Anterior
          </GlassButton>
          {step < 5 && (
            <GlassButton variant="gradient-blue" size="md" icon={<ArrowRight size={16} />} onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}>
              Siguiente
            </GlassButton>
          )}
        </div>
      </div>
    </div>
  )
}
