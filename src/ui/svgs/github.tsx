import type { ComponentProps, FC } from 'react'
import { siGithub } from 'simple-icons'

export const GitHubIcon: FC<ComponentProps<'svg'>> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d={siGithub.path} />
    </svg>
  )
}
