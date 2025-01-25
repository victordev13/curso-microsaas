/* eslint-disable @next/next/no-img-element */
import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import { Button } from '../ui/button'
import { Hr } from '../ui/Hr'

export function UserCard() {
  const socialMedia = [
    { Icon: Github, link: 'https://github.com' },
    { Icon: Instagram, link: 'https://instagram.com' },
    { Icon: Linkedin, link: 'https://linkedin.com' },
    { Icon: Twitter, link: 'https://twitter.com' },
    { Icon: Plus, link: '#' },
  ]

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
          {socialMedia.map(({ Icon, link }, index) => (
            <a
              href={link}
              target="_blank"
              key={index}
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Icon />
            </a>
          ))}
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
