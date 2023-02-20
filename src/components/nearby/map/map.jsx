import React, { useState, useEffect } from "react";
import GoogleMapReact, { fitBounds } from 'google-map-react-concurrent';
import mapOptions from './mapOptions.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

const { forwardRef, useRef, useImperativeHandle } = React;

const { library, config } = require('@fortawesome/fontawesome-svg-core');


import Marker from '@/images/icon.png'

const AnyReactComponent = ({ text }) => {
    return (
        <div className="cursor-pointer">
            <FontAwesomeIcon
                className="text-3xl text-cyan-500 border-solid"
                icon="fa-solid fa-shield-dog"
            />
            {/* {text} */}
        </div>
    )
}

const MyMarker = ({ text }) => {
    return (
        <div className="cursor-pointer">
            <FontAwesomeIcon
                className="text-3xl text-red-700 border-solid"
                icon="fa-solid fa-street-view"
            />
            {text}
        </div>
    )
}


const SimpleMap = forwardRef(({ vetNearby, setViewPetDetails }, ref) => {
    library.add(far, fas);

    const [center, setCenter] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const [mapsRef, setMapsRef] = useState(null);

    const [mapMarkers, setMapMarkers] = useState([]);

    useEffect(() => {

        if (vetNearby.length > 0) {
            setMapMarkers(vetNearby);
        }

    }, [vetNearby, mapsRef, mapRef]);

    const defaultProps = {
        center: {
            lat: 14.556444,
            lng: 121.054146
        },
        zoom: 15
    };

    const onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
        this.props.onCenterChange(center);
        this.props.onZoomChange(zoom);
    }

    const onChildClick = (key, childProps) => {

        if (key === 0) return;

        setViewPetDetails(mapMarkers[key - 1]);
    }

    useImperativeHandle(ref, () => ({
        setCenter(val) {
            setCenter({
                lat: parseFloat(val.lat),
                lng: parseFloat(val.lng)
            })
        }
    }));

    const fitBounds = (map, maps, mapMarkers) => {
        const bounds = new maps.LatLngBounds();

        mapMarkers.forEach((place) => {
            bounds.extend(new maps.LatLng(
                place.clinic_lat,
                place.clinic_lng,
            ));
        });

        map.fitBounds(bounds);
    };

    const apiIsLoaded = (map, maps, mapMarkers) => {
        setMapRef(map);
        setMapsRef(maps);
        fitBounds(map, maps, mapMarkers);
    };

    const handleOnChange = (bounds) => {

        // console.log("bounds", bounds);

        // if (bounds.nw.lat >= 45 || bounds.se.lat <= -85) {
        //     fitBounds(myMap);
        // }
    };

    return (
        <div style={{ height: '450px', width: '100%' }}>

            <GoogleMapReact
                options={{
                    clickableIcons: false,
                    fullscreenControl: false,
                    keyboardShortcuts: false,
                    minZoom: 13,
                    maxZoom: 18,
                    styles: mapOptions
                }}
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API, libraries: ["places", "geometry"], }}
                // defaultCenter={defaultProps.center}
                center={center || defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onChildClick={onChildClick}
                onCenterChange={onBoundsChange}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, mapMarkers)}
                onChange={({ bounds }) => handleOnChange(bounds)}
            >

                <MyMarker
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                    text=""
                />

                {
                    mapMarkers.map((place, index) => {
                        return (
                            <AnyReactComponent
                                key={place.index}
                                lat={parseFloat(place.clinic_lat)}
                                lng={parseFloat(place.clinic_lng)}
                                text={place.name}
                            />
                        )
                    })
                }
            </GoogleMapReact>
        </div>
    );
});

SimpleMap.displayName = 'SimpleMap';

export default SimpleMap;