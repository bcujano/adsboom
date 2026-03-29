'use client'

import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import type { GlassStyle } from '@specy/liquid-glass'
import { cn } from '@/lib/utils'

// Lazy load - Three.js is heavy, only load when needed
const LiquidGlassComponent = lazy(() =>
  import('@specy/liquid-glass-react').then((mod) => ({
    default: mod.LiquidGlass,
  }))
)

// Presets matching the reference liquid glass images
const PRESETS = {
  card: {
    depth: 0.4,
    radius: 20,
    roughness: 0.1,
    transmission: 0.95,
    reflectivity: 0.6,
    ior: 1.5,
    dispersion: 3,
    thickness: 0.5,
    segments: 12,
    tint: null,
  } satisfies GlassStyle,
  cardSm: {
    depth: 0.3,
    radius: 14,
    roughness: 0.15,
    transmission: 0.92,
    reflectivity: 0.5,
    ior: 1.4,
    dispersion: 2,
    thickness: 0.4,
    segments: 10,
    tint: null,
  } satisfies GlassStyle,
  pill: {
    depth: 0.35,
    radius: 50,
    roughness: 0.1,
    transmission: 0.9,
    reflectivity: 0.5,
    ior: 1.45,
    dispersion: 2.5,
    thickness: 0.4,
    segments: 16,
    tint: null,
  } satisfies GlassStyle,
  hero: {
    depth: 0.5,
    radius: 24,
    roughness: 0.08,
    transmission: 0.95,
    reflectivity: 0.7,
    ior: 1.6,
    dispersion: 4,
    thickness: 0.6,
    segments: 14,
    tint: null,
  } satisfies GlassStyle,
  nav: {
    depth: 0.25,
    radius: 0,
    roughness: 0.2,
    transmission: 0.88,
    reflectivity: 0.4,
    ior: 1.3,
    dispersion: 1.5,
    thickness: 0.3,
    segments: 8,
    tint: null,
  } satisfies GlassStyle,
  sidebar: {
    depth: 0.3,
    radius: 0,
    roughness: 0.15,
    transmission: 0.9,
    reflectivity: 0.45,
    ior: 1.35,
    dispersion: 2,
    thickness: 0.4,
    segments: 8,
    tint: null,
  } satisfies GlassStyle,
  button: {
    depth: 0.3,
    radius: 50,
    roughness: 0.12,
    transmission: 0.85,
    reflectivity: 0.55,
    ior: 1.45,
    dispersion: 2,
    thickness: 0.35,
    segments: 12,
    tint: null,
  } satisfies GlassStyle,
  input: {
    depth: 0.2,
    radius: 50,
    roughness: 0.2,
    transmission: 0.9,
    reflectivity: 0.35,
    ior: 1.25,
    dispersion: 1,
    thickness: 0.25,
    segments: 10,
    tint: null,
  } satisfies GlassStyle,
} as const

export type LiquidGlassPreset = keyof typeof PRESETS

interface LiquidGlassCardProps {
  children: React.ReactNode
  preset?: LiquidGlassPreset
  glassStyle?: Partial<GlassStyle>
  className?: string
  wrapperClassName?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

// Check if WebGL is available (runs once)
let webGLSupported: boolean | null = null
function isWebGLSupported(): boolean {
  if (webGLSupported !== null) return webGLSupported
  try {
    const canvas = document.createElement('canvas')
    webGLSupported = !!(
      canvas.getContext('webgl2') || canvas.getContext('webgl')
    )
  } catch {
    webGLSupported = false
  }
  return webGLSupported
}

// CSS fallback when WebGL not available
function CSSGlassFallback({
  children,
  className,
  padding = 'md',
}: {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}) {
  return (
    <div className={cn('glass', paddingMap[padding], className)}>
      {children}
    </div>
  )
}

export function LiquidGlassCard({
  children,
  preset = 'card',
  glassStyle,
  className,
  wrapperClassName,
  padding = 'md',
}: LiquidGlassCardProps) {
  const [isClient, setIsClient] = useState(false)
  const [useWebGL, setUseWebGL] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    setUseWebGL(isWebGLSupported())
  }, [])

  // SSR or no WebGL: CSS fallback
  if (!isClient || !useWebGL) {
    return (
      <CSSGlassFallback className={cn(wrapperClassName, className)} padding={padding}>
        {children}
      </CSSGlassFallback>
    )
  }

  const mergedStyle: GlassStyle = {
    ...PRESETS[preset],
    ...glassStyle,
  }

  return (
    <div ref={containerRef} className={cn('relative', wrapperClassName)}>
      <Suspense
        fallback={
          <CSSGlassFallback className={className} padding={padding}>
            {children}
          </CSSGlassFallback>
        }
      >
        <LiquidGlassComponent
          glassStyle={mergedStyle}
          wrapperStyle={{ width: '100%', height: '100%' }}
          style={`
            .liquid-glass-content {
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div className={cn(paddingMap[padding], className)}>
            {children}
          </div>
        </LiquidGlassComponent>
      </Suspense>
    </div>
  )
}

export { PRESETS as LIQUID_GLASS_PRESETS }
