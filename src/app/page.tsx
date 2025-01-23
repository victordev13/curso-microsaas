import { FAQ } from '@/components/landing-page/FAQ'
import { Header } from '@/components/landing-page/header'
import { Hero } from '@/components/landing-page/hero'
import { Pricing } from '@/components/landing-page/pricing'
import { VideoExplanation } from '@/components/landing-page/video-explanation'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-white">Hello World</div>
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  )
}
