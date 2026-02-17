import type { FC } from 'react'
import Link from 'next/link'

const footerLinks = [
  {
    title: '资源',
    links: [
      { name: '文档', href: 'https://docs.vyperlang.org/en/latest/', external: true },
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
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
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
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
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
      </div>
    </footer>
  )
}
