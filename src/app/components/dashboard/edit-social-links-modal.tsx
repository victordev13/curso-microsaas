/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Modal } from '@/app/components/ui/modal'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { FormReturn, TypedFormData } from '@/app/lib/form-actions'
import { notFound, useParams, useRouter } from 'next/navigation'
import { updateSocialLinks } from '@/app/actions/update-social-links'

export type SocialMedia = {
  github?: string
  instagram?: string
  linkedin?: string
  twitter?: string
}

interface EditSocialLinksModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  socialMedia: SocialMedia
}

type SaveSocialLinksPayload = SocialMedia

export function EditSocialLinksModal({
  isModalOpen,
  onModalClose,
  socialMedia,
}: EditSocialLinksModalProps) {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  function handleClose() {
    onModalClose()
    setError(null)
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

    const github = typedFormData.get('github') as string
    const instagram = typedFormData.get('instagram') as string
    const linkedin = typedFormData.get('linkedin') as string
    const twitter = typedFormData.get('twitter') as string

    if (!github && !instagram && !linkedin && !twitter) {
      return {
        error: 'Você não informou nenhum link.',
      }
    }

    await updateSocialLinks({
      profileId: String(routeParams.profileId),
      github,
      instagram,
      linkedin,
      twitter,
    })

    startTransition(() => {
      router.refresh()
      onModalClose()
    })
  }

  const [formState, handleSaveSocialMediaAction, isSubmitting] = useActionState(
    handleSaveSocialLinks,
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
        action={handleSaveSocialMediaAction}
        className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]"
      >
        <p className="text-white font-bold text-xl">Alterar redes sociais</p>
        <div className="flex flex-col gap-4">
          {error && (
            <span className="text-accent-pink">{formState?.error}</span>
          )}
          <div className="flex items-center gap-4 w-full">
            <Github />
            <Input
              type="url"
              name="github"
              defaultValue={socialMedia?.github || ''}
              placeholder="Github"
              disabled={isSubmitting}
              pattern="https://github\.com/.*"
              title="Informe uma URL do GitHub"
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Instagram />
            <Input
              type="url"
              name="instagram"
              defaultValue={socialMedia?.instagram || ''}
              placeholder="Instagram"
              disabled={isSubmitting}
              pattern="https://(www\.)?instagram\.com/.*"
              title="Informe uma URL do Instagram"
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Linkedin />
            <Input
              type="url"
              name="linkedin"
              defaultValue={socialMedia?.linkedin || ''}
              placeholder="LinkedIn"
              disabled={isSubmitting}
              pattern="https://(www\.)?linkedin\.com/.*"
              title="Informe uma URL do LinkedIn"
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <Twitter />
            <Input
              type="url"
              name="twitter"
              defaultValue={socialMedia?.twitter || ''}
              placeholder="Twitter"
              disabled={isSubmitting}
              pattern="https://(www\.)?twitter\.com/.*"
              title="Informe uma URL do Twitter"
            />
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
