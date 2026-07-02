import type { CSSProperties } from 'react'
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
type CodeToTokensLanguage = Parameters<ShikiHighlighter['codeToTokens']>[1]['lang']

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

const renderHighlightedCode = cache(async (code: string, lang: CodeHighlightLanguage) => {
  const highlighter = await getCodeHighlighter()

  await highlighter.loadLanguage(lang)

  return highlighter.codeToTokens(code, {
    lang: lang as CodeToTokensLanguage,
    themes: codeHighlightThemes,
    defaultColor: false,
  })
})

const getStyleValue = (style: string | undefined, property: string) =>
  style
    ?.split(';')
    .find(declaration => declaration.startsWith(`${property}:`))
    ?.slice(property.length + 1)

const getLineKeys = (code: string) => {
  const keys: string[] = []
  let offset = 0

  for (const line of code.split('\n')) {
    keys.push(String(offset))
    offset += line.length + 1
  }

  return keys
}

export async function CodeHighlight({
  code,
  lang,
  className,
  showToolbar = true,
  embedded = false,
}: {
  code: string
  lang: string
  className?: string
  showToolbar?: boolean
  embedded?: boolean
}) {
  const { tokens, fg, bg } = await renderHighlightedCode(code, lang as CodeHighlightLanguage)
  const lineKeys = getLineKeys(code)
  const highlightedLines = tokens.map((line, lineIndex) => ({
    key: lineKeys[lineIndex],
    tokens: line,
  }))
  const preStyle = {
    '--shiki-light': getStyleValue(fg, '--shiki-light'),
    '--shiki-dark': getStyleValue(fg, '--shiki-dark'),
    '--shiki-light-bg': getStyleValue(bg, '--shiki-light-bg'),
    '--shiki-dark-bg': getStyleValue(bg, '--shiki-dark-bg'),
  } as CSSProperties

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
      <pre className="shiki shiki-themes github-light github-dark-high-contrast" style={preStyle}>
        <code>
          {highlightedLines.map(line => (
            <span className="line" key={line.key}>
              {line.tokens.map(token => (
                <span key={token.offset} style={token.htmlStyle as CSSProperties}>
                  {token.content}
                </span>
              ))}
              {line.key === lineKeys.at(-1) ? null : '\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
