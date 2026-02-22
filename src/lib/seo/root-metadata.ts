import type { Metadata } from 'next'
import siteConfig from './site-config.json'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl
const siteName = siteConfig.siteName
const siteLocale = siteConfig.siteLocale

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
const description = siteConfig.description
const title = `${siteName} | ${siteConfig.titleSuffix}`

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: '/',
    types: {
      'application/xml': `${siteUrl}/sitemap.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteLocale,
    url: '/',
    siteName: siteName,
    title,
    description,
  },
  twitter: {
    card: 'summary',
    title: siteName,
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
