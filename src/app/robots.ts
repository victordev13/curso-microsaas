import type { MetadataRoute } from 'next'
import { PUBLIC_URL } from './lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/', '/_next/', '/static/'],
    },
    host: PUBLIC_URL,
    sitemap: PUBLIC_URL + '/sitemap.xml',
  }
}
