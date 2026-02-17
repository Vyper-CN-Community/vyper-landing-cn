import type { ComponentProps } from 'react'
import { HeroSection } from './hero-section'
import { Footer } from './layout/footer'
import { Sponsors } from './sponsors'
import { VyperSecurityAduit } from './vyper-security-audit'
import { VyperTestimonials } from './vyper-testimonials'
import { VyperVsSolidity } from './vyper-vs-solidity'

export const HomePage = async (props: ComponentProps<'div'>) => {
  return (
    <div className="flex flex-1 flex-col">
      <HeroSection />
      <VyperTestimonials />
      <VyperVsSolidity />
      <VyperSecurityAduit />
      <Sponsors />
      <Footer />
    </div>
  )
}
