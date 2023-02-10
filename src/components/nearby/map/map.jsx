import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import mapOptions from './mapOptions.json';

const AnyReactComponent = ({ text }) => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
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
                            lat={place.location.lat}
                            lng={place.location.lng}
                            text={place.name}
                        />
                    )
                })}
            </GoogleMapReact>
        </div>
    );
}