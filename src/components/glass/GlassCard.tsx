'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children?: React.ReactNode
  variant?: 'default' | 'sm' | 'iridescent'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = true,
  padding = 'md',
}: GlassCardProps) {
  const baseClass = variant === 'sm' ? 'glass-sm' : 'glass'
  const iridescent = variant === 'iridescent' ? 'glass-iridescent' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        baseClass,
        iridescent,
        paddingMap[padding],
        !hover && '[&]:hover:transform-none [&]:hover:bg-[var(--glass-bg)]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
