import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'AdsBoom',
    version: '0.1.0',
    checkpoint: 'FOUNDATION-CORE-SUPABASE',
    timestamp: new Date().toISOString(),
  })
}
