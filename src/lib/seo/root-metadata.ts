import type { Metadata } from 'next'
import {
  siteDescription,
  siteKeywords,
  siteLocale,
  siteName,
  sitePublisher,
  siteTitle,
  siteUrl,
} from './metadata-builders'

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  authors: [
    {
      name: sitePublisher,
      url: siteUrl,
    },
  ],
  creator: sitePublisher,
  publisher: sitePublisher,
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
    },
    types: {
      'application/xml': `${siteUrl}/sitemap.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteLocale,
    url: '/',
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
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
