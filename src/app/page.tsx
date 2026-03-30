'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import {
  Rocket, Zap, Brain, Target, BarChart3, ArrowRight, DollarSign,
  Megaphone, Users, TrendingUp, Shield, Sparkles, Star, Play,
  CheckCircle2, ChevronDown, Clock, Globe, MousePointer, Plus,
  Minus,
} from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { PLANS } from '@/types'

/* ============ CURSOR GLOW ============ */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return (
    <div className="pointer-events-none fixed z-0" style={{ left: pos.x - 300, top: pos.y - 300, width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)', borderRadius: '50%' }} />
  )
}

/* ============ ANIMATED COUNTER ============ */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0; const step = target / 35
        const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t) } else setCount(Math.floor(n)) }, 30)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ============ TEXT ROTATOR ============ */
function RotatingText() {
  const words = ['52 segundos', '6 plataformas', 'modo autopiloto', 'inteligencia artificial', 'cero esfuerzo']
  const [idx, setIdx] = useState(0)
  useEffect(() => { const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2500); return () => clearInterval(t) }, [])
  return (
    <AnimatePresence mode="wait">
      <motion.span key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="inline-block bg-gradient-to-r from-accent via-accent-secondary to-[#ec4899] bg-clip-text text-transparent text-shimmer bg-[length:200%_auto]">
        {words[idx]}
      </motion.span>
    </AnimatePresence>
  )
}

/* ============ MARQUEE ROW ============ */
function MarqueeRow({ direction = 'left', children }: { direction?: 'left' | 'right'; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden">
      <div className={direction === 'left' ? 'marquee-left' : 'marquee-right'} style={{ display: 'flex', width: 'max-content' }}>
        {children}{children}
      </div>
    </div>
  )
}

/* ============ AD CREATIVE CARD ============ */
function AdCard({ title, brand, platform }: { title: string; brand: string; platform: string }) {
  return (
    <div className="glass-sm rounded-2xl p-5 w-[280px] mx-3 shrink-0 hover:scale-[1.03] transition-transform">
      <div className="h-36 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 mb-3 flex items-center justify-center">
        <Megaphone size={32} className="text-accent/40" />
      </div>
      <p className="text-sm font-semibold text-text-primary truncate">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-text-muted">{brand}</span>
        <span className="text-xs glass-pill px-2 py-0.5 text-text-muted">{platform}</span>
      </div>
    </div>
  )
}

/* ============ FAQ ITEM ============ */
function FaqItem({ num, question, answer }: { num: string; question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(!open)} className="w-full glass-sm rounded-xl p-5 text-left hover:bg-[var(--glass-bg-hover)] transition-all">
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-text-muted/40">{num}</span>
        <span className="text-sm font-semibold text-text-primary flex-1">{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={18} className="text-text-muted" /></motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="text-sm text-text-secondary mt-3 ml-8 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ============ MAIN PAGE ============ */
export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -60])
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  const testimonials = [
    { name: 'Laura Méndez', role: 'CEO, Digital Growth EC', quote: 'Redujimos el CPA en un 62% en el primer mes usando el autopiloto.', rating: 5 },
    { name: 'Roberto Salazar', role: 'CMO, TechStart MX', quote: 'De 3 horas creando campañas a 52 segundos. El ROI habla por sí solo.', rating: 5 },
    { name: 'Carolina Torres', role: 'Fundadora, EcomPro CO', quote: 'El autopiloto nos ahorra $2,000 mensuales en gestión de anuncios.', rating: 5 },
    { name: 'Miguel Herrera', role: 'Director, AgenciaVIP PE', quote: 'Gestionamos 15 clientes desde AdsBoom. El hub de agencias es increíble.', rating: 5 },
    { name: 'Andrea Solís', role: 'Marketing, FreshFood EC', quote: 'Las landing pages con IA nos triplicaron la tasa de conversión.', rating: 5 },
    { name: 'Fernando López', role: 'CEO, AutoParts CL', quote: 'ROAS de 8.4x en Google Ads. La IA realmente entiende mi nicho.', rating: 5 },
    { name: 'Patricia Ramos', role: 'CMO, StyleBrand MX', quote: 'La espía de competencia nos dio ventaja real. Sabemos qué hacen todos.', rating: 5 },
    { name: 'Diego Castillo', role: 'Fundador, LearnCode AR', quote: 'Pasé de no saber nada de ads a generar $45K/mes en ventas.', rating: 5 },
    { name: 'Sofía Vargas', role: 'CEO, BeautyLab CO', quote: 'Las creatividades con Nano Banana son impresionantes, se ven profesionales.', rating: 4 },
    { name: 'Ricardo Flores', role: 'COO, TravelHub EC', quote: 'Consolidamos Meta, Google y TikTok en un solo lugar. Game changer.', rating: 5 },
  ]

  const faqs = [
    { q: '¿Cómo funciona AdsBoom?', a: 'AdsBoom usa inteligencia artificial para crear, optimizar y escalar tus campañas publicitarias. Conectas tu cuenta de Meta, Google o TikTok, la IA analiza tu negocio y genera campañas completas en segundos.' },
    { q: '¿Necesito experiencia en marketing?', a: 'No. AdsBoom fue diseñado para que cualquier emprendedor pueda crear campañas profesionales sin conocimientos técnicos. La IA se encarga de la estrategia, el copy, las imágenes y la segmentación.' },
    { q: '¿Qué plataformas publicitarias soporta?', a: 'Meta Ads (Facebook + Instagram), Google Ads (Search + Display + YouTube), TikTok Ads, LinkedIn Ads, Pinterest Ads y YouTube Ads.' },
    { q: '¿Cómo funciona la licencia única?', a: 'Pagas una sola vez y recibes acceso permanente a la plataforma con tu propia instancia. Los recursos de IA se consumen desde tus propias API keys (OpenAI, Google, etc.).' },
    { q: '¿Puedo cancelar mi suscripción?', a: 'Sí, puedes cancelar en cualquier momento desde tu panel de facturación. No hay contratos ni compromisos de permanencia.' },
    { q: '¿La IA realmente publica los anuncios?', a: 'Sí. Una vez que apruebas el contenido generado, AdsBoom publica directamente en la plataforma que elegiste usando la API oficial. No necesitas tocar el Administrador de Anuncios.' },
    { q: '¿Qué es el modo Autopiloto?', a: 'Es un sistema de reglas inteligentes que gestiona tus campañas 24/7. Si el CPC sube, pausa. Si el ROAS es alto, escala. Pruebas A/B automáticas y optimización de presupuesto continua.' },
    { q: '¿Ofrecen soporte en español?', a: 'Sí. Todo el sistema está en español y nuestro equipo de soporte habla español nativo. Atendemos desde Ecuador para toda Latinoamérica.' },
  ]

  const adCreatives = [
    { title: 'Ofertas Black Friday -50%', brand: 'FashionStore', platform: 'Meta' },
    { title: 'Aprende Marketing Digital', brand: 'LearnAcademy', platform: 'Google' },
    { title: 'Quema grasa durmiendo', brand: 'HealthSupps', platform: 'TikTok' },
    { title: 'iPhone 16 Pro — Compra ya', brand: 'TechDeals', platform: 'Meta' },
    { title: 'AirPods Max — Sin límites', brand: 'AudioPro', platform: 'Google' },
    { title: 'Hogar geriátrico premium', brand: 'CareHome', platform: 'Meta' },
    { title: 'Siente la diferencia AMIRI', brand: 'LuxBrand', platform: 'TikTok' },
    { title: 'Ray-Ban Meta Display', brand: 'MetaVision', platform: 'Meta' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CursorGlow />

      {/* Dot grid animated background */}
      <div className="fixed inset-0 dot-grid-bg pointer-events-none z-0 opacity-60" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass !rounded-none !border-t-0 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20"><Rocket size={18} className="text-white" /></div>
            <span className="text-xl font-bold text-text-primary">AdsBoom</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-muted hover:text-text-primary transition-colors">Funciones</a>
            <a href="#how" className="text-sm text-text-muted hover:text-text-primary transition-colors">Cómo Funciona</a>
            <a href="#testimonials" className="text-sm text-text-muted hover:text-text-primary transition-colors">Testimonios</a>
            <a href="#pricing" className="text-sm text-text-muted hover:text-text-primary transition-colors">Precios</a>
            <a href="#faq" className="text-sm text-text-muted hover:text-text-primary transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login"><GlassButton variant="ghost" size="sm">Iniciar sesión</GlassButton></Link>
            <Link href="/register"><GlassButton variant="gradient-blue" size="sm">Crear cuenta</GlassButton></Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <motion.section style={{ y: heroY }} className="pt-28 pb-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 glass-pill px-5 py-2 mb-6">
                <Sparkles size={14} className="text-accent" />
                <span className="text-sm font-medium text-text-secondary">Plataforma #1 de Anuncios con IA</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] mb-4">
                Campañas que venden en<br />
                <span className="h-[1.2em] inline-flex items-center"><RotatingText /></span>
              </h1>
              <p className="text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
                Crea, optimiza y escala anuncios en Meta, Google y TikTok. La IA hace el trabajo pesado. Tú obtienes los clientes.
              </p>
              <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                <Link href="/register"><GlassButton variant="gradient-red" size="lg" icon={<Rocket size={20} />}>Comenzar Gratis</GlassButton></Link>
                <GlassButton variant="glass" size="lg" icon={<Play size={18} />}>Ver Demo</GlassButton>
              </div>
              <div className="flex items-center gap-6 mt-6 text-sm text-text-muted justify-center lg:justify-start">
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Sin tarjeta</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> 2 min setup</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Soporte 24/7</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Mascot */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex-1 flex justify-center relative">
            <div className="relative" style={{ animation: 'mascot-float 6s ease-in-out infinite, mascot-glow 4s ease-in-out infinite' }}>
              <Image src="/mascot.png" alt="AdsBoom Robot Ninja" width={420} height={520} className="relative z-10" priority />
            </div>
            {/* Glow behind mascot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/15 rounded-full blur-[80px] z-0" />
          </motion.div>
        </div>
      </motion.section>

      {/* ========== HERO STATS ========== */}
      <section className="px-6 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GlassCard variant="iridescent" padding="lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: 18, suffix: '.4x', label: 'ROAS Promedio' },
                  { value: 85, suffix: '%', label: 'Ahorro de Tiempo' },
                  { value: 52, suffix: 's', label: 'Crear Campaña' },
                  { value: 6, suffix: '', label: 'Plataformas' },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"><Counter target={s.value} suffix={s.suffix} /></p>
                    <p className="text-sm text-text-muted mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ========== PAIN SECTION ========== */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Gestionar anuncios manualmente<br />
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">te cuesta caro</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
              Tú quieres vender. No aprender marketing, no pagar agencias, no vivir dentro del Administrador de Anuncios.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '14h', label: 'horas perdidas por semana gestionando anuncios', icon: <Clock size={24} /> },
              { value: '$24K', label: 'costo anual promedio de una agencia de marketing', icon: <DollarSign size={24} /> },
              { value: '73%', label: 'de negocios pierden dinero con ads mal gestionados', icon: <TrendingUp size={24} /> },
            ].map((s, i) => (
              <motion.div key={s.value} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard padding="lg" className="text-center">
                  <div className="w-14 h-14 rounded-2xl glass-sm flex items-center justify-center text-red-400 mx-auto mb-4">{s.icon}</div>
                  <p className="text-4xl font-black text-text-primary mb-2">{s.value}</p>
                  <p className="text-sm text-text-muted">{s.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CREATIVES MARQUEE ========== */}
      <section className="py-16 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h3 className="text-center text-lg font-semibold text-text-muted mb-8">Creatividades generadas por la IA de AdsBoom</h3>
          <MarqueeRow direction="left">
            {adCreatives.map((c, i) => <AdCard key={`l-${i}`} {...c} />)}
          </MarqueeRow>
          <div className="h-4" />
          <MarqueeRow direction="right">
            {[...adCreatives].reverse().map((c, i) => <AdCard key={`r-${i}`} {...c} />)}
          </MarqueeRow>
        </motion.div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><Zap size={12} className="text-accent" /> 8 Módulos Potentes</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">Todo lo que necesitas para<br /><span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">dominar los anuncios</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Brain size={24} />, title: 'Estudio de Campañas IA', desc: 'Copy, imágenes y videos generados por IA. Publica directamente en Meta, Google y TikTok.', color: 'from-violet-500 to-purple-400' },
              { icon: <Zap size={24} />, title: 'Modo Autopiloto', desc: 'Pruebas A/B, optimización de presupuesto y reglas automáticas. La IA gestiona 24/7.', color: 'from-amber-500 to-orange-400' },
              { icon: <Target size={24} />, title: 'Constructor de Embudos', desc: 'Landing pages con IA que convierten. Formularios inteligentes y tracking automático.', color: 'from-blue-500 to-cyan-400' },
              { icon: <BarChart3 size={24} />, title: 'Suite de Inteligencia', desc: 'Espía competencia, predictor ROI y detección de fatiga. Ventaja competitiva real.', color: 'from-green-500 to-emerald-400' },
              { icon: <Users size={24} />, title: 'Lead Bridge (CRM)', desc: 'Centraliza leads. Scoring automático y pipeline visual de ventas.', color: 'from-pink-500 to-rose-400' },
              { icon: <Shield size={24} />, title: 'Hub de Agencias', desc: 'Multi-cliente, marca blanca, dominios personalizados, portal de clientes.', color: 'from-indigo-500 to-blue-400' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard padding="lg" className="h-full group hover:scale-[1.02] transition-transform">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>{f.icon}</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><MousePointer size={12} className="text-accent" /> Simple y Poderoso</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary">Campañas rentables en<br /><span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">4 pasos</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Conecta tu cuenta', desc: 'Vincula Meta, Google o TikTok con OAuth seguro en un click.' },
              { num: '02', title: 'La IA analiza tu ADN', desc: 'Tu negocio, audiencia y competencia alimentan la estrategia.' },
              { num: '03', title: 'Lanza en 52s', desc: 'Copy, imágenes, video y segmentación. Todo generado por IA.' },
              { num: '04', title: 'Autopiloto 24/7', desc: 'La IA ajusta presupuesto, creatividades y audiencias sin parar.' },
            ].map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <GlassCard padding="lg" className="h-full text-center">
                  <div className="text-5xl font-black bg-gradient-to-r from-accent/20 to-accent-secondary/10 bg-clip-text text-transparent mb-3">{s.num}</div>
                  <h3 className="text-base font-bold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary">{s.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS MARQUEE ========== */}
      <section id="testimonials" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><Star size={12} className="text-accent" /> +500 Negocios</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary">Lo que dicen nuestros <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">clientes</span></h2>
          </motion.div>
        </div>
        <MarqueeRow direction="left">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-sm rounded-2xl p-6 w-[320px] mx-3 shrink-0 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-accent text-xs font-bold">{t.name.split(' ').map(n => n[0]).join('')}</div>
                <div><p className="text-sm font-semibold text-text-primary">{t.name}</p><p className="text-xs text-text-muted">{t.role}</p></div>
              </div>
            </div>
          ))}
        </MarqueeRow>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><DollarSign size={12} className="text-accent" /> Sin Sorpresas</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">Precios simples y <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">transparentes</span></h2>
            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button onClick={() => setBillingPeriod('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'glass text-text-primary' : 'text-text-muted'}`}>Mensual</button>
              <button onClick={() => setBillingPeriod('annual')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingPeriod === 'annual' ? 'glass text-text-primary' : 'text-text-muted'}`}>
                Anual <span className="text-xs font-bold text-green-500">-17%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan, i) => {
              const isPopular = plan.tier === 'pro'
              const price = billingPeriod === 'monthly' ? plan.price_monthly : plan.price_annual
              return (
                <motion.div key={plan.tier} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                  {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><span className="px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-purple-400 shadow-lg">Más Popular</span></div>}
                  <GlassCard variant={isPopular ? 'iridescent' : 'default'} padding="lg" className={`h-full flex flex-col ${isPopular ? 'ring-2 ring-accent/30' : ''}`}>
                    <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-text-primary">${price}</span>
                      <span className="text-text-muted text-sm">{billingPeriod === 'annual' ? '/año' : '/mes'}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1 mb-5">
                      {plan.max_users === -1 ? 'Usuarios ilimitados' : `${plan.max_users} usuarios`} •{' '}
                      {plan.max_campaigns_monthly === -1 ? 'Campañas ilimitadas' : `${plan.max_campaigns_monthly} campañas/mes`}
                    </p>
                    <div className="mt-auto">
                      <Link href="/register"><GlassButton variant={isPopular ? 'gradient-purple' : 'gradient-blue'} size="md" className="w-full">{plan.tier === 'enterprise' ? 'Contactar' : 'Comenzar'}</GlassButton></Link>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Preguntas Frecuentes</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4 mb-3">¿Tienes alguna pregunta?</h2>
              <p className="text-text-secondary">Respuestas a las dudas más comunes sobre AdsBoom</p>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <FaqItem num={String(i + 1).padStart(2, '0')} question={faq.q} answer={faq.a} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <GlassCard variant="iridescent" padding="lg" className="text-center py-16">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">¿Listo para multiplicar<br />tus resultados?</h2>
              <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto">Únete a cientos de negocios que ya usan IA para vender más.</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/register"><GlassButton variant="gradient-red" size="lg" icon={<Rocket size={20} />}>Comenzar Ahora</GlassButton></Link>
                <Link href="#pricing"><GlassButton variant="glass" size="lg" icon={<DollarSign size={18} />}>Ver Precios</GlassButton></Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center"><Rocket size={16} className="text-white" /></div><span className="text-lg font-bold text-text-primary">AdsBoom</span></div>
              <p className="text-sm text-text-muted leading-relaxed">La plataforma de gestión de anuncios con IA más avanzada de Latinoamérica.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Producto</h4>
              <div className="space-y-2"><a href="#features" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Funciones</a><a href="#pricing" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Precios</a><a href="#how" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Cómo Funciona</a></div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Plataformas</h4>
              <div className="space-y-2">{['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'YouTube Ads'].map(p => <span key={p} className="block text-sm text-text-muted">{p}</span>)}</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Empresa</h4>
              <div className="space-y-2"><span className="block text-sm text-text-muted">Contacto</span><span className="block text-sm text-text-muted">Términos de Servicio</span><span className="block text-sm text-text-muted">Política de Privacidad</span></div>
            </div>
          </div>
          <div className="border-t border-[var(--glass-border-bottom)] pt-6 flex items-center justify-between text-sm text-text-muted">
            <span>© 2026 AdsBoom. Todos los derechos reservados.</span>
            <span>Powered by Emprendimientum</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
