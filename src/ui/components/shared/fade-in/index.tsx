'use client'

import type { ComponentProps, FC } from 'react'
import { motion } from 'motion/react'

export const FadeIn: FC<
  ComponentProps<typeof motion.div> & {
    delay?: number
  }
> = ({ delay = 0, children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
