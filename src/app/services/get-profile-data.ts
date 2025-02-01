import 'server-only'
import { db } from '@/app/lib/firebase'

export interface Profile {
  userId: string
  totalVisits: number
  createdAt: number // timestamp
}

export async function getProfileData(
  profileId: string,
): Promise<Profile | null> {
  const snapshot = await db.collection('profiles').doc(profileId).get()
  const profile = snapshot.data() as Profile | undefined
  if (!profile) {
    return null
  }

  return {
    userId: profile.userId,
    totalVisits: profile.totalVisits,
    createdAt: profile.createdAt,
  }
}
