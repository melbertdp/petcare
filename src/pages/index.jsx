import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/faq/Faqs'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/home/banner/Hero'
import { Pricing } from '@/components/pricing/Pricing'
import { AboutUs } from '@/components/home/about/About'
import { Reviews } from '@/components/reviews/Reviews'
import { Services } from '@/components/home/services/Services'

export default function Home() {
  return (
    <>
      <Head>
        <title>Petfriends.</title>
        <meta
          name="description"
          content="boom boom boom"
        />
      </Head>

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
  )
}
