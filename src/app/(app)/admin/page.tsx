'use client'

import { motion } from 'motion/react'
import {
  Shield, Building2, Users, CreditCard, Key, TrendingUp,
  DollarSign, Activity, Globe, BarChart3, ArrowUpRight,
  Eye, Ban, Check,
} from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { Header } from '@/components/layout/Header'

const saasMetrics = [
  { label: 'MRR', value: '$12,450', change: '+18%', icon: <DollarSign size={18} />, color: 'text-green-500' },
  { label: 'Organizaciones', value: '48', change: '+6', icon: <Building2 size={18} />, color: 'text-blue-500' },
  { label: 'Usuarios Activos', value: '156', change: '+23', icon: <Users size={18} />, color: 'text-purple-500' },
  { label: 'Licencias Emitidas', value: '12', change: '+2', icon: <Key size={18} />, color: 'text-amber-500' },
  { label: 'Churn Rate', value: '2.1%', change: '-0.3%', icon: <Activity size={18} />, color: 'text-red-500' },
  { label: 'ARR', value: '$149,400', change: '+22%', icon: <TrendingUp size={18} />, color: 'text-accent' },
]

const tenants = [
  { id: '1', name: 'AgenciaDigital Pro', slug: 'agencia-pro', plan: 'Enterprise', users: 15, campaigns: 45, mrr: 399, status: 'active', provider: 'PayPal' },
  { id: '2', name: 'Marketing Solutions EC', slug: 'mkt-solutions', plan: 'Premium', users: 8, campaigns: 28, mrr: 199, status: 'active', provider: 'PayPhone' },
  { id: '3', name: 'StartupBoost', slug: 'startupboost', plan: 'Pro', users: 4, campaigns: 12, mrr: 99, status: 'active', provider: 'PayPal' },
  { id: '4', name: 'PYME Digital', slug: 'pyme-digital', plan: 'Basic', users: 2, campaigns: 5, mrr: 49, status: 'active', provider: 'PayPhone' },
  { id: '5', name: 'Ecom Master', slug: 'ecom-master', plan: 'Premium', users: 6, campaigns: 22, mrr: 199, status: 'active', provider: 'PayPal' },
  { id: '6', name: 'Social Agency', slug: 'social-agency', plan: 'Pro', users: 3, campaigns: 0, mrr: 99, status: 'suspended', provider: 'PayPhone' },
]

const recentPayments = [
  { org: 'AgenciaDigital Pro', amount: 399, provider: 'PayPal', date: '2026-03-28', type: 'Suscripción' },
  { org: 'Marketing Solutions EC', amount: 199, provider: 'PayPhone', date: '2026-03-27', type: 'Suscripción' },
  { org: 'StartupBoost', amount: 1990, provider: 'PayPal', date: '2026-03-25', type: 'Licencia' },
  { org: 'PYME Digital', amount: 49, provider: 'PayPhone', date: '2026-03-24', type: 'Suscripción' },
  { org: 'Ecom Master', amount: 199, provider: 'PayPal', date: '2026-03-23', type: 'Suscripción' },
]

const licenses = [
  { key: 'ADS-K8N2P-YQ3XW-7M4JT-B6V9R-H5D2L', org: 'StartupBoost', plan: 'Pro', issuedAt: '2026-03-25', status: 'active' },
  { key: 'ADS-F3G7H-M9K2L-P5Q8R-T4V6W-X2Y9Z', org: 'Cliente Externo 1', plan: 'Premium', issuedAt: '2026-03-15', status: 'active' },
  { key: 'ADS-A1B3C-D5E7F-G9H2J-K4L6M-N8P0Q', org: 'Cliente Externo 2', plan: 'Basic', issuedAt: '2026-02-20', status: 'revoked' },
]

const planColors: Record<string, string> = {
  Basic: 'bg-blue-500/10 text-blue-500',
  Pro: 'bg-purple-500/10 text-purple-500',
  Premium: 'bg-amber-500/10 text-amber-500',
  Enterprise: 'bg-rose-500/10 text-rose-500',
}

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Header title="Panel de Administración" />
      <div className="p-6 space-y-6">
        {/* Admin Badge */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-sm rounded-xl p-3 flex items-center gap-2 w-fit">
          <Shield size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">Super Admin</span>
        </motion.div>

        {/* SaaS Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {saasMetrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard padding="sm">
                <div className="flex items-center justify-between mb-1">
                  <span className={m.color}>{m.icon}</span>
                  <span className="text-xs font-medium text-green-500 flex items-center gap-0.5"><ArrowUpRight size={10} />{m.change}</span>
                </div>
                <p className="text-xl font-bold text-text-primary">{m.value}</p>
                <p className="text-xs text-text-muted">{m.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <GlassCard variant="iridescent" padding="lg">
          <h3 className="text-lg font-bold text-text-primary mb-4">Revenue Mensual (MRR)</h3>
          <div className="flex items-end gap-2 h-40">
            {[4200, 5100, 5800, 6500, 7200, 7800, 8400, 9100, 9800, 10500, 11200, 12450].map((v, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(v / 12450) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.5 }} className={`flex-1 rounded-t-md ${i === 11 ? 'bg-gradient-to-t from-accent to-accent-secondary' : 'bg-accent/20'}`} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>Abr 25</span><span>Jul 25</span><span>Oct 25</span><span>Mar 26</span>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tenants */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><Building2 size={20} className="text-accent" /> Organizaciones ({tenants.length})</h2>
            <GlassCard padding="none">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--glass-border-bottom)]">
                      <th className="text-left py-3 px-4 text-text-muted font-medium">Organización</th>
                      <th className="text-left py-3 px-3 text-text-muted font-medium">Plan</th>
                      <th className="text-right py-3 px-3 text-text-muted font-medium">Usuarios</th>
                      <th className="text-right py-3 px-3 text-text-muted font-medium">MRR</th>
                      <th className="text-right py-3 px-3 text-text-muted font-medium">Estado</th>
                      <th className="py-3 px-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((t) => (
                      <tr key={t.id} className="border-b border-[var(--glass-border-bottom)] last:border-0 hover:bg-[var(--glass-bg-hover)] transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-medium text-text-primary">{t.name}</p>
                          <p className="text-xs text-text-muted">{t.slug} • {t.campaigns} campañas</p>
                        </td>
                        <td className="py-3 px-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${planColors[t.plan]}`}>{t.plan}</span></td>
                        <td className="py-3 px-3 text-right text-text-secondary">{t.users}</td>
                        <td className="py-3 px-3 text-right text-text-primary font-medium">${t.mrr}</td>
                        <td className="py-3 px-3 text-right">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {t.status === 'active' ? 'Activo' : 'Suspendido'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-text-primary"><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-red-500"><Ban size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>

          {/* Recent Payments */}
          <div>
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><CreditCard size={20} className="text-green-500" /> Pagos Recientes</h2>
            <GlassCard padding="sm">
              <div className="space-y-3">
                {recentPayments.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 glass-sm rounded-lg p-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${p.provider === 'PayPal' ? 'bg-[#0070ba]/10 text-[#0070ba]' : 'bg-[#ff6b00]/10 text-[#ff6b00]'}`}>
                      <CreditCard size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-primary truncate">{p.org}</p>
                      <p className="text-xs text-text-muted">{p.date} • {p.type}</p>
                    </div>
                    <span className="text-sm font-bold text-text-primary">${p.amount}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Licenses */}
        <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><Key size={20} className="text-amber-500" /> Licencias Emitidas</h2>
          <GlassCard padding="none">
            <div className="divide-y divide-[var(--glass-border-bottom)]">
              {licenses.map((lic, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--glass-bg-hover)] transition-colors">
                  <div className="w-10 h-10 rounded-xl glass-sm flex items-center justify-center text-amber-500 shrink-0"><Key size={18} /></div>
                  <div className="flex-1 min-w-0">
                    <code className="text-xs font-mono text-text-primary block truncate">{lic.key}</code>
                    <p className="text-xs text-text-muted mt-0.5">{lic.org} • {lic.plan} • {lic.issuedAt}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lic.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {lic.status === 'active' ? 'Activa' : 'Revocada'}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
