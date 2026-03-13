import { readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { CodeHighlight } from '@/ui/components/shared/code-highlight'

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
    <div className="not-prose my-6">
      <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-border/80 bg-card/60 px-4 py-2">
        <p className="truncate font-mono text-[12px] text-muted-foreground">{title ?? path}</p>
      </div>
      <CodeHighlight code={code} lang={resolvedLanguage} />
    </div>
  )
}
