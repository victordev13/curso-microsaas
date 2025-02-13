'use client'
/* eslint-disable @next/next/no-img-element */

import { increaseProjectVisits } from '@/app/actions/increase-project-visits'
import { mergeClasses, parseUrl } from '@/app/lib/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ProjectCardProps {
  project: {
    id?: string
    projectName: string
    projectDescription: string
    projectUrl?: string
    imagePath?: string
    totalVisits?: number
  }
  isOwner: boolean
  projectImage: string
}

export function ProjectCard({
  project,
  projectImage,
  isOwner,
}: ProjectCardProps) {
  const projectUrl = project.projectUrl ? parseUrl(project.projectUrl) : null

  const routeParams = useParams()

  async function handleClickProject() {
    if (isOwner || !project.id || !routeParams.profileId) return

    await increaseProjectVisits({
      profileId: String(routeParams.profileId),
      projectId: project.id,
    })
  }

  return (
    <Link
      href={projectUrl || '#'}
      target="_blank"
      rel="noreferrer noopener"
      onClick={handleClickProject}
    >
      <div
        className={mergeClasses(
          'w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent',
          ' hover:border-border-secondary',
        )}
      >
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={projectImage}
            alt={`Imagem do projeto "${project.projectName}"`}
            title={`Imagem do projeto "${project.projectName}"`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {project.totalVisits || 0} clique(s)
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold">{project.projectName}</span>
            <span className="text-content-body text-sm">
              {`${project.projectDescription.substring(0, 70)}...`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
