import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const Filter = ({ changeLocation, setMapCenter, changeFilterValues }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSearchingPlace, setIsSearchingPlace] = useState(false);
  const [locVal, setLocVal] = useState("nearby");
  const [searchVal, setSearchVal] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [operatingHours, setOperatingHours] = useState("all");

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
    debounce: 500,
    sessionToken: true,
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ph" },
    },
  });

  useEffect(() => {
    changeFilterValues({
      location: locVal,
      selectedPlace: searchVal,
      specialization: specialization,
      operatingHours: operatingHours,
    });
  }, [locVal, searchVal, specialization, operatingHours]);

  const handlePlaceSelection = (item) => {
    placesService?.getDetails(
      {
        placeId: item.place_id,
        placeId: item.place_id,
      },
      (placeDetails) => {
        changeLocation(placeDetails);
        setSelectedPlace(placeDetails);
        setMapCenter({
          clinic_lat: placeDetails.geometry.location.lat(),
          clinic_lng: placeDetails.geometry.location.lng(),
        });
        setIsSearchingPlace(false);
        setSearchVal("");
      }
    );
  };

  const renderItem = (item) => {
    return (
      <li
        className="bg-white border border-gray-300 p-2 cursor-pointer hover:bg-gray-50"
        key={item.id}
        onClick={() => {
          handlePlaceSelection(item);
        }}
      >
        {item.description}
      </li>
    );
  };

  useEffect(() => {
    console.log("selectedPlace", selectedPlace);
  }, [selectedPlace]);

  const handleChangeLocation = (e) => {
    setLocVal(e.target.value);
  };

  return (
    <div className="mx-auto max-w-5xl justify-center px-6 mb-5 md:flex md:space-x-6 xl:px-0">
      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Search by Location
        </label>
        <div className="mt-1 sm:col-span-1 sm:mt-0">
          <div class="flex justify-start">
            <div class="w-auto">
              <div class="flex">
                <input
                  type={"text"}
                  placeholder="Search By Location"
                  value={searchVal}
                  onChange={(evt) => {
                    setSearchVal(evt.target.value);
                    getPlacePredictions({ input: evt.target.value });
                    setIsSearchingPlace(true);
                  }}
                  loading={isPlacePredictionsLoading}
                />
                <ul className="absolute z-50 mt-10 md:mt-12">
                  {isSearchingPlace &&
                    placePredictions.map((item) => renderItem(item))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Specialization:
        </label>
        <div className="mt-1 sm:col-span-1 sm:mt-0">
          <div class="flex justify-start">
            <div class="w-auto">
              <div class="flex">
                <select
                  name="hours"
                  class="border-gray-300 shadow-sm bg-transparent text-sm appearance-none outline-none"
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="dogs">Dogs</option>
                  <option value="cats">Cats</option>
                  <option value="birds">Birds</option>
                  <option value="reptiles">Reptiles</option>
                  <option value="fish">Fish</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Operating Hours:
        </label>
        <div className="mt-1 sm:col-span-1 sm:mt-0">
          <div class="flex justify-start">
            <div class="w-auto">
              <div class="flex">
                <select
                  name="hours"
                  class="border-gray-300 shadow-sm bg-transparent text-sm appearance-none outline-none"
                  onChange={(e) => setOperatingHours(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="day">Day</option>
                  <option value="night">24/7</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Filter;
