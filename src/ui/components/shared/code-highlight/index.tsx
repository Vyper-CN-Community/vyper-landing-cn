import { cache } from 'react'
import { getSingletonHighlighter } from 'shiki'
import { cn } from '@/lib/utils/shadcn'
import { CopyCodeButton } from './copy-code-button'

const codeHighlightThemes = {
  light: 'github-light',
  dark: 'github-dark-high-contrast',
} as const

type ShikiHighlighter = Awaited<ReturnType<typeof getSingletonHighlighter>>
type CodeHighlightLanguage = Parameters<ShikiHighlighter['loadLanguage']>[number]
type CodeToHtmlLanguage = Parameters<ShikiHighlighter['codeToHtml']>[1]['lang']

const commonCodeLanguages = [
  'bash',
  'javascript',
  'json',
  'python',
  'solidity',
  'text',
  'vyper',
] satisfies CodeHighlightLanguage[]

const getCodeHighlighter = cache(async () => {
  const highlighter = await getSingletonHighlighter({
    themes: [codeHighlightThemes.light, codeHighlightThemes.dark],
  })

  await highlighter.loadLanguage(...commonCodeLanguages)

  return highlighter
})

const renderHighlightedCode = cache(async (code: string, lang: string) => {
  const highlighter = await getCodeHighlighter()

  try {
    await highlighter.loadLanguage(lang as CodeHighlightLanguage)

    return await highlighter.codeToHtml(code, {
      lang: lang as CodeToHtmlLanguage,
      themes: codeHighlightThemes,
      defaultColor: false,
    })
  } catch {
    return highlighter.codeToHtml(code, {
      lang: 'text' as CodeToHtmlLanguage,
      themes: codeHighlightThemes,
      defaultColor: false,
    })
  }
})

type CodeHighlightProps = {
  code: string
  lang: string
  className?: string
  showToolbar?: boolean
  embedded?: boolean
}

export async function CodeHighlight({
  code,
  lang,
  className,
  showToolbar = true,
  embedded = false,
}: CodeHighlightProps) {
  const html = await renderHighlightedCode(code, lang)

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
