const siteConfig = require('./src/lib/seo/site-config.json')

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,
  generateRobotsTxt: true,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: isProduction ? [{ userAgent: '*', allow: '/' }] : [{ userAgent: '*', disallow: '/' }],
  },
}
