import type { ComponentProps, FC } from 'react'
import Image from 'next/image'
import vyperColorLogo from './vyper-color-logo.svg'

export const VyperLogo: FC<ComponentProps<'div'>> = () => {
  return <Image src={vyperColorLogo} alt="vyper logo" height={32} width={32} className="m-auto" />
}
