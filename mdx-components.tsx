import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import Link from 'next/link'
import { isValidElement } from 'react'
import { cn } from '@/lib/utils/shadcn'
import { CodeHighlight } from '@/ui/components/shared/code-highlight'
import { SourceCode } from '@/ui/docs/source-code'

function Lead({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'text-lg text-muted-foreground leading-8 [&_p]:text-lg [&_p]:text-muted-foreground [&_p]:leading-8',
        className,
      )}
      {...props}
    />
  )
}

function Callout({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl border border-border/80 bg-card/70 p-5', className)}>
      <p className="font-medium text-sm">{title}</p>
      <div className="mt-3 text-muted-foreground text-sm leading-7">{children}</div>
    </div>
  )
}

function CardGrid({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('grid gap-4 md:grid-cols-2', className)} {...props} />
}

function DocCard({
  href,
  title,
  description,
  eyebrow,
}: {
  href: string
  title: string
  description: string
  eyebrow?: string
}) {
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className="not-prose rounded-2xl border border-border/80 bg-card/60 p-5 transition-colors hover:bg-accent/70"
    >
      {eyebrow ? (
        <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">{eyebrow}</p>
      ) : null}
      <p className="mt-2 font-medium text-base tracking-tight">{title}</p>
      <p className="mt-2 text-muted-foreground text-sm leading-6">{description}</p>
    </Link>
  )
}

function Anchor({ href = '', className, ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={cn(
          'underline decoration-border underline-offset-4 transition-colors hover:text-foreground',
          className,
        )}
        {...props}
      />
    )
  }

  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className={cn(
          'underline decoration-border underline-offset-4 transition-colors hover:text-foreground',
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'underline decoration-border underline-offset-4 transition-colors hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  if (isValidElement(children)) {
    const childProps = children.props as { children?: ReactNode; className?: string }
    const language = childProps.className?.replace('language-', '') || 'text'

    if (typeof childProps.children === 'string') {
      return <CodeHighlight code={childProps.children.trimEnd()} lang={language} className="my-6" />
    }
  }

  return (
    <pre
      className="my-6 overflow-x-auto rounded-2xl border border-border/80 bg-card/70 p-4 font-mono text-[13px] leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  )
}

function Table({ className, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border/80">
      <table className={cn('min-w-full border-collapse text-left text-sm', className)} {...props} />
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn('scroll-mt-24 font-semibold text-3xl tracking-tight sm:text-4xl', className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'mt-12 scroll-mt-24 border-border/70 border-t pt-8 font-semibold text-2xl tracking-tight',
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn('mt-8 scroll-mt-24 font-medium text-xl tracking-tight', className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4 className={cn('mt-6 font-medium text-lg tracking-tight', className)} {...props} />
    ),
    p: ({ className, ...props }) => (
      <p className={cn('text-base leading-8', className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'my-5 ml-5 list-disc text-base leading-8 marker:text-muted-foreground',
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'my-5 ml-5 list-decimal text-base leading-8 marker:text-muted-foreground',
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => <li className={cn('pl-1', className)} {...props} />,
    a: Anchor,
    pre: Pre,
    code: ({ className, ...props }) =>
      className ? (
        <code className={className} {...props} />
      ) : (
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.92em]" {...props} />
      ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'my-6 rounded-2xl border border-border/80 bg-card/60 p-5 text-muted-foreground',
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn('my-10 border-border/70', className)} {...props} />
    ),
    table: Table,
    thead: ({ className, ...props }) => (
      <thead className={cn('bg-muted/60', className)} {...props} />
    ),
    tr: ({ className, ...props }) => (
      <tr className={cn('border-border/70 border-b', className)} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th className={cn('px-4 py-3 font-medium text-foreground text-sm', className)} {...props} />
    ),
    td: ({ className, ...props }) => (
      <td className={cn('px-4 py-3 align-top text-muted-foreground', className)} {...props} />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn('font-medium text-foreground', className)} {...props} />
    ),
    Lead,
    Callout,
    CardGrid,
    DocCard,
    SourceCode,
    ...components,
  }
}
