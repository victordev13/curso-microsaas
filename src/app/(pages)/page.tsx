import { FAQ } from '@/app/components/landing-page/FAQ'
import { Header } from '@/app/components/landing-page/header'
import { Hero } from '@/app/components/landing-page/hero'
import { Pricing } from '@/app/components/landing-page/pricing'
import { VideoExplanation } from '@/app/components/landing-page/video-explanation'
import { CallToAction } from '@/app/components/landing-page/call-to-action'
import { Footer } from '@/app/components/landing-page/footer'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  )
}
