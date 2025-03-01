import { FAQ } from '@/app/components/landing-page/FAQ'
import { Header } from '@/app/components/landing-page/header'
import { Hero } from '@/app/components/landing-page/hero'
import { Pricing } from '@/app/components/landing-page/pricing'
import { VideoExplanation } from '@/app/components/landing-page/video-explanation'
import { getPageDetailsFromSocialMedia } from '@/app/services/social-media/get-page-details-from-social-media'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ socialMedia: string }>
}) {
  const { socialMedia } = await params

  const socialMediaPageDetails = getPageDetailsFromSocialMedia(socialMedia)

  if (!socialMediaPageDetails) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero
        title={socialMediaPageDetails.title}
        description={socialMediaPageDetails.description}
      />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  )
}
