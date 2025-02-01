import { mergeClasses } from '@/app/lib/utils'

import React, { forwardRef } from 'react'

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={mergeClasses(
        'w-full p-3 bg-background-secondary text-white placeholder:text-content-placeholder rounded-xl',
        'border border-transparent hover:border-border-secondary hover:text-content-body active:border-border-tertiary',
        props.className,
      )}
    />
  )
})

Input.displayName = 'Input'
