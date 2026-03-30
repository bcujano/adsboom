'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Megaphone, BarChart3, Target, Brain,
  Zap, FileText, Users, Settings, CreditCard, Shield,
  ChevronLeft, ChevronDown, Rocket, Building2, Key, Server,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const t = useTranslations('nav')
  const sidebarWidth = collapsed ? 72 : 240

  // Check if any admin sub-route is active
  const isAdminActive = pathname?.startsWith('/admin')

  const renderItem = (item: { label: string; href: string; icon: React.ReactNode; badge?: string; indent?: boolean }) => {
    const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
    return (
      <Link key={item.href} href={item.href}>
        <div className={cn(
          'flex items-center gap-3 rounded-xl transition-all duration-200',
          'hover:bg-[var(--glass-bg-hover)] group',
          item.indent ? 'px-3 py-2 ml-5' : 'px-3 py-2.5',
          isActive && 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent'
        )}>
          <span className={cn('shrink-0 transition-colors', isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-primary')}>
            {item.icon}
          </span>
          {!collapsed && (
            <span className={cn('text-sm font-medium whitespace-nowrap', item.indent && 'text-xs', isActive ? 'text-accent' : 'text-text-secondary')}>
              {item.label}
            </span>
          )}
          {item.badge && !collapsed && (
            <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white">
              {item.badge}
            </span>
          )}
        </div>
      </Link>
    )
  }

  return (
    <aside
      style={{ width: sidebarWidth }}
      className="sticky top-0 h-screen shrink-0 hidden lg:flex flex-col glass border-r border-[var(--glass-border)] !rounded-none transition-all duration-300 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shrink-0">
          <Rocket size={18} className="text-white" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-text-primary whitespace-nowrap">AdsBoom</span>}
      </div>

      {/* All nav items — one continuous block */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {/* Section label */}
        {!collapsed && <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">Principal</p>}

        {renderItem({ label: t('dashboard'), href: '/dashboard', icon: <LayoutDashboard size={18} /> })}
        {renderItem({ label: t('campaigns'), href: '/campaigns', icon: <Megaphone size={18} /> })}
        {renderItem({ label: t('intelligence'), href: '/intelligence', icon: <Brain size={18} /> })}
        {renderItem({ label: t('autopilot'), href: '/autopilot', icon: <Zap size={18} />, badge: 'AI' })}
        {renderItem({ label: t('funnels'), href: '/funnels', icon: <Target size={18} /> })}
        {renderItem({ label: t('analytics'), href: '/analytics', icon: <BarChart3 size={18} /> })}
        {renderItem({ label: t('leads'), href: '/leads', icon: <Users size={18} /> })}
        {renderItem({ label: t('reports'), href: '/reports', icon: <FileText size={18} /> })}

        {/* Admin with expandable sub-items */}
        {!collapsed && <p className="px-3 pt-4 pb-1 text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">Admin</p>}

        <button
          onClick={() => setAdminOpen(!adminOpen)}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200',
            'hover:bg-[var(--glass-bg-hover)] group',
            isAdminActive && 'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent'
          )}
        >
          <span className={cn('shrink-0', isAdminActive ? 'text-accent' : 'text-text-muted group-hover:text-text-primary')}>
            <Shield size={18} />
          </span>
          {!collapsed && (
            <>
              <span className={cn('text-sm font-medium whitespace-nowrap flex-1 text-left', isAdminActive ? 'text-accent' : 'text-text-secondary')}>
                Admin
              </span>
              <ChevronDown size={14} className={cn('text-text-muted transition-transform duration-200', adminOpen && 'rotate-180')} />
            </>
          )}
        </button>

        {/* Admin sub-items */}
        {adminOpen && !collapsed && (
          <div className="space-y-0.5">
            {renderItem({ label: 'Resumen', href: '/admin', icon: <BarChart3 size={16} />, indent: true })}
            {renderItem({ label: 'Organizaciones', href: '/admin/tenants', icon: <Building2 size={16} />, indent: true })}
            {renderItem({ label: 'Pagos y Revenue', href: '/admin/payments', icon: <CreditCard size={16} />, indent: true })}
            {renderItem({ label: 'Licencias', href: '/admin/licenses', icon: <Key size={16} />, indent: true })}
            {renderItem({ label: 'Usuarios', href: '/admin/users', icon: <Users size={16} />, indent: true })}
            {renderItem({ label: 'Sistema', href: '/admin/system', icon: <Server size={16} />, indent: true })}
          </div>
        )}

        {/* Config section */}
        {!collapsed && <p className="px-3 pt-4 pb-1 text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">Configuración</p>}

        {renderItem({ label: t('billing'), href: '/billing', icon: <CreditCard size={18} /> })}
        {renderItem({ label: t('settings'), href: '/settings', icon: <Settings size={18} /> })}
      </nav>

      {/* Collapse button */}
      <div className="px-2 py-2 shrink-0">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full hover:bg-[var(--glass-bg-hover)] transition-all">
          <span className={`shrink-0 text-text-muted transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
            <ChevronLeft size={18} />
          </span>
          {!collapsed && <span className="text-sm text-text-muted whitespace-nowrap">{t('collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}
