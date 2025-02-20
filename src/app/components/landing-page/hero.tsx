import { ProjectCard } from '../common/project-card'
import { TotalVisits } from '../common/total-visits'
import { UserCard } from '../common/user-card'
import { CreateNow } from '../dashboard/create-now'

export function Hero() {
  return (
    <div className="flex h-screen max-h-[1366px]">
      <div className="w-full flex flex-col gap-2 mt-[min(35vh,500px)]">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          Seus projetos e redes
          <br /> sociais em um único link
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>
        <CreateNow />
      </div>

      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard isOwner={false} isEditable={false} />
          <div className="absolute -bottom-[7%] -right-[45%]">
            <TotalVisits totalVisits={1234} />
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard
              project={{
                projectName: 'Projeto 1',
                projectDescription: 'Projeto 1',
              }}
              isOwner={false}
              projectImage="/project1.jpg"
            />
          </div>
          <div className="absolute -top-[5%] -left-[55%] -z-10">
            <ProjectCard
              project={{
                projectName: 'Projeto 2',
                projectDescription: 'Projeto 2',
              }}
              isOwner={false}
              projectImage="/project2.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
