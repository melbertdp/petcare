import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Header } from '@/components/layout/Header'
import Map from '@/components/nearby/map/map'
import SlideOver from '@/components/nearby/slideOver/hiddenMenu';
import Modal from '@/components/nearby/modal/viewVetDetails';
import NearbyVetCards from '@/components/nearby/cards/vetCards';

import VetPartners from '@/components/vetParners/list';

import vets from '@/data/vets';

export default function NearbyVet() {

    const [hiddenMenuVisible, setHiddenMenuVisible] = useState(false);
    const [viewVetModalVisible, setViewVetModalVisible] = useState(false);
    const [viewVetDetails, setViewVetDetails] = useState({});
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        setPlaces(vets);
    }, []);

    const handleSearch = (e) => {
        console.log(e.target.value);

        //loop through the vets array and filter the vets that matches the substring of the input
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
                <title>Book online consultation</title>
            </Head>
            <div>
                <Header />

                <div class=" bg-white pt-8">
                    <h1 class="mb-10 text-center text-2xl font-bold">Our Vet Parners</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <VetPartners />
                    </div>
                </div>
            </div>
        </>
    )
}
