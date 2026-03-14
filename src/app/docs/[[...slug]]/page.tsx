import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { docs, getDocBySlug } from '@/content/docs/registry'
import { createDocMetadata } from '@/lib/seo/metadata-builders'
import { DocsShell } from '@/ui/docs/docs-shell'

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

function resolveSlug(slug?: string[]) {
  if (!slug || slug.length === 0) {
    return ''
  }

  return slug.join('/')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedSlug = resolveSlug((await params).slug)

  const doc = getDocBySlug(resolvedSlug)

  if (!doc) {
    return {}
  }

  return createDocMetadata(doc)
}

export function generateStaticParams() {
  return docs
    .filter(doc => doc.slug)
    .map(doc => ({
      slug: doc.slug.split('/'),
    }))
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedSlug = resolveSlug((await params).slug)

  const doc = getDocBySlug(resolvedSlug)

  if (!doc) {
    notFound()
  }

  return <DocsShell doc={doc} />
}
