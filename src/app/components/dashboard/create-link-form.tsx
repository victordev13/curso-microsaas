'use client'
import { registerLink } from '@/app/actions/register-link'
import { verifyLinkIsAlreadyTaken } from '@/app/actions/verify-link-is-already-taken'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { sanitizeUrlPath } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { useActionState, useRef, useState } from 'react'

export function CreateLinkForm() {
  const router = useRouter()

  const [link, setLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    setLink(sanitizeUrlPath(e.target.value))
  }

  async function handleCreateLink() {
    if (!link) {
      inputRef.current?.focus()
      setError('Você ainda não informou um link 🤔')
      return
    }

    if (await verifyLinkIsAlreadyTaken(link)) {
      inputRef.current?.focus()
      setError('Desculpe, mas esse link já está em uso 😢')
      return
    }

    const { error: registerLinkError } = await registerLink(link)
    if (registerLinkError) {
      inputRef.current?.focus()
      setError(registerLinkError)
      return
    }

    router.push(`/${link}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, createLinkAction, isSubmitting] = useActionState(
    handleCreateLink,
    null,
  )

  return (
    <>
      <form
        action={createLinkAction}
        className="w-full flex items-center gap-2"
      >
        <span className="text-white">soueu.dev/</span>
        <Input
          name="link"
          value={link || ''}
          onChange={handleLinkChange}
          ref={inputRef}
        />
        <Button className="w-[126px]" disabled={isSubmitting}>
          Criar
        </Button>
      </form>
      <div>{error && <span className="text-accent-pink">{error}</span>}</div>
    </>
  )
}
