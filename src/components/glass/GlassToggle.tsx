'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface GlassToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function GlassToggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className,
}: GlassToggleProps) {
  const isSmall = size === 'sm'
  const trackW = isSmall ? 'w-10' : 'w-12'
  const trackH = isSmall ? 'h-5' : 'h-6'
  const thumbSize = isSmall ? 14 : 18
  const travel = isSmall ? 18 : 22

  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 rounded-full transition-colors duration-300',
          trackW,
          trackH,
          checked
            ? 'bg-gradient-to-r from-accent to-accent-secondary'
            : 'bg-[var(--glass-bg)] border border-[var(--glass-border)]'
        )}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1/2 rounded-full bg-white shadow-md"
          style={{
            width: thumbSize,
            height: thumbSize,
            y: '-50%',
            x: checked ? travel : 3,
          }}
        />
      </button>
      {label && (
        <span className="text-sm text-text-secondary">{label}</span>
      )}
    </label>
  )
}
