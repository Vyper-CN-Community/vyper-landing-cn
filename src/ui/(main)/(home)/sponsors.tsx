'use client'

import type { ComponentProps, FC } from 'react'
import { motion } from 'motion/react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/shadcn'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'
import snekTeam from './assets/sneks/snek-team.png'
import aerodromeLogo from './assets/sponsors/aerodrome.png'
import arbitrumLogo from './assets/sponsors/arbitrum.png'
import curveLogo from './assets/sponsors/curve.png'
import ensLogo from './assets/sponsors/ens.png'
import ethereumLogo from './assets/sponsors/ethereum.png'
import gccLogo from './assets/sponsors/gcc.png'
import lidoLogo from './assets/sponsors/lido.png'
import octantLogo from './assets/sponsors/octant.png'
import optimismLogo from './assets/sponsors/optimism.png'
import polygonLogo from './assets/sponsors/polygon.svg'
import sponsorCtaLogo from './assets/sponsors/snek-love.png'
import yearnLogo from './assets/sponsors/yearn.png'

type Sponsor = {
  name: string
  link: string
  description: string
  image: StaticImageData
  imageMode: 'cover' | 'contain'
  imageClassName?: string
  imageWrapperClassName?: string
}

const sponsors: Sponsor[] = [
  {
    name: 'Curve',
    link: 'https://www.curve.finance/dex/',
    description: '通过先进的曲线机制构建深度链上流动性',
    image: curveLogo,
    imageMode: 'cover',
  },
  {
    name: 'GCC',
    link: 'https://www.gccofficial.org/en',
    description: '全球华人社区领先的公共物品捐赠基金',
    image: gccLogo,
    imageMode: 'contain',
  },
  {
    name: 'Ethereum Foundation',
    link: 'https://ethereum.foundation/',
    description: '致力于支持 Ethereum 生态的非营利组织',
    image: ethereumLogo,
    imageMode: 'contain',
  },
  {
    name: 'Optimism',
    link: 'https://optimism.io/',
    description: '使用率领先的区块链基础设施',
    image: optimismLogo,
    imageMode: 'contain',
  },
  {
    name: 'Lido',
    link: 'https://lido.fi/',
    description: '让质押更简单',
    image: lidoLogo,
    imageMode: 'cover',
  },
  {
    name: 'Yearn',
    link: 'https://yearn.fi',
    description: '以 DeFi 方式提升加密资产收益',
    image: yearnLogo,
    imageMode: 'cover',
  },
  {
    name: 'Aerodrome Finance',
    link: 'https://aerodrome.finance/',
    description: 'Base 网络的核心流动性枢纽',
    image: aerodromeLogo,
    imageMode: 'contain',
  },
  {
    name: 'Arbitrum',
    link: 'https://arbitrum.io/',
    description: '提升 Ethereum 使用体验的领先 Layer 2 扩容方案',
    image: arbitrumLogo,
    imageMode: 'contain',
  },
  {
    name: 'Polygon',
    link: 'https://polygon.technology/',
    description: '构建无限可扩展的主权区块链网络',
    image: polygonLogo,
    imageMode: 'contain',
  },
  {
    name: 'Octant',
    link: 'https://octant.app/',
    description: 'Golem Foundation 发起的去中心化治理与公共物品资助实验',
    image: octantLogo,
    imageMode: 'contain',
  },
  {
    name: 'ENS - Ethereum Name Service',
    link: 'https://ens.domains/',
    description: '你的 Web3 身份系统，一个名称管理所有加密地址',
    image: ensLogo,
    imageMode: 'contain',
  },
  {
    name: 'Become a sponsor',
    link: 'https://github.com/vyperlang/vyper?sponsor=1',
    description: '可直接向多签地址捐赠，或联系我们进行合作赞助',
    image: sponsorCtaLogo,
    imageMode: 'contain',
    imageClassName: 'scale-125',
    imageWrapperClassName: 'bg-accent',
  },
]

export const Sponsors: FC<ComponentProps<'section'>> = () => {
  return (
    <section className="relative overflow-hidden border-border border-t py-20 md:py-28">
      <MaxWidthWrapper className="relative">
        <div className="pointer-events-none absolute -top-12 right-0 -z-10 opacity-30 md:opacity-50">
          <Image
            src={snekTeam}
            alt=""
            width={300}
            height={300}
            className="h-auto w-40 object-contain md:w-64"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Sponsors
          </p>
          <h2 className="mt-3 font-bold text-3xl tracking-tighter md:text-4xl">感谢生态赞助伙伴</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg">
            Vyper 由多个协议与公共产品组织支持，共同推动安全、开源的智能合约基础设施。
          </p>
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor, index) => {
            const isGcc = sponsor.name === 'GCC'

            return (
              <Link
                key={sponsor.name}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={isGcc ? { y: -2 } : undefined}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                  className={cn(
                    'relative h-full overflow-hidden rounded-xl border border-border p-5',
                    isGcc ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'bg-card',
                  )}
                >
                  {!isGcc && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/60 via-background to-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  )}
                  {isGcc && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-background/80 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />
                  )}

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11">
                        {isGcc && (
                          <span
                            aria-hidden
                            className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl leading-none"
                          >
                            👑
                          </span>
                        )}
                        <div
                          className={cn(
                            'relative h-11 w-11 overflow-hidden rounded-md border border-border bg-background',
                            sponsor.imageWrapperClassName,
                          )}
                        >
                          <Image
                            src={sponsor.image}
                            alt={`${sponsor.name} logo`}
                            fill
                            className={cn(
                              sponsor.imageMode === 'cover'
                                ? 'object-cover p-0'
                                : 'object-contain p-1',
                              sponsor.imageClassName,
                            )}
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-base tracking-tight">{sponsor.name}</h3>
                    </div>

                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                      {sponsor.description}
                    </p>

                    {isGcc && (
                      <p className="mt-4 border-border border-t pt-3 font-medium text-foreground text-xs leading-relaxed">
                        特别感谢 GCC 赞助 Vyper 中文社区
                      </p>
                    )}
                  </div>
                </motion.article>
              </Link>
            )
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
