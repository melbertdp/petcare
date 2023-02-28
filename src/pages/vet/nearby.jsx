import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { Header } from "@/components/layout/Header";
import Map from "@/components/nearby/map/map";
import SlideOver from "@/components/nearby/slideOver/hiddenMenu";
import Modal from "@/components/modals/viewDetails";
import NearbyVetCards from "@/components/nearby/cards/vetCards";

import Filter from "@/components/nearby/map/filter";
import Link from "next/link";

import vetList from "@/data/vetlist.json";

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
    } else {
      filteredVets = vetList.filter((vet) => {
        return vet.address_city.toLowerCase().includes("taguig");
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

  return (
    <>
      <Head>
        <title>Nearby vet</title>
      </Head>
      <div>
        <Header />

        <div className=" bg-white pt-8">
          <h1 className="mb-10 text-center text-2xl font-bold">
            Nearby Vet Clinic
          </h1>

          {/* filter */}
          <Filter
            // changeLocation={handleChangeLocationFilter}
            setMapCenter={setMapCenter}
            changeFilterValues={handleChangeFilterValues}
          />
          {/* end filter */}

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
