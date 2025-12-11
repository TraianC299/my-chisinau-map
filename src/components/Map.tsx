'use client'; // This directive is essential for map components

import locations from '@/assets/locations.json';
import { setSelectedBuilding } from '@/redux/mapSlice';
import L from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import UserLocation from './UserLocation';
// --- Fix for default marker icons in Next.js ---
// Without this, the pin might appear invisible.

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Selected Red Icon
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const iconFix = () => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};
    const center: [number, number] = [47.0226, 28.8347];

export default function Map() {
    const dispatch = useDispatch();
    const selectedBuilding = useSelector((state: any) => state.map.selectedBuilding);
    
    // Run the icon fix once when the component mounts
    useEffect(() => {
        iconFix();
    }, []);

    // Coordinates for Mihai Eminescu National Theatre, Chișinău
const isSelected = (shortcode: string) => {
        return selectedBuilding === shortcode;
    };
    return (
        <div className="w-full h-full rounded-xl z-0 overflow-hidden shadow-lg border-2 border-gray-200">
            <MapContainer
                center={center}
                zoom={16}
                style={{ height: '100vh', width: '100vw' }}
                zoomControl={false} // <--- 1. REMOVE ZOOM BUTTONS for a cleaner UI
            >
                <UserLocation />
                {/* Using a "CartoDB Voyager" tile layer for a cleaner, prettier look than standard OSM.
           You can change this URL to use Mapbox or Stadia Maps later.
        */}
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />


                {locations.map((loc) => (
                    <Marker
                        key={loc.shortcode}
                        position={[loc.location.lat, loc.location.lng]}
                        icon={isSelected(loc.shortcode) ? redIcon : blueIcon}
                        eventHandlers={{
                            click: () => {
                                // REDUX ACTION: Save the clicked building to the store
                                dispatch(setSelectedBuilding(loc.shortcode));
                            },
                        }}
                    >
                        {/* <Popup maxHeight={600} className="custom-popup" maxWidth={800}>
                            <div className="p-1">
                                <img src={`images/${loc.shortcode}.jpg`} alt={loc.title} className="w-full h-auto mb-2 rounded" />
                                <h3 className="font-bold text-lg text-gray-800">{loc.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {loc.location.address}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {new Date(loc.addedDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {loc.description}
                                </p>
                                <a
                                    href={`https://www.instagram.com/p/${loc.shortcode}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-xs font-semibold"
                                >
                                    View on Instagram &rarr;
                                </a>
                            </div>
                        </Popup> */}
                    </Marker>
                ))
                }

            </MapContainer>
        </div>
    );
}