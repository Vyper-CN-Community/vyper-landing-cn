'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { Button } from '@/ui/shadcn/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/shadcn/drawer'
import { routes } from './constant'

export const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-l-border/60">
        <DrawerHeader className="text-left">
          <DrawerTitle>导航</DrawerTitle>
          <DrawerDescription className="hidden">导航菜单</DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-2 p-4">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              target={route.external ? '_blank' : '_self'}
              className="flex items-center rounded-md px-4 py-3 font-medium text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
