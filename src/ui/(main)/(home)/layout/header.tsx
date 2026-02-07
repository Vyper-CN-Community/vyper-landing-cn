import type { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'
import { VyperLogo } from '@/ui/components/shared/vyper-logo'
import { SwitchTheme } from '@/ui/shadcn/switch-theme'
import { routes } from './constant'

export const Header: FC<ComponentProps<'header'>> = () => {
  return (
    <header className="sticky top-0 h-16 border-b border-dashed bg-white dark:bg-black">
      <MaxWidthWrapper className="flex justify-between">
        <h1 className="flex items-center justify-center gap-4 py-2">
          <Link href={'/'}>
            <VyperLogo />
          </Link>
          <div className="flex flex-col">
            {/* TODO: font style */}
            <span className="font-extrabold text-xl underline">Vyper</span>
            <p className="text-sm">Pythonic language for Ethereum</p>
          </div>
        </h1>

        <ul className="flex items-center gap-6">
          {routes.map(v => (
            <li key={v.href} className="hover:underline">
              <Link
                href={v.href}
                target={v.external ? '_blank' : '_self'}
                className="cursor-pointer"
              >
                {v.name}
              </Link>
            </li>
          ))}
          <SwitchTheme className="-ml-2" />
        </ul>
      </MaxWidthWrapper>
    </header>
  )
}
