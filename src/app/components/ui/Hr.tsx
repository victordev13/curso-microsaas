import { mergeClasses } from '@/app/lib/utils'

export function Hr({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={mergeClasses('border-white/5 w-full', className)}
      {...props}
    />
  )
}
