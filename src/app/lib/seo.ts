import { Metadata } from 'next'

interface SEOTagsParams {
  title: string
  description: string
  keywords: string[]
  appDomain: string
  canonicalUrlRelative: string
  extraTags?: Metadata
}

export function getSEOTags({
  title,
  description,
  keywords,
  appDomain,
  canonicalUrlRelative,
  extraTags,
}: SEOTagsParams): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    applicationName: title,
    metadataBase: new URL(appDomain),

    openGraph: {
      title,
      description,
      url: appDomain,
      siteName: title,
      locale: 'pt_BR',
      type: 'website',
    },

    twitter: {
      title,
      description,
      card: 'summary_large_image',
      creator: '@victor.soueudev',
    },

    alternates: {
      canonical: canonicalUrlRelative,
      languages: {
        pt: canonicalUrlRelative,
      },
    },

    ...extraTags,
  }
}
