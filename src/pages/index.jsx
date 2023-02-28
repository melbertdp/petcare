import { useState, useEffect } from 'react'
import Head from 'next/head'

import { Faqs } from '@/components/faq/Faqs'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/home/banner/Hero'
import { Pricing } from '@/components/pricing/Pricing'
import { AboutUs } from '@/components/home/about/About'
import { Reviews } from '@/components/reviews/Reviews'
import { Services } from '@/components/home/services/Services'

import { Loading } from '@/components/layout/loader'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
const { library, config } = require('@fortawesome/fontawesome-svg-core');

library.add(far, fas);

export default function Home() {

  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false)
    }, 3000);
  }, [])

  return (
    <>
      <Head>
        <title>24/7 Petcare</title>
        <meta
          name="description"
          content="boom boom boom"
        />
      </Head>

      {
        isPageLoading ?
          <Loading />
          :
          <>
            <div className="bg-[url('/images/banner_bg80.svg')] bg-no-repeat bg-right-top bg-contain sm:bg-auto">
              <Header />
              <Hero />
            </div>

            <main>
              <AboutUs />
              <Services />

              <Reviews />
              <Pricing />
              <Faqs />
            </main>
            <Footer />
          </>
      }


    </>
  )
}
