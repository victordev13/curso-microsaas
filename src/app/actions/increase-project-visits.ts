'use server'

import { db } from '@/app/lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'

interface Props {
  profileId: string
  projectId: string
}

export async function increaseProjectVisits({ profileId, projectId }: Props) {
  const projectRef = db
    .collection('profiles')
    .doc(profileId)
    .collection('projects')
    .doc(projectId)

  await db.runTransaction(async (transaction) => {
    const project = await transaction.get(projectRef)

    if (!project.exists) {
      return
    }

    transaction.update(projectRef, {
      totalVisits: FieldValue.increment(1),
    })
  })
}
