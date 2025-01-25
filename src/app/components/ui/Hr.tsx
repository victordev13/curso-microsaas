import { mergeClasses } from '@/app/lib/utils'

interface HrProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
}

const orientationClasses = {
  vertical: 'border-l h-full d-list-item',
  horizontal: 'border-t w-full',
}

export function Hr({
  className,
  orientation = 'horizontal',
  ...props
}: HrProps) {
  return (
    <hr
      className={mergeClasses(
        'border-white/5',
        orientationClasses[orientation],
        className,
      )}
      {...props}
    />
  )
}
