import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { docs, getDocBySlug } from '@/content/docs/registry'
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

  if (slug.length > 1) {
    return null
  }

  return slug[0]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedSlug = resolveSlug((await params).slug)

  if (resolvedSlug === null) {
    return {}
  }

  const doc = getDocBySlug(resolvedSlug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: doc.href,
    },
  }
}

export function generateStaticParams() {
  return docs
    .filter(doc => doc.slug)
    .map(doc => ({
      slug: [doc.slug],
    }))
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedSlug = resolveSlug((await params).slug)

  if (resolvedSlug === null) {
    notFound()
  }

  const doc = getDocBySlug(resolvedSlug)

  if (!doc) {
    notFound()
  }

  return <DocsShell doc={doc} />
}
