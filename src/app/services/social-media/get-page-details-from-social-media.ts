export const SOCIAL_MEDIA_WITH_PAGES = [
  'instagram',
  'linkedin',
  'x',
  'facebook',
  'youtube',
]

export const getPageDetailsFromSocialMedia = (slug: string) => {
  for (const socialMedia of SOCIAL_MEDIA_WITH_PAGES) {
    const socialMediaSlug = `link-na-bio-para-${socialMedia}`

    if (slug === socialMediaSlug) {
      const capitalizeSocialMedia =
        socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1)

      return {
        title: `Link na bio para ${capitalizeSocialMedia}`,
        description: `Compartilhe seus projetos no ${capitalizeSocialMedia}`,
      }
    }
  }

  return undefined
}
