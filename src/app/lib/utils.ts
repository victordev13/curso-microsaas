import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import imageCompression from 'browser-image-compression'

export function mergeClasses(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

export function sanitizeUrlPath(urlPath: string) {
  return urlPath
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*¨()_+\-=[\]{};':"\\|,ˆ.<>/?]+/, '')
    .toLocaleLowerCase()
}

export async function compressImages(files: File[]) {
  const failed: File[] = []
  const compressFilesPromises = files.map(async (file) => {
    try {
      return await compressImage(file)
    } catch (error) {
      failed.push(file)
      console.error(error)

      return null
    }
  })

  return {
    files: (await Promise.all(compressFilesPromises)).filter(
      (file) => file !== null,
    ),
    failed,
  }
}

export async function compressImage(file: File) {
  return await imageCompression(file, {
    maxSizeMB: 0.2, // 200kb
    maxWidthOrHeight: 900,
    useWebWorker: true,
    fileType: 'image/png',
  })
}

export function parseUrl(
  raw: string,
  defaultScheme: 'https' | 'http' = 'https',
) {
  return raw?.startsWith('http') ? raw : `${defaultScheme}://${raw}`
}
