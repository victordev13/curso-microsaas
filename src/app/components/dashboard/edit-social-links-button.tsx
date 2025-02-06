'use client'
import { SquarePen } from 'lucide-react'
import { EditSocialLinksModal, SocialMedia } from './edit-social-links-modal'
import { useState } from 'react'

export function EditSocialLinksButton({
  socialMedia,
}: {
  socialMedia: SocialMedia
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <EditSocialLinksModal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        socialMedia={socialMedia}
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
