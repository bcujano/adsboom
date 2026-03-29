'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser, Session } from '@supabase/supabase-js'

// Dev mode: bypass Supabase when credentials are placeholder
const isDevMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co'

// Mock user for development
const DEV_USER = {
  id: 'dev-superadmin-001',
  email: 'admin@adsboom.dev',
  user_metadata: {
    full_name: 'Admin AdsBoom',
  },
  app_metadata: { role: 'superadmin' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as unknown as SupabaseUser

interface AuthContextType {
  user: SupabaseUser | null
  session: Session | null
  loading: boolean
  isDevMode: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDevMode) {
      // Dev mode: check localStorage for dev session
      const devSession = localStorage.getItem('adsboom-dev-session')
      if (devSession) {
        setUser(DEV_USER)
      }
      setLoading(false)
      return
    }

    // Production: use Supabase
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (isDevMode) {
      // Dev mode: any credentials work
      localStorage.setItem('adsboom-dev-session', 'true')
      setUser({ ...DEV_USER, email, user_metadata: { full_name: email.split('@')[0] } } as unknown as SupabaseUser)
      return { error: null }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error ? new Error(error.message) : null }
  }, [])

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    if (isDevMode) {
      localStorage.setItem('adsboom-dev-session', 'true')
      setUser({ ...DEV_USER, email, user_metadata: { full_name: fullName } } as unknown as SupabaseUser)
      return { error: null }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    return { error: error ? new Error(error.message) : null }
  }, [])

  const signOut = useCallback(async () => {
    if (isDevMode) {
      localStorage.removeItem('adsboom-dev-session')
      setUser(null)
      return
    }

    const supabase = createClient()
    await supabase.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, loading, isDevMode, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
