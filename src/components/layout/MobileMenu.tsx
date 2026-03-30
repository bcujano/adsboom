'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Megaphone, BarChart3, Target, Brain,
  Zap, FileText, Users, Settings, CreditCard, Shield,
  Rocket, Menu, X, Globe, Sun, Moon, Bell, LogOut, User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAuth } from '@/components/providers/AuthProvider'

export function MobileMenu() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('nav')
  const { theme, toggleTheme } = useTheme()
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/adsboom-locale=(\w+)/)
      return match?.[1] || 'es'
    }
    return 'es'
  })

  const displayName = user?.user_metadata?.full_name || user?.email || 'User'

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLanguageToggle = () => {
    const next = locale === 'es' ? 'en' : 'es'
    setLocale(next)
    document.cookie = `adsboom-locale=${next};path=/;max-age=31536000`
    window.location.reload()
  }

  const handleLogout = async () => {
    setOpen(false)
    if (signOut) await signOut()
    router.push('/login')
  }

  const items = [
    { label: t('dashboard'), href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: t('campaigns'), href: '/campaigns', icon: <Megaphone size={20} /> },
    { label: t('intelligence'), href: '/intelligence', icon: <Brain size={20} /> },
    { label: t('autopilot'), href: '/autopilot', icon: <Zap size={20} /> },
    { label: t('funnels'), href: '/funnels', icon: <Target size={20} /> },
    { label: t('analytics'), href: '/analytics', icon: <BarChart3 size={20} /> },
    { label: t('leads'), href: '/leads', icon: <Users size={20} /> },
    { label: t('reports'), href: '/reports', icon: <FileText size={20} /> },
    { label: 'Admin', href: '/admin', icon: <Shield size={20} /> },
    { label: t('billing'), href: '/billing', icon: <CreditCard size={20} /> },
    { label: t('settings'), href: '/settings', icon: <Settings size={20} /> },
  ]

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-[200] p-2.5 glass rounded-xl"
      >
        <Menu size={22} className="text-text-primary" />
      </button>

      {/* Fullscreen overlay */}
      {open && (
        <div className="fixed inset-0 z-[300] bg-[var(--bg-primary)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-[var(--glass-border)] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <Rocket size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-text-primary">AdsBoom</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-xl glass-sm">
              <X size={22} className="text-text-primary" />
            </button>
          </div>

          {/* User info */}
          <div className="px-4 py-3 border-b border-[var(--glass-border)] flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-white">{displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{displayName}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
            {items.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent'
                      : 'text-text-secondary active:bg-[var(--glass-bg-hover)]'
                  )}>
                    <span className={isActive ? 'text-accent' : 'text-text-muted'}>{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions: language, theme, logout */}
          <div className="px-3 py-3 border-t border-[var(--glass-border)] space-y-1 shrink-0">
            {/* Language + Theme row */}
            <div className="flex items-center gap-2 px-2">
              <button onClick={handleLanguageToggle} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass-sm text-sm text-text-secondary">
                <Globe size={16} />
                <span>{locale === 'es' ? 'English' : 'Español'}</span>
              </button>
              <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass-sm text-sm text-text-secondary">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
              </button>
            </div>

            {/* Logout */}
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 active:bg-red-500/10">
              <LogOut size={20} />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
