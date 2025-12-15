'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import CircleButton from './CircleButton';
import { MdLocationPin } from 'react-icons/md';

function UserLocation() {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  // Listen for the location found event
  useEffect(() => {
    map.on('locationfound', (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
    });
    
    // Optional: Handle errors (like if user denies permission)
    map.on('locationerror', (e) => {
      alert(e.message);
    });
  }, [map]);

  return (
    <>
      {/* The Button placed on top of the map */}

      <button className="absolute top-4 right-4 z-10000 bg-black p-4 py-2 pointer-events-auto rounded-full flex items-center gap-2 shadow-lg hover:opacity-80 transition-shadow duration-300" target="_blank" rel="noopener noreferrer">
                  <p className="text-sm font-bold text-white">Locația mea</p>
                    <MdLocationPin color="white" size={24} />
              </button>

      {/* The User's Location Marker (Blue Dot) */}
      {position && (
        <CircleMarker 
          center={position} 
          pathOptions={{ color: 'white', fillColor: '#2563eb', fillOpacity: 1, weight: 3 }} // Tailwind blue-600
          radius={8}
        >
          <Popup>You are here</Popup>
        </CircleMarker>
      )}
    </>
  );
}
export default UserLocation;