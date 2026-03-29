'use client'

import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  icon?: React.ReactNode
}

export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ className, label, error, options, icon, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-text-secondary mb-1.5 ml-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted z-10">
              {icon}
            </span>
          )}
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full glass-pill px-5 py-3 text-sm appearance-none cursor-pointer',
              'text-text-primary bg-transparent',
              'focus:outline-none focus:ring-2 focus:ring-accent/40',
              'transition-all duration-200',
              icon && 'pl-11',
              'pr-11',
              error && 'ring-2 ring-error/50',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-bg-secondary text-text-primary">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
        {error && (
          <p className="mt-1.5 ml-1 text-xs text-error">{error}</p>
        )}
      </div>
    )
  }
)

GlassSelect.displayName = 'GlassSelect'
