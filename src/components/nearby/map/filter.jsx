import React, { useEffect, useState } from 'react';
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
            "types": ["(cities)"],
            "componentRestrictions": { country: "ph" },
        }
    });

    useEffect(() => {
        changeFilterValues({
            location: locVal,
            selectedPlace: searchVal,
            specialization: specialization,
            operatingHours: operatingHours
        })
    }, [locVal, searchVal, specialization, operatingHours, changeFilterValues])

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
                <select onChange={(e) => setSpecialization(e.target.value)}>
                    <option value="all">All</option>
                    <option value="dogs">Dogs</option>
                    <option value="cats">Cats</option>
                    <option value="birds">Birds</option>
                    <option value="reptiles">Reptiles</option>
                    <option value="fish">Fish</option>
                </select>
            </div>

            <div className='flex'>
                <span>Operating Hours:</span>
                <select onChange={(e) => setOperatingHours(e.target.value)}>
                    <option value="all">All</option>
                    <option value="day">Day</option>
                    <option value="overnight">24/7</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;