import { FAQ } from '@/app/components/landing-page/FAQ'
import { Header } from '@/app/components/landing-page/header'
import { Hero } from '@/app/components/landing-page/hero'
import { Pricing } from '@/app/components/landing-page/pricing'
import { VideoExplanation } from '@/app/components/landing-page/video-explanation'

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
