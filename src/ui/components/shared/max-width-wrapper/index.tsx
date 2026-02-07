import type { ComponentProps, FC } from 'react'
import { cn } from '@/lib/utils/shadcn'

export const MaxWidthWrapper: FC<ComponentProps<'div'>> = ({ children, className }) => {
  return <div className={cn('mx-auto max-w-5xl', className)}>{children}</div>
}
