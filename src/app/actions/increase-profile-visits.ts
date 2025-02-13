'use server'

import { db } from '@/app/lib/firebase'
import { FieldValue } from 'firebase-admin/firestore'

interface Props {
  profileId: string
}

export async function increaseProfileVisits({ profileId }: Props) {
  const profileRef = db.collection('profiles').doc(profileId)

  await db.runTransaction(async (transaction) => {
    const profile = await transaction.get(profileRef)

    if (!profile.exists) {
      return
    }

    transaction.update(profileRef, {
      totalVisits: FieldValue.increment(1),
    })
  })
}
