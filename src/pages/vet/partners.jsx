import { useEffect, useState } from "react";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { Header } from "@/components/layout/Header";
import Map from "@/components/nearby/map/map";
import SlideOver from "@/components/nearby/slideOver/hiddenMenu";
import Modal from "@/components/nearby/modal/viewVetDetails";
import NearbyVetCards from "@/components/nearby/cards/vetCards";

import VetPartners from "@/components/vetParners/list";

import vets from "@/data/vets";

const vetList = [
  {
    id: 1,
    created_at: "2023-02-11T19:52:27.584145+00:00",
    name: "Sherlock Holmes",
    specialization: ["all", "dogs", "cats"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    address: "221B baker street",
    price: 1,
    imageSrc: "https://i.pravatar.cc/300?img=2",
    rating: 3,
    active: true,
    clinic_lat: 14.543382,
    clinic_lng: 121.057486,
    clinic_name: "clinic lang",
    address_city: "taguig",
    operatingHours: ["all"],
    phone: "09123456789",
    email: "sherlock.holmes@gmail.com",
  },
  {
    id: 2,
    created_at: "2023-02-12T04:08:01.087519+00:00",
    name: "Tony Starks",
    specialization: ["all", "dogs", "cats"],
    description: "i am iron man",
    address: "1234 Main St",
    price: 75,
    imageSrc: "https://i.pravatar.cc/300?img=3",
    rating: 5,
    active: true,
    clinic_lat: 14.551773,
    clinic_lng: 121.053795,
    clinic_name: "pet solutions",
    address_city: "taguig",
    operatingHours: ["all", "day"],
    phone: "09123456789",
    email: "tony.stark@gmail.com",
  },
  {
    id: 3,
    created_at: "2023-02-12T04:09:15.034441+00:00",
    name: "wade wilson",
    specialization: ["all", "reptiles", "fish"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    address: "1234 Main St",
    price: 12,
    imageSrc: "https://i.pravatar.cc/300?img=1",
    rating: 3,
    active: true,
    clinic_lat: 14.534077,
    clinic_lng: 121.049289,
    clinic_name: "pet express",
    address_city: "taguig",
    operatingHours: ["all", "day"],
    phone: "09123456789",
    email: "wade.wilson@gmail.com",
  },
  {
    id: 4,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "Peter Parker",
    specialization: ["all", "exotic", "birds"],
    description: "Your friendly neighborhood spiderman",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=4",
    rating: 2,
    active: true,
    address: "1234 Main St",
    clinic_lat: 14.555428,
    clinic_lng: 121.063022,
    clinic_name: "pet hospital",
    address_city: "taguig",
    operatingHours: ["all", "night"],
    phone: "09123456789",
    email: "peter.parker@gmail.com",
  },
  {
    id: 5,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "skyranch vet",
    specialization: ["all", "exotic", "birds"],
    description: "tagaytay vet",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=5",
    rating: 2,
    active: true,
    address: "1Km. 60 Tagaytay - Nasugbu Hwy, Kaybagal South, Tagaytay, Cavite",
    clinic_lat: 14.095153,
    clinic_lng: 120.938156,
    clinic_name: "pet hospital",
    address_city: "tagaytay",
    operatingHours: ["all", "night"],
    phone: "09123456789",
    email: "peter.parker@gmail.com",
  },
  {
    id: 6,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "taal vet",
    specialization: ["all", "exotic", "birds"],
    description: "taal vet",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=6",
    rating: 2,
    active: true,
    address: "Taal batangas",
    clinic_lat: 13.891028,
    clinic_lng: 120.93138,
    clinic_name: "pet hospital",
    address_city: "batangas",
    operatingHours: ["all", "night"],
    phone: "09123456789",
    email: "peter.parker@gmail.com",
  },
  {
    id: 7,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "talisay vet",
    specialization: ["all", "exotic", "birds"],
    description: "talisay vet",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=7",
    rating: 2,
    active: true,
    address: "Taal batangas",
    clinic_lat: 14.010892,
    clinic_lng: 120.997093,
    clinic_name: "pet hospital",
    address_city: "batangas",
    operatingHours: ["all", "night"],
    phone: "09123456789",
    email: "peter.parker@gmail.com",
  },
  {
    id: 8,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "rizal vet",
    specialization: ["all", "exotic", "birds"],
    description: "rizal vet",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=8",
    rating: 2,
    active: true,
    address: "rizal jose",
    clinic_lat: 14.474648,
    clinic_lng: 121.192419,
    clinic_name: "pet hospital",
    address_city: "rizal",
    operatingHours: ["all", "night"],
    phone: "09123456789",
    email: "peter.parker@gmail.com",
  },
];

export default function NearbyVet() {
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
            <VetPartners vetList={vetList} />
          </div>
        </div>
      </div>
    </>
  );
}
