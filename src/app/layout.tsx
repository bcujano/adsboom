import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'AdsBoom - AI-Powered Ad Campaign Management',
  description:
    'Create, manage, and optimize advertising campaigns with AI. From ad to client, fully automated.',
  keywords: ['ads', 'ai', 'campaigns', 'marketing', 'automation', 'meta', 'google', 'tiktok'],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('adsboom-theme') || 'light';
                document.documentElement.setAttribute('data-theme', t);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
