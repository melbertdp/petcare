import { useEffect, useRef } from 'react';
import Image from 'next/image'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import About from '@/images/about2.png';
import { Container } from '@/components/Container'
import { motion, useInView, useMotionValue } from 'framer-motion'

export function AboutUs() {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log("isInView", isInView);
  }, [isInView])

  return (
    <section
      id="about"
      aria-label="About us"
      className="py-12 sm:py-14"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-500">
            Welcome To Our Family
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor quam bibendum, ultrices nunc quis, tincidunt nulla. In euismod suscipit augue
          </p>
        </div>
      </Container>

      <Container className="md:mt-10 md:block">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none xl:col-span-6">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              <div
                style={{
                  transform: isInView ? "none" : "translateX(-200px)",
                  opacity: isInView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}
                ref={ref}
              // animate={{ x: 0, opacity: 1 }}
              // initial={{ x: -999, opacity: 0 }}
              // transition={{
              //   delay: 0,
              //   x: { duration: 1 },
              //   default: { ease: "linear" }
              // }}
              >

                <Image
                  src={About}
                  alt="About"
                  className="h-[300px] sm:h-[500px] lg:h-[500px] xl:h-[450px]"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-indigo-500 text-white flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span className='text-xl'>How Petfriend started</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-indigo-500 text-white flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span className='text-xl'>Mission</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    No.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-indigo-500 text-white flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span className='text-xl'>Social</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    No.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </Container>
    </section>
  )
}
