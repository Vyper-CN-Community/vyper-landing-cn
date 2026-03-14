import type { ReactNode } from 'react'
import { docs } from '@/content/docs/registry'
import { docsSearchEntries } from '@/content/docs/search'
import { DocsHeader } from '@/ui/docs/docs-header'

const docsHeaderEntries = docs.map(doc => ({
  href: doc.href,
  title: doc.title,
}))

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DocsHeader docs={docsHeaderEntries} searchEntries={docsSearchEntries} />
      {children}
    </div>
  )
}
