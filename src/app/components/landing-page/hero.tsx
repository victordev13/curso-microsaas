import { ProjectCard } from './project-card'
import { TotalVisits } from './total-visits'
import { UserCard } from './user-card'

export function Hero() {
  return (
    <div className="flex border">
      <div className="w-full flex flex-col gap-2 mt-[35vh]">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          Seus projetos e redes sociais em um único link
        </h1>
        <h2>
          Crie sua própria página de projetos e compartilhes eles com o mundo
        </h2>
        <br />
        Acompanhe o engajamento com Analytics, e fique por dentro dos cliques
        <div className="item-center gap-2 w-full -mt-[10vh]"></div>
        <div className="text-white text-xl">eudev.test</div>
        <input type="text" />
        <button>Criar agora</button>
      </div>

      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%, #4b2dbb, transparent_55%)]">
        <div className="relative">
          <UserCard />
          <div className="absolute -bottom-[7%] -right-[45%]">
            <TotalVisits />
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard />
          </div>
          <div className="absolute -top-[5%] -left-[55%] -z-10">
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  )
}
