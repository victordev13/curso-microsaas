import 'server-only'
import { db } from '@/app/lib/firebase'
import {} from 'next-auth'

export interface User {
  customerId: string
  email: string
  emailVerified?: string
  image?: string
  isSubscribed?: boolean
  name?: string
  paidAt?: string
}

export async function getUser(userId: string) {
  const snapshot = await db.collection('users').doc(userId).get()

  return snapshot.data() as User
}
