import type { ComponentProps, FC } from 'react'
import { MaxWidthWrapper } from '../components/shared/max-width-wrapper'
import { Header } from './(home)/layout/header'

export const MainLayout: FC<ComponentProps<'div'>> = ({ children }) => {
  return (
    <div className="min-h-screen w-full font-sans">
      <Header />
      <MaxWidthWrapper className="mx-auto flex w-full max-w-5xl flex-col">
        {children}
      </MaxWidthWrapper>
    </div>
  )
}
