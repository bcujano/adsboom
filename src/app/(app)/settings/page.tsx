'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  User, Palette, Globe, Key, Link2, Bell, Shield,
  Eye, EyeOff, Check, Plus, Trash2, ExternalLink,
  Sun, Moon, Save, Building2, Loader2,
} from 'lucide-react'
import { GlassCard, GlassButton, GlassInput, GlassToggle, GlassSelect } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { AI_ENGINES, type AIEngine, type ConnectionPlatform } from '@/types'

const tabs = [
  { id: 'profile', label: 'Perfil', icon: <User size={16} /> },
  { id: 'appearance', label: 'Apariencia', icon: <Palette size={16} /> },
  { id: 'connections', label: 'Cuentas Vinculadas', icon: <Link2 size={16} /> },
  { id: 'api-keys', label: 'Claves API (IA)', icon: <Key size={16} /> },
  { id: 'notifications', label: 'Notificaciones', icon: <Bell size={16} /> },
  { id: 'business', label: 'ADN del Negocio', icon: <Building2 size={16} /> },
]

const connectionPlatforms: { id: ConnectionPlatform; name: string; color: string; authUrl: string }[] = [
  { id: 'meta', name: 'Meta Ads (Facebook + Instagram)', color: 'from-blue-500 to-blue-600', authUrl: '/api/auth/connect/meta' },
  { id: 'google', name: 'Google Ads', color: 'from-red-500 to-yellow-500', authUrl: '/api/auth/connect/google' },
  { id: 'tiktok', name: 'TikTok Ads', color: 'from-gray-900 to-pink-500', authUrl: '/api/auth/connect/tiktok' },
  { id: 'linkedin', name: 'LinkedIn Ads', color: 'from-blue-700 to-blue-800', authUrl: '/api/auth/connect/linkedin' },
]

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)

  // API Keys state
  const [apiKeys, setApiKeys] = useState<Record<AIEngine, { key: string; visible: boolean; saved: boolean }>>({
    openai: { key: '', visible: false, saved: false },
    anthropic: { key: '', visible: false, saved: false },
    gemini: { key: '', visible: false, saved: false },
    nano_banana: { key: '', visible: false, saved: false },
    veo3: { key: '', visible: false, saved: false },
    runway: { key: '', visible: false, saved: false },
  })

  // Connected accounts
  const [connections, setConnections] = useState<{ platform: ConnectionPlatform; name: string; connected: boolean }[]>([
    { platform: 'meta', name: '', connected: false },
    { platform: 'google', name: '', connected: false },
    { platform: 'tiktok', name: '', connected: false },
    { platform: 'linkedin', name: '', connected: false },
  ])

  const handleSaveKeys = () => {
    setSaving(true)
    // TODO: Save encrypted keys to Supabase
    setTimeout(() => {
      setSaving(false)
      setApiKeys((prev) => {
        const updated = { ...prev }
        for (const key of Object.keys(updated) as AIEngine[]) {
          if (updated[key].key) updated[key].saved = true
        }
        return updated
      })
    }, 1500)
  }

  const [connectingPlatform, setConnectingPlatform] = useState<ConnectionPlatform | null>(null)

  const handleConnect = (platform: ConnectionPlatform) => {
    setConnectingPlatform(platform)
    // In production, this opens the OAuth popup for the platform
    // For now, simulate the connection flow
    const platformName = connectionPlatforms.find((p) => p.id === platform)?.name || platform
    setTimeout(() => {
      // Simulate OAuth success — in production this would be handled by the callback
      setConnections((prev) =>
        prev.map((c) =>
          c.platform === platform
            ? { ...c, connected: true, name: `Cuenta de ${platformName}` }
            : c
        )
      )
      setConnectingPlatform(null)
    }, 2000)
    // TODO: In production, open OAuth popup:
    // window.open(`/api/auth/connect/${platform}`, 'oauth', 'width=600,height=700')
  }

  const toggleKeyVisibility = (engine: AIEngine) => {
    setApiKeys((prev) => ({ ...prev, [engine]: { ...prev[engine], visible: !prev[engine].visible } }))
  }

  const updateKey = (engine: AIEngine, value: string) => {
    setApiKeys((prev) => ({ ...prev, [engine]: { ...prev[engine], key: value, saved: false } }))
  }

  const displayName = user?.user_metadata?.full_name || 'Usuario'
  const displayEmail = user?.email || 'email@ejemplo.com'

  return (
    <div className="min-h-screen">
      <Header title="Configuración" />
      <div className="p-6 lg:p-8">
        <div className="flex gap-8">
          {/* Sidebar Tabs */}
          <div className="w-56 shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeTab === tab.id ? 'glass text-text-primary' : 'text-text-muted hover:text-text-secondary hover:bg-[var(--glass-bg)]'}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 max-w-3xl">
            {/* Profile */}
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-6">Perfil</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white text-xl font-bold">
                      {displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-text-primary">{displayName}</p>
                      <p className="text-sm text-text-muted">{displayEmail}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <GlassInput label="Nombre completo" value={displayName} icon={<User size={16} />} onChange={() => {}} />
                    <GlassInput label="Correo electrónico" value={displayEmail} icon={<Globe size={16} />} onChange={() => {}} disabled />
                    <GlassButton variant="gradient-blue" size="md" icon={<Save size={16} />}>Guardar Cambios</GlassButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-6">Apariencia</h3>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {theme === 'dark' ? <Moon size={18} className="text-accent" /> : <Sun size={18} className="text-amber-500" />}
                        <div>
                          <p className="text-sm font-medium text-text-primary">Modo oscuro</p>
                          <p className="text-xs text-text-muted">Cambiar entre tema claro y oscuro</p>
                        </div>
                      </div>
                      <GlassToggle checked={theme === 'dark'} onChange={toggleTheme} />
                    </div>
                    <div className="border-t border-[var(--glass-border)] pt-5">
                      <GlassSelect label="Idioma" options={[{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }]} defaultValue="es" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Connected Accounts */}
            {activeTab === 'connections' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-2">Cuentas Publicitarias Vinculadas</h3>
                  <p className="text-sm text-text-muted mb-6">Conecta tus cuentas para que AdsBoom pueda crear y gestionar campañas directamente</p>
                  <div className="space-y-3">
                    {connectionPlatforms.map((platform) => {
                      const conn = connections.find((c) => c.platform === platform.id)
                      return (
                        <div key={platform.id} className="glass-sm rounded-xl p-4 flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {platform.name.slice(0, 2)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{platform.name}</p>
                            {conn?.connected ? (
                              <p className="text-xs text-green-500 flex items-center gap-1"><Check size={10} />Conectado: {conn.name}</p>
                            ) : (
                              <p className="text-xs text-text-muted">No conectado</p>
                            )}
                          </div>
                          {conn?.connected ? (
                            <div className="flex gap-2">
                              <GlassButton variant="ghost" size="sm">Desconectar</GlassButton>
                            </div>
                          ) : (
                            <GlassButton variant="gradient-blue" size="sm" icon={connectingPlatform === platform.id ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />} loading={connectingPlatform === platform.id} onClick={() => handleConnect(platform.id)}>
                              {connectingPlatform === platform.id ? 'Conectando...' : 'Conectar'}
                            </GlassButton>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>

                <GlassCard padding="md" className="border-l-4 border-accent">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">¿Cómo funciona?</p>
                      <p className="text-xs text-text-muted mt-1">
                        Al conectar tu cuenta, se abre una ventana de la plataforma (Meta, Google, etc.) donde autorizas a AdsBoom a gestionar tus anuncios.
                        AdsBoom recibe un token de acceso seguro que le permite crear campañas, leer métricas y optimizar anuncios en tu nombre.
                        Puedes revocar el acceso en cualquier momento desde aquí o desde la plataforma.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* API Keys */}
            {activeTab === 'api-keys' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-2">Claves API de Motores de IA</h3>
                  <p className="text-sm text-text-muted mb-6">
                    Configura tus propias API keys para los motores de IA. Al crear campañas podrás elegir qué motor usar.
                    Las claves se almacenan cifradas y solo tú tienes acceso.
                  </p>

                  {/* Text engines */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Generación de Texto / Copy</p>
                    <div className="space-y-3">
                      {AI_ENGINES.filter((e) => e.category === 'text').map((engine) => (
                        <div key={engine.id} className="glass-sm rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium text-text-primary">{engine.name}</p>
                              <p className="text-xs text-text-muted">{engine.description}</p>
                            </div>
                            {apiKeys[engine.id].saved && <span className="text-xs text-green-500 flex items-center gap-1"><Check size={10} />Guardado</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <GlassInput
                                type={apiKeys[engine.id].visible ? 'text' : 'password'}
                                placeholder={`Pega tu ${engine.name} API Key aquí`}
                                value={apiKeys[engine.id].key}
                                onChange={(e) => updateKey(engine.id, e.target.value)}
                                icon={<Key size={14} />}
                              />
                            </div>
                            <button onClick={() => toggleKeyVisibility(engine.id)} className="p-2.5 rounded-xl glass-sm text-text-muted hover:text-text-primary transition-colors">
                              {apiKeys[engine.id].visible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image engines */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Generación de Imágenes</p>
                    <div className="space-y-3">
                      {AI_ENGINES.filter((e) => e.category === 'image').map((engine) => (
                        <div key={engine.id} className="glass-sm rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium text-text-primary">{engine.name}</p>
                              <p className="text-xs text-text-muted">{engine.description}</p>
                            </div>
                            {apiKeys[engine.id].saved && <span className="text-xs text-green-500 flex items-center gap-1"><Check size={10} />Guardado</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <GlassInput type={apiKeys[engine.id].visible ? 'text' : 'password'} placeholder={`Pega tu ${engine.name} API Key aquí`} value={apiKeys[engine.id].key} onChange={(e) => updateKey(engine.id, e.target.value)} icon={<Key size={14} />} />
                            </div>
                            <button onClick={() => toggleKeyVisibility(engine.id)} className="p-2.5 rounded-xl glass-sm text-text-muted hover:text-text-primary transition-colors">
                              {apiKeys[engine.id].visible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video engines */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Generación de Video</p>
                    <div className="space-y-3">
                      {AI_ENGINES.filter((e) => e.category === 'video').map((engine) => (
                        <div key={engine.id} className="glass-sm rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium text-text-primary">{engine.name}</p>
                              <p className="text-xs text-text-muted">{engine.description}</p>
                            </div>
                            {apiKeys[engine.id].saved && <span className="text-xs text-green-500 flex items-center gap-1"><Check size={10} />Guardado</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <GlassInput type={apiKeys[engine.id].visible ? 'text' : 'password'} placeholder={`Pega tu ${engine.name} API Key aquí`} value={apiKeys[engine.id].key} onChange={(e) => updateKey(engine.id, e.target.value)} icon={<Key size={14} />} />
                            </div>
                            <button onClick={() => toggleKeyVisibility(engine.id)} className="p-2.5 rounded-xl glass-sm text-text-muted hover:text-text-primary transition-colors">
                              {apiKeys[engine.id].visible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <GlassButton variant="gradient-purple" size="md" icon={saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} loading={saving} onClick={handleSaveKeys}>
                    {saving ? 'Guardando...' : 'Guardar Todas las Claves'}
                  </GlassButton>
                </GlassCard>

                <GlassCard padding="md" className="border-l-4 border-amber-500">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Seguridad de tus claves</p>
                      <p className="text-xs text-text-muted mt-1">
                        Tus API keys se almacenan cifradas en la base de datos. AdsBoom las usa únicamente para ejecutar las funciones de IA que tú solicitas.
                        Cada motor de IA cobra directamente a tu cuenta — AdsBoom no añade cargos adicionales por el uso de IA.
                        Puedes eliminar tus claves en cualquier momento.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-6">Notificaciones</h3>
                  <div className="space-y-5">
                    {[
                      { label: 'Alertas de rendimiento', desc: 'Cuando una campaña baja su rendimiento', default: true },
                      { label: 'Fatiga publicitaria', desc: 'Cuando un anuncio muestra signos de fatiga', default: true },
                      { label: 'Nuevos leads', desc: 'Cuando se captura un nuevo prospecto', default: true },
                      { label: 'Reglas de autopiloto', desc: 'Cuando una regla automática se ejecuta', default: true },
                      { label: 'Reportes semanales', desc: 'Resumen semanal por email', default: false },
                      { label: 'Actualizaciones del sistema', desc: 'Nuevas funciones y mejoras', default: false },
                    ].map((notif) => (
                      <div key={notif.label} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{notif.label}</p>
                          <p className="text-xs text-text-muted mt-0.5">{notif.desc}</p>
                        </div>
                        <GlassToggle checked={notif.default} onChange={() => {}} />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Business DNA */}
            {activeTab === 'business' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold text-text-primary mb-2">ADN del Negocio</h3>
                  <p className="text-sm text-text-muted mb-6">Edita la información de tu negocio que la IA usa para crear campañas</p>
                  <GlassButton variant="gradient-blue" size="md" icon={<Building2 size={16} />} onClick={() => window.location.href = '/onboarding'}>
                    Editar ADN del Negocio
                  </GlassButton>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
