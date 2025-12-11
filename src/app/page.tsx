'use client'; // Optional in page.tsx, but good if you use state here
import MapLoader from "@/components/Loading";
import LocationInfo from "@/components/LocationInfo";
import dynamic from 'next/dynamic';

// 1. USE DYNAMIC IMPORT WITH SSR: FALSE
// This prevents the "window is not defined" error because it forces 
// the component to load ONLY in the browser.
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false, 
  loading: () => (
      <div className="h-screen w-screen flex items-center">
        <MapLoader />
      </div>
  )
});
export default function Home() {
  return (
      <main >
        <Map/>
        <LocationInfo/>
      </main>
  );
}
