import { useEffect, useState } from 'react';
import Head from 'next/head'

import { Header } from '@/components/layout/Header'
import { Container } from '@/components/Container'
import Form from '@/components/vetParners/booking';
import vets from '@/data/vets';

export default function NearbyVet() {

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

    return (
        <>
            <Head>
                <title>Schedule a visit</title>
            </Head>
            <div>
                <Header />

                <div class=" bg-white pt-8 py-12">
                    <h1 class="mb-10 text-center text-2xl font-bold">Visit Vet</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <Form />
                    </div>
                </div>
            </div>
        </>
    )
}
