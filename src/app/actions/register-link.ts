'use server'
import { db } from '@/app/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'
import { auth } from '@/app/lib/auth'

export async function registerLink(link: string) {
  const session = await auth()
  if (!session?.user) {
    return { error: 'Você precisa estar logado para criar um link!' }
  }

  try {
    await db.collection('profiles').doc(link).set({
      userId: 0,
      link,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis(),
    })
  } catch (error) {
    return {
      error:
        (error as Error)?.message ||
        'Ocorreu um erro inesperado ao criar o link 😢',
    }
  }

  return { error: null }
}
