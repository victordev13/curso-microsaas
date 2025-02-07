'use server'

import { db } from '../lib/firebase'

export type AddCustomLinkPayload = {
  profileId: string
  customLinks: Array<{
    title: string
    url: string
  }>
}

export async function addCustomLinks({
  profileId,
  customLinks,
}: AddCustomLinkPayload) {
  try {
    await db.collection('profiles').doc(profileId).update({
      customLinks,
    })

    return { success: true }
  } catch (error) {
    return { error }
  }
}
