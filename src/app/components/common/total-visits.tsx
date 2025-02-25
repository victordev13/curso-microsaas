'use server'

import { mergeClasses } from '@/app/lib/utils'
import { TrendingUp } from 'lucide-react'
import { Hr } from '@/app/components/ui/hr'
import { signOut } from '@/app/lib/auth'
import { PortalButton } from '../dashboard/portal-button'

interface TotalVisits {
  totalVisits: number
  showActionsBar?: boolean
  showPortalButton?: boolean
}

export async function TotalVisits({
  totalVisits,
  showActionsBar = false,
  showPortalButton,
}: TotalVisits) {
  async function handleLogout() {
    'use server'
    await signOut({ redirectTo: '/' })
  }

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
        <span className="text-3xl font-bold">{totalVisits}</span>
        <TrendingUp />
      </div>
      <Hr orientation="vertical" />
      {showActionsBar && (
        <div className="flex items-center gap-2">
          {showPortalButton && <PortalButton />}
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </div>
  )
}
