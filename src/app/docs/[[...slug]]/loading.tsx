const sidebarSkeletonItems = Array.from({ length: 18 }, (_, index) => index)
const contentSkeletonItems = Array.from({ length: 9 }, (_, index) => index)
const tocSkeletonItems = Array.from({ length: 5 }, (_, index) => index)

function SkeletonBar({ className }: { className: string }) {
  return <div className={`rounded-md bg-muted ${className}`} />
}

export default function DocsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 md:grid md:grid-cols-[240px_minmax(0,1fr)_220px] md:gap-6 md:px-6 xl:grid-cols-[280px_minmax(0,1fr)_240px] xl:gap-8">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] self-start border-border/80 border-r pr-6 md:block">
        <div className="flex h-full flex-col gap-6 overflow-hidden py-6">
          {sidebarSkeletonItems.map(item => (
            <SkeletonBar key={item} className={item % 5 === 0 ? 'h-4 w-20' : 'h-10 w-full'} />
          ))}
        </div>
      </aside>

      <main className="min-w-0 py-6 md:py-10">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          <header className="flex flex-col gap-5 border-border/80 border-b pb-8">
            <div className="flex items-center gap-3">
              <SkeletonBar className="h-3 w-24" />
              <SkeletonBar className="size-1 rounded-full" />
              <SkeletonBar className="h-3 w-28" />
            </div>
            <div className="flex flex-col gap-3">
              <SkeletonBar className="h-10 w-2/3 max-w-xl" />
              <SkeletonBar className="h-6 w-full max-w-2xl" />
              <SkeletonBar className="h-6 w-4/5 max-w-xl" />
            </div>
          </header>

          <div className="flex flex-col gap-6">
            {contentSkeletonItems.map(item => (
              <div key={item} className="flex flex-col gap-3">
                {item % 3 === 0 ? <SkeletonBar className="h-7 w-48" /> : null}
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-11/12" />
                <SkeletonBar className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </article>
      </main>

      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] self-start border-border/80 border-l pl-6 md:block">
        <div className="flex flex-col gap-4 py-6">
          <SkeletonBar className="h-4 w-20" />
          {tocSkeletonItems.map(item => (
            <SkeletonBar key={item} className="h-8 w-full" />
          ))}
        </div>
      </aside>
    </div>
  )
}
