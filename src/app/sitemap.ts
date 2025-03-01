import { MetadataRoute } from 'next'
import { PUBLIC_URL } from './lib/config'
import { SOCIAL_MEDIA_WITH_PAGES } from './services/social-media/get-page-details-from-social-media'

export default function sitemap(): MetadataRoute.Sitemap {
  const socialMediaPages: MetadataRoute.Sitemap = SOCIAL_MEDIA_WITH_PAGES.map(
    (media) => ({
      url: `${PUBLIC_URL}/share/link-na-bio-para-${media}`,
      lastModified: new Date().toISOString(),
      priority: 0.5,
    }),
  )

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: PUBLIC_URL,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
  ]

  return [...staticPages, ...socialMediaPages]
}
