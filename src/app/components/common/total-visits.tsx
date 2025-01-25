import { mergeClasses } from '@/app/lib/utils'
import { TrendingUp } from 'lucide-react'
import { Hr } from '../ui/Hr'

export function TotalVisits() {
  return (
    <div
      className={mergeClasses(
        'w-min px-8 py-3 rounded-xl shaddow-lg whitespace-nowrap',
        'flex items-center gap-5',
        'bg-background-secondary border border-bottom border-border-primary',
      )}
    >
      <span className="font-bold text-white">Total de visitas</span>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">1234</span>
        <TrendingUp />
      </div>
      <Hr orientation="vertical" />
      <div className="flex items-center gap-2">
        <button>Portal</button>
        <button>Sair</button>
      </div>
    </div>
  )
}
