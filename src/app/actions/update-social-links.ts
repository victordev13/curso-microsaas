'use server'
import { Timestamp } from 'firebase-admin/firestore'
import { db } from '@/app/lib/firebase'
import { auth } from '@/app/lib/auth'

interface UpdateSocialLinksPayload {
  profileId: string
  github: string
  instagram: string
  linkedin: string
  twitter: string
}

export async function updateSocialLinks({
  profileId,
  github,
  instagram,
  linkedin,
  twitter,
}: UpdateSocialLinksPayload) {
  const session = await auth()
  if (!session?.user) {
    return { error: 'Você precisa estar logado!' }
  }

  try {
    await db.collection('profiles').doc(profileId).update({
      socialMedia: {
        github,
        instagram,
        linkedin,
        twitter,
      },
      updateAt: Timestamp.now().toMillis(),
    })
  } catch (error) {
    return {
      error: (error as Error)?.message || 'Ocorreu um erro inesperado 😢',
    }
  }

  return { error: null }
}
