import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { motion, useInView, useMotionValue } from 'framer-motion'

import { AppStoreLink } from '@/components/AppStoreLink'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

import FindVet from '@/components/modals/findvet';
import Dogs from '@/images/dogs_img_1.png';
import Bg from '@/images/blue_abstract.png';

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

export function Hero() {

  const [findVetModalVisible, setFindVetModalVisible] = useState(false)

  return (
    <div className="overflow-hidden pt-4 pb-20 sm:py-16 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-7xl font-bold tracking-tight text-indigo-500 sm:text-6xl">
              Petfriends
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor quam bibendum, ultrices nunc quis, tincidunt nulla. In euismod suscipit augue
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              {/* <AppStoreLink /> */}
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Find Pet Sitter</span>
              </Button>

              <Button
                onClick={() => setFindVetModalVisible(true)}
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Find Vet</span>
              </Button>

            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            {/* <div className="absolute w-16 h-24 bg-[url('/images/blue_abstract.png')] bg-no-repeat bg-right-top bg-contain sm:bg-auto sm:hidden"></div> */}
            <Image src={Bg} alt="dogs" 
              className="h-[350px] z-[1] absolute md:hidden" unoptimized />
            <Image
              src={Dogs}
              alt="dogs"
              className="aspect-w-1 aspect-h-9 relative z-[2] m-auto w-[450px]"
              unoptimized
            />
          </div>

        </div>
      </Container>


      <FindVet open={findVetModalVisible} setOpen={setFindVetModalVisible} />
    </div>
  )
}
