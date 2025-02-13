'use server'

import { db, uploadFile } from '@/app/lib/firebase'
import { auth } from '@/app/lib/auth'
import { Timestamp } from 'firebase-admin/firestore'
import { randomUUID } from 'node:crypto'

export type CreateProjectPayload = {
  projectName: string
  projectDescription: string
  projectUrl: string
  projectImage: File
  profileId: string
}

export async function createProject(payload: CreateProjectPayload) {
  const session = await auth()
  if (!session?.user) {
    return { error: 'Você precisa estar logado para criar um projeto!' }
  }

  const {
    projectName,
    projectDescription,
    projectUrl,
    projectImage,
    profileId,
  } = payload

  try {
    const uploadedImage = await uploadFile({
      file: projectImage,
      fileName: randomUUID(),
      filePath: `projects-images/${profileId}`,
    })

    await db.collection('profiles').doc(profileId).collection('projects').add({
      userId: session.user.id,
      projectName,
      projectDescription,
      projectUrl,
      imagePath: uploadedImage.path,
      createdAt: Timestamp.now().toMillis(),
    })
    return { success: true }
  } catch (error) {
    return { error }
  }
}
