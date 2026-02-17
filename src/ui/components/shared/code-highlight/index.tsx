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
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  })

  return (
    <div
      className={cn(
        '[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-card! [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:leading-relaxed',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
