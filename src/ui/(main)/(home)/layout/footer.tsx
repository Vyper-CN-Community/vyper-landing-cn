import type { FC } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'
import cnVxVyper from '../assets/cn-socials/cn-vx-vyper.jpg'

type FooterLink = {
  name: string
  href?: string
  external?: boolean
  previewImage?: StaticImageData
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    title: '资源',
    links: [
      { name: '文档', href: '/docs', external: false },
      { name: '博客', href: 'https://blog.vyperlang.org/', external: true },
      {
        name: '示例',
        href: 'https://docs.vyperlang.org/en/latest/vyper-by-example.html',
        external: true,
      },
    ],
  },
  {
    title: '社区',
    links: [
      { name: 'GitHub', href: 'https://github.com/vyperlang/vyper', external: true },
      { name: 'Discord', href: 'https://discord.gg/6tw7PTM7C2', external: true },
      { name: '贡献', href: 'https://github.com/vyperlang/vyper/issues', external: true },
    ],
  },
  {
    title: '中文社区',
    links: [
      {
        name: '抖音',
        href: 'https://www.douyin.com/user/MS4wLjABAAAASlI-rjHzTCAne3DdX5Sx1-5OUEEbuAI9MVEjS0eCm07Pdm9yVOaGpKm7hzwDnbBX',
        external: true,
      },
      {
        name: '小红书',
        href: 'https://www.xiaohongshu.com/user/profile/5c5cb3ce000000001b035781',
        external: true,
      },
      {
        name: 'bilibili',
        href: 'https://space.bilibili.com/3546633404943057',
        external: true,
      },
      {
        name: '知乎',
        href: 'https://www.zhihu.com/people/vyper-',
        external: true,
      },
      {
        name: '微信公众号',
        previewImage: cnVxVyper,
      },
    ],
  },
  {
    title: '更多',
    links: [
      { name: 'Ethereum', href: 'https://ethereum.org/', external: true },
      { name: 'EVM', href: 'https://ethereum.org/en/developers/docs/evm/', external: true },
    ],
  },
]

export const Footer: FC = () => {
  return (
    <footer className="border-border border-t">
      <MaxWidthWrapper className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-bold text-lg tracking-tight">Vyper</span>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              面向 EVM 的 Pythonic 智能合约语言
            </p>
          </div>
          {footerLinks.map(section => (
            <div key={section.title}>
              <h4 className="mb-3 font-medium text-sm">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    {link.previewImage ? (
                      <div className="group relative w-fit">
                        <button
                          type="button"
                          className="cursor-default text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                          aria-label={`${link.name}二维码`}
                        >
                          {link.name}
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-40 translate-y-2 rounded-xl border border-border bg-background/95 p-2 opacity-0 shadow-2xl transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
                          <Image
                            src={link.previewImage}
                            alt={`${link.name}二维码`}
                            className="h-auto w-full rounded-lg"
                            placeholder="blur"
                          />
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href ?? '#'}
                        target={link.external ? '_blank' : '_self'}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-border border-t pt-6">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Vyper. MIT License.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
