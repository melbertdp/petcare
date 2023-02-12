import { useEffect, useState } from 'react';
import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'
import { Header } from '@/components/layout/Header'
import Map from '@/components/nearby/map/map'
import SlideOver from '@/components/nearby/slideOver/hiddenMenu';
import Modal from '@/components/nearby/modal/viewVetDetails';
import NearbyVetCards from '@/components/nearby/cards/vetCards';

import VetPartners from '@/components/vetParners/list';

import vets from '@/data/vets';

export default function NearbyVet(vetList) {
    
    return (
        <>
            <Head>
                <title>Book online consultation</title>
            </Head>
            <div>
                <Header />

                <div class=" bg-white pt-8">
                    <h1 class="mb-10 text-center text-2xl font-bold">Our Vet Parners</h1>
                    <div class="overflow-hidden pt-1 pb-20 sm:py-1 lg:pb-32 xl:pb-36">
                        <VetPartners />
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {

    const supabase = createClient(process.env.soupUrl, process.env.soupKey)
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