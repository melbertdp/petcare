import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import Head from 'next/head'
import { Header } from '@/components/layout/Header'
import { useSession, signOut } from 'next-auth/react'
import Router from 'next/router'
import { createClient } from '@supabase/supabase-js'
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' },
]

const breadcrumbs = [
  { name: 'Jobs', href: '#', current: false },
  { name: 'Front End Developer', href: '#', current: false },
  { name: 'Applicants', href: '#', current: true },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Created Profile',
    target: '',
    date: 'Feb 19',
    datetime: '2020-09-20',
  }
]


const comments = []

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  console.log("status", status)

  useEffect(() => {

    if (status === "unauthenticated" && status !== "authenticated" && status !== "loading") {
      Router.push('/')
    }

    setLoading(false)
  }, [status])



  useEffect(() => {

    if (session) {
      console.log("process.env.soupUrl", process.env.NEXT_PUBLIC_soupUrl)
      const { supabaseAccessToken } = session
      const supabase = createClient(process.env.NEXT_PUBLIC_soupUrl, process.env.NEXT_PUBLIC_soupKey, {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      });

      async function fetchMyAPI() {

        const { data } = await supabase
          .from('users')
          .select('*')
          .order('id')

        console.log("daaaaaaaaaaaaaaaaaaa", data);
      }

      fetchMyAPI()
    }
    //fetch data from supabase
  }, [loading, session])

  if (!session || loading || status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Book online consultation</title>
      </Head>

      <div>
        <Header />

        <div class=" bg-white pt-8">

          <div class="overflow-hidden pt-1 pb-20 sm:py-1 lg:pb-32 xl:pb-36">
            <main className="py-10">
              {/* Page header */}
              <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {
                        session?.user.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="h-16 w-16 rounded-full" src={session.user.image} alt="picture" />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1517841900229-3a7b3a9fc91c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="picture" />
                        )
                      }
                      <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{session.user.name}</h1>
                  </div>
                </div>

              </div>

              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                          Member Information
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900">{session.user.email}</dd>
                          </div>

                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900">+123 123 123</dd>
                          </div>

                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Pet</dt>
                            <dd className="mt-1 text-sm text-gray-900">Dog: Fifi</dd>
                          </div>

                        </dl>
                      </div>

                    </div>
                  </section>

                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-3 sm:px-6">
                        <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                          Upcoming Appointments
                        </h2>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <p className='text-sm'>No Upcoming Appointments</p>
                      </div>
                    </div>
                  </section>

                  {/* Comments*/}
                  <section aria-labelledby="notes-title">
                    <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                      <div className="divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-6">
                          <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                            Notes From Vets / Pet Sitters
                          </h2>
                        </div>
                        <div className="px-4 py-6 sm:px-6">
                          <ul role="list" className="space-y-8">

                            {
                              comments.length > 0 ?
                                comments.map((comment) => (
                                  <li key={comment.id}>
                                    <div className="flex space-x-3">
                                      <div className="flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element  */}
                                        <img
                                          className="h-10 w-10 rounded-full"
                                          src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <div className="text-sm">
                                          <a href="#" className="font-medium text-gray-900">
                                            {comment.name}
                                          </a>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-700">
                                          <p>{comment.body}</p>
                                        </div>
                                        <div className="mt-2 space-x-2 text-sm">
                                          <span className="font-medium text-gray-500">{comment.date}</span>{' '}
                                          <span className="font-medium text-gray-500">&middot;</span>{' '}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))
                                :
                                <li>
                                  <div className="flex space-x-3">
                                    <div className="flex-shrink-0">

                                    </div>
                                    <div>
                                      <div className="text-sm">
                                        <a href="#" className="font-medium text-gray-900">
                                          No Comments Yet
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                            }

                          </ul>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex space-x-3">

                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                      Timeline
                    </h2>

                    {/* Activity Feed */}
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-mb-8">
                        {timeline.map((item, itemIdx) => (
                          <li key={item.id}>
                            <div className="relative pb-8">
                              {itemIdx !== timeline.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      item.type.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {item.content}{' '}
                                      <a href="#" className="font-medium text-gray-900">
                                        {item.target}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    <time dateTime={item.datetime}>{item.date}</time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>


    </>
  )
}
