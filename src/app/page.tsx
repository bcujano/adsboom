'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import {
  Rocket, Zap, Brain, Target, BarChart3, ArrowRight, DollarSign,
  Megaphone, Users, TrendingUp, Shield, Globe, Sparkles,
  ChevronRight, Star, Play, CheckCircle2, MousePointer,
} from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useTranslations } from 'next-intl'

// Cursor glow effect component
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const handleLeave = () => setVisible(false)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed z-0 transition-opacity duration-300"
      style={{
        left: pos.x - 300,
        top: pos.y - 300,
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  )
}

// Animated counter
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = target / 40
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 30)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

// Scrolling logos/brands marquee
function BrandMarquee() {
  const brands = ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Pinterest Ads', 'YouTube Ads', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads']
  return (
    <div className="overflow-hidden py-6">
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-12 whitespace-nowrap"
      >
        {brands.map((b, i) => (
          <span key={i} className="text-lg font-semibold text-text-muted/30">{b}</span>
        ))}
      </motion.div>
    </div>
  )
}

export default function LandingPage() {
  const t = useTranslations()
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  const features = [
    { icon: <Brain size={24} />, title: 'Estudio de Campañas IA', desc: 'Genera textos, imágenes y videos publicitarios con IA en segundos. Publica directamente en Meta, Google y TikTok.', color: 'from-violet-500 to-purple-400' },
    { icon: <Zap size={24} />, title: 'Modo Autopiloto', desc: 'Pruebas A/B automáticas, optimización de presupuesto y motor de reglas. La IA gestiona tus campañas 24/7.', color: 'from-amber-500 to-orange-400' },
    { icon: <Target size={24} />, title: 'Constructor de Embudos', desc: 'Landing pages con IA que convierten clics en clientes. Formularios inteligentes y tracking automático.', color: 'from-blue-500 to-cyan-400' },
    { icon: <BarChart3 size={24} />, title: 'Suite de Inteligencia', desc: 'Espía de competencia, predictor de ROI y detección de fatiga publicitaria. Ventaja competitiva real.', color: 'from-green-500 to-emerald-400' },
    { icon: <Users size={24} />, title: 'Lead Bridge (CRM)', desc: 'Centraliza leads de todas tus campañas. Scoring automático con IA y pipeline visual de ventas.', color: 'from-pink-500 to-rose-400' },
    { icon: <Shield size={24} />, title: 'Hub de Agencias', desc: 'Gestiona múltiples clientes, marca blanca, dominios personalizados y portal de clientes.', color: 'from-indigo-500 to-blue-400' },
  ]

  const testimonials = [
    { name: 'Laura Méndez', role: 'CEO, Digital Growth EC', quote: 'Redujimos el CPA en un 62% en el primer mes. La IA realmente entiende nuestro negocio.', rating: 5 },
    { name: 'Roberto Salazar', role: 'CMO, TechStart MX', quote: 'Pasamos de 3 horas creando campañas a 52 segundos. El ROI habla por sí solo.', rating: 5 },
    { name: 'Carolina Torres', role: 'Fundadora, EcomPro CO', quote: 'El autopiloto nos ahorra $2,000/mes en gestión. Es como tener un equipo de media buyers.', rating: 5 },
  ]

  const steps = [
    { num: '01', title: 'Conecta tu cuenta', desc: 'Vincula Meta, Google o TikTok en un click con OAuth seguro.' },
    { num: '02', title: 'La IA analiza tu negocio', desc: 'El ADN de tu empresa alimenta toda la estrategia publicitaria.' },
    { num: '03', title: 'Lanza en 52 segundos', desc: 'Copy, imágenes, video y segmentación. Todo generado por IA.' },
    { num: '04', title: 'Optimización automática', desc: 'El autopiloto ajusta presupuesto, creatividades y audiencias 24/7.' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CursorGlow />

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass !rounded-none !border-t-0 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20">
              <Rocket size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">AdsBoom</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-muted hover:text-text-primary transition-colors">Funciones</a>
            <a href="#how" className="text-sm text-text-muted hover:text-text-primary transition-colors">Cómo Funciona</a>
            <a href="#testimonials" className="text-sm text-text-muted hover:text-text-primary transition-colors">Testimonios</a>
            <Link href="/pricing" className="text-sm text-text-muted hover:text-text-primary transition-colors">Precios</Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <GlassButton variant="ghost" size="sm">{t('auth.login')}</GlassButton>
            </Link>
            <Link href="/register">
              <GlassButton variant="gradient-blue" size="sm">{t('auth.register')}</GlassButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="pt-28 pb-10 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 glass-pill px-5 py-2 mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">Plataforma #1 de Gestión de Anuncios con IA</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.05] mb-6">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Del </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Anuncio
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}> al </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-accent-secondary to-[#ec4899] bg-clip-text text-transparent">
                Cliente
              </motion.span>
              <br />
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-4xl md:text-5xl lg:text-6xl text-text-secondary font-medium">
                Totalmente Automatizado
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Crea, optimiza y escala campañas publicitarias en Meta, Google, TikTok y más. La IA hace el trabajo. Tú obtienes los resultados.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/register">
                <GlassButton variant="gradient-red" size="lg" icon={<Rocket size={20} />}>
                  Comenzar Gratis
                </GlassButton>
              </Link>
              <GlassButton variant="glass" size="lg" icon={<Play size={18} />}>
                Ver Demo
              </GlassButton>
            </motion.div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }} className="mt-20">
            <GlassCard variant="iridescent" padding="lg" className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: 18, suffix: '.4x', label: 'ROAS Promedio' },
                  { value: 85, suffix: '%', label: 'Ahorro de Tiempo' },
                  { value: 52, suffix: 's', label: 'Crear Campaña' },
                  { value: 6, suffix: '', label: 'Plataformas' },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + i * 0.1 }}>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* Brand Marquee */}
      <section className="relative z-10">
        <BrandMarquee />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><Zap size={12} className="text-accent" /> 8 Módulos Potentes</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">Todo lo que necesitas para<br /><span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">dominar los anuncios</span></h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">Una plataforma. Cero adivinanzas. Resultados reales.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <GlassCard padding="lg" className="h-full group hover:scale-[1.02] transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><MousePointer size={12} className="text-accent" /> Fácil de Usar</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">4 pasos para<br /><span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">campañas que venden</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <GlassCard padding="lg" className="h-full text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-accent/20 to-accent-secondary/20 bg-clip-text text-transparent mb-3">{step.num}</div>
                  <h3 className="text-base font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-6 text-xs font-medium text-text-secondary"><Star size={12} className="text-accent" /> Casos de Éxito</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary">Lo que dicen nuestros<br /><span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">clientes</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard variant="iridescent" padding="lg" className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-accent text-xs font-bold">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <GlassCard variant="iridescent" padding="lg" className="text-center py-16">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">¿Listo para multiplicar<br />tus resultados?</h2>
              <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto">Únete a cientos de negocios que ya usan IA para crear campañas que convierten.</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/register">
                  <GlassButton variant="gradient-red" size="lg" icon={<Rocket size={20} />}>Comenzar Ahora</GlassButton>
                </Link>
                <Link href="/pricing">
                  <GlassButton variant="glass" size="lg" icon={<DollarSign size={18} />}>Ver Precios</GlassButton>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-text-muted">
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Sin tarjeta de crédito</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Configuración en 2 min</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Soporte 24/7</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                  <Rocket size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary">AdsBoom</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">La plataforma de gestión de anuncios con IA más avanzada de Latinoamérica.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Producto</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Funciones</a>
                <Link href="/pricing" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Precios</Link>
                <a href="#how" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Cómo Funciona</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Plataformas</h4>
              <div className="space-y-2">
                {['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'YouTube Ads'].map((p) => (
                  <span key={p} className="block text-sm text-text-muted">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">Empresa</h4>
              <div className="space-y-2">
                <span className="block text-sm text-text-muted">Contacto</span>
                <span className="block text-sm text-text-muted">Blog</span>
                <span className="block text-sm text-text-muted">Términos de Servicio</span>
                <span className="block text-sm text-text-muted">Política de Privacidad</span>
              </div>
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
