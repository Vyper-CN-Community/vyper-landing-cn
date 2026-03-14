import type { Metadata } from 'next'
import siteConfig from './site-config.json'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl
export const siteName = siteConfig.siteName
export const siteLocale = siteConfig.siteLocale
export const siteDescription = siteConfig.description
export const siteTitle = `${siteName} | ${siteConfig.titleSuffix}`
export const siteKeywords = siteConfig.keywords
export const sitePublisher = 'Vyper CN Community'

type SeoDocPage = {
  title: string
  description: string
  href: string
  group: string
  toc: Array<{
    label: string
  }>
}

const docsBaseKeywords = [
  ...siteKeywords,
  'Vyper 教程',
  'Vyper 中文教程',
  'Vyper 开发文档',
  'Vyper 合约示例',
  'Vyper 开发指南',
  'Vyper 智能合约开发',
]

const docsGroupKeywords: Record<string, string[]> = {
  概览: ['Vyper 文档概览', 'Vyper 学习路径', 'Vyper 中文指南'],
  入门: ['Vyper 安装', 'Vyper 快速开始', 'Vyper 入门教程'],
  语言基础: ['Vyper 语法', 'Vyper 类型系统', 'Vyper 合约基础'],
  进阶: ['Vyper 模块', 'Vyper 接口', 'Vyper 事件', 'Vyper 内建函数'],
  工具与规范: ['Vyper 编译', 'Vyper 测试', 'Vyper NatSpec', 'Vyper 部署'],
  资源: ['Vyper 资源', 'Vyper 版本策略', 'Vyper 发布记录'],
  示例: ['Vyper 示例', 'Vyper 合约示例', 'Vyper 实战示例'],
}

function uniqueKeywords(keywords: string[]) {
  return [...new Set(keywords.map(keyword => keyword.trim()).filter(Boolean))]
}

function buildDocKeywords(doc: SeoDocPage) {
  const tocKeywords = doc.toc
    .slice(0, 6)
    .flatMap(item => [item.label, `${doc.title} ${item.label}`])

  return uniqueKeywords([
    ...docsBaseKeywords,
    ...(docsGroupKeywords[doc.group] ?? []),
    doc.title,
    `${doc.title} Vyper`,
    `${doc.title} 中文文档`,
    `Vyper ${doc.title}`,
    `${doc.group} 文档`,
    ...tocKeywords,
  ])
}

export function createDocMetadata(doc: SeoDocPage): Metadata {
  const keywords = buildDocKeywords(doc)
  const pageTitle = `${doc.title} | ${siteName}`

  return {
    title: doc.title,
    description: doc.description,
    keywords,
    category: doc.group,
    alternates: {
      canonical: doc.href,
    },
    openGraph: {
      type: 'article',
      locale: siteLocale,
      url: doc.href,
      siteName,
      title: pageTitle,
      description: doc.description,
      section: doc.group,
      tags: keywords.slice(0, 12),
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description: doc.description,
    },
  }
}
