'use client'

import type { FC } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

type Testimonial = {
  quoteEn: string
  quoteZh: string
  profileUrl: string
  avatarUrl: string
  name: string
  title: string
}

const testimonials: Testimonial[] = [
  {
    quoteEn:
      'Vyper makes complex codebases much easier to reason about. Teams that are looking for languages that are safer-by-design should heavily consider using Vyper.',
    quoteZh:
      'Vyper 让复杂代码库更容易推理。正在寻找“默认更安全”语言的团队，应该认真考虑使用 Vyper。',
    profileUrl: 'https://x.com/NotDeGhost',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1595959772821745664/0_xwCCBc_400x400.png',
    name: 'Robert Chen',
    title: 'Ottersec 创始人',
  },
  {
    quoteEn:
      'Thanks to Vyper, Sugar has become one of the finest examples of onchain products, serving some of the largest protocols and communities on the Superchain.',
    quoteZh:
      '得益于 Vyper，Sugar 已成为链上产品中的优秀范例之一，并服务于 Superchain 上一些最大的协议与社区。',
    profileUrl: 'https://x.com/velodromefi',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1691796621825015808/Fg8OvCnf_400x400.jpg',
    name: 'Stas',
    title: 'Velodrome Finance 团队成员',
  },
]

export const VyperTestimonials: FC = () => {
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
          <h2 className="mt-3 font-bold text-3xl tracking-tighter md:text-4xl">
            社区如何评价 Vyper
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.profileUrl}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.35 }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, delay: index * 0.08, ease: 'easeOut' },
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-7"
            >
              <motion.div
                aria-hidden
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent via-background to-background"
              />

              <div className="relative">
                <p className="font-medium text-sm leading-relaxed">
                  <span className="block text-foreground">{`"${item.quoteEn}"`}</span>
                  <span className="mt-3 block text-muted-foreground">{`“${item.quoteZh}”`}</span>
                </p>

                <div className="mt-6 border-border border-t pt-4">
                  <Link
                    href={item.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-lg transition-colors hover:text-foreground"
                  >
                    <Image
                      src={item.avatarUrl}
                      alt={`${item.name} 头像`}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 rounded-full border border-border object-cover"
                    />
                    <span>
                      <span className="block font-medium text-sm">{item.name}</span>
                      <span className="mt-1 block text-muted-foreground text-xs">{item.title}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
