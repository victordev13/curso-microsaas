import 'server-only'
import { db } from '@/app/lib/firebase'

export interface Profile {
  userId: string
  totalVisits: number
  link: string
  createdAt: number // timestamp
  profilePicturePath?: string
  name?: string
  description?: string
  socialMedia?: {
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
  customLinks?: Array<{ title: string; url: string }>
}

export async function getProfileData(
  profileId: string,
): Promise<Profile | null> {
  const snapshot = await db.collection('profiles').doc(profileId).get()
  const profile = snapshot.data() as Profile | undefined
  if (!profile) {
    return null
  }

  return formatProfile(profile)
}

export async function getProfileDataByUserId(
  userId: string,
): Promise<Profile | null> {
  const snapshot = await db
    .collection('profiles')
    .where('userId', '==', userId)
    .limit(1)
    .get()

  if (snapshot.empty) {
    return null
  }

  const profile = snapshot.docs[0].data() as Profile | undefined
  if (!profile) {
    return null
  }

  return formatProfile(profile)
}

function formatProfile(profile: Profile): Profile {
  return {
    userId: profile.userId,
    totalVisits: profile.totalVisits,
    createdAt: profile.createdAt,
    socialMedia: profile.socialMedia,
    link: profile.link,
    customLinks: profile.customLinks,
    profilePicturePath: profile?.profilePicturePath,
    name: profile?.name,
    description: profile?.description,
  }
}
