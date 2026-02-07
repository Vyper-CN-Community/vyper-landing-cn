import type { ComponentProps, FC } from 'react'
import { HeroSection } from './hero-section'

export const HomePage: FC<ComponentProps<'div'>> = () => {
  return (
    <div className="m-auto flex min-h-screen flex-1 flex-col gap-16">
      <HeroSection />
    </div>
  )
}
