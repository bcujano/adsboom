'use client'

import { Bell, Globe } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/components/providers/AuthProvider'
import { getInitials } from '@/lib/utils'

interface HeaderProps {
  title?: string
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth()
  const displayName = user?.user_metadata?.full_name || user?.email || 'User'

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--glass-border)]">
      {/* Title */}
      <div>
        {title && (
          <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <button
          className="p-2 rounded-full hover:bg-[var(--glass-bg-hover)] transition-colors text-text-muted hover:text-text-primary"
          aria-label="Change language"
        >
          <Globe size={18} />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-[var(--glass-bg-hover)] transition-colors text-text-muted hover:text-text-primary"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-[var(--glass-border)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {getInitials(displayName)}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary leading-tight">
              {displayName}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
