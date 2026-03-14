'use client'

import type { DocSearchEntry } from '@/content/docs/search-types'
import { FileText, Hash, Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/ui/shadcn/command'

const compactPattern = /[^0-9\p{L}\p{Script=Han}]+/gu
const visibleDocLimit = 24

type HighlightMatcher = {
  key: string
  regex: RegExp
}

function normalizeForSearch(value: string) {
  return value
    .toLocaleLowerCase('zh-CN')
    .normalize('NFKC')
    .replace(compactPattern, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function compactForSearch(value: string) {
  return normalizeForSearch(value).replace(/\s+/g, '')
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createHighlightMatchers(query: string): HighlightMatcher[] {
  return query
    .split(/\s+/)
    .map(term => compactForSearch(term))
    .filter(Boolean)
    .map(term => ({
      key: term,
      regex: new RegExp(
        [...term].map(character => escapeRegex(character)).join('[^0-9\\p{L}\\p{Script=Han}]*'),
        'giu',
      ),
    }))
}

function getHighlightRanges(text: string, matchers: HighlightMatcher[]) {
  const ranges = matchers.flatMap(matcher =>
    [...text.matchAll(matcher.regex)].flatMap(match => {
      if (match.index === undefined) {
        return []
      }

      return [[match.index, match.index + match[0].length] as const]
    }),
  )

  if (ranges.length === 0) {
    return []
  }

  return ranges
    .toSorted((left, right) => left[0] - right[0])
    .reduce<Array<readonly [number, number]>>((merged, range) => {
      const previousRange = merged.at(-1)

      if (!previousRange || range[0] > previousRange[1]) {
        merged.push(range)
        return merged
      }

      merged[merged.length - 1] = [previousRange[0], Math.max(previousRange[1], range[1])]
      return merged
    }, [])
}

function renderHighlightedText(text: string, matchers: HighlightMatcher[]) {
  if (matchers.length === 0) {
    return text
  }

  const ranges = getHighlightRanges(text, matchers)

  if (ranges.length === 0) {
    return text
  }

  const parts: Array<string | React.JSX.Element> = []
  let cursor = 0

  ranges.forEach(([start, end], index) => {
    if (cursor < start) {
      parts.push(text.slice(cursor, start))
    }

    parts.push(
      <mark
        key={`${start}-${end}-${index}`}
        className="rounded-sm bg-[#9f4cf2]/12 px-1 text-[#9f4cf2]"
      >
        {text.slice(start, end)}
      </mark>,
    )

    cursor = end
  })

  if (cursor < text.length) {
    parts.push(text.slice(cursor))
  }

  return parts
}

function buildSnippet(content: string, query: string, fallback: string) {
  const normalizedQuery = normalizeForSearch(query)

  if (!normalizedQuery) {
    return fallback
  }

  const lowerContent = content.toLocaleLowerCase('zh-CN')
  const matchIndex = normalizedQuery
    .split(' ')
    .filter(Boolean)
    .map(term => lowerContent.indexOf(term))
    .find(index => index >= 0)

  if (matchIndex === undefined || matchIndex < 0) {
    return fallback
  }

  const start = Math.max(0, matchIndex - 28)
  const end = Math.min(content.length, matchIndex + 92)
  const prefix = start > 0 ? '...' : ''
  const suffix = end < content.length ? '...' : ''

  return `${prefix}${content.slice(start, end).trim()}${suffix}`
}

function useShortcutLabel() {
  const [shortcutLabel, setShortcutLabel] = useState('⌘K')

  useEffect(() => {
    const isMacPlatform = window.navigator.platform.toLowerCase().includes('mac')
    setShortcutLabel(isMacPlatform ? '⌘K' : 'Ctrl K')
  }, [])

  return shortcutLabel
}

export function DocsSearch({ entries }: { entries: DocSearchEntry[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const dialogInputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const shortcutLabel = useShortcutLabel()

  const preparedEntries = useMemo(
    () =>
      entries.map(entry => ({
        ...entry,
        normalizedTitle: normalizeForSearch(entry.title),
        normalizedSection: normalizeForSearch(entry.section ?? ''),
        normalizedDescription: normalizeForSearch(entry.description),
        normalizedContent: normalizeForSearch(entry.content),
        compactTitle: compactForSearch(entry.title),
        compactSection: compactForSearch(entry.section ?? ''),
        compactDescription: compactForSearch(entry.description),
        compactContent: compactForSearch(entry.content),
      })),
    [entries],
  )

  const normalizedTerms = useMemo(
    () =>
      deferredQuery
        .split(/\s+/)
        .map(term => normalizeForSearch(term))
        .filter(Boolean),
    [deferredQuery],
  )

  const compactTerms = useMemo(() => normalizedTerms.map(compactForSearch), [normalizedTerms])
  const highlightMatchers = useMemo(() => createHighlightMatchers(deferredQuery), [deferredQuery])

  const results = useMemo(() => {
    if (normalizedTerms.length === 0) {
      return preparedEntries.filter(entry => !entry.section)
    }

    return preparedEntries
      .filter(entry =>
        normalizedTerms.every((term, index) => {
          const compactTerm = compactTerms[index]

          return (
            entry.normalizedTitle.includes(term) ||
            entry.normalizedSection.includes(term) ||
            entry.normalizedDescription.includes(term) ||
            entry.normalizedContent.includes(term) ||
            entry.compactTitle.includes(compactTerm) ||
            entry.compactSection.includes(compactTerm) ||
            entry.compactDescription.includes(compactTerm) ||
            entry.compactContent.includes(compactTerm)
          )
        }),
      )
      .map(entry => {
        let score = 0

        normalizedTerms.forEach((term, index) => {
          const compactTerm = compactTerms[index]

          if (entry.normalizedTitle.includes(term) || entry.compactTitle.includes(compactTerm)) {
            score += 140
          }

          if (
            entry.normalizedSection.includes(term) ||
            entry.compactSection.includes(compactTerm)
          ) {
            score += 110
          }

          if (
            entry.normalizedDescription.includes(term) ||
            entry.compactDescription.includes(compactTerm)
          ) {
            score += 70
          }

          if (
            entry.normalizedContent.includes(term) ||
            entry.compactContent.includes(compactTerm)
          ) {
            score += 35
          }
        })

        return { ...entry, score }
      })
      .toSorted((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score
        }

        if (left.order !== right.order) {
          return left.order - right.order
        }

        if (left.section && !right.section) {
          return 1
        }

        if (!left.section && right.section) {
          return -1
        }

        return left.title.localeCompare(right.title, 'zh-CN')
      })
      .slice(0, visibleDocLimit)
  }, [compactTerms, normalizedTerms, preparedEntries])

  const groupedResults = useMemo(() => {
    return results.reduce<Array<{ group: string; items: typeof results }>>((groups, entry) => {
      const currentGroup = groups.find(group => group.group === entry.group)

      if (currentGroup) {
        currentGroup.items.push(entry)
        return groups
      }

      groups.push({
        group: entry.group,
        items: [entry],
      })

      return groups
    }, [])
  }, [results])

  useEffect(() => {
    if (!pathname) {
      return
    }

    setIsOpen(false)
    setQuery('')
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    requestAnimationFrame(() => {
      triggerButtonRef.current?.blur()
      dialogInputRef.current?.focus()
    })
  }, [isOpen])

  const handleSelect = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <>
      <div className="inline-flex">
        <button
          ref={triggerButtonRef}
          type="button"
          aria-label="搜索 Vyper 文档"
          onClick={() => {
            setIsOpen(true)
          }}
          className="inline-flex min-w-24 items-center justify-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-[#9f4cf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9f4cf2]/30 sm:min-w-0 sm:px-2.5 sm:py-1.5"
        >
          <Search className="size-4" />
          <span className="font-medium text-sm">搜索</span>
          <span className="hidden text-[11px] uppercase tracking-[0.12em] sm:inline-flex">
            {shortcutLabel}
          </span>
        </button>
      </div>

      <CommandDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        label="搜索 Vyper 文档"
        title="搜索文档"
        description="搜索文档页面和章节，并打开匹配的结果。"
        loop
        shouldFilter={false}
      >
        <div className="flex items-center gap-3 border-border border-b px-3 sm:px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <CommandInput
            ref={dialogInputRef}
            value={query}
            onValueChange={setQuery}
            placeholder="搜索文档、章节或关键字..."
            className="h-11 text-base sm:h-12 sm:text-sm"
          />
        </div>

        <CommandList className="docs-scrollbar max-h-[min(56vh,28rem)] p-1.5 sm:p-2">
          {groupedResults.length > 0 ? (
            groupedResults.map((group, index) => (
              <div key={group.group}>
                {index > 0 ? <CommandSeparator /> : null}
                <CommandGroup heading={group.group}>
                  {group.items.map(entry => (
                    <CommandItem
                      key={entry.id}
                      value={entry.id}
                      onSelect={() => {
                        handleSelect(entry.href)
                      }}
                    >
                      {entry.section ? (
                        <Hash className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate font-medium text-sm sm:text-sm">
                            {renderHighlightedText(entry.title, highlightMatchers)}
                          </span>
                          {entry.section ? (
                            <span className="rounded-md border border-border/80 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                              {renderHighlightedText(entry.section, highlightMatchers)}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 line-clamp-2 text-muted-foreground text-xs leading-5 sm:leading-5">
                          {renderHighlightedText(
                            buildSnippet(entry.content, deferredQuery, entry.description),
                            highlightMatchers,
                          )}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))
          ) : (
            <CommandEmpty>未找到相关文档内容，试试标题、章节名或 API 关键字。</CommandEmpty>
          )}
        </CommandList>

        <div className="flex items-center justify-between gap-3 border-border border-t px-3 py-2 text-[11px] text-muted-foreground sm:px-4">
          <span>
            {normalizedTerms.length === 0 ? '浏览全部文档' : `共 ${results.length} 条结果`}
          </span>
          <span className="hidden sm:inline">Enter 打开</span>
          <span className="sm:hidden">点按打开</span>
        </div>
      </CommandDialog>
    </>
  )
}
