import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Header } from "@/components/layout/Header";
import Map from "@/components/petsitter/map/map";
import SlideOver from "@/components/petsitter/slideOver/hiddenMenu";
import Modal from "@/components/petsitter/modal/petSitterDetails";
import NearbyVetCards from "@/components/petsitter/cards/vetCards";

import Filter from "@/components/petsitter/map/filter";

const vetList = [
  {
    id: 1,
    created_at: "2023-02-11T19:52:27.584145+00:00",
    name: "Pet sitter 1",
    specialization: ["all", "dogs", "cats"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    address: "G/F Shangri-La at the Fort Manila, 30th Street, Bonifacio Global City, Taguig, Metro Manila",
    price: 499,
    imageSrc: "https://i.pravatar.cc/300?img=2",
    rating: 3,
    active: true,
    clinic_lat: 14.552587,
    clinic_lng: 121.047455,
    clinic_name: "clinic lang",
    address_city: "taguig",
    operatingHours: ["all"],
    amenities: [
      "pool",
      "online",
      "air-conditioned",
      "bed",
      "crate",
      "cctv",
      "playground",
    ],
    phone: "09123456789",
    email: "petsitter1@gmail.com",
    average: 4,
    reviews: [
      {
        id: 1,
        rating: 5,
        content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
        date: 'July 16, 2021',
        datetime: '2021-07-16',
        author: 'Emily Selman',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      },
      {
        id: 2,
        rating: 2,
        content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
        date: 'July 12, 2021',
        datetime: '2021-07-12',
        author: 'Hector Gibbons',
        avatarSrc:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      },
    ],
  },
  {
    id: 2,
    created_at: "2023-02-12T04:08:01.087519+00:00",
    name: "Pet sitter 2",
    specialization: ["all", "dogs", "cats"],
    description: "i am iron man",
    address: "14 Anahaw Rd, Makati, 1219 Metro Manila",
    price: 75,
    imageSrc: "https://i.pravatar.cc/300?img=3",
    rating: 5,
    active: true,
    clinic_lat: 14.553116,
    clinic_lng: 121.037713,
    clinic_name: "pet solutions",
    address_city: "taguig",
    operatingHours: ["all", "day"],
    amenities: [
      "pool",
      "online",
      "air-conditioned",
      "bed",
      "crate",
      "cctv",
      "playground",
    ],
    phone: "09123456789",
    email: "petsitter2@gmail.com",
    reviews: []
  },
  {
    id: 3,
    created_at: "2023-02-12T04:09:15.034441+00:00",
    name: "Pet sitter 3",
    specialization: ["all", "reptiles", "fish"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    address: "G2VQ+JQ2, Manila Polo Club Dr, Makati, Metro Manila",
    price: 12,
    imageSrc: "https://i.pravatar.cc/300?img=1",
    rating: 3,
    active: true,
    clinic_lat: 14.543913,
    clinic_lng: 121.039319,
    clinic_name: "pet express",
    address_city: "taguig",
    operatingHours: ["all", "day"],
    amenities: [
      "pool",
      "online",
      "air-conditioned",
      "bed",
      "crate",
      "cctv",
      "playground",
    ],
    phone: "09123456789",
    email: "petsitter3@gmail.com",
    reviews: []
  },
  {
    id: 4,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "Pet sitter 4",
    specialization: ["all", "exotic", "birds"],
    description: "Your friendly neighborhood spiderman",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=4",
    rating: 2,
    active: true,
    address: "Upper McKinley Rd",
    clinic_lat: 14.533773,
    clinic_lng: 121.051349,
    clinic_name: "pet hospital",
    address_city: "taguig",
    operatingHours: ["all", "night"],
    amenities: ["pool", "air-conditioned", "crate", "cctv", "playground"],
    phone: "09123456789",
    email: "petsitter4@gmail.com",
    reviews: []
  },
  {
    id: 5,
    created_at: "2023-02-12T04:10:57.084743+00:00",
    name: "Pet sitter 5",
    specialization: ["all", "exotic", "birds"],
    description: "Your friendly neighborhood spiderman",
    price: 56,
    imageSrc: "https://i.pravatar.cc/300?img=4",
    rating: 2,
    active: true,
    address: "Ordonio Dr, Camp John Hay, Baguio, Benguet",
    clinic_lat: 16.400490,
    clinic_lng: 120.617380,
    clinic_name: "pet hospital",
    address_city: "baguio",
    operatingHours: ["all", "night"],
    amenities: ["pool", "air-conditioned", "crate", "cctv", "playground"],
    phone: "09123456789",
    email: "petsitter5@gmail.com",
    reviews: []
  }
];

export default function NearbyVet() {
  const [hiddenMenuVisible, setHiddenMenuVisible] = useState(false);
  const [viewVetModalVisible, setViewVetModalVisible] = useState(false);
  const [viewVetDetails, setViewVetDetails] = useState({});
  const [places, setPlaces] = useState([]);

  const mapRef = useRef();

  useEffect(() => {
    const newLoc = "taguig";

    const filteredVets = vetList.filter((vet) => {
      return vet.address_city.toLowerCase().includes(newLoc.toLowerCase());
    });

    setPlaces(filteredVets);
  }, []);

  const handleSearch = (e) => {
    const filteredVets = vets.filter((vet) => {
      return vet.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setPlaces(filteredVets);
  };

  const setViewPetDetails = (details) => {
    setViewVetDetails(details);
    setViewVetModalVisible(true);
  };

  // const handleChangeLocationFilter = (e) => {

  // const newLoc = e.address_components[0]?.long_name;

  // const filteredVets = vetList.filter((vet) => {
  //   return vet.address_city.toLowerCase() == newLoc.toLowerCase();
  // });

  // setPlaces(filteredVets);
  // };

  const focusClickedVet = (e) => {
    console.log(e);
  };

  const setMapCenter = (center) => {
    mapRef.current.setCenter({
      lat: center.clinic_lat,
      lng: center.clinic_lng,
    });
  };

  const handleChangeFilterValues = (val) => {
    let specialization = val.specialization;
    let operatingHours = val.operatingHours;
    let filteredVets = [];

    if (val.selectedPlace) {
      const newLoc = val.selectedPlace.address_components[0]?.long_name;

      filteredVets = vetList.filter((vet) => {
        return vet.address_city.toLowerCase() == newLoc.toLowerCase();
      });
    }

    filteredVets = filteredVets.filter((vet) => {
      return (
        vet.specialization.includes(specialization) &&
        vet.operatingHours.includes(operatingHours)
      );
    });

    setPlaces(filteredVets);
  };

  console.log("places: ", places);

  return (
    <>
      <Head>
        <title>Pet Sitter</title>
      </Head>
      <div>
        <Header />

        <div className=" bg-white pt-8">
          <h1 className="mb-10 text-center text-2xl font-bold">
            Nearby Pet sitters
          </h1>

          <Filter
            // changeLocation={handleChangeLocationFilter}
            setMapCenter={setMapCenter}
            changeFilterValues={handleChangeFilterValues}
          />

          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div>
              <button
                className="sm:hidden"
                onClick={() => setHiddenMenuVisible(true)}
              >
                Manual Search
              </button>
              <SlideOver
                open={hiddenMenuVisible}
                setOpen={setHiddenMenuVisible}
                vets={places}
                handleSearch={handleSearch}
                setViewPetDetails={setViewPetDetails}
              />
            </div>

            <div className="hidden rounded-lg md:w-1/4 sm:block">
              <div className="scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin overflow-y-scroll max-h-[450px]">
                {places.length > 0 ? (
                  places.map((vet, index) => (
                    <NearbyVetCards
                      key={index}
                      vet={vet}
                      setViewPetDetails={setViewPetDetails}
                      setMapCenter={setMapCenter}
                    />
                  ))
                ) : (
                  <div>
                    <h1 className="text-center text-2xl font-bold">
                      No nearby vet found in your location
                    </h1>
                    <p className="text-center pt-4">
                      book an{" "}
                      <Link className="text-blue-500" href="/vet/partners">
                        online
                      </Link>{" "}
                      appointment instead
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-3/4">
              <Map
                ref={mapRef}
                vetNearby={places}
                setViewPetDetails={setViewPetDetails}
              />
            </div>
            {viewVetModalVisible && (
              <Modal
                viewVetDetails={viewVetDetails}
                open={viewVetModalVisible}
                setOpen={setViewVetModalVisible}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
