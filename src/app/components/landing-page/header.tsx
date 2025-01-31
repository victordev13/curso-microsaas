/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Button } from '../ui/button'
import { auth, signIn, signOut } from '@/app/lib/auth'

export async function Header() {
  const session = await auth()

  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10">
      <Link href="/">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="ProjectInBio Logo" />
          <h3 className="text-white text-2xl font-bold">SouEuDev</h3>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {session && <Button>Minha Página</Button>}
        <form
          action={async () => {
            'use server'
            if (session) {
              await signOut({ redirectTo: '/' })
            }

            await signIn('google', { redirectTo: '/criar' })
          }}
        >
          <Button type="submit">{session ? 'Sair' : 'Login'}</Button>
        </form>
      </div>
    </div>
  )
}
