/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */

import { startTransition, useActionState, useState } from 'react'
import { Modal } from '../ui/modal'
import { Button } from '../ui/button'
import { FormReturn, TypedFormData } from '@/app/lib/form-actions'
import { useParams, useRouter } from 'next/navigation'
import { ArrowUpFromLine } from 'lucide-react'
import { Input } from '../ui/input'
import { TextArea } from '../ui/text-area'
import { compressImage } from '@/app/lib/utils'
import { updateProfile } from '@/app/actions/update-profile'

interface EditUserInfoModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  profileData?: {
    name?: string
    description?: string
    profilePictureUrl?: string
  }
}

type UpdateUserInfoForm = {
  name: string
  description: string
  profilePicture: File
  profileId: string
}

export function EditUserInfoModal({
  isModalOpen,
  onModalClose,
  profileData,
}: EditUserInfoModalProps) {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(profileData?.profilePictureUrl || null)

  function handleInputImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return null
    }

    const tempImageURL = URL.createObjectURL(file)
    setProfilePicturePreview(tempImageURL)
  }

  function handleClose() {
    onModalClose()
    setError(null)
  }

  const routeParams = useParams()
  if (!routeParams.profileId) {
    return null
  }
  const profileId = String(routeParams.profileId)

  async function handleUpdateUserInfo(
    _: unknown,
    formData: FormData,
  ): Promise<FormReturn<UpdateUserInfoForm>> {
    const typedFormData = formData as TypedFormData<UpdateUserInfoForm>
    const profilePicture = typedFormData.get('profilePicture')

    if (profilePicture && profilePicture?.size > 0) {
      const compressedFile = await compressImage(profilePicture)
      typedFormData.set('profilePicture', compressedFile || '')
    }

    typedFormData.append('profileId', profileId)

    await updateProfile({
      name: typedFormData.get('name') as string,
      description: typedFormData.get('description') as string,
      profilePicture: typedFormData.get('profilePicture'),
      profileId,
    })

    startTransition(() => {
      router.refresh()
      onModalClose()
    })
  }

  const [formState, handleUpdateUserInfoAction, isSubmitting] = useActionState(
    handleUpdateUserInfo,
    null,
  )

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose}>
      <form
        action={handleUpdateUserInfoAction}
        className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10"
      >
        <p className="text-white font-bold text-xl">Editar perfil</p>
        <div className="flex gap-10">
          {error && (
            <span className="text-accent-pink">{formState?.error}</span>
          )}
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
              {profilePicturePreview ? (
                <img
                  src={profilePicturePreview}
                  alt="victordev"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <label htmlFor="profilePicture">
                  <div className="flex justify-center items-center w-full h-full cursor-pointer transition-colors hover:text-gray-200">
                    100x100
                  </div>
                </label>
              )}
            </div>
            <label htmlFor="profilePicture">
              <div className="text-white flex items-center gap-2 cursor-pointer transition-colors hover:text-gray-200">
                <ArrowUpFromLine />
                <span>Adicionar foto</span>
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleInputImage}
            />
          </div>

          <div className="flex flex-col gap-4 w-[369px]">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-white font-bold">
                Seu nome
              </label>
              <Input
                id="name"
                name="name"
                defaultValue={profileData?.name}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-white font-bold">
                Descrição
              </label>
              <TextArea
                id="description"
                name="description"
                placeholder="Fale um pouco sobre você"
                defaultValue={profileData?.description}
                className="h-36 resize-none"
                maxLength={300}
              />
            </div>
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
