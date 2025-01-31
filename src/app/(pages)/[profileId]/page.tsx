import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from '../../components/common/project-card'
import { TotalVisits } from '../../components/common/total-visits'
import { UserCard } from '../../components/common/user-card'

interface DashboardProps {
  params: Promise<{ profileId: string }>
}

export default async function Dashboard({ params }: DashboardProps) {
  const { profileId } = await params

  return (
    <div className="relative h-screen p-20 flex overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão de testes.</span>
        <Link
          href={`/${profileId}/upgrade`}
          className="text-accent-green font-bold"
        >
          Fazer upgrade
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>
      <div className="w-full flex justify-center gap-4 content-start flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <button className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center transition-all hover:border border-dashed hover:bg-background-tertiary active:bg-background-primary">
          <Plus className="size-10 text-accent-green" />
          <span>Novo Projeto</span>
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0  w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  )
}
