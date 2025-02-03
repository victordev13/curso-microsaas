'use client'
import { ArrowUpFromLine } from 'lucide-react'
import { Modal } from '@/app/components/ui/modal'
import { TextArea } from '@/app/components/ui/text-area'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { FormReturn, TypedFormData } from '@/app/lib/form-actions'
import { compressImage } from '@/app/lib/utils'
import {
  createProject,
  CreateProjectPayload,
} from '@/app/actions/create-project'
import { useRouter } from 'next/navigation'

interface NewProjectModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  profileId: string
}

type CreateProjectFormData = CreateProjectPayload

export function NewProjectModal({
  isModalOpen,
  onModalClose,
  profileId,
}: NewProjectModalProps) {
  const router = useRouter()

  const [projectImage, setProjectImage] = useState<string | null>(null)

  function handleInputImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return null
    }

    const tempImageURL = URL.createObjectURL(file)
    setProjectImage(tempImageURL)
  }

  function resetForm() {
    setProjectImage(null)
  }
  useEffect(() => {
    return () => resetForm()
  }, [])

  function handleClose() {
    resetForm()
    onModalClose()
  }

  async function handleCreateProject(
    currentState,
    formData: FormData,
  ): Promise<FormReturn<CreateProjectFormData>> {
    const typedFormData = formData as TypedFormData<CreateProjectFormData>
    const projectImage = typedFormData.get('projectImage')
    if (!projectImage?.name) {
      return {
        errors: {
          projectImage: 'Imagem do projeto é obrigatória',
        },
      }
    }

    const compressedFile = await compressImage(projectImage)
    typedFormData.set('projectImage', compressedFile)

    typedFormData.append('profileId', profileId)

    await createProject({
      projectName: typedFormData.get('projectName') as string,
      projectDescription: typedFormData.get('projectDescription') as string,
      projectUrl: typedFormData.get('projectUrl') as string,
      projectImage: typedFormData.get('projectImage') as File,
      profileId: typedFormData.get('profileId') as string,
    })
    resetForm()

    startTransition(() => {
      router.refresh()
      onModalClose()
    })
  }

  const [formState, handleCreateProjectAction, isSubmitting] = useActionState(
    handleCreateProject,
    null,
  )

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <form
        action={handleCreateProjectAction}
        className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10"
      >
        <p className="text-white font-bold text-xl">Novo projeto</p>
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
              {projectImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={projectImage}
                  alt="Project Image"
                  className="object-cover object-center"
                />
              ) : (
                <button className="w-full h-full">100x100</button>
              )}
            </div>
            <label htmlFor="projectImage">
              <span className="text-white flex items-center gap-2">
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </span>
            </label>
            <input
              type="file"
              id="projectImage"
              name="projectImage"
              accept="image/*"
              className="hidden"
              onChange={handleInputImage}
            />
          </div>
          <div className="flex flex-col gap-4 w-[369px]">
            <div className="flex flex-col gap-1">
              <label htmlFor="projectName" className="text-white font-bold">
                Titulo do projeto
              </label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Digite o nome do projeto"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="projectDescription"
                className="text-white font-bold"
              >
                Descrição
              </label>
              <TextArea
                id="projectDescription"
                name="projectDescription"
                placeholder="Dê uma breve descrição do seu projeto"
                className="h-36 resize-none"
                maxLength={300}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="projectUrl" className="text-white font-bold">
                URL do projeto
              </label>
              <Input
                type="url"
                id="projectUrl"
                name="projectUrl"
                placeholder="Digite a URL do projeto"
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
