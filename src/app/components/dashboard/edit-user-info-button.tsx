'use client'

import { UserPen } from 'lucide-react'
import { EditUserInfoModal } from './edit-user-info-modal'
import { useState } from 'react'

interface EditUserInfoButtonProps {
  profileData?: {
    name?: string
    description?: string
    profilePictureUrl?: string
  }
}

export function EditUserInfoButton({ profileData }: EditUserInfoButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <EditUserInfoModal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        profileData={profileData}
      />
      <button
        className="p-2 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
        onClick={() => setIsModalOpen(true)}
      >
        <UserPen />
      </button>
    </>
  )
}
