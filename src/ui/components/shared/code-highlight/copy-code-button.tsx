'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/ui/shadcn/button'

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'absolute'
  textArea.style.left = '-9999px'

  document.body.append(textArea)
  textArea.select()

  const copied = document.execCommand('copy')

  textArea.remove()

  if (!copied) {
    throw new Error('copy_failed')
  }
}

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
      await copyText(value)
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
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? '已复制' : '复制'}
    </Button>
  )
}
