import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '@/styles/index.css'
import { fontsClassName } from '@/lib/utils/fonts'
import { Providers } from '@/ui/components/providers'

export const metadata: Metadata = {
  title: 'vyper',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontsClassName}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
