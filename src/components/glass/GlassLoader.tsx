'use client'

import { cn } from '@/lib/utils'

interface GlassLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'glass-loader-orb-sm',
  md: '',
  lg: 'glass-loader-orb-lg',
}

export function GlassLoader({
  size = 'md',
  text,
  fullScreen = false,
  className,
}: GlassLoaderProps) {
  const loader = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className={cn('glass-loader-orb', sizeClasses[size])} />
      {text && (
        <p className="text-sm text-text-muted animate-pulse">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm">
        {loader}
      </div>
    )
  }

  return loader
}

// Skeleton variant for content loading
export function GlassSkeleton({
  className,
  lines = 3,
}: {
  className?: string
  lines?: number
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="glass-skeleton h-4"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </div>
  )
}
