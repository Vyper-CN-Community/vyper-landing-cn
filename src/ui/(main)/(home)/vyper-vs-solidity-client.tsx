'use client'

import type { FC, ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/shadcn/accordion'

export const VyperVsSolidityClient: FC<{
  items: {
    title: string
    description: string
    vyperCode: ReactNode
    solidityCode: ReactNode
  }[]
}> = ({ items }) => {
  return (
    <div className="mx-auto mb-20 flex w-full flex-1 flex-col gap-8">
      <header className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-semibold text-2xl">探索 Vyper 优势</h3>
        <p className="border-gray-600 border-b border-dashed">
          Vyper
          的设计理念并非仅限于理论。了解其对清晰度、安全性和效率的关注如何在实践中转化为更简洁、更安全、更高效的代码。
        </p>
      </header>

      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-medium text-xl">{item.title}</AccordionTrigger>
            <AccordionContent>
              <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row">
                <div className="min-w-0 flex-1 overflow-hidden rounded-md">
                  <div className="py-2 font-medium text-muted-foreground text-sm">Vyper</div>
                  <div className="overflow-x-auto">{item.vyperCode}</div>
                </div>
                <div className="min-w-0 flex-1 overflow-hidden rounded-md">
                  <div className="py-2 font-medium text-muted-foreground text-sm">Solidity</div>
                  <div className="overflow-x-auto">{item.solidityCode}</div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
