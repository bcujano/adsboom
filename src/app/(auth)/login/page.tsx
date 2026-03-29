'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Mail, Lock, Rocket, ArrowRight } from 'lucide-react'
import { LiquidGlassCard, GlassButton, GlassInput } from '@/components/glass'
import { useAuth } from '@/components/providers/AuthProvider'
import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await signIn(email, password)
    if (authError) {
      setError(t('errorInvalidCredentials'))
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <LiquidGlassCard preset="hero" padding="lg">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <Rocket size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-text-primary">AdsBoom</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {t('loginTitle')}
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            {t('loginSubtitle')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="********"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={error}
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-accent hover:underline"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            <GlassButton
              type="submit"
              variant="gradient-blue"
              size="lg"
              loading={loading}
              className="w-full"
              icon={<ArrowRight size={18} />}
            >
              {t('login')}
            </GlassButton>
          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            {t('noAccount')}{' '}
            <Link href="/register" className="text-accent font-medium hover:underline">
              {t('register')}
            </Link>
          </p>
        </LiquidGlassCard>
      </motion.div>
    </div>
  )
}
