import { useState } from 'react';
import Head from 'next/head'
import { Header } from '@/components/layout/Header'
import Map from '@/components/nearby/map/map'
import SlideOver from '@/components/nearby/slideOver/hiddenMenu';

const vets = [
    {
        name: "vet1",
        address: "address 1",
        price: 250,
        rating: 4.5,
        location: {
            lat: 14.898463,
            lng: 120.735960
        }
    },
    {
        name: "vet2",
        address: "address 2",
        price: 250,
        rating: 4.5,
        location: {
            lat: 14.895541,
            lng: 120.733891
        }
    },
    {
        name: "vet3",
        address: "address 3",
        price: 300,
        rating: 1.5,
        location: {
            lat: 14.894535,
            lng: 120.732304
        }
    }
]

export default function NearbyVet() {

    const [hiddenMenuVisible, setHiddenMenuVisible] = useState(false);

    return (
        <>
            <Head>
                <title>Nearby vet</title>
            </Head>
            <div>
                <Header />

                <div class="h-screen bg-gray-100 pt-8">
                    <h1 class="mb-10 text-center text-2xl font-bold">Nearby Vet Clinic</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className='sm:hidden'>
                            <button onClick={() => setHiddenMenuVisible(true)}>Search</button>
                            <SlideOver
                                open={hiddenMenuVisible}
                                setOpen={setHiddenMenuVisible}
                                vets={vets}
                            />
                        </div>

                        <div class="hidden rounded-lg md:w-1/4 sm:block">
                            <input type="text" class="w-full px-4 py-2 mb-6 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-green-500" placeholder="Search" />

                            {vets.map((vet, index) => (
                                <div key={index} class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <h1>{vet.name}</h1>
                                    <p>{vet.address}</p>
                                    <p>{vet.price}</p>
                                    <p>{vet.rating}</p>
                                </div>
                            ))}
                        </div>

                        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-3/4">
                            <Map vetNearby={vets} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
