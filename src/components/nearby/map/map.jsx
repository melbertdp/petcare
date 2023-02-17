import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import mapOptions from './mapOptions.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
const { library, config } = require('@fortawesome/fontawesome-svg-core');


import Marker from '@/images/icon.png'

const AnyReactComponent = ({ text }) => {
    return (
        <div>
            <FontAwesomeIcon className="text-3xl text-cyan-500 border-solid" icon="fa-solid fa-shield-dog" />
            {text}
        </div>
    )
}

export default function SimpleMap({ vetNearby, setViewPetDetails }) {
    library.add(far, fas);
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

    return (
        // Important! Always set the container height explicitly
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
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onChildClick={onChildClick}
            >
                {/* <AnyReactComponent
                    lat={14.894720}
                    lng={120.733336}
                    text="My Marker"
                /> */}

                {vetNearby.map((place, index) => {
                    console.log("place", place);
                    return (
                        <AnyReactComponent
                            key={place.index}
                            lat={place.clinic_lat}
                            lng={place.clinic_lng}
                            text={place.name}
                        />
                    )
                })}
            </GoogleMapReact>
        </div>
    );
}