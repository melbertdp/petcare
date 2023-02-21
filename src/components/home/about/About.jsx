import { useEffect, useRef } from "react";
import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import About from "@/images/about2.png";
import { Container } from "@/components/Container";
import { motion, useInView, useMotionValue } from "framer-motion";

export function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    console.log("isInView", isInView);
  }, [isInView]);

  return (
    <section id="about" aria-label="About us" className="py-12 sm:py-14">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-500">
            Welcome To Our Family
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Your pet&apos;s health and well-being are our top priority.
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
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                ref={ref}
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
                    <span className="text-xl">How 24/7 petcare started</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    It started as an idea to cater needs of pet owners having
                    difficulty accessing urgent medical needs and care 24/7.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-indigo-500 text-white flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span className="text-xl">Mission</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <ul>
                      <li>
                        To provide services such as medical and pet care for
                        your pet needs at your hand 24/7.
                      </li>
                      <li>
                        To provide innovative, high-quality, consistent,
                        value-for-money, pet friendly medical and care that will
                        make your pet want to come back again…and again.
                      </li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-indigo-500 text-white flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span className="text-xl">Vision</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    24/7 Pet Care in the future will be the ultimate
                    professional veterinary practice and Pet care service that
                    combines excellent medical and care service delivered in a
                    consistent, innovative, enjoyable, caring and pet-friendly
                    way to create a value-for-money yet profitable and
                    unforgettable future services such as:
                    <ul>
                      <li>More affiliated partners for grooming and so on</li>
                      <li>
                        Online order of Pet Health primary needs such as
                        medicines, foods, etc.
                      </li>
                      <li>Pet Walking Pet Day Care Pet Training</li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </Container>
    </section>
  );
}
