import type { FC } from 'react'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/utils/shadcn'
import { CopyCodeButton } from './copy-code-button'

export const CodeHighlight: FC<{
  code: string
  lang: string
  className?: string
  showToolbar?: boolean
  embedded?: boolean
}> = async ({ code, lang, className, showToolbar = true, embedded = false }) => {
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
      data-code-highlight-root={embedded ? undefined : true}
      className={cn(
        embedded
          ? '[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:leading-relaxed'
          : 'overflow-hidden rounded-2xl border border-border/80 bg-card/70 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:leading-relaxed',
        className,
      )}
    >
      {showToolbar ? (
        <div className="flex items-center justify-between gap-3 border-border/80 border-b px-4 py-2.5">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
            {lang}
          </p>
          <CopyCodeButton />
        </div>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
