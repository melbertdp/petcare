import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import mapOptions from './mapOptions.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

const { forwardRef, useRef, useImperativeHandle } = React;

const { library, config } = require('@fortawesome/fontawesome-svg-core');


import Marker from '@/images/icon.png'

const AnyReactComponent = ({ text }) => {
    return (
        <div>
            <FontAwesomeIcon
                className="text-3xl text-cyan-500 border-solid"
                icon="fa-solid fa-shield-dog"
            />
            {text}
        </div>
    )
}

const MyMarker = ({ text }) => {
    return (
        <div>
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
        setViewPetDetails(vetNearby[key]);
    }

    useImperativeHandle(ref, () => ({
        setCenter(val) {
            setCenter({
                lat: parseFloat(val.lat),
                lng: parseFloat(val.lng)
            })
        }
    }));

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
            >

                <MyMarker
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                    text="My Marker"
                />

                {
                    vetNearby.map((place, index) => {
                        return (
                            <AnyReactComponent
                                key={place.index}
                                lat={place.clinic_lat}
                                lng={place.clinic_lng}
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