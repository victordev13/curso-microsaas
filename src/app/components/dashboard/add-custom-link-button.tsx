'use client'
import { Plus } from 'lucide-react'
import { AddCustomLinkModal } from './add-custom-link-modal'
import { useState } from 'react'

export function AddCustomLinkButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <AddCustomLinkModal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
      />
      <button
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus />
      </button>
    </>
  )
}
