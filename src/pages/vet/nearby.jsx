import { useEffect, useState } from 'react';
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'
import { Header } from '@/components/layout/Header'
import Map from '@/components/nearby/map/map'
import SlideOver from '@/components/nearby/slideOver/hiddenMenu';
import Modal from '@/components/nearby/modal/viewVetDetails';
import NearbyVetCards from '@/components/nearby/cards/vetCards';

import vets from '@/data/vets';

export default function NearbyVet({vetList}) {

    const [hiddenMenuVisible, setHiddenMenuVisible] = useState(false);
    const [viewVetModalVisible, setViewVetModalVisible] = useState(false);
    const [viewVetDetails, setViewVetDetails] = useState({});
    const [places, setPlaces] = useState([]);

    useEffect(() => {

        // console.log("vetList", vetList);

        setPlaces(vetList);
    }, []);

    const handleSearch = (e) => {
        
        const filteredVets = vets.filter(vet => {
            return vet.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setPlaces(filteredVets);
    }

    const setViewPetDetails = (details) => {
        setViewVetDetails(details);
        setViewVetModalVisible(true)
    }

    return (
        <>
            <Head>
                <title>Nearby vet</title>
            </Head>
            <div>
                <Header />

                <div class=" bg-white pt-8">
                    <h1 class="mb-10 text-center text-2xl font-bold">Nearby Vet Clinic</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div>
                            <button className="sm:hidden" onClick={() => setHiddenMenuVisible(true)}>Manual Search</button>
                            <SlideOver
                                open={hiddenMenuVisible}
                                setOpen={setHiddenMenuVisible}
                                vets={places}
                                handleSearch={handleSearch}
                                setViewPetDetails={setViewPetDetails}
                            />
                        </div>

                        <div class="hidden rounded-lg md:w-1/4 sm:block">
                            <input
                                onChange={(e) => handleSearch(e)}
                                type="text"
                                class="w-full px-4 py-2 mb-6 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-green-500"
                                placeholder="Search"
                            />

                            {places.map((vet, index) => (
                                <NearbyVetCards key={index} vet={vet} setViewPetDetails={setViewPetDetails} />
                            ))}
                        </div>

                        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-3/4">
                            <Map
                                vetNearby={places}
                                setViewPetDetails={setViewPetDetails}
                            />
                        </div>
                        {
                            viewVetModalVisible && <Modal viewVetDetails={viewVetDetails} open={viewVetModalVisible} setOpen={setViewVetModalVisible} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {

    const supabase = createClient(process.env.NEXT_PUBLIC_soupUrl, process.env.NEXT_PUBLIC_soupKey)
    const { data } = await supabase
        .from('vetpartners')
        .select('*')
        .order('id')


    console.log("data", data);

    return {
        props: {
            vetList: data
        }
    }
}