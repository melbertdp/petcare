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
      <Header />

      <main>
        <Hero />
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
