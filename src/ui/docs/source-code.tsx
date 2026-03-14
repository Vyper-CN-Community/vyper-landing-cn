import { readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { CodeHighlight } from '@/ui/components/shared/code-highlight'
import { CopyCodeButton } from '@/ui/components/shared/code-highlight/copy-code-button'

const languageByExtension: Record<string, string> = {
  '.json': 'json',
  '.py': 'python',
  '.sol': 'solidity',
  '.txt': 'text',
  '.vy': 'vyper',
}

export async function SourceCode({
  path,
  lang,
  title,
}: {
  path: string
  lang?: string
  title?: string
}) {
  const absolutePath = join(process.cwd(), path)
  const code = readFileSync(absolutePath, 'utf8').trimEnd()
  const resolvedLanguage = lang ?? languageByExtension[extname(path)] ?? 'text'

  return (
    <div
      data-code-highlight-root
      className="not-prose my-6 overflow-hidden rounded-2xl border border-border/80 bg-card/60"
    >
      <div className="flex items-center justify-between gap-3 border-border/80 border-b px-4 py-2.5">
        <div className="min-w-0">
          <p className="truncate font-mono text-[12px] text-muted-foreground">{title ?? path}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
            {resolvedLanguage}
          </p>
          <CopyCodeButton />
        </div>
      </div>
      <CodeHighlight code={code} lang={resolvedLanguage} showToolbar={false} embedded />
    </div>
  )
}
