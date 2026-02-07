import type { FC } from 'react'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/utils/shadcn'

export const CodeHighlight: FC<{
  code: string
  lang: string
  className?: string
}> = async ({ code, lang, className }) => {
  const html = await codeToHtml(code, {
    lang,
    theme: 'github-dark',
  })

  return (
    <div
      className={cn(
        '[&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-[#1e1e1e]! [&_pre]:p-4',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
