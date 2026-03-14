'use client'

import type { DocSearchEntry } from '@/content/docs/search-types'
import { Github } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useEffect, useRef } from 'react'
import { VyperLogo } from '@/ui/components/shared/vyper-logo'
import { DocsSearch } from '@/ui/docs/docs-search'
import { SwitchTheme } from '@/ui/shadcn/switch-theme'

type DocsHeaderEntry = {
  href: string
  title: string
}

const DocsBrand = memo(function DocsBrand() {
  return (
    <Link href="/" className="flex -translate-y-1 items-center gap-2">
      <VyperLogo className="size-5" />
      <h2 className="mt-1 -ml-1.5 font-bold font-mono text-2xl text-[#9f4cf2] tracking-tight">
        yper
      </h2>
    </Link>
  )
})

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

const titleVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 8 : -8,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -8 : 8,
  }),
}

export function DocsHeader({
  docs,
  searchEntries,
}: {
  docs: DocsHeaderEntry[]
  searchEntries: DocSearchEntry[]
}) {
  const pathname = normalizePathname(usePathname())
  const currentIndex = docs.findIndex(doc => doc.href === pathname)
  const resolvedIndex = currentIndex === -1 ? 0 : currentIndex
  const previousIndexRef = useRef(resolvedIndex)
  const currentDoc = docs[resolvedIndex] ?? docs[0]
  const direction = resolvedIndex >= previousIndexRef.current ? 1 : -1

  useEffect(() => {
    previousIndexRef.current = resolvedIndex
  }, [resolvedIndex])

  return (
    <header className="sticky top-0 z-50 border-border/80 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-3 md:h-14 md:flex-row md:items-center md:gap-6 md:px-6 md:py-0">
        <div className="flex min-w-0 items-center justify-between gap-3 md:flex-1">
          <div className="flex min-w-0 items-center gap-3">
            <DocsBrand />
            <span className="hidden h-4 w-px bg-border md:block" />
            <div className="hidden h-5 min-w-0 flex-1 overflow-hidden md:block">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.p
                  key={currentDoc.href}
                  custom={direction}
                  variants={titleVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="truncate text-muted-foreground text-sm"
                >
                  {currentDoc.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="https://github.com/Vyper-CN-Community/vyper-landing-cn"
              target="_blank"
              rel="noreferrer"
              aria-label="查看 GitHub 仓库"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Github className="size-4.5" />
            </Link>
            <SwitchTheme aria-label="切换主题" />
          </div>
        </div>
        <div className="flex w-full justify-center md:w-auto md:flex-none">
          <DocsSearch entries={searchEntries} />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="https://github.com/Vyper-CN-Community/vyper-landing-cn"
            target="_blank"
            rel="noreferrer"
            aria-label="查看 GitHub 仓库"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Github className="size-4.5" />
          </Link>
          <SwitchTheme aria-label="切换主题" />
        </div>
      </div>
    </header>
  )
}
