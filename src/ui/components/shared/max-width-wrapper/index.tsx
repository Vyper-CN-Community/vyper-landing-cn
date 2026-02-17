import type { ComponentProps, FC } from 'react'
import { cn } from '@/lib/utils/shadcn'

export const MaxWidthWrapper: FC<ComponentProps<'div'>> = ({ children, className }) => {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 md:px-6', className)}>{children}</div>
}
