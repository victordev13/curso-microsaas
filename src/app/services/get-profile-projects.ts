import { db } from '@/app/lib/firebase'

export interface Project {
  id: string
  userId: string
  projectName: string
  projectDescription: string
  projectUrl: string
  imagePath: string
  createdAt: number
  totalVisits?: number
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection('projects')
    .doc(profileId)
    .collection('projects')
    .get()

  return snapshot.docs.map((doc) => doc.data()) as Array<Project>
}
