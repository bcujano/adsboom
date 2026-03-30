'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Mail, Lock, User, Rocket, ArrowRight } from 'lucide-react'
import { GlassCard, GlassButton, GlassInput } from '@/components/glass'
import { useAuth } from '@/components/providers/AuthProvider'
import { useTranslations } from 'next-intl'

export default function RegisterPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const { signUp } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 8) {
      setError(t('errorWeakPassword'))
      return
    }

    setLoading(true)
    const { error: authError } = await signUp(email, password, fullName)
    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <GlassCard variant="iridescent" padding="lg" className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">¡Cuenta creada!</h2>
            <p className="text-sm text-text-secondary mb-6">Te enviamos un correo de verificación a <strong>{email}</strong>. Revisa tu bandeja de entrada y haz click en el enlace para activar tu cuenta.</p>
            <Link href="/login"><GlassButton variant="gradient-blue" size="md" className="w-full">Ir a Iniciar Sesión</GlassButton></Link>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <GlassCard variant="iridescent" padding="lg">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <Rocket size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-text-primary">AdsBoom</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {t('registerTitle')}
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            {t('registerSubtitle')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <GlassInput
              type="text"
              label={t('fullName')}
              placeholder="John Doe"
              icon={<User size={18} />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <GlassInput
              type="email"
              label={t('email')}
              placeholder="you@company.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <GlassInput
              type="password"
              label={t('password')}
              placeholder="Min. 8 characters"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <GlassInput
              type="password"
              label={t('confirmPassword')}
              placeholder="Repeat password"
              icon={<Lock size={18} />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={error}
            />

            <GlassButton
              type="submit"
              variant="gradient-purple"
              size="lg"
              loading={loading}
              className="w-full"
              icon={<ArrowRight size={18} />}
            >
              {t('register')}
            </GlassButton>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            {t('hasAccount')}{' '}
            <Link href="/login" className="text-accent font-medium hover:underline">
              {t('login')}
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
