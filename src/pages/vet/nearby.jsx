import { useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'
import { Header } from '@/components/layout/Header'
import Map from '@/components/nearby/map/map'
import SlideOver from '@/components/nearby/slideOver/hiddenMenu';
import Modal from '@/components/nearby/modal/viewVetDetails';
import NearbyVetCards from '@/components/nearby/cards/vetCards';

import vets from '@/data/vets';

import Filter from '@/components/nearby/map/filter'

export default function NearbyVet({ vetList }) {

    const [hiddenMenuVisible, setHiddenMenuVisible] = useState(false);
    const [viewVetModalVisible, setViewVetModalVisible] = useState(false);
    const [viewVetDetails, setViewVetDetails] = useState({});
    const [places, setPlaces] = useState([]);

    const mapRef = useRef();

    useEffect(() => {
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

    const handleChangeLocationFilter = (e) => {
        console.log(e.target.value);
    }

    const focusClickedVet = (e) => {
        console.log(e);
    }


    const setMapCenter = (center) => {
        // console.log(center);
        mapRef.current.setCenter({lat: center.clinic_lat, lng: center.clinic_lng});
    }

    return (
        <>
            <Head>
                <title>Nearby vet</title>
            </Head>
            <div>
                <Header />

                <div className=" bg-white pt-8">
                    <h1 className="mb-10 text-center text-2xl font-bold">Nearby Vet Clinic</h1>



                    {/* <button onClick={() => mapRef.current.setCenter()}>Click</button> */}


                    {/* filter */}
                    <Filter
                        changeLocation={handleChangeLocationFilter}
                        setMapCenter={setMapCenter}
                    />
                    {/* end filter */}

                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
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

                        <div className="hidden rounded-lg md:w-1/4 sm:block">
                            {/* <input
                                onChange={(e) => handleSearch(e)}
                                type="text"
                                className="w-full px-4 py-2 mb-6 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-green-500"
                                placeholder="Search"
                            /> */}
                            <div className='overflow-y-scroll max-h-[450px]'>
                                {places.map((vet, index) => (
                                    <NearbyVetCards
                                        key={index}
                                        vet={vet}
                                        setViewPetDetails={setViewPetDetails}
                                        setMapCenter={setMapCenter}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-3/4">
                            <Map
                                ref={mapRef}
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

    return {
        props: {
            vetList: data
        }
    }
}