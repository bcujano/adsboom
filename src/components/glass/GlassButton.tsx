'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface GlassButtonProps {
  children?: React.ReactNode
  variant?: 'glass' | 'gradient-red' | 'gradient-blue' | 'gradient-green' | 'gradient-purple' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  pill?: boolean
  loading?: boolean
  icon?: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const gradientMap: Record<string, string> = {
  'gradient-red': 'var(--gradient-red-orange)',
  'gradient-blue': 'var(--gradient-blue-cyan)',
  'gradient-green': 'var(--gradient-green)',
  'gradient-purple': 'var(--gradient-purple)',
}

export function GlassButton({
  children,
  className,
  variant = 'glass',
  size = 'md',
  pill = true,
  loading = false,
  icon,
  disabled,
  type = 'button',
  onClick,
}: GlassButtonProps) {
  const isGradient = variant.startsWith('gradient-')
  const isDisabled = disabled || loading
  const roundedClass = pill ? 'rounded-full' : 'rounded-xl'

  const renderContent = () => (
    <>
      {loading ? (
        <span className="glass-loader-orb glass-loader-orb-sm" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </>
  )

  if (isGradient) {
    return (
      <motion.button
        whileHover={isDisabled ? undefined : { scale: 1.03, y: -2 }}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        className={cn(
          'btn-gradient inline-flex items-center justify-center gap-2 font-semibold text-white',
          sizeMap[size],
          roundedClass,
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        style={{ background: gradientMap[variant] }}
      >
        {renderContent()}
      </motion.button>
    )
  }

  if (variant === 'ghost') {
    return (
      <motion.button
        whileHover={isDisabled ? undefined : { scale: 1.03 }}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium',
          'text-text-secondary hover:text-text-primary',
          'bg-transparent hover:bg-[var(--glass-bg)]',
          'transition-all duration-200',
          sizeMap[size],
          roundedClass,
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {renderContent()}
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { scale: 1.03, y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={cn(
        'glass-pill inline-flex items-center justify-center gap-2 font-medium',
        'text-text-primary cursor-pointer',
        sizeMap[size],
        !pill && '!rounded-xl',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {renderContent()}
    </motion.button>
  )
}
