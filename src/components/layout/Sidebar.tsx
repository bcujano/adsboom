'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Target,
  Brain,
  Zap,
  FileText,
  Users,
  Settings,
  CreditCard,
  Shield,
  ChevronLeft,
  Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const navItems: NavItem[] = [
  { label: 'Panel', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Campañas', href: '/campaigns', icon: <Megaphone size={20} /> },
  { label: 'Inteligencia', href: '/intelligence', icon: <Brain size={20} /> },
  { label: 'Autopiloto', href: '/autopilot', icon: <Zap size={20} />, badge: 'AI' },
  { label: 'Embudos', href: '/funnels', icon: <Target size={20} /> },
  { label: 'Analítica', href: '/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Prospectos', href: '/leads', icon: <Users size={20} /> },
  { label: 'Reportes', href: '/reports', icon: <FileText size={20} /> },
]

const bottomItems: NavItem[] = [
  { label: 'Admin', href: '/admin', icon: <Shield size={20} />, badge: '⚡' },
  { label: 'Facturación', href: '/billing', icon: <CreditCard size={20} /> },
  { label: 'Configuración', href: '/settings', icon: <Settings size={20} /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-screen z-40 flex flex-col glass border-r border-[var(--glass-border)] !rounded-none"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--glass-border)]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shrink-0">
          <Rocket size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold text-text-primary whitespace-nowrap overflow-hidden"
            >
              AdsBoom
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  'hover:bg-[var(--glass-bg-hover)] group',
                  isActive &&
                    'bg-gradient-to-r from-accent/15 to-accent-secondary/10 text-accent'
                )}
              >
                <span
                  className={cn(
                    'shrink-0 transition-colors',
                    isActive
                      ? 'text-accent'
                      : 'text-text-muted group-hover:text-text-primary'
                  )}
                >
                  {item.icon}
                </span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className={cn(
                        'text-sm font-medium whitespace-nowrap overflow-hidden',
                        isActive ? 'text-accent' : 'text-text-secondary'
                      )}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !collapsed && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Items */}
      <div className="py-3 px-2 border-t border-[var(--glass-border)] space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  'hover:bg-[var(--glass-bg-hover)] group',
                  isActive && 'text-accent'
                )}
              >
                <span className="shrink-0 text-text-muted group-hover:text-text-primary">
                  {item.icon}
                </span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium text-text-secondary whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          )
        })}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full hover:bg-[var(--glass-bg-hover)] transition-all"
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="shrink-0 text-text-muted"
          >
            <ChevronLeft size={20} />
          </motion.span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-text-muted whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}
