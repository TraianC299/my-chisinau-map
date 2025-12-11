'use client'; // This directive is essential for map components
import locations from '@/assets/locations.json';
import { setSelectedBuilding } from '@/redux/mapSlice';
import { useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CircleButton from './CircleButton';
import ImageCarousel from './ImageCarousel';
const LocationInfo = () => {
    const dispatch = useDispatch();
    const locationShortCode = useSelector((state: any) => state.map.selectedBuilding);
    const location = useMemo(() => {
        return locations.find((loc) => loc.shortcode === locationShortCode);
    }, [locationShortCode]);

    // Assuming locations is imported or accessible here
    return (
            <div className={`fixed rounded-2xl left-0 top-0 z-200000 w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] bg-white shadow-lg overflow-y-auto m-4 
            transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            ${locationShortCode ? 'translate-x-0' : '-translate-x-[150%]'}
            md:w-96`}>
                <CircleButton
                    type='white'
                    className="absolute top-4 right-4 z-10000"
                    onClick={() => {

                        dispatch(setSelectedBuilding(null));
                    }}>
                    <MdClose size={24} />
                </CircleButton>
                <ImageCarousel images={location?.images as string[]} altTitle={location?.title || 'Location Image'} />
                <div className='p-4'>
                    <h3 className="font-bold text-lg text-gray-800 mt-4">{location?.title}</h3>
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
                    >
                        <button className='w-full bg-pink-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition'>
                            View on Instagram &rarr;
                        </button>
                    </a>
                </div>
            </div>
    )
}

export default LocationInfo