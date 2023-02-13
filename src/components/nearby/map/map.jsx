import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import mapOptions from './mapOptions.json';

import Marker from '@/images/icon.png'

const AnyReactComponent = ({ text }) => {
    return (
        <div>
            <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10c0 3.976-7 11-7 11s-7-7.024-7-11 3.134-7 7-7 7 3.024 7 7zM9 10h3m3 0h-3m0 0V7m0 3v3" /></svg>
            {text}
        </div>
    )
}

export default function SimpleMap({ vetNearby, setViewPetDetails }) {

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