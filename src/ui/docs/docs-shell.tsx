import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Github } from 'lucide-react'
import Link from 'next/link'
import {
  type DocPage,
  docsNavigation,
  getAdjacentDocs,
  getDocEditHref,
} from '@/content/docs/registry'
import { cn } from '@/lib/utils/shadcn'
import { DocsSidebar } from '@/ui/docs/docs-sidebar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/shadcn/accordion'

const shellTopOffset = 'sticky top-14 self-start h-[calc(100vh-3.5rem)]'
const docsSidebarSections = docsNavigation.map(section => ({
  title: section.title,
  items: section.items.map(item => ({
    href: item.href,
    title: item.title,
  })),
}))

export function DocsShell({ doc }: { doc: DocPage }) {
  const { previous, next } = getAdjacentDocs(doc.slug)
  const Content = doc.Content
  const editHref = getDocEditHref(doc.slug)

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 md:grid md:grid-cols-[240px_minmax(0,1fr)_220px] md:gap-6 md:px-6 xl:grid-cols-[280px_minmax(0,1fr)_240px] xl:gap-8">
      <aside className={cn('hidden md:block', shellTopOffset)}>
        <DocsSidebar
          currentHref={doc.href}
          sections={docsSidebarSections}
          className="border-border/80 border-r pr-6"
        />
      </aside>

      <main className="min-w-0 py-6 md:py-10">
        <DocsMobileSidebar currentHref={doc.href} />
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          <header className="flex flex-col gap-5 border-border/80 border-b pb-8">
            <div className="flex items-center gap-3 text-muted-foreground text-xs uppercase tracking-[0.2em]">
              <span>{doc.group}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Vyper 中文文档</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="max-w-3xl text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
                {doc.title}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground leading-8">{doc.description}</p>
            </div>
          </header>

          <div className="min-w-0 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:scroll-mt-24 [&_h2]:border-border/70 [&_h2]:border-t [&_h2]:pt-8 [&_h2]:font-semibold [&_h2]:text-2xl [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:scroll-mt-24 [&_h3]:font-medium [&_h3]:text-xl [&_h3]:tracking-tight [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:scroll-mt-24 [&_h4]:font-medium [&_h4]:text-lg [&_h4]:tracking-tight">
            <Content />
          </div>

          <div className="border-border/80 border-t pt-6">
            <a
              href={editHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
              <span>在 GitHub 上编辑此页</span>
            </a>
          </div>

          <footer className="grid gap-3 border-border/80 border-t pt-8 md:grid-cols-2">
            <PagerCard
              direction="上一页"
              doc={previous}
              className={!previous ? 'pointer-events-none opacity-40' : ''}
            />
            <PagerCard
              direction="下一页"
              doc={next}
              align="right"
              className={!next ? 'pointer-events-none opacity-40' : ''}
            />
          </footer>

          {doc.toc.length > 0 ? (
            <div className="rounded-2xl border border-border/80 bg-card/60 p-5 md:hidden">
              <p className="font-medium text-sm">本页目录</p>
              <nav className="mt-4 flex flex-col gap-2">
                {doc.toc.map(item => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : null}
        </article>
      </main>

      <aside className={cn('hidden md:block', shellTopOffset)}>
        <div className="docs-scrollbar h-full overflow-y-auto border-border/80 border-l pl-6">
          <DocsTableOfContents items={doc.toc} />
        </div>
      </aside>
    </div>
  )
}

function DocsMobileSidebar({ currentHref }: { currentHref: string }) {
  return (
    <div className="mb-8 md:hidden">
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border/80 bg-card/60 px-4"
      >
        <AccordionItem value="navigation">
          <AccordionTrigger className="text-sm">文档导航</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-6 pb-1">
              {docsNavigation.map(section => (
                <div key={section.title} className="flex flex-col gap-2">
                  <p className="font-semibold text-foreground/80 text-sm uppercase tracking-[0.18em]">
                    {section.title}
                  </p>
                  <div className="flex flex-col gap-1">
                    {section.items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'rounded-xl px-3 py-2.5 text-sm transition-colors',
                          currentHref === item.href
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function DocsTableOfContents({ items }: { items: DocPage['toc'] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 py-6">
      <p className="font-medium text-sm">本页目录</p>
      <nav className="flex flex-col gap-1.5">
        {items.map(item => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className="rounded-lg px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function PagerCard({
  direction,
  doc,
  align,
  className,
}: {
  direction: string
  doc?: DocPage
  align?: 'right'
  className?: string
}) {
  const content = doc ? (
    <>
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">{direction}</p>
      <p
        className={cn(
          'mt-2 font-medium text-base tracking-tight',
          align === 'right' ? 'text-right' : undefined,
        )}
      >
        {doc.title}
      </p>
    </>
  ) : (
    <>
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">{direction}</p>
      <p
        className={cn(
          'mt-2 font-medium text-base tracking-tight',
          align === 'right' ? 'text-right' : undefined,
        )}
      >
        已到末尾
      </p>
    </>
  )

  const classes =
    'rounded-2xl border border-border/80 bg-card/60 p-5 transition-colors hover:bg-accent/60'

  if (!doc) {
    return <div className={cn(classes, className)}>{content}</div>
  }

  return (
    <Link href={doc.href} className={cn(classes, className)}>
      {content}
    </Link>
  )
}

export function DocsSurface({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border/80 bg-card/60 p-5 text-sm leading-7',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
