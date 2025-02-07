'use client'
/* eslint-disable @next/next/no-img-element */
import { mergeClasses, parseUrl } from '@/app/lib/utils'
import Link from 'next/link'

interface ProjectCardProps {
  project: {
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

  function handleClickProject() {
    // TODO: Implementar contagem de cliques
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
              {project.totalVisits || 0} cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold">{project.projectName}</span>
            <span className="text-content-body text-sm">
              {project.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
