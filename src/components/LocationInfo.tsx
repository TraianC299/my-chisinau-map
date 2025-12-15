'use client'; // This directive is essential for map components
import locations from '@/assets/locations.json';
import { setSelectedBuilding } from '@/redux/mapSlice';
import { useEffect, useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CircleButton from './CircleButton';
import ImageCarousel from './ImageCarousel';
import { HistoricalBuilding } from '@/types/types';
const LocationInfo = () => {
    const dispatch = useDispatch();
    const locationShortCode = useSelector((state: any) => state.map.selectedBuilding);
    const [location, setLocation] = useState<HistoricalBuilding | null>(null);



    useEffect(() => {
        if (locationShortCode) {
            const loc = locations.find((loc) => loc.shortcode === locationShortCode) as HistoricalBuilding;
            setLocation(loc);
        } else {
            setTimeout(() => {
                setLocation(null);
            }, 300); // Wait for the slide-out animation to finish
        }
    }, [locationShortCode]);





    // Assuming locations is imported or accessible here
    return (
        <div className={`fixed rounded-2xl left-0 top-0 z-200000 w-[calc(100vw-2rem)] h-[calc(100vh-3rem)] bg-white shadow-lg overflow-y-auto m-4 
            transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            ${locationShortCode ? 'translate-x-0' : '-translate-x-[150%]'}
            md:w-96 md:h-[calc(100vh-2rem)]`}>
            <CircleButton
                type='white'
                className="absolute top-4 right-4 z-10000"
                onClick={() => {
                    dispatch(setSelectedBuilding(null));
                }}>
                <MdClose size={24} />
            </CircleButton>
            {location?.shortcode && <ImageCarousel 
            key={locationShortCode}
            images={location?.images as string[]} 
            altTitle={location?.title || 'Location Image'} />}
            <div className='p-4'>
                <h3 className="font-bold text-lg text-gray-800">{location?.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {location?.location?.address}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    {new Date(location?.addedDate || '').toLocaleDateString()}
                </p>
                <p className="text-sm whitespace-pre-line text-slate-600 mt-1">
                    {location?.description}
                </p>
            </div>
            <div className='sticky bottom-0 bg-white p-4 border-t border-gray-200'>
                <a
                    href={`https://www.instagram.com/p/${location?.shortcode}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='w-full bg-[#5497e8] hover:opacity-80 text-white font-bold pointer-events-auto py-2 px-4 rounded-full shadow-md transition flex justify-center items-center gap-2'
                >
                    Vezi postarea pe Instagram
                    <FaInstagram color="white" size={24} />
                </a>
            </div>
        </div>
    )
}

export default LocationInfo