'use client'

import { GlassCard, GlassToggle, GlassSelect } from '@/components/glass'
import { Header } from '@/components/layout/Header'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useTranslations } from 'next-intl'

export default function SettingsPage() {
  const t = useTranslations('common')
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen">
      <Header title={t('appName') + ' - Settings'} />

      <div className="p-6 max-w-2xl space-y-6">
        <GlassCard padding="lg">
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            Appearance
          </h3>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{t('darkMode')}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Toggle between light and dark theme
                </p>
              </div>
              <GlassToggle
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </div>

            <div className="border-t border-[var(--glass-border)] pt-5">
              <GlassSelect
                label={t('language')}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Espanol' },
                ]}
                defaultValue="en"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="lg">
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            Billing
          </h3>
          <p className="text-sm text-text-muted">
            Billing management will be available after connecting PayPal or PayPhone.
          </p>
        </GlassCard>
      </div>
    </div>
  )
}
