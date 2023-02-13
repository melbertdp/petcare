/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'

export default function FindVet({ open, setOpen, viewVetDetails }) {

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
                                                            alt="vetlogo"
                                                            class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                                            src={viewVetDetails?.imageSrc}
                                                        />
                                                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-0 lg:mt-0">
                                                            {/* <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
                                                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{viewVetDetails?.name}</h1>
                                                            <div class="flex mb-4">

                                                            </div>
                                                            <p class="leading-relaxed">{viewVetDetails?.description}</p>
                                                            <div class="mt-6 text-left pb-5 border-b-2 border-gray-100 mb-5">
                                                                <p>Address: {viewVetDetails.address}</p>
                                                                <p>Specialization: {viewVetDetails?.specialization}</p>
                                                                <p>Consulatation Rate: $58</p>
                                                            </div>
                                                            <div class="">
                                                                {/* <span class="title-font font-medium text-2xl text-gray-900">$58.00</span> */}
                                                                <Link
                                                                    class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                                                    href={`/vet/schedule-visit/${makeUrl(viewVetDetails.name)}`}
                                                                >
                                                                    Online Consultation
                                                                </Link>
                                                                <Link
                                                                    class="flex mt-3 ml-auto text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                                                    href={`/vet/online-consultation/${makeUrl(viewVetDetails.name)}`}
                                                                >
                                                                    Schedule Visit
                                                                </Link>
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
