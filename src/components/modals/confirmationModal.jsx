import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import { useDispatch } from "react-redux";
import { setNotifState } from "@/store/notifSlice";

import LoadingPaw from "@/images/animated/loading_paw.json";
import Success from "@/images/animated/success.json";

export default function ConfirmationModal({
  open,
  setOpen,
  confirmation_type,
  confirm_message,
}) {
  const [showLoading, setShowLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setShowLoading(false);
        dispatch(setNotifState(confirmation_type));
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    {showLoading ? (
                      <Player
                        autoplay
                        loop
                        src={LoadingPaw}
                        style={{ height: "150px", width: "150px" }}
                      >
                        <Controls
                          visible={false}
                          buttons={["play", "repeat", "frame", "debug"]}
                        />
                      </Player>
                    ) : (
                      <>
                        <Player
                          autoplay
                          src={Success}
                          style={{ height: "150px", width: "150px" }}
                          keepLastFrame={true}
                        >
                          <Controls
                            visible={false}
                            buttons={["play", "repeat", "frame", "debug"]}
                          />
                        </Player>

                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          {confirm_message}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            We will send you a confirmation email shortly.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                  {!showLoading && (
                    <Link
                      href="/"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:text-sm"
                    >
                      Go back to home page
                    </Link>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
