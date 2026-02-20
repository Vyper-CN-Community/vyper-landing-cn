import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '@/styles/index.css'
import { rootMetadata } from '@/lib/seo/root-metadata'
import { fontsClassName } from '@/lib/utils/fonts'
import { Providers } from '@/ui/components/providers'

export const metadata: Metadata = rootMetadata

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={fontsClassName}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
