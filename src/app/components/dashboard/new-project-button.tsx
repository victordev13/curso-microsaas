'use client'
import { useState } from 'react'
import { NewProjectModal } from './new-project-modal'
import { Plus } from 'lucide-react'

export function NewProjectButton({ profileId }: { profileId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <NewProjectModal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        profileId={profileId}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center transition-all hover:border border-dashed hover:bg-background-tertiary active:bg-background-primary"
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo Projeto</span>
      </button>
    </>
  )
}
