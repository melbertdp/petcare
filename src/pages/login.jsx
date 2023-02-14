import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Router from 'next/router'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

export default function Login() {

  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      Router.push('/user/profile')
    }

    setLoading(false)
  }, [session])


  if(loading){
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div>
        {session.user.name}
        <div>
          <button onClick={() => signOut()}>logout</button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Sign In - Petfriend</title>
      </Head>
      <AuthLayout
        title="Sign in to account"
        subtitle={
          <>
            Don’t have an account?{' '}
            <Link href="/register" className="text-cyan-600">
              Sign up
            </Link>{' '}
            for a free trial.
          </>
        }
      >
        <form>
          <div className="space-y-6">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Sign in to account
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}
