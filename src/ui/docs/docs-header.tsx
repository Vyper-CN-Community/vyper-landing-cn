'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { VyperLogo } from '@/ui/components/shared/vyper-logo'
import { SwitchTheme } from '@/ui/shadcn/switch-theme'

type DocsHeaderEntry = {
  href: string
  title: string
}

const DocsBrand = memo(function DocsBrand() {
  return (
    <Link href="/" className="flex items-center gap-2">
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

export function DocsHeader({ docs }: { docs: DocsHeaderEntry[] }) {
  const pathname = normalizePathname(usePathname())
  const currentDoc = docs.find(doc => doc.href === pathname) ?? docs[0]

  return (
    <header className="sticky top-0 z-50 border-border/80 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <DocsBrand />
          <span className="hidden h-4 w-px bg-border md:block" />
          <p className="hidden truncate text-muted-foreground text-sm md:block">
            {currentDoc.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
