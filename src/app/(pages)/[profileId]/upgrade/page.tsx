import { ChoosePlanButtons } from '@/app/components/dashboard/upgrade/choose-plan-buttons'
import { Header } from '@/app/components/landing-page/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SouEuDev - Upgrade',
  description: 'Escolha o plano para fazer upgrade no SouEuDev.',
}
export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <div className="flex gap-4">
        <ChoosePlanButtons />
      </div>
    </div>
  )
}
