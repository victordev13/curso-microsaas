'use server'

import { db, storage } from '@/app/lib/firebase'
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

  const uploadedImage = await uploadImage(profileId, projectImage)

  try {
    await db.collection('projects').doc(profileId).collection('projects').add({
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

async function uploadImage(
  profileId: string,
  file: File,
): Promise<{ path: string }> {
  const imageRandomId = randomUUID()
  const storageRef = storage.file(
    `projects-images/${profileId}/${imageRandomId}`,
  )

  const projectImageBuffer = Buffer.from(await file.arrayBuffer())
  await storageRef.save(projectImageBuffer)

  const imagePath = storageRef.name

  return { path: imagePath }
}
