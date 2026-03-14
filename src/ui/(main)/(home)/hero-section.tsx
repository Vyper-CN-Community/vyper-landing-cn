import type { ComponentProps, FC } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/ui/components/shared/fade-in'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'
import { Button } from '@/ui/shadcn/button'
import snekDeveloper from './assets/sneks/snek-developer.png'

export const HeroSection: FC<ComponentProps<'div'>> = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-28">
      <MaxWidthWrapper className="relative flex flex-col items-center">
        <div className="pointer-events-none absolute bottom-32 left-0 -z-10 opacity-30 md:opacity-50">
          <Image
            src={snekDeveloper}
            alt=""
            width={400}
            height={400}
            className="h-auto w-48 object-contain md:w-80"
          />
        </div>
        <FadeIn>
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-muted-foreground text-xs">
            Pythonic Smart Contract Language for EVM
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="max-w-4xl text-center font-bold text-3xl leading-[1.15] tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl">
            <span>用 Vyper 构建</span>
            <br />
            <span className="text-muted-foreground">安全可靠的智能合约</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-2xl text-center text-base text-muted-foreground leading-relaxed md:text-lg">
            Vyper 是面向 EVM 的智能合约语言，专注于安全性、简洁性和可审计性。
            <br className="hidden sm:block" />像 Python 一样简单，像堡垒一样安全。
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl bg-foreground/10 blur-xl motion-safe:animate-[pulse_3s_ease-in-out_infinite]"
              />
              <Button asChild size="lg" className="group relative overflow-hidden rounded-xl">
                <Link href="/docs">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-background/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative flex items-center gap-2">
                    <span aria-hidden className="relative flex size-2 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-background/70 motion-safe:animate-ping" />
                      <span className="relative size-2 rounded-full bg-background" />
                    </span>
                    开始使用
                    <ArrowRight
                      data-icon="inline-end"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Button>
            </div>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link
                href="https://github.com/vyperlang/vyper"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <MaxWidthWrapper className="mt-24 grid gap-px overflow-hidden rounded-xl border border-border bg-border px-0! md:grid-cols-3">
            <FeatureCard
              title="安全设计"
              description="内置溢出检查、重入保护和边界检查。Vyper 从语言层面消除常见漏洞，让您专注于业务逻辑。"
            />
            <FeatureCard
              title="极致可读"
              description="受 Python 启发的简洁语法，使代码易于阅读、审查和审计。更少的歧义意味着更低的风险。"
            />
            <FeatureCard
              title="Gas 高效"
              description="强大的编译器从高级 Python 风格代码生成高度优化的字节码，无需牺牲代码清晰度。"
            />
          </MaxWidthWrapper>
        </FadeIn>
      </MaxWidthWrapper>
    </section>
  )
}

const FeatureCard: FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="bg-background p-6 md:p-8">
      <h3 className="mb-2 font-semibold text-sm tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}
