import type { Metadata } from 'next'

const SITE_URL = 'https://cn.vyperlang.org'
const SITE_NAME = 'Vyper 中文社区'
const SITE_LOCALE = 'zh_CN'

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'

const description =
  'Vyper 是面向 EVM 的智能合约语言，专注于安全性、简洁性和可审计性。探索 Vyper 与 Solidity 对比、审计实践与开发文档。'

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 安全、简洁、可审计的智能合约开发`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    'Vyper',
    'Vyper 中文社区',
    '智能合约',
    'EVM',
    'Solidity',
    '以太坊',
    '区块链开发',
    '智能合约安全',
    'Vyperlang',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: '/',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 安全、简洁、可审计的智能合约开发`,
    description,
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME,
    description,
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: 'origin-when-cross-origin',
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}
