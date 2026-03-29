import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { defaultLocale } from './config'
import type { Locale } from '@/types'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('adsboom-locale')?.value as Locale) || defaultLocale

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
