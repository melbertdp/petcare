import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({ vetNearby }) {

    const [places, setPlaces] = useState([]);

    const defaultProps = {
        center: {
            lat: 14.894720,
            lng: 120.733336
        },
        zoom: 14
    };

    useEffect(() => {
        setPlaces(vetNearby);
    }, [])

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={14.894720}
                    lng={120.733336}
                    text="My Marker"
                />

                {places.map((place, index) => {

                    console.log("places", place);

                    return (
                        <AnyReactComponent
                            key={place.name}
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