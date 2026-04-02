import 'server-only'

import type { DocSearchEntry } from '@/content/docs/search-types'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { type DocManifest, docs, getDocSourcePath } from '@/content/docs/docs-manifest'

function stripMdx(source: string) {
  return source
    .replaceAll('\r\n', '\n')
    .replace(/^import\s.+$/gm, ' ')
    .replace(/^export\s.+$/gm, ' ')
    .replace(/<Callout[^>]*title="([^"]+)"[^>]*>/g, '$1 ')
    .replace(/<DocCard[\s\S]*?title="([^"]+)"[\s\S]*?description="([^"]+)"[\s\S]*?\/>/g, '$1 $2 ')
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, '$1 ')
    .replace(/<\/?[A-Z][^>]*>/g, ' ')
    .replace(/<\/?[a-z][^>]*>/g, ' ')
    .replace(/```[a-zA-Z0-9_-]*\n?/g, ' ')
    .replace(/`/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_{1,2}(.*?)_{1,2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function readDocSource(slug?: string) {
  const sourcePath = path.join(process.cwd(), getDocSourcePath(slug))
  return readFileSync(sourcePath, 'utf8')
}

function createDocSearchEntries(doc: DocManifest): DocSearchEntry[] {
  const source = readDocSource(doc.slug)
  const sectionAnchors = doc.toc
    .map(item => ({
      ...item,
      index: source.indexOf(`<h2 id="${item.id}">`),
    }))
    .filter(item => item.index >= 0)
    .toSorted((left, right) => left.index - right.index)

  const introBoundary = sectionAnchors[0]?.index ?? source.length
  const introContent = stripMdx(source.slice(0, introBoundary))
  const rootEntry: DocSearchEntry = {
    id: doc.slug || 'overview',
    href: doc.href,
    title: doc.title,
    group: doc.group,
    description: doc.description,
    content: [doc.description, introContent].filter(Boolean).join(' '),
    order: doc.order,
  }

  const sectionEntries = sectionAnchors.map((section, index) => {
    const nextSectionIndex = sectionAnchors[index + 1]?.index ?? source.length
    const sectionContent = stripMdx(source.slice(section.index, nextSectionIndex))

    return {
      id: `${doc.slug || 'overview'}#${section.id}`,
      href: `${doc.href}#${section.id}`,
      title: doc.title,
      group: doc.group,
      description: doc.description,
      content: sectionContent,
      order: doc.order,
      section: section.label,
    } satisfies DocSearchEntry
  })

  return [rootEntry, ...sectionEntries]
}

export const docsSearchEntries = docs.flatMap(createDocSearchEntries)
