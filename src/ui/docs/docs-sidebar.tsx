'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/utils/shadcn'

const sidebarScrollStorageKey = 'docs-sidebar-scroll-top'

function readSavedScrollTop() {
  const savedScrollTop = window.sessionStorage.getItem(sidebarScrollStorageKey)

  if (!savedScrollTop) {
    return 0
  }

  const parsedScrollTop = Number(savedScrollTop)

  return Number.isFinite(parsedScrollTop) ? parsedScrollTop : 0
}

function saveScrollTop(scrollTop: number) {
  window.sessionStorage.setItem(sidebarScrollStorageKey, String(scrollTop))
}

export function DocsSidebar({
  currentHref,
  sections,
  className,
}: {
  currentHref: string
  sections: Array<{
    title: string
    items: Array<{
      href: string
      title: string
    }>
  }>
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current

    if (!container || !currentHref) {
      return
    }

    container.scrollTop = readSavedScrollTop()
  }, [currentHref])

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const handleScroll = () => {
      saveScrollTop(container.scrollTop)
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const persistScrollPosition = () => {
    const container = containerRef.current

    if (!container) {
      return
    }

    saveScrollTop(container.scrollTop)
  }

  return (
    <div
      ref={containerRef}
      className={cn('docs-scrollbar flex h-full flex-col overflow-y-auto', className)}
    >
      <div className="py-6">
        <nav className="flex flex-col gap-8">
          {sections.map(section => (
            <div key={section.title} className="flex flex-col gap-3">
              <p className="px-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                {section.title}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={persistScrollPosition}
                    aria-current={currentHref === item.href ? 'page' : undefined}
                    className={cn(
                      'rounded-xl border px-3 py-3 text-sm leading-6 transition-colors',
                      currentHref === item.href
                        ? 'border-transparent bg-card text-foreground'
                        : 'border-transparent text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
