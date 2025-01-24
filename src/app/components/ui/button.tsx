import { mergeClasses } from '@/app/lib/utils'

const variantStyles = {
  primary: 'bg-accent-purple',
  secondary: 'bg-background-tertiary',
  ghost: 'border-border-primary',
}

export function Button({
  children,
  variant = 'primary',
  ...props
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={mergeClasses(
        'p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70',
        variantStyles[variant],
        props.className,
      )}
    >
      {children}
    </button>
  )
}
