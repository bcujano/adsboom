'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { Sidebar } from '@/components/layout/Sidebar'
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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[260px] transition-all duration-300 px-2 lg:px-6 xl:px-10">
        <div className="max-w-[1200px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
