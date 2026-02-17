'use client'

import type { ComponentProps, FC } from 'react'
import { motion } from 'motion/react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import anatomistAvatar from './assets/audits/anatomist.jpg'
import chainsecurityLogo from './assets/audits/chainsecurity.svg'
import ottersecLogo from './assets/audits/ottersec.svg'
import statemindAvatar from './assets/audits/statemind.jpg'

type AuditPartner = {
  name: string
  website: string
  description: string
  image: StaticImageData
  imageMode: 'cover' | 'contain'
  imageWrapperClassName?: string
}

const auditPartners: AuditPartner[] = [
  {
    name: 'ChainSecurity',
    website: 'https://www.chainsecurity.com/',
    description: '形式化分析与智能合约安全研究',
    image: chainsecurityLogo,
    imageMode: 'contain',
  },
  {
    name: 'OtterSec',
    website: 'https://osec.io/',
    description: '专注 DeFi 协议和 EVM 审计',
    image: ottersecLogo,
    imageMode: 'contain',
    imageWrapperClassName: 'bg-foreground',
  },
  {
    name: 'Anatomi.st',
    website: 'https://anatomi.st/',
    description: '协议安全工程与审计服务',
    image: anatomistAvatar,
    imageMode: 'cover',
  },
  {
    name: 'Statemind',
    website: 'https://statemind.io/',
    description: '智能合约安全审计与验证',
    image: statemindAvatar,
    imageMode: 'cover',
  },
]

export const VyperSecurityAduit: FC<ComponentProps<'section'>> = () => {
  return (
    <section className="border-border border-t px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Security Audits
          </p>
          <h2 className="mt-3 font-bold text-3xl tracking-tighter md:text-4xl">
            由顶级安全团队持续审计
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg">
            Vyper 代码库与生态项目持续接受外部审计，公开结果可追踪、可复核。
          </p>
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {auditPartners.map((partner, index) => (
            <Link
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/60 via-background to-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`relative h-11 w-11 overflow-hidden rounded-md border border-border bg-background ${partner.imageWrapperClassName ?? ''}`}
                    >
                      <Image
                        src={partner.image}
                        alt={`${partner.name} logo`}
                        fill
                        className={`p-1 ${
                          partner.imageMode === 'cover' ? 'object-cover p-0' : 'object-contain'
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="mt-6 font-semibold text-base tracking-tight">{partner.name}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          className="mt-5 rounded-xl border border-border bg-card p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm leading-relaxed">
              查看 Vyper 官方审计仓库，获取历史报告与公开结论。
            </p>
            <Link
              href="https://github.com/vyperlang/audits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
            >
              浏览审计仓库
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
