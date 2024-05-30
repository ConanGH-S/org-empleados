import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'OrgEmpleados',
  description: 'Página administrativa de organización para tus empleados, revisa tu empresa. Tu futuro.',
  authors: [{ name: 'ConanGH-S', url: 'www.github.com/ConanGH-S' }],
  category: 'Organization',
  keywords: 'organization, employees, management, admin, dashboard, organization management, organization employees, organization admin, organization dashboard',
  creator: 'ConanGH-S',
  generator: 'Next.js 14',
  publisher: 'ConanGH-S',
  robots: 'index, follow'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>

      <body className={cn(
        'min-h-screen font-sans antialiased',
        fontSans.variable
      )}
      >
        {children}
      </body>
    </html>
  )
}
