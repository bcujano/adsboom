'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, icon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-1.5 ml-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full glass-pill px-5 py-3 text-sm',
              'text-text-primary placeholder:text-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-accent/40',
              'transition-all duration-200',
              icon && 'pl-11',
              rightIcon && 'pr-11',
              error && 'ring-2 ring-error/50',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1.5 ml-1 text-xs text-error">{error}</p>
        )}
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'
