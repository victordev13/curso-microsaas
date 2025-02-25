import Link from 'next/link'
import { ProjectCard } from '../../components/common/project-card'
import { TotalVisits } from '../../components/common/total-visits'
import { UserCard } from '../../components/common/user-card'
import { getProfileData } from '@/app/services/get-profile-data'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/app/lib/auth'
import { NewProjectButton } from '@/app/components/dashboard/new-project-button'
import { getProfileProjects } from '@/app/services/get-profile-projects'
import { getFileURL } from '@/app/lib/firebase'
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits'

interface DashboardProps {
  params: Promise<{ profileId: string }>
}

export default async function Dashboard({ params }: DashboardProps) {
  const { profileId } = await params

  const profileData = await getProfileData(profileId)
  if (!profileData) {
    return notFound()
  }

  const session = await auth()
  const isOwner = session?.user?.id === profileData.userId

  const projects = await getProfileProjects(profileId)

  if (!isOwner) {
    await increaseProfileVisits({ profileId })
  }

  if (isOwner && !session?.user.isTrial && !session?.user.isSubscribed) {
    redirect(`/${profileId}/upgrade`)
  }

  return (
    <div className="relative h-screen p-20 flex overflow-hidden">
      {isOwner && session?.user.isTrial && !session.user.isSubscribed && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
          <span>Você está usando a versão de testes.</span>
          <Link
            href={`/${profileId}/upgrade`}
            className="text-accent-green font-bold"
          >
            Fazer upgrade
          </Link>
        </div>
      )}
      <div className="w-1/2 flex justify-center h-min">
        <UserCard
          isOwner={isOwner}
          isEditable={true}
          profileData={profileData}
        />
      </div>
      <div className="w-full flex justify-center gap-4 content-start flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            projectImage={await getFileURL(project.imagePath)}
          />
        ))}
        {isOwner && <NewProjectButton profileId={profileId} />}
      </div>
      <div className="absolute bottom-4 right-0 left-0  w-min mx-auto">
        {isOwner && <TotalVisits totalVisits={profileData.totalVisits} />}
      </div>
    </div>
  )
}
