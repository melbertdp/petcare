/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Rating from './rating';
import Socials from './socials';

export default function FindVet({ vetDetails, open, setOpen }) {

    const cancelButtonRef = useRef(null)

    const makeUrl = (name) => {
        return name.toLowerCase().split(' ').join('-');
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[99]" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-[99] overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl lg:max-w-4xl sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-1">
                                        <div>
                                            <section class="text-gray-600 body-font overflow-hidden">
                                                <div class="container px-5 py-3 mx-auto">
                                                    <div class="mx-auto flex flex-wrap">
                                                        <img
                                                            alt="ecommerce"
                                                            class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                                            src={vetDetails.imageSrc}
                                                        />
                                                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-0 lg:mt-0">
                                                            {/* <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
                                                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{vetDetails.name}</h1>
                                                            <div class="flex mb-4">
                                                                <Rating rating={vetDetails.rating} />
                                                                <Socials />
                                                            </div>
                                                            <p class="leading-relaxed">{vetDetails.description}</p>
                                                            <div class="mt-6 text-left pb-5 border-b-2 border-gray-100 mb-5">
                                                                <p>Address: {vetDetails.address}</p>
                                                                <p>Specialization: {vetDetails.specialization}</p>
                                                            </div>
                                                            <div class="flex">
                                                                <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
                                                                <Link
                                                                    class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                                                    href={`/vet/schedule-visit/${makeUrl(vetDetails.name)}`}
                                                                >
                                                                    Book an appointment
                                                                </Link>
                                                                <button title="add to favorites" class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
