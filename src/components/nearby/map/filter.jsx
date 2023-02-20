import React, { useEffect, useState } from 'react';
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";


const Filter = ({ changeLocation, setMapCenter }) => {

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isSearchingPlace, setIsSearchingPlace] = useState(false);
    const [locVal, setLocVal] = useState("nearby");
    const [searchVal, setSearchVal] = useState("");

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
            "types": ["(cities)"],
            "componentRestrictions": { country: "ph" },
        }
    });

    const handlePlaceSelection = (item) => {
        placesService?.getDetails(
            {
                placeId: item.place_id,
                placeId: item.place_id,
            },
            (placeDetails) => {
                changeLocation(placeDetails)
                setSelectedPlace(placeDetails);
                setMapCenter({
                    clinic_lat: placeDetails.geometry.location.lat(),
                    clinic_lng: placeDetails.geometry.location.lng()
                })
                setIsSearchingPlace(false);
                setSearchVal("");
            }
        );
    }

    const renderItem = (item) => {
        return (
            <li
                className='bg-white border border-gray-300 p-2 cursor-pointer hover:bg-gray-50'
                key={item.id}
                onClick={() => {
                    handlePlaceSelection(item);
                }}
            >
                {item.description}
            </li>
        );
    }

    useEffect(() => {
        console.log("selectedPlace", selectedPlace)
    }, [selectedPlace])

    const handleChangeLocation = (e) => {
        setLocVal(e.target.value);
    }

    return (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className='flex'>
                <span>Location:</span>
                <select onChange={handleChangeLocation}>
                    <option value="nearby">Nearby</option>
                    <option value="custom">Search by location</option>
                </select>
            </div>

            <div className='flex relative'>
                <input
                    disabled={locVal === "nearby" ? true : false}
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
                <ul className='absolute z-50 mt-10 md:mt-12'>
                    {
                        isSearchingPlace && placePredictions.map((item) => renderItem(item))
                    }
                </ul>
            </div>

            <div className='flex'>
                <span>Specialization:</span>
                <select>
                    <option value="all">All</option>
                    <option value="all">Dogs</option>
                    <option value="all">Cats</option>
                    <option value="all">Birds</option>
                    <option value="all">Reptiles</option>
                    <option value="all">Fish</option>
                </select>
            </div>

            <div className='flex'>
                <span>Operating Hours:</span>
                <select>
                    <option value="all">All</option>
                    <option value="all">Open Now</option>
                    <option value="all">24/7</option>
                </select>
            </div>

            <div>
                <button>Apply</button>
            </div>
        </div>
    );
}

export default Filter;