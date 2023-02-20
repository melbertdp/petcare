import { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import ConfirmationModal from '@/components/scheduleVisit/modal/confirmation';

export default function ScheduleVisitForm() {

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [bookingDate, setBookingDate] = useState({
        startDate: null
    });

    const handleDateSelection = (date) => {
        console.log(date)
        setBookingDate(date)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Visit Purpose</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Tell us the purpose of your online consultation.
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Date of visit
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
                                    <Datepicker
                                        classNames="fooobar"
                                        primaryColor={"indigo"}
                                        placeholder={"Visit date"}
                                        value={bookingDate}
                                        onChange={handleDateSelection}
                                        useRange={false}
                                        asSingle={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Time of Visit
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div class="flex justify-start">
                                    <div class="w-auto">
                                        <div class="flex">
                                            <select
                                                name="hours"
                                                class="border-gray-300 shadow-sm bg-transparent text-sm appearance-none outline-none"
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">10</option>
                                                <option value="12">12</option>
                                            </select>
                                            <span class="text-sm mr-2 ml-2 mt-2">:</span>
                                            <select
                                                name="minutes"
                                                class="border-gray-300 shadow-sm bg-transparent text-sm appearance-none outline-none mr-4"
                                            >
                                                <option value="0">00</option>
                                                <option value="30">30</option>
                                            </select>
                                            <select
                                                name="ampm"
                                                class="border-gray-300 shadow-sm bg-transparent text-sm appearance-none outline-none"
                                            >
                                                <option value="am">AM</option>
                                                <option value="pm">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Visit Purpose
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={''}
                                />
                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about the purpose of your visit.</p>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Photos
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Payment options</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at nisi nibh. Aenean vehicula nulla eget nisl condimentum accumsan. Nam sodales nulla eu diam pharetra dignissim
                        </p>
                    </div>
                    <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">

                        <div className="pt-6 sm:pt-5">
                            <div role="group" aria-labelledby="label-notifications">
                                <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                                    <div>
                                        <div
                                            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                            id="label-notifications"
                                        >
                                            Payment method
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="max-w-lg">
                                            <p className="text-sm text-gray-500">orem ipsum dolor sit amet, consectetur adipiscing elit. Cras at nisi nibh..</p>
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="gcash"
                                                        name="gcash"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label htmlFor="gcash" className="ml-3 block text-sm font-medium text-gray-700">
                                                        Gcash
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="bank"
                                                        name="bank"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label htmlFor="bank" className="ml-3 block text-sm font-medium text-gray-700">
                                                        Bank Transfer
                                                    </label>
                                                </div>
                                                {/* <div className="flex items-center">
                                                    <input
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                        No push notifications
                                                    </label>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>

                {
                    ConfirmationModal && (
                        <ConfirmationModal
                            open={showConfirmationModal}
                            setOpen={setShowConfirmationModal}
                        />
                    )
                }

            </div>
        </form>
    )
}
