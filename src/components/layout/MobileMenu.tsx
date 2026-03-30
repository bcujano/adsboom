'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Megaphone, BarChart3, Target, Brain,
  Zap, FileText, Users, Settings, CreditCard, Shield,
  Rocket, Menu, X, Globe, Sun, Moon, LogOut, ChevronDown,
  Building2, Key, Server,
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
  const [adminOpen, setAdminOpen] = useState(false)
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

  // Listen for open event from Header hamburger button
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-mobile-menu', handler)
    return () => window.removeEventListener('open-mobile-menu', handler)
  }, [])

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

  const mainItems = [
    { label: t('dashboard'), href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: t('campaigns'), href: '/campaigns', icon: <Megaphone size={20} /> },
    { label: t('intelligence'), href: '/intelligence', icon: <Brain size={20} /> },
    { label: t('autopilot'), href: '/autopilot', icon: <Zap size={20} /> },
    { label: t('funnels'), href: '/funnels', icon: <Target size={20} /> },
    { label: t('analytics'), href: '/analytics', icon: <BarChart3 size={20} /> },
    { label: t('leads'), href: '/leads', icon: <Users size={20} /> },
    { label: t('reports'), href: '/reports', icon: <FileText size={20} /> },
  ]

  const adminSubItems = [
    { label: 'Resumen', href: '/admin', icon: <BarChart3 size={18} /> },
    { label: 'Organizaciones', href: '/admin/tenants', icon: <Building2 size={18} /> },
    { label: 'Pagos y Revenue', href: '/admin/payments', icon: <CreditCard size={18} /> },
    { label: 'Licencias', href: '/admin/licenses', icon: <Key size={18} /> },
    { label: 'Usuarios', href: '/admin/users', icon: <Users size={18} /> },
    { label: 'Sistema', href: '/admin/system', icon: <Server size={18} /> },
  ]

  const configItems = [
    { label: t('billing'), href: '/billing', icon: <CreditCard size={20} /> },
    { label: t('settings'), href: '/settings', icon: <Settings size={20} /> },
  ]

  const isAdminActive = pathname?.startsWith('/admin')

  return (
    <div className="lg:hidden">
      {/* Hamburger button is now rendered by Header, not here */}

      {/* Fullscreen overlay */}
      {open && (
        <div className="fixed inset-0 z-[300] bg-[var(--bg-primary)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-14 shrink-0">
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

          {/* User info — glass card instead of border */}
          <div className="mx-4 mb-3 px-4 py-3 glass-sm rounded-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-white">{displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{displayName}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
            {/* Section: Principal */}
            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">Principal</p>
            {mainItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                    isActive ? 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent' : 'text-text-secondary active:bg-[var(--glass-bg-hover)]'
                  )}>
                    <span className={isActive ? 'text-accent' : 'text-text-muted'}>{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              )
            })}

            {/* Section: Admin with expandable */}
            <p className="px-4 pt-4 pb-1 text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">Admin</p>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all w-full',
                isAdminActive ? 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent' : 'text-text-secondary active:bg-[var(--glass-bg-hover)]'
              )}
            >
              <span className={isAdminActive ? 'text-accent' : 'text-text-muted'}><Shield size={20} /></span>
              <span className="text-sm font-medium flex-1 text-left">Admin</span>
              <ChevronDown size={16} className={cn('text-text-muted transition-transform duration-200', adminOpen && 'rotate-180')} />
            </button>
            {adminOpen && (
              <div className="space-y-0.5 ml-4">
                {adminSubItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                      <div className={cn(
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all',
                        isActive ? 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent' : 'text-text-secondary active:bg-[var(--glass-bg-hover)]'
                      )}>
                        <span className={isActive ? 'text-accent' : 'text-text-muted'}>{item.icon}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Section: Config */}
            <p className="px-4 pt-4 pb-1 text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">Configuración</p>
            {configItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                    isActive ? 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent' : 'text-text-secondary active:bg-[var(--glass-bg-hover)]'
                  )}>
                    <span className={isActive ? 'text-accent' : 'text-text-muted'}>{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions — glass cards instead of borders */}
          <div className="px-4 py-3 space-y-2 shrink-0">
            <div className="flex items-center gap-2">
              <button onClick={handleLanguageToggle} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass-sm text-sm text-text-secondary active:bg-[var(--glass-bg-hover)]">
                <Globe size={16} />
                <span>{locale === 'es' ? 'English' : 'Español'}</span>
              </button>
              <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass-sm text-sm text-text-secondary active:bg-[var(--glass-bg-hover)]">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
              </button>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl glass-sm text-sm text-red-400 active:bg-red-500/10">
              <LogOut size={16} />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
