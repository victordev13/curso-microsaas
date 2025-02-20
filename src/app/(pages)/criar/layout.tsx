import { auth } from '@/app/lib/auth'
import { getProfileDataByUserId } from '@/app/services/get-profile-data'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) {
    return redirect('/')
  }

  const profileData = await getProfileDataByUserId(session.user.id)
  if (profileData) {
    return redirect(`/${profileData.link}`)
  }

  return <>{children}</>
}
