import type { ComponentProps } from 'react'
import { Footer } from './footer'
import { HeroSection } from './hero-section'
import { VyperVsSolidity } from './vyper-vs-solidity'

export const HomePage = async (props: ComponentProps<'div'>) => {
  return (
    <div className="flex flex-1 flex-col">
      <HeroSection />
      <div className="border-border border-t" />
      <VyperVsSolidity />
      <Footer />
    </div>
  )
}
