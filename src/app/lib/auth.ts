import NextAuth from 'next-auth'
import { FirestoreAdapter } from '@auth/firebase-adapter'
import { db, firebaseCert } from './firebase'
import Google from 'next-auth/providers/google'
import { checkUserInTrial } from '../services/check-user-in-trial'
import { Timestamp } from 'firebase-admin/firestore'
import { getUser } from '../services/get-user'

export const { handlers, auth, signIn, signOut } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [Google],
  events: {
    createUser: async ({ user }) => {
      if (!user.id) return

      await db.collection('users').doc(user.id).update({
        createdAt: Timestamp.now().toMillis(),
      })
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      const dbUser = await getUser(user.id)
      const isSubscribed = dbUser.isSubscribed || false

      session.user.isTrial = !isSubscribed || checkUserInTrial(user)
      session.user.isSubscribed = isSubscribed

      return session
    },
  },
})
