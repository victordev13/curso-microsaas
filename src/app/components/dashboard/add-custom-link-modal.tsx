/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Modal } from '@/app/components/ui/modal'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { FormReturn, TypedFormData } from '@/app/lib/form-actions'
import { useParams, useRouter } from 'next/navigation'
import { addCustomLinks } from '@/app/actions/add-custom-link'

interface AddCustomLinkModalProps {
  isModalOpen: boolean
  onModalClose: () => void
}

type AddCustomLinkForm = {
  'titulo-0': string
  'url-0': string
  'titulo-1': string
  'url-1': string
  'titulo-2': string
  'url-2': string
}

function NewLinkForm({ index }: { index: number }) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col max-w-56 gap-1.5 w-full">
        {index === 0 && (
          <label htmlFor={`titulo-${index}`}>Título do link</label>
        )}
        <Input name={`titulo-${index}`} placeholder="Informe um título" />
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        {index === 0 && <label htmlFor={`url-${index}`}>URL</label>}
        <Input type="url" name={`url-${index}`} placeholder="Informe a URL" />
      </div>
    </div>
  )
}

export function AddCustomLinkModal({
  isModalOpen,
  onModalClose,
}: AddCustomLinkModalProps) {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  function handleClose() {
    onModalClose()
    setError(null)
  }

  const routeParams = useParams()
  if (!routeParams.profileId) {
    return null
  }
  const profileId = String(routeParams.profileId)

  async function handleAddCustomLink(
    _: unknown,
    formData: FormData,
  ): Promise<FormReturn<AddCustomLinkForm>> {
    const typedFormData = formData as TypedFormData<AddCustomLinkForm>

    const customLinks = [
      {
        title: typedFormData.get('titulo-0'),
        url: typedFormData.get('url-0'),
      },
      {
        title: typedFormData.get('titulo-1'),
        url: typedFormData.get('url-1'),
      },
      {
        title: typedFormData.get('titulo-2'),
        url: typedFormData.get('url-2'),
      },
    ].filter(({ title, url }) => title && url) as Array<{
      title: string
      url: string
    }>

    await addCustomLinks({ profileId, customLinks })

    startTransition(() => {
      router.refresh()
      onModalClose()
    })
  }

  const [formState, handleAddCustomLinkAction, isSubmitting] = useActionState(
    handleAddCustomLink,
    null,
  )

  useEffect(() => {
    if (formState?.error || formState?.errors) {
      setError(
        formState?.error || Object.values(formState?.errors || []).join('\n'),
      )
    }
  }, [formState?.error, formState?.errors])

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <form
        action={handleAddCustomLinkAction}
        className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[min(95vw,668px)]"
      >
        <p className="text-white font-bold text-xl">
          Adicionar links personalizados
        </p>
        <div className="flex flex-col gap-4">
          {error && (
            <span className="text-accent-pink">{formState?.error}</span>
          )}

          <NewLinkForm index={0} />
          <NewLinkForm index={1} />
          <NewLinkForm index={2} />
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            variant="ghost"
            className="font-bold text-white"
            disabled={isSubmitting}
            onClick={() => handleClose()}
          >
            Voltar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
