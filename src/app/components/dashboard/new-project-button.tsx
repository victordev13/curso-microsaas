'use client'
import { ArrowUpFromLine, Plus } from 'lucide-react'
import { Modal } from '@/app/components/ui/modal'
import { useState } from 'react'
import { TextArea } from '@/app/components/ui/text-area'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

export function NewProjectButton({ profileId }: { profileId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                <button className="w-full h-full">100x100</button>
              </div>
              <label htmlFor="imageInput">
                <button className="text-white flex items-center gap-2">
                  <ArrowUpFromLine className="size-4" />
                  <span>Adicionar imagem</span>
                </button>
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-4 w-[369px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Titulo do projeto
                </label>
                <Input
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36 resize-none"
                  maxLength={300}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>
                <Input
                  type="url"
                  id="project-description"
                  placeholder="Digite a URL do projeto"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white">Voltar</button>
            <Button>Salvar</Button>
          </div>
        </div>
      </Modal>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center transition-all hover:border border-dashed hover:bg-background-tertiary active:bg-background-primary"
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo Projeto</span>
      </button>
    </>
  )
}
