'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { GlassLoader } from '@/components/glass'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <GlassLoader fullScreen text="Loading AdsBoom..." />
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MobileMenu />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
