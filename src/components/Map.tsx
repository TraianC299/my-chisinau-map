'use client'; 

import locations from '@/assets/locations.json';
import { setSelectedBuilding } from '@/redux/mapSlice';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import UserLocation from './UserLocation';

// --- Icoane Personalizate ---
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// --- Limitele Hărții (Chișinău) ---
// Definim colțul Sud-Vest și Nord-Est al orașului
const chisinauBounds: L.LatLngBoundsExpression = [
    [46.9400, 28.7000], // Sud-Vest
    [47.1000, 29.0000]  // Nord-Est
];

const center: [number, number] = [47.0226, 28.8347];

export default function Map() {
    const dispatch = useDispatch();
    const selectedBuilding = useSelector((state: any) => state.map.selectedBuilding);
    
    // Nu mai avem nevoie de 'iconFix' dacă folosim icoane personalizate (blueIcon/redIcon),
    // dar îl poți lăsa dacă plănuiești să folosești și icoane standard undeva.

    const isSelected = (shortcode: string) => {
        return selectedBuilding === shortcode;
    };

    return (
        <div className="w-full h-full rounded-xl z-0 overflow-hidden shadow-lg border-2 border-gray-200">
            <MapContainer
                center={center}
                zoom={14} // Un zoom inițial puțin mai larg pentru a vedea contextul
                minZoom={15} // Nu permite zoom-out mai mult de nivelul cartierelor
                maxBounds={chisinauBounds} // Limitează navigarea doar în acest dreptunghi
                maxBoundsViscosity={1.0} // Face limita rigidă (harta se oprește instant la margine)
                style={{ height: '100vh', width: '100vw' }}
                zoomControl={false}
            >
                <UserLocation />
                
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
                                dispatch(setSelectedBuilding(loc.shortcode));
                            },
                        }}
                    />
                ))}
            </MapContainer>
        </div>
    );
}