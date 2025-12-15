'use client'; // Optional in page.tsx, but good if you use state here
import MapLoader from "@/components/Loading";
import LocationInfo from "@/components/LocationInfo";
import dynamic from 'next/dynamic';
import { FaInstagram } from "react-icons/fa";

// 1. USE DYNAMIC IMPORT WITH SSR: FALSE
// This prevents the "window is not defined" error because it forces 
// the component to load ONLY in the browser.
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false, 
  loading: () => (
      <div className="h-screen w-screen flex justify-center items-center">
        <MapLoader />
      </div>
  )
});
export default function Home() {
  return (
      <main >
        <Map/>
        <LocationInfo/>
        <a href="https://www.instagram.com/trecut_prezent_md/"  className="fixed bottom-4 right-4 z-10000 bg-white p-4 py-2 pointer-events-auto rounded-full flex items-center gap-2 shadow-lg hover:opacity-80 transition-shadow duration-300" target="_blank" rel="noopener noreferrer">
            <p className="text-sm font-bold">trecut_prezent_md</p>
            <div className="p-0.5 rounded-lg instagram-bg">
              <FaInstagram className="instagram-bg rounded-2xl" color="white" size={24} />
            </div>
        </a>
      </main>
  );
}
