import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils/shadcn'
import vyperColorLogo from './vyper-color-logo.svg'

export const VyperLogo = ({
  size = 32,
  className,
  ...props
}: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & { size?: number }) => {
  return (
    <Image
      src={vyperColorLogo}
      alt="Vyper logo"
      height={size}
      width={size}
      className={cn('m-auto', className)}
      {...props}
    />
  )
}
