'use client'

import { motion } from 'motion/react'
import { type MouseEvent, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/shadcn'

type TocItem = {
  id: string
  label: string
}

const headingActivationOffset = 112
const pendingTargetThreshold = 24
const pendingTargetTimeout = 1800
const pendingTargetSettleDelay = 140

function getActiveTocId(items: TocItem[]) {
  if (items.length === 0) {
    return ''
  }

  let activeId = items[0]?.id ?? ''

  for (const item of items) {
    const heading = document.getElementById(item.id)

    if (!heading) {
      continue
    }

    if (heading.getBoundingClientRect().top <= headingActivationOffset) {
      activeId = item.id
      continue
    }

    break
  }

  return activeId
}

export function DocsTableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const pendingTargetIdRef = useRef<string | null>(null)
  const pendingTargetTimeoutRef = useRef<number | null>(null)
  const pendingTargetSettleTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    let frameId = 0

    const clearPendingTargetSettleTimeout = () => {
      if (pendingTargetSettleTimeoutRef.current !== null) {
        window.clearTimeout(pendingTargetSettleTimeoutRef.current)
        pendingTargetSettleTimeoutRef.current = null
      }
    }

    const clearPendingTarget = () => {
      pendingTargetIdRef.current = null

      if (pendingTargetTimeoutRef.current !== null) {
        window.clearTimeout(pendingTargetTimeoutRef.current)
        pendingTargetTimeoutRef.current = null
      }

      clearPendingTargetSettleTimeout()
    }

    const syncPendingTarget = () => {
      const pendingTargetId = pendingTargetIdRef.current

      if (!pendingTargetId) {
        return false
      }

      const pendingHeading = document.getElementById(pendingTargetId)

      if (!pendingHeading) {
        clearPendingTarget()
        return false
      }

      const distanceToTarget = Math.abs(
        pendingHeading.getBoundingClientRect().top - headingActivationOffset,
      )

      setActiveId(currentActiveId =>
        currentActiveId === pendingTargetId ? currentActiveId : pendingTargetId,
      )

      if (distanceToTarget <= pendingTargetThreshold) {
        clearPendingTargetSettleTimeout()
        pendingTargetSettleTimeoutRef.current = window.setTimeout(() => {
          clearPendingTarget()
        }, pendingTargetSettleDelay)
      } else {
        clearPendingTargetSettleTimeout()
      }

      return true
    }

    const updateActiveId = () => {
      frameId = 0

      if (syncPendingTarget()) {
        return
      }

      const nextActiveId = getActiveTocId(items)

      setActiveId(currentActiveId =>
        currentActiveId === nextActiveId ? currentActiveId : nextActiveId,
      )
    }

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateActiveId)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      clearPendingTarget()

      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [items])

  const handleTocClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault()

    const targetHeading = document.getElementById(targetId)

    if (!targetHeading) {
      return
    }

    pendingTargetIdRef.current = targetId
    setActiveId(currentActiveId => (currentActiveId === targetId ? currentActiveId : targetId))

    if (pendingTargetTimeoutRef.current !== null) {
      window.clearTimeout(pendingTargetTimeoutRef.current)
    }

    if (pendingTargetSettleTimeoutRef.current !== null) {
      window.clearTimeout(pendingTargetSettleTimeoutRef.current)
      pendingTargetSettleTimeoutRef.current = null
    }

    pendingTargetTimeoutRef.current = window.setTimeout(() => {
      pendingTargetIdRef.current = null
      pendingTargetTimeoutRef.current = null
      if (pendingTargetSettleTimeoutRef.current !== null) {
        window.clearTimeout(pendingTargetSettleTimeoutRef.current)
        pendingTargetSettleTimeoutRef.current = null
      }
    }, pendingTargetTimeout)

    window.history.pushState(null, '', `#${targetId}`)
    targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex flex-col gap-4 py-6">
      <p className="font-medium text-sm">本页目录</p>
      <nav className="flex flex-col gap-1.5">
        {items.map(item => {
          const isActive = activeId === item.id

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={event => handleTocClick(event, item.id)}
              className={cn(
                'relative rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'font-semibold text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {isActive ? (
                <motion.div
                  layoutId="active-docs-toc-bg"
                  className="absolute inset-0 rounded-lg bg-accent"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
