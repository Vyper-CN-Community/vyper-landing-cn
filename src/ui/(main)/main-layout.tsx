import type { ComponentProps, FC } from 'react'
import { Header } from './(home)/layout/header'

export const MainLayout: FC<ComponentProps<'div'>> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}
