'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { auth } from '@/app/lib/auth'
import { db, storage, uploadFile } from '@/app/lib/firebase'
import { Profile } from '../services/get-profile-data'
import { randomUUID } from 'node:crypto'

interface UpdateProfileProps {
  name: string
  description: string
  profilePicture: File | null
  profileId: string
}

export async function updateProfile({
  name,
  description,
  profilePicture,
  profileId,
}: UpdateProfileProps) {
  const session = await auth()
  if (!session?.user) {
    return { error: 'Você precisa estar logado!' }
  }

  try {
    let profilePicturePath = null
    const hasProfilePicture = profilePicture && profilePicture.size > 0
    if (hasProfilePicture) {
      await removeOldProfilePicture(profileId)

      const uploadedImage = await uploadFile({
        file: profilePicture,
        fileName: randomUUID(),
        filePath: `profile-images/${profileId}`,
      })
      profilePicturePath = uploadedImage.path
    }

    await db
      .collection('profiles')
      .doc(profileId)
      .update({
        name: name || null,
        description: description || null,
        updateAt: Timestamp.now().toMillis(),
        ...(hasProfilePicture && { profilePicturePath }),
      })
  } catch (error) {
    return {
      error: (error as Error)?.message || 'Ocorreu um erro inesperado 😢',
    }
  }

  return { error: null }
}

async function removeOldProfilePicture(profileId: string) {
  const currentProfile = (await db
    .collection('profiles')
    .doc(profileId)
    .get()
    .then((doc) => doc.data())) as Profile | undefined

  const currentProfilePicturePath = currentProfile?.profilePicturePath

  if (currentProfilePicturePath) {
    const currentStorageRef = storage.file(currentProfilePicturePath)
    const [exists] = await currentStorageRef.exists()
    if (exists) {
      await currentStorageRef.delete()
    }
  }
}
