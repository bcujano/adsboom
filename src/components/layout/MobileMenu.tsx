'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Megaphone, BarChart3, Target, Brain,
  Zap, FileText, Users, Settings, CreditCard, Shield,
  Rocket, Menu, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function MobileMenu() {
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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
        <div className="fixed inset-0 z-[300] bg-[var(--bg-primary)]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--glass-border)]">
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

          {/* Nav items */}
          <nav className="px-4 py-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 56px)' }}>
            {items.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div className={cn(
                    'flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent'
                      : 'text-text-secondary active:bg-[var(--glass-bg-hover)]'
                  )}>
                    <span className={isActive ? 'text-accent' : 'text-text-muted'}>{item.icon}</span>
                    <span className="text-base font-medium">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
