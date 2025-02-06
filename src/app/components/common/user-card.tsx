/* eslint-disable @next/next/no-img-element */
import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import { Button } from '../ui/button'
import { Hr } from '@/app/components/ui/hr'
import { EditSocialLinksButton } from '@/app/components/dashboard/edit-social-links-button'
import Link from 'next/link'
import { Profile } from '@/app/services/get-profile-data'

const socialMediaIcons = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
}

export function UserCard({
  isOwner = false,
  isEditable = false,
  profileData,
}: {
  isOwner?: boolean
  isEditable?: boolean
  profileData: Profile
}) {
  return (
    <div className="w-[389px] flex flex-col gap-5 items-center p-10 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src="/me.jpg"
          alt="victordev"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            victordev
          </h3>
        </div>
        <p className="opacity-40">
          &quot;Eu faço produtos para a Internet&quot;
        </p>
      </div>
      <Hr />
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedia?.github && (
            <Link
              href={profileData?.socialMedia?.github}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <socialMediaIcons.github />
            </Link>
          )}
          {profileData?.socialMedia?.instagram && (
            <Link
              href={profileData?.socialMedia?.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <socialMediaIcons.instagram />
            </Link>
          )}
          {profileData?.socialMedia?.linkedin && (
            <Link
              href={profileData?.socialMedia?.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <socialMediaIcons.linkedin />
            </Link>
          )}
          {profileData?.socialMedia?.twitter && (
            <Link
              href={profileData?.socialMedia?.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <socialMediaIcons.twitter />
            </Link>
          )}
          {!profileData &&
            Object.values(socialMediaIcons).map((Icon, index) => (
              <button
                key={index}
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
              >
                <Icon />
              </button>
            ))}
          {isEditable && isOwner && (
            <EditSocialLinksButton socialMedia={profileData.socialMedia} />
          )}
        </div>
        <Hr className="my-3" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full flex flex-col items-center gap-5">
          <Button className="w-full">Template SaaS - Compre Agora</Button>
          <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  )
}
