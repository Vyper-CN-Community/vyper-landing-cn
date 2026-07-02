'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'

const routePrefetchRadius = 2
const routePrefetchStartDelay = 120
const routePrefetchStepDelay = 220
const routePrefetchBackgroundDelay = 1000

function getUniqueHrefs(hrefs: string[]) {
  const hrefSet = new Set<string>()

  return hrefs.filter(href => {
    if (hrefSet.has(href)) {
      return false
    }

    hrefSet.add(href)
    return true
  })
}

export function DocsRoutePrefetcher({ hrefs }: { hrefs: string[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const prefetchedHrefSetRef = useRef(new Set<string>())

  const orderedHrefs = useMemo(() => {
    const currentIndex = hrefs.indexOf(pathname)

    if (currentIndex === -1) {
      return hrefs
    }

    const nearbyHrefs: string[] = []

    for (let distance = 1; distance <= routePrefetchRadius; distance += 1) {
      const nextHref = hrefs[currentIndex + distance]
      const previousHref = hrefs[currentIndex - distance]

      if (nextHref) {
        nearbyHrefs.push(nextHref)
      }

      if (previousHref) {
        nearbyHrefs.push(previousHref)
      }
    }

    return getUniqueHrefs([...nearbyHrefs, ...hrefs])
  }, [hrefs, pathname])

  useEffect(() => {
    const timeoutIds: number[] = []

    const prefetchHref = (href: string) => {
      if (href === pathname || prefetchedHrefSetRef.current.has(href)) {
        return
      }

      prefetchedHrefSetRef.current.add(href)
      router.prefetch(href)
    }

    orderedHrefs.forEach((href, index) => {
      const delay =
        index < 4
          ? routePrefetchStartDelay + index * routePrefetchStepDelay
          : routePrefetchBackgroundDelay + index * routePrefetchStepDelay

      timeoutIds.push(window.setTimeout(() => prefetchHref(href), delay))
    })

    return () => {
      timeoutIds.forEach(timeoutId => {
        window.clearTimeout(timeoutId)
      })
    }
  }, [orderedHrefs, pathname, router])

  return null
}
