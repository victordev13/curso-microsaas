import { mergeClasses } from '@/app/lib/utils'

const variantStyles = {
  primary:
    'bg-accent-purple transition-colors hover:bg-accent-purple-dark active:bg-accent-purple-darker',
  secondary:
    'bg-background-tertiary transition-colors hover:bg-background-secondary active:bg-background-primary',
  ghost:
    'border-border-primary transition-colors hover:border-border-secondary active:border-border-tertiary',
}

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={mergeClasses(
        'py-3 px-5 text-white  rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 h-fit',
        variantStyles[variant],
        props.className,
      )}
    >
      {children}
    </button>
  )
}
