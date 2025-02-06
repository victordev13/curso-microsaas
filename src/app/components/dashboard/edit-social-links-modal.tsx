'use client'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Modal } from '@/app/components/ui/modal'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { startTransition, useActionState } from 'react'
import { FormReturn, TypedFormData } from '@/app/lib/form-actions'
import { notFound, useParams, useRouter } from 'next/navigation'
import { updateSocialLinks } from '@/app/actions/update-social-links'

interface NewProjectModalProps {
  isModalOpen: boolean
  onModalClose: () => void
}

type SaveSocialLinksPayload = {
  github: string
  instagram: string
  linkedin: string
  twitter: string
}

export function EditSocialLinksModal({
  isModalOpen,
  onModalClose,
}: NewProjectModalProps) {
  const router = useRouter()

  function handleClose() {
    onModalClose()
  }

  const routeParams = useParams()
  if (!routeParams.profileId) {
    return notFound()
  }

  async function handleSaveSocialLinks(
    _: unknown,
    formData: FormData,
  ): Promise<FormReturn<SaveSocialLinksPayload>> {
    const typedFormData = formData as TypedFormData<SaveSocialLinksPayload>

    await updateSocialLinks({
      profileId: String(routeParams.profileId),
      github: typedFormData.get('github') as string,
      instagram: typedFormData.get('instagram') as string,
      linkedin: typedFormData.get('linkedin') as string,
      twitter: typedFormData.get('twitter') as string,
    })

    startTransition(() => {
      router.refresh()
      onModalClose()
    })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [_, handleSaveSocialMediaAction, isSubmitting] = useActionState(
    handleSaveSocialLinks,
    null,
  )

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <form
        action={handleSaveSocialMediaAction}
        className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]"
      >
        <p className="text-white font-bold text-xl">Alterar redes sociais</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 w-full">
            <Github />
            <Input type="url" name="github" disabled={isSubmitting} />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Instagram />
            <Input type="url" name="instagram" disabled={isSubmitting} />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Linkedin />
            <Input type="url" name="linkedin" disabled={isSubmitting} />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Twitter />
            <Input type="url" name="twitter" disabled={isSubmitting} />
          </div>
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
