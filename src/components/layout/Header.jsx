import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { selectAuthState, setAuthState } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { selectNotifState, setNotifState } from "@/store/notifSlice";

import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Logo } from "@/components/Logo";

import DogRun from "@/images/dog_run.svg";
import Clinic from "@/images/clinic.svg";
import Vet from "@/images/vet.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const noti = useSelector((state) => state.notif.notificationState);

  useEffect(() => {
    if (noti && noti.length > 0) {
      const timeout = setTimeout(() => {
        toast(
          "Payment has been recieved, we will send the details on your email",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        dispatch(setNotifState([]));
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [noti]);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" alt="home">
                    <Logo className="h-10 w-auto" />
                  </Link>
                  {/* <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Popover.Group as="nav" className="flex space-x-3">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link
                      href="/#about"
                      className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      About
                    </Link>
                    <Link
                      href="/#services"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Services
                    </Link>
                    <Link
                      href="/#reviews"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Reviews
                    </Link>
                    <Link
                      href="/#pricing"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Pricing
                    </Link>

                    <Popover className="relative inline-flex">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? "text-gray-900" : "text-gray-500",
                              "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300"
                            )}
                          >
                            <span>Schedule Service</span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? "text-gray-600" : "text-gray-400",
                                "ml-2 h-5 w-5 group-hover:text-gray-500"
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-[99] -ml-8 mt-14 w-screen max-w-xs transform lg:max-w-md lg:-ml-6">
                              <div className="overflow-hidden rounded-lg shadow-lg ring- ring-opacity-5">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                  <Link
                                    href={"/services/pet-sitter"}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                  >
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-100 text-white sm:h-12 sm:w-12">
                                      <Image
                                        src={DogRun}
                                        alt="dog-walking"
                                        width={50}
                                        height={50}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        Pet Sitter
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Your pets stay overnight in your
                                        sitter’s home. They’ll be treated like
                                        part of the family in a comfortable
                                        environment.
                                      </p>
                                    </div>
                                  </Link>

                                  <Link
                                    href={"/vet/nearby"}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                  >
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-100 text-white sm:h-12 sm:w-12">
                                      <Image
                                        src={Clinic}
                                        alt="dog-walking"
                                        width={50}
                                        height={50}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        Find Vet Clinic
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        You can search and look for open Vet
                                        Clinic near you anytime.
                                      </p>
                                    </div>
                                  </Link>

                                  <Link
                                    href={"/vet/partners"}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                  >
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-100 text-white sm:h-12 sm:w-12">
                                      <Image
                                        src={Vet}
                                        alt="dog-walking"
                                        width={50}
                                        height={50}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        Vet Online Consultation
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Book for an online vet consultation with
                                        our affiliated clinics anytime anywhere.
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </Popover.Group>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {session && (
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}

                {session ? (
                  <>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          {session.user.image ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={session.user.image}
                              alt="picture"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                onClick={(e) => signOut()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <Link
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    href="#"
                    onClick={(e) => (e.preventDefault(), signIn())}
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/#about"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                About
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/#services"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Services
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/#reviews"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Reviews
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/#pricing"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Pricing
              </Disclosure.Button>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-50 focus:outline-none hover:text-gray-700 focus-visible:ring">
                      <span className="text-gray-500">Schedule Service</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <Disclosure.Button
                        as="a"
                        href="/services/pet-sitter"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Find Pet Sitter
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="/vet/nearby"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Find Vet Clinic
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="/vet/online-consultation"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Schedule Vet Online Consultation
                      </Disclosure.Button>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {session ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {session.user.image ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={session.user.image}
                          alt="picture"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {session.user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {session.user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="a"
                      href="/user/profile"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(e) => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    onClick={(e) => (e.preventDefault(), signIn())}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
