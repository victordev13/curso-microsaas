import { Header } from '@/app/components/landing-page/header'
import { Button } from '@/app/components/ui/button'
import { VALOR_MENSAL, VALOR_VITALICIO } from '@/app/lib/config'

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <div className="flex gap-4">
        <Button>{VALOR_MENSAL} / Mês</Button>
        <Button>{VALOR_VITALICIO} / Vitalício</Button>
      </div>
    </div>
  )
}
