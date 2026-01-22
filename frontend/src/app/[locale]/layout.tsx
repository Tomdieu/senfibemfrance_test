import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactElement } from 'react'
import { I18nProviderClient } from '@/locales/client'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SEN FIBEM FRANCE - Services Professionnels & Recrutement',
  description: 'Plateforme de mise en relation professionnelle, recrutement et services aux entreprises - France & Sénégal',
}

export default async function RootLayout({ params, children }: { params: Promise<{ locale: string }>, children: ReactElement }) {
  const { locale } = await params
  return (
    <html lang={locale}>

      <body className={inter.className} suppressContentEditableWarning suppressHydrationWarning>
        <SessionProvider>
          <I18nProviderClient locale={locale}>
            {children}
          </I18nProviderClient>
        </SessionProvider>
      </body>
    </html>
  )
}
