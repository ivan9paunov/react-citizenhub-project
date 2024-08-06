import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '200px'
};

const center = {
    lat: 42.5055,
    lng: 24.7088
};

export default function GoogleMaps() {
    return (
        <LoadScript googleMapsApiKey="AIzaSyDJ_fgWPfiBfW51692eHsVmgOsndmgpMfc">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}