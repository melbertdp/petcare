import Head from 'next/head'
import {SessionProvider} from 'next-auth/react'


import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
