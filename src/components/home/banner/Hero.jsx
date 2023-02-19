import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { motion, useInView, useMotionValue } from 'framer-motion'

import { AppStoreLink } from '@/components/AppStoreLink'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

import FindVet from '@/components/modals/findvet';
import Dogs from '@/images/dogs_img_1.png';
import Bg from '@/images/blue_abstract.png';
import Clock from '@/images/247.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export function Hero() {

  const [findVetModalVisible, setFindVetModalVisible] = useState(false)

  return (
    <div className="overflow-hidden pt-4 pb-20 sm:py-16 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-7xl font-bold tracking-tight text-indigo-500 sm:text-6xl flex">
              <Image
                src={Clock}
                alt="clcok"
                className='h-24 w-24 flex-none text-indigo-500'
              />
              <span className='mt-5 ml-5'>Pet Care</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor quam bibendum, ultrices nunc quis, tincidunt nulla. In euismod suscipit augue
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              {/* <AppStoreLink /> */}
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
                className="bg-indigo-500 text-white"
              >
                <FontAwesomeIcon className='text-lg' icon="fa-solid fa-person-shelter" />
                <span className="ml-2.5">Find Pet Sitter</span>
              </Button>

              <Button
                onClick={() => setFindVetModalVisible(true)}
                variant="outline"
                className="bg-indigo-500 text-white"
              >
                <FontAwesomeIcon className='text-lg' icon="fa-solid fa-user-doctor" />
                <span className="ml-2.5">Find Vet</span>
              </Button>

            </div>
          </div>
          <motion.div
            className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 opacity-0"
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 999, opacity: 0 }}
            transition={{
              delay: 0,
              x: { duration: 1 },
              default: { ease: "linear" }
            }}
          >
            {/* <div className="absolute w-16 h-24 bg-[url('/images/blue_abstract.png')] bg-no-repeat bg-right-top bg-contain sm:bg-auto sm:hidden"></div> */}
            <Image src={Bg} alt="dogs"
              className="h-[350px] z-[1] absolute md:hidden" unoptimized />
            <Image
              src={Dogs}
              alt="dogs"
              className="relative z-[2] m-auto w-[450px]"
              unoptimized
            />
          </motion.div>

        </div>
      </Container>


      <FindVet open={findVetModalVisible} setOpen={setFindVetModalVisible} />
    </div>
  )
}
