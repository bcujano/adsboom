'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Shield, Building2, Users, CreditCard, Key, TrendingUp,
  DollarSign, Activity, BarChart3, ArrowUpRight, Eye, Ban,
  Check, Settings, Globe, Bell, FileText, Zap, UserCheck,
  AlertTriangle, Lock, Database, Server,
} from 'lucide-react'
import { GlassCard, GlassButton } from '@/components/glass'
import { Header } from '@/components/layout/Header'

const adminTabs = [
  { id: 'overview', label: 'Resumen', icon: <BarChart3 size={16} /> },
  { id: 'tenants', label: 'Organizaciones', icon: <Building2 size={16} /> },
  { id: 'payments', label: 'Pagos y Revenue', icon: <CreditCard size={16} /> },
  { id: 'licenses', label: 'Licencias', icon: <Key size={16} /> },
  { id: 'users', label: 'Usuarios', icon: <Users size={16} /> },
  { id: 'system', label: 'Sistema', icon: <Server size={16} /> },
]

const saasMetrics = [
  { label: 'MRR', value: '$12,450', change: '+18%', icon: <DollarSign size={18} />, color: 'text-green-500' },
  { label: 'ARR', value: '$149,400', change: '+22%', icon: <TrendingUp size={18} />, color: 'text-accent' },
  { label: 'Organizaciones', value: '48', change: '+6', icon: <Building2 size={18} />, color: 'text-blue-500' },
  { label: 'Usuarios Activos', value: '156', change: '+23', icon: <Users size={18} />, color: 'text-purple-500' },
  { label: 'Licencias', value: '12', change: '+2', icon: <Key size={18} />, color: 'text-amber-500' },
  { label: 'Churn Rate', value: '2.1%', change: '-0.3%', icon: <Activity size={18} />, color: 'text-red-500' },
]

const tenants = [
  { id: '1', name: 'AgenciaDigital Pro', plan: 'Enterprise', users: 15, campaigns: 45, mrr: 999, status: 'active', provider: 'PayPal' },
  { id: '2', name: 'Marketing Solutions EC', plan: 'Premium', users: 8, campaigns: 28, mrr: 199, status: 'active', provider: 'PayPhone' },
  { id: '3', name: 'StartupBoost', plan: 'Pro', users: 4, campaigns: 12, mrr: 99, status: 'active', provider: 'PayPal' },
  { id: '4', name: 'PYME Digital', plan: 'Basic', users: 2, campaigns: 5, mrr: 49, status: 'active', provider: 'PayPhone' },
  { id: '5', name: 'Ecom Master', plan: 'Premium', users: 6, campaigns: 22, mrr: 199, status: 'active', provider: 'PayPal' },
  { id: '6', name: 'Social Agency', plan: 'Pro', users: 3, campaigns: 0, mrr: 99, status: 'suspended', provider: 'PayPhone' },
]

const recentPayments = [
  { org: 'AgenciaDigital Pro', amount: 999, provider: 'PayPal', date: '2026-03-28', type: 'Suscripción', status: 'completed' },
  { org: 'Marketing Solutions EC', amount: 199, provider: 'PayPhone', date: '2026-03-27', type: 'Suscripción', status: 'completed' },
  { org: 'StartupBoost', amount: 1990, provider: 'PayPal', date: '2026-03-25', type: 'Licencia Pro', status: 'completed' },
  { org: 'PYME Digital', amount: 49, provider: 'PayPhone', date: '2026-03-24', type: 'Suscripción', status: 'completed' },
  { org: 'Ecom Master', amount: 199, provider: 'PayPal', date: '2026-03-23', type: 'Suscripción', status: 'completed' },
  { org: 'Freelancer X', amount: 890, provider: 'PayPal', date: '2026-03-22', type: 'Licencia Basic', status: 'completed' },
]

const licenses = [
  { key: 'ADS-K8N2P-YQ3XW-7M4JT-B6V9R-H5D2L', org: 'StartupBoost', plan: 'Pro', issuedAt: '2026-03-25', status: 'active' },
  { key: 'ADS-F3G7H-M9K2L-P5Q8R-T4V6W-X2Y9Z', org: 'Cliente Externo 1', plan: 'Premium', issuedAt: '2026-03-15', status: 'active' },
  { key: 'ADS-A1B3C-D5E7F-G9H2J-K4L6M-N8P0Q', org: 'Freelancer X', plan: 'Basic', issuedAt: '2026-03-22', status: 'active' },
  { key: 'ADS-R2S4T-U6V8W-X1Y3Z-A5B7C-D9E2F', org: 'Demo Corp', plan: 'Basic', issuedAt: '2026-02-20', status: 'revoked' },
]

const allUsers = [
  { name: 'Byron Cujano', email: 'brncjn@gmail.com', org: 'AdsBoom (Owner)', role: 'superadmin', lastLogin: '2026-03-29' },
  { name: 'Carlos López', email: 'carlos@agenciapro.com', org: 'AgenciaDigital Pro', role: 'admin', lastLogin: '2026-03-28' },
  { name: 'María García', email: 'maria@mktsolutions.ec', org: 'Marketing Solutions EC', role: 'admin', lastLogin: '2026-03-27' },
  { name: 'Diego Martínez', email: 'diego@startupboost.io', org: 'StartupBoost', role: 'agent', lastLogin: '2026-03-26' },
  { name: 'Ana Rodríguez', email: 'ana@pymedigital.ec', org: 'PYME Digital', role: 'admin', lastLogin: '2026-03-25' },
]

const planColors: Record<string, string> = {
  Basic: 'bg-blue-500/10 text-blue-500',
  Pro: 'bg-purple-500/10 text-purple-500',
  Premium: 'bg-amber-500/10 text-amber-500',
  Enterprise: 'bg-rose-500/10 text-rose-500',
}

const roleColors: Record<string, string> = {
  superadmin: 'bg-red-500/10 text-red-500',
  admin: 'bg-blue-500/10 text-blue-500',
  agent: 'bg-green-500/10 text-green-500',
  viewer: 'bg-gray-500/10 text-gray-500',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen">
      <Header title="Administración" />
      <div className="p-6 lg:p-8 space-y-8">
        {/* Section Description */}
        <GlassCard padding="md" className="border-l-4 border-accent" hover={false}>
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">Panel de Super Administración</p>
              <p className="text-xs text-text-muted mt-1">Control total del sistema SaaS. Monitorea revenue, gestiona organizaciones, usuarios, licencias y configuración del sistema. Solo visible para Super Admins.</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
            {/* Overview */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {saasMetrics.map((m, i) => (
                    <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <GlassCard padding="md">
                        <div className="flex items-center justify-between mb-1">
                          <span className={m.color}>{m.icon}</span>
                          <span className="text-xs font-medium text-green-500 flex items-center gap-0.5"><ArrowUpRight size={10} />{m.change}</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary">{m.value}</p>
                        <p className="text-xs text-text-muted">{m.label}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                {/* MRR Chart */}
                <GlassCard variant="iridescent" padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Revenue Mensual (MRR) — Últimos 12 meses</h3>
                  <div className="flex items-end gap-2 h-44">
                    {[4200, 5100, 5800, 6500, 7200, 7800, 8400, 9100, 9800, 10500, 11200, 12450].map((v, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(v / 12450) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.5 }} className={`flex-1 rounded-t-md ${i === 11 ? 'bg-gradient-to-t from-accent to-accent-secondary' : 'bg-accent/20 hover:bg-accent/40'} transition-colors relative group cursor-pointer`}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass-pill px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">${v.toLocaleString()}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-text-muted">
                    <span>Abr 25</span><span>Jul 25</span><span>Oct 25</span><span>Mar 26</span>
                  </div>
                </GlassCard>

                {/* Quick Stats */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <GlassCard padding="md">
                    <h4 className="text-sm font-bold text-text-primary mb-3">Distribución por Plan</h4>
                    {[
                      { plan: 'Basic', count: 18, revenue: 882, pct: 38 },
                      { plan: 'Pro', count: 15, revenue: 1485, pct: 31 },
                      { plan: 'Premium', count: 10, revenue: 1990, pct: 21 },
                      { plan: 'Enterprise', count: 5, revenue: 4995, pct: 10 },
                    ].map((p) => (
                      <div key={p.plan} className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-20 text-center ${planColors[p.plan]}`}>{p.plan}</span>
                        <div className="flex-1 h-2 rounded-full bg-[var(--glass-bg)] overflow-hidden">
                          <div className="h-full rounded-full bg-accent/60" style={{ width: `${p.pct}%` }} />
                        </div>
                        <span className="text-xs text-text-muted w-8 text-right">{p.count}</span>
                        <span className="text-xs text-text-primary font-medium w-16 text-right">${p.revenue}/mo</span>
                      </div>
                    ))}
                  </GlassCard>

                  <GlassCard padding="md">
                    <h4 className="text-sm font-bold text-text-primary mb-3">Alertas del Sistema</h4>
                    <div className="space-y-2">
                      {[
                        { type: 'warning', msg: 'Social Agency: suscripción vencida hace 3 días', icon: <AlertTriangle size={14} /> },
                        { type: 'info', msg: '2 licencias nuevas emitidas esta semana', icon: <Key size={14} /> },
                        { type: 'success', msg: 'MRR creció 18% este mes', icon: <TrendingUp size={14} /> },
                        { type: 'info', msg: '3 organizaciones nuevas en los últimos 7 días', icon: <Building2 size={14} /> },
                      ].map((alert, i) => (
                        <div key={i} className={`glass-sm rounded-lg px-3 py-2.5 flex items-center gap-2.5 text-xs ${alert.type === 'warning' ? 'text-amber-500' : alert.type === 'success' ? 'text-green-500' : 'text-text-secondary'}`}>
                          {alert.icon}<span>{alert.msg}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            )}

            {/* Tenants */}
            {activeTab === 'tenants' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="none">
                  <div className="px-5 py-4 border-b border-[var(--glass-border-bottom)] flex items-center justify-between">
                    <h3 className="font-bold text-text-primary">Organizaciones ({tenants.length})</h3>
                    <GlassButton variant="gradient-blue" size="sm">Agregar Manual</GlassButton>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--glass-border-bottom)]">
                        <th className="text-left py-3 px-5 text-text-muted font-medium">Organización</th>
                        <th className="text-left py-3 px-3 text-text-muted font-medium">Plan</th>
                        <th className="text-right py-3 px-3 text-text-muted font-medium">Usuarios</th>
                        <th className="text-right py-3 px-3 text-text-muted font-medium">Campañas</th>
                        <th className="text-right py-3 px-3 text-text-muted font-medium">MRR</th>
                        <th className="text-left py-3 px-3 text-text-muted font-medium">Pago</th>
                        <th className="text-right py-3 px-3 text-text-muted font-medium">Estado</th>
                        <th className="py-3 px-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants.map((t) => (
                        <tr key={t.id} className="border-b border-[var(--glass-border-bottom)] last:border-0 hover:bg-[var(--glass-bg-hover)]">
                          <td className="py-3 px-5 font-medium text-text-primary">{t.name}</td>
                          <td className="py-3 px-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${planColors[t.plan]}`}>{t.plan}</span></td>
                          <td className="py-3 px-3 text-right text-text-secondary">{t.users}</td>
                          <td className="py-3 px-3 text-right text-text-secondary">{t.campaigns}</td>
                          <td className="py-3 px-3 text-right text-text-primary font-medium">${t.mrr}</td>
                          <td className="py-3 px-3 text-text-muted text-xs">{t.provider}</td>
                          <td className="py-3 px-3 text-right"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{t.status === 'active' ? 'Activo' : 'Suspendido'}</span></td>
                          <td className="py-3 px-3"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-text-primary"><Eye size={13} /></button><button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-red-500"><Ban size={13} /></button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}

            {/* Payments */}
            {activeTab === 'payments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <GlassCard padding="md"><p className="text-xs text-text-muted">Revenue Total (All-time)</p><p className="text-2xl font-bold text-text-primary mt-1">$87,340</p></GlassCard>
                  <GlassCard padding="md"><p className="text-xs text-text-muted">Pagos este mes</p><p className="text-2xl font-bold text-text-primary mt-1">$12,450</p></GlassCard>
                  <GlassCard padding="md"><p className="text-xs text-text-muted">Licencias vendidas</p><p className="text-2xl font-bold text-text-primary mt-1">$8,860</p></GlassCard>
                </div>
                <GlassCard padding="none">
                  <div className="px-5 py-4 border-b border-[var(--glass-border-bottom)]">
                    <h3 className="font-bold text-text-primary">Historial de Pagos</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-[var(--glass-border-bottom)]"><th className="text-left py-3 px-5 text-text-muted font-medium">Organización</th><th className="text-left py-3 px-3 text-text-muted font-medium">Tipo</th><th className="text-left py-3 px-3 text-text-muted font-medium">Proveedor</th><th className="text-left py-3 px-3 text-text-muted font-medium">Fecha</th><th className="text-right py-3 px-3 text-text-muted font-medium">Monto</th><th className="text-right py-3 px-3 text-text-muted font-medium">Estado</th></tr></thead>
                    <tbody>
                      {recentPayments.map((p, i) => (
                        <tr key={i} className="border-b border-[var(--glass-border-bottom)] last:border-0 hover:bg-[var(--glass-bg-hover)]">
                          <td className="py-3 px-5 font-medium text-text-primary">{p.org}</td>
                          <td className="py-3 px-3 text-text-secondary">{p.type}</td>
                          <td className="py-3 px-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.provider === 'PayPal' ? 'bg-[#0070ba]/10 text-[#0070ba]' : 'bg-[#ff6b00]/10 text-[#ff6b00]'}`}>{p.provider}</span></td>
                          <td className="py-3 px-3 text-text-muted">{p.date}</td>
                          <td className="py-3 px-3 text-right font-bold text-text-primary">${p.amount.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right"><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Completado</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}

            {/* Licenses */}
            {activeTab === 'licenses' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="none">
                  <div className="px-5 py-4 border-b border-[var(--glass-border-bottom)] flex items-center justify-between">
                    <h3 className="font-bold text-text-primary">Licencias Emitidas ({licenses.length})</h3>
                    <GlassButton variant="gradient-purple" size="sm" icon={<Key size={14} />}>Emitir Licencia Manual</GlassButton>
                  </div>
                  <div className="divide-y divide-[var(--glass-border-bottom)]">
                    {licenses.map((lic, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--glass-bg-hover)]">
                        <div className="w-10 h-10 rounded-xl glass-sm flex items-center justify-center text-amber-500 shrink-0"><Key size={18} /></div>
                        <div className="flex-1 min-w-0">
                          <code className="text-xs font-mono text-text-primary block truncate">{lic.key}</code>
                          <p className="text-xs text-text-muted mt-0.5">{lic.org} • <span className={`font-medium ${planColors[lic.plan]?.split(' ')[1]}`}>{lic.plan}</span> • {lic.issuedAt}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${lic.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{lic.status === 'active' ? 'Activa' : 'Revocada'}</span>
                        {lic.status === 'active' && <GlassButton variant="ghost" size="sm">Revocar</GlassButton>}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="none">
                  <div className="px-5 py-4 border-b border-[var(--glass-border-bottom)]">
                    <h3 className="font-bold text-text-primary">Todos los Usuarios ({allUsers.length})</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-[var(--glass-border-bottom)]"><th className="text-left py-3 px-5 text-text-muted font-medium">Usuario</th><th className="text-left py-3 px-3 text-text-muted font-medium">Organización</th><th className="text-left py-3 px-3 text-text-muted font-medium">Rol</th><th className="text-left py-3 px-3 text-text-muted font-medium">Último login</th><th className="py-3 px-3"></th></tr></thead>
                    <tbody>
                      {allUsers.map((u, i) => (
                        <tr key={i} className="border-b border-[var(--glass-border-bottom)] last:border-0 hover:bg-[var(--glass-bg-hover)]">
                          <td className="py-3 px-5"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-accent text-xs font-bold">{u.name.split(' ').map(n => n[0]).join('')}</div><div><p className="font-medium text-text-primary">{u.name}</p><p className="text-xs text-text-muted">{u.email}</p></div></div></td>
                          <td className="py-3 px-3 text-text-secondary">{u.org}</td>
                          <td className="py-3 px-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[u.role]}`}>{u.role}</span></td>
                          <td className="py-3 px-3 text-text-muted">{u.lastLogin}</td>
                          <td className="py-3 px-3"><button className="p-1.5 rounded-lg hover:bg-[var(--glass-bg)] text-text-muted hover:text-text-primary"><Eye size={13} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}

            {/* System */}
            {activeTab === 'system' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Estado del Sistema</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'API Status', value: 'Operativo', color: 'text-green-500', icon: <Zap size={16} /> },
                      { label: 'Base de Datos', value: 'Supabase PostgreSQL', color: 'text-green-500', icon: <Database size={16} /> },
                      { label: 'Deploy', value: 'Vercel (Production)', color: 'text-green-500', icon: <Server size={16} /> },
                      { label: 'SSL', value: 'Activo (Let\'s Encrypt)', color: 'text-green-500', icon: <Lock size={16} /> },
                    ].map((s, i) => (
                      <div key={i} className="glass-sm rounded-xl p-4 flex items-center gap-3">
                        <span className={s.color}>{s.icon}</span>
                        <div><p className="text-sm font-medium text-text-primary">{s.label}</p><p className="text-xs text-text-muted">{s.value}</p></div>
                        <div className={`ml-auto w-2 h-2 rounded-full ${s.color === 'text-green-500' ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    ))}
                  </div>
                </GlassCard>
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Configuración Global</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Dominio', value: 'adsboom.emprendimientum.com' },
                      { label: 'Versión', value: 'v1.0.0 (CP2: PAYMENTS-POST-PAYPAL-PAYPHONE)' },
                      { label: 'Checkpoint', value: 'Full Platform Build' },
                      { label: 'GitHub', value: 'bcujano/adsboom' },
                      { label: 'Supabase', value: 'gwqzbhmpetsqwvyunugh.supabase.co' },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">{c.label}</span>
                        <span className="text-text-primary font-mono text-xs">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
        </div>
      </div>
    </div>
  )
}
