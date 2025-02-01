import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mergeClasses(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

export function sanitizeUrlPath(urlPath: string) {
  return urlPath
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*¨()_+\-=[\]{};':"\\|,ˆ.<>/?]+/, '')
    .toLocaleLowerCase()
}
