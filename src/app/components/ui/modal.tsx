'use client'

import { useOnClickOutside } from '@/app/hooks/useOnClickOuside'
import { useRef } from 'react'

export function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    onClose()
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-50">
      <div ref={ref}>{children}</div>
    </div>
  )
}
