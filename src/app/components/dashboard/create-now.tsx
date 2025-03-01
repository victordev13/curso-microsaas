'use client'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { APP_DOMAIN } from '@/app/lib/config'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function CreateNow() {
  const [link, setLink] = useState<string>('')

  async function handleCreateNow() {
    signIn('google', {
      redirectTo: `/criar?link=${link}`,
    })
  }

  return (
    <div className="flex items-center gap-2 w-full mt-24">
      <span className="text-white text-xl">{APP_DOMAIN}/</span>
      <form action={handleCreateNow} className="flex items-center gap-2 w-ful">
        <Input
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Seu link"
        />
        <Button type="submit">Criar agora</Button>
      </form>
    </div>
  )
}
