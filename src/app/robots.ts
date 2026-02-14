export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'https://shemeel-portfolio.vercel.app'}/sitemap.xml`,
  }
}
