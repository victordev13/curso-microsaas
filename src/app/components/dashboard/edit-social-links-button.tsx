'use client'
import { SquarePen } from 'lucide-react'
import { EditSocialLinksModal } from './edit-social-links-modal'
import { useState } from 'react'

export function EditSocialLinksButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <EditSocialLinksModal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
      />
      <button
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
        onClick={() => setIsModalOpen(true)}
      >
        <SquarePen />
      </button>
    </>
  )
}
