import type { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'
import { SwitchTheme } from '@/ui/shadcn/switch-theme'
import { routes } from './constant'
import { MobileMenu } from './mobile-menu'

export const Header: FC<ComponentProps<'header'>> = () => {
  return (
    <header className="sticky top-0 z-50 border-border/60 border-b bg-background/80 backdrop-blur-xl">
      <MaxWidthWrapper className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight">Vyper</span>
        </Link>

        <nav className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {routes.map(v => (
              <Link
                key={v.href}
                href={v.href}
                target={v.external ? '_blank' : '_self'}
                className="rounded-md px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {v.name}
              </Link>
            ))}
            <div className="mx-1 h-4 w-px bg-border" />
          </div>
          <SwitchTheme />
          <MobileMenu />
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}
