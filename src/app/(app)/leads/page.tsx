'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Users, Search, Filter, Plus, Mail, Phone, Star,
  ArrowUpRight, MessageCircle, MoreHorizontal, TrendingUp,
  UserCheck, UserX, Clock,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput } from '@/components/glass'
import { Header } from '@/components/layout/Header'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  score: number
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  source: string
  campaign: string
  value: number
  createdAt: string
}

const statusConfig = {
  new: { label: 'Nuevo', color: 'bg-blue-500/10 text-blue-500', icon: <Star size={12} /> },
  contacted: { label: 'Contactado', color: 'bg-amber-500/10 text-amber-500', icon: <Phone size={12} /> },
  qualified: { label: 'Calificado', color: 'bg-purple-500/10 text-purple-500', icon: <UserCheck size={12} /> },
  converted: { label: 'Convertido', color: 'bg-green-500/10 text-green-500', icon: <TrendingUp size={12} /> },
  lost: { label: 'Perdido', color: 'bg-red-500/10 text-red-500', icon: <UserX size={12} /> },
}

const mockLeads: Lead[] = [
  { id: '1', name: 'María García', email: 'maria@empresa.com', phone: '+593 99 123 4567', score: 92, status: 'qualified', source: 'Landing Page', campaign: 'Black Friday', value: 2400, createdAt: '2026-03-28' },
  { id: '2', name: 'Carlos López', email: 'carlos@startup.io', phone: '+57 300 456 7890', score: 87, status: 'contacted', source: 'Formulario Web', campaign: 'Lead Gen B2B', value: 5600, createdAt: '2026-03-27' },
  { id: '3', name: 'Ana Rodríguez', email: 'ana@negocio.ec', phone: '+593 98 765 4321', score: 95, status: 'converted', source: 'Meta Ads', campaign: 'Retargeting', value: 1200, createdAt: '2026-03-26' },
  { id: '4', name: 'Diego Martínez', email: 'diego@corp.mx', phone: '+52 55 1234 5678', score: 64, status: 'new', source: 'Google Ads', campaign: 'Brand Awareness', value: 800, createdAt: '2026-03-29' },
  { id: '5', name: 'Laura Sánchez', email: 'laura@digital.co', phone: '+57 310 987 6543', score: 78, status: 'contacted', source: 'LinkedIn Ads', campaign: 'Lead Gen B2B', value: 3400, createdAt: '2026-03-25' },
  { id: '6', name: 'Pedro Herrera', email: 'pedro@tienda.ec', phone: '+593 99 876 5432', score: 45, status: 'lost', source: 'Landing Page', campaign: 'Black Friday', value: 0, createdAt: '2026-03-22' },
  { id: '7', name: 'Sofía Vargas', email: 'sofia@agencia.pe', phone: '+51 999 888 777', score: 88, status: 'qualified', source: 'Meta Ads', campaign: 'Webinar IA', value: 4200, createdAt: '2026-03-24' },
  { id: '8', name: 'Roberto Flores', email: 'roberto@pyme.cl', phone: '+56 9 1234 5678', score: 71, status: 'new', source: 'Google Ads', campaign: 'Lanzamiento Q1', value: 1500, createdAt: '2026-03-29' },
]

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-500 bg-green-500/10' : score >= 50 ? 'text-amber-500 bg-amber-500/10' : 'text-red-500 bg-red-500/10'
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>{score}</span>
}

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = mockLeads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    return matchSearch && matchStatus
  })

  const pipelineCounts = {
    new: mockLeads.filter((l) => l.status === 'new').length,
    contacted: mockLeads.filter((l) => l.status === 'contacted').length,
    qualified: mockLeads.filter((l) => l.status === 'qualified').length,
    converted: mockLeads.filter((l) => l.status === 'converted').length,
  }

  const totalValue = mockLeads.filter((l) => l.status !== 'lost').reduce((s, l) => s + l.value, 0)

  return (
    <div className="min-h-screen">
      <Header title="Prospectos" />
      <div className="p-6 space-y-6">
        {/* Pipeline Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Nuevos', value: pipelineCounts.new, color: 'text-blue-500', icon: <Star size={16} /> },
            { label: 'Contactados', value: pipelineCounts.contacted, color: 'text-amber-500', icon: <Phone size={16} /> },
            { label: 'Calificados', value: pipelineCounts.qualified, color: 'text-purple-500', icon: <UserCheck size={16} /> },
            { label: 'Convertidos', value: pipelineCounts.converted, color: 'text-green-500', icon: <TrendingUp size={16} /> },
            { label: 'Valor Pipeline', value: `$${totalValue.toLocaleString()}`, color: 'text-accent', icon: <ArrowUpRight size={16} /> },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard padding="sm" className="text-center">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg glass-sm ${s.color} mb-1`}>{s.icon}</div>
                <p className="text-xl font-bold text-text-primary">{s.value}</p>
                <p className="text-xs text-text-muted">{s.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 w-full sm:w-auto">
            <GlassInput placeholder="Buscar prospectos..." icon={<Search size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterStatus === s ? 'glass text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}>
                {s === 'all' ? 'Todos' : statusConfig[s as keyof typeof statusConfig]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <GlassCard padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--glass-border-bottom)]">
                  <th className="text-left py-4 px-5 text-text-muted font-medium">Prospecto</th>
                  <th className="text-left py-4 px-3 text-text-muted font-medium">Estado</th>
                  <th className="text-center py-4 px-3 text-text-muted font-medium">Score</th>
                  <th className="text-left py-4 px-3 text-text-muted font-medium hidden md:table-cell">Fuente</th>
                  <th className="text-left py-4 px-3 text-text-muted font-medium hidden md:table-cell">Campaña</th>
                  <th className="text-right py-4 px-3 text-text-muted font-medium">Valor</th>
                  <th className="py-4 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-[var(--glass-border-bottom)] last:border-0 hover:bg-[var(--glass-bg-hover)] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                          {lead.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{lead.name}</p>
                          <p className="text-xs text-text-muted">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[lead.status].color}`}>
                        {statusConfig[lead.status].icon}{statusConfig[lead.status].label}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center"><ScoreBadge score={lead.score} /></td>
                    <td className="py-3.5 px-3 text-text-secondary hidden md:table-cell">{lead.source}</td>
                    <td className="py-3.5 px-3 text-text-secondary hidden md:table-cell">{lead.campaign}</td>
                    <td className="py-3.5 px-3 text-right text-text-primary font-medium">{lead.value > 0 ? `$${lead.value.toLocaleString()}` : '—'}</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-green-500 transition-colors"><MessageCircle size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-blue-500 transition-colors"><Mail size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted transition-colors"><MoreHorizontal size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
