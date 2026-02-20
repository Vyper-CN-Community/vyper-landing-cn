'use client'

import { AnimatePresence, motion } from 'motion/react'
import { type FC, type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils/shadcn'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'

export const VyperVsSolidityClient: FC<{
  items: {
    title: string
    shortTitle: string
    description: string
    vyperCode: ReactNode
    solidityCode: ReactNode
  }[]
}> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]

  return (
    <section className="py-20 md:py-28">
      <MaxWidthWrapper>
        <div className="mb-4 text-center">
          <h2 className="font-bold text-3xl tracking-tighter md:text-4xl">探索 Vyper 优势</h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            对比 Vyper 与 Solidity，了解简洁设计如何转化为更安全、更高效的代码。
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-row gap-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:w-72 lg:shrink-0 lg:flex-col lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative shrink-0 whitespace-nowrap rounded-lg px-4 py-3 text-left text-sm transition-colors',
                  index === activeIndex
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10 md:hidden">{item.shortTitle}</span>
                <span className="relative z-10 hidden md:inline">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <div className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Vyper
                    </div>
                    {activeItem.vyperCode}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Solidity
                    </div>
                    {activeItem.solidityCode}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
