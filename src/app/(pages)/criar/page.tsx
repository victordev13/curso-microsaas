import { Rocket } from 'lucide-react'
import { Header } from '@/app/components/landing-page/header'
import { CreateLinkForm } from '@/app/components/dashboard/create-link-form'
import { getProfileDataByUserId } from '@/app/services/get-profile-data'
import { redirect, unauthorized } from 'next/navigation'
import { auth } from '@/app/lib/auth'

export default async function Criar() {
  const session = await auth()
  if (!session?.user?.id) {
    return unauthorized()
  }

  const profileData = await getProfileDataByUserId(session.user.id)
  if (profileData) {
    return redirect(`/${profileData.link}`)
  }

  return (
    <div>
      <Header />
      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>

        <CreateLinkForm />
      </div>
    </div>
  )
}
