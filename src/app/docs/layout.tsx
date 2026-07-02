import type { ReactNode } from 'react'
import { docs } from '@/content/docs/docs-manifest'
import { DocsHeader } from '@/ui/docs/docs-header'
import { DocsRoutePrefetcher } from '@/ui/docs/docs-route-prefetcher'

const docsHeaderEntries = docs.map(doc => ({
  href: doc.href,
  title: doc.title,
}))
const docsHrefs = docs.map(doc => doc.href)

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DocsRoutePrefetcher hrefs={docsHrefs} />
      <DocsHeader docs={docsHeaderEntries} />
      {children}
    </div>
  )
}
