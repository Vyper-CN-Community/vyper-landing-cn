import type { ComponentProps } from 'react'
import { HeroSection } from './hero-section'
import { VyperVsSolidity } from './vyper-vs-solidity'

export const HomePage = async (props: ComponentProps<'div'>) => {
  return (
    <div className="m-auto flex min-h-screen flex-1 flex-col gap-16">
      <HeroSection />
      <VyperVsSolidity />
    </div>
  )
}
