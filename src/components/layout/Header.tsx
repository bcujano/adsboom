'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Globe, LogOut, User, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/components/providers/AuthProvider'
import { getInitials } from '@/lib/utils'

interface HeaderProps {
  title?: string
}

export function Header({ title }: HeaderProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [locale, setLocale] = useState('es')
  const menuRef = useRef<HTMLDivElement>(null)
  const displayName = user?.user_metadata?.full_name || user?.email || 'User'

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLanguageToggle = () => {
    const next = locale === 'es' ? 'en' : 'es'
    setLocale(next)
    document.cookie = `locale=${next};path=/;max-age=31536000`
    window.location.reload()
  }

  const handleLogout = async () => {
    setShowUserMenu(false)
    if (signOut) {
      await signOut()
    }
    router.push('/login')
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-8">
      {/* Title */}
      <div>
        {title && (
          <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <button
          onClick={handleLanguageToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-sm text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
          title="Cambiar idioma"
        >
          <Globe size={14} />
          <span className="uppercase">{locale}</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-[var(--glass-bg-hover)] transition-colors text-text-muted hover:text-text-primary"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
        </button>

        {/* User Menu */}
        <div className="relative ml-1" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full glass-sm hover:bg-[var(--glass-bg-hover)] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{getInitials(displayName)}</span>
            </div>
            <span className="text-sm font-medium text-text-primary hidden md:block max-w-[120px] truncate">
              {displayName}
            </span>
            <ChevronDown size={14} className="text-text-muted" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 glass rounded-xl p-1.5 shadow-xl z-50">
              <button
                onClick={() => { setShowUserMenu(false); router.push('/settings') }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:bg-[var(--glass-bg-hover)] hover:text-text-primary transition-colors text-left"
              >
                <User size={16} /> Mi Perfil
              </button>
              <div className="my-1 border-t border-[var(--glass-border)]" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
              >
                <LogOut size={16} /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
