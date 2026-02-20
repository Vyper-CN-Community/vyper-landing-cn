import type { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { FadeIn } from '@/ui/components/shared/fade-in'
import { MaxWidthWrapper } from '@/ui/components/shared/max-width-wrapper'

export const HeroSection: FC<ComponentProps<'div'>> = () => {
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-28">
      <MaxWidthWrapper className="flex flex-col items-center">
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
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="https://docs.vyperlang.org/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-lg bg-foreground px-5 font-medium text-background text-sm transition-opacity hover:opacity-90"
            >
              开始使用
            </Link>
            <Link
              href="https://github.com/vyperlang/vyper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-lg border border-border px-5 font-medium text-sm transition-colors hover:bg-accent"
            >
              GitHub
            </Link>
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
