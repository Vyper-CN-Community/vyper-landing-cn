'use client'

import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/ui/shadcn/button'
import { copyToClipboard } from '@/ui/shadcn/copy-button'

export function CopyCodeButton() {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const container = event.currentTarget.closest<HTMLElement>('[data-code-highlight-root]')
    const codeElement = container?.querySelector('pre code') ?? container?.querySelector('pre')
    const value = codeElement?.textContent?.trimEnd()

    if (!value) {
      toast.error('没有可复制的代码')
      return
    }

    try {
      await copyToClipboard(value)
      setCopied(true)

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      toast.error('复制失败，请手动复制')
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={handleCopy}
      aria-label={copied ? '代码已复制' : '复制代码'}
      className="h-8 rounded-md px-2 font-medium text-muted-foreground text-xs hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.25, bounce: 0.2 }}
            className="inline-flex items-center gap-1"
          >
            <Check className="size-3.5" />
            已复制
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.25, bounce: 0.2 }}
            className="inline-flex items-center gap-1"
          >
            <Copy className="size-3.5" />
            复制
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
