import type { ComponentProps, FC } from 'react'
import { Header } from './(home)/layout/header'

export const MainLayout: FC<ComponentProps<'div'>> = ({ children }) => {
  return (
    <div className="min-h-screen w-full font-sans">
      <Header />
      <div className="mb-40 flex min-h-screen flex-col justify-between px-2.5">
        <div className="mx-auto flex min-h-screen w-full max-w-230 flex-col">
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  )
}
