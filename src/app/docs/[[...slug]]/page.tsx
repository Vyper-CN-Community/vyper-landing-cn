import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocContentBySlug } from '@/content/docs/docs-content'
import { docs, getDocBySlug } from '@/content/docs/docs-manifest'
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

export const dynamicParams = false
export const dynamic = 'force-static'

export function generateStaticParams() {
  return docs.map(doc => ({
    slug: doc.slug ? doc.slug.split('/') : [],
  }))
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedSlug = resolveSlug((await params).slug)

  const doc = getDocBySlug(resolvedSlug)

  if (!doc) {
    notFound()
  }

  const Content = await getDocContentBySlug(doc.slug)

  if (!Content) {
    notFound()
  }

  return <DocsShell doc={doc} Content={Content} />
}
