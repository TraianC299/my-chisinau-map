import React from 'react';
import { MdLocationOn } from 'react-icons/md';

interface MapLoaderProps {
  text?: string; // Optional text below the loader
  className?: string; // Optional extra classes for the container
}

const MapLoader = ({ text = "Loading Map...", className = "" }: MapLoaderProps) => {
  return (
    // 1. Outer container holds everything and centers it
    <div className={`flex flex-col items-center justify-center gap-4 p-8 ${className}`}>
      
      {/* 2. The relative container for the layered animation elements */}
      <div className="relative flex items-center justify-center">
        
        {/* Layer A: The outer, slower Ripple */}
        {/* animate-ping scales up and fades out. We use a large h/w and low opacity. */}
        <div className="absolute h-24 w-24 rounded-full bg-blue-500/30 animate-ping cubic-bezier(0, 0, 0.2, 1)" style={{ animationDuration: '3s' }}></div>

        {/* Layer B: The inner, faster ripple */}
        {/* A slightly smaller, faster ping for depth */}
        <div className="absolute h-16 w-16 rounded-full bg-blue-600/50 animate-ping" style={{ animationDuration: '1.5s' }}></div>

        {/* Layer C: A solid background circle behind the icon to make it pop */}
        <div className="relative z-10 bg-white rounded-full p-2 shadow-sm shadow-blue-200/50">
           {/* Layer D: The Icon itself */}
           {/* We add a subtle 'animate-pulse' to the icon so it's not perfectly static */}
           <MdLocationOn className="text-5xl text-blue-600 animate-pulse z-20" />
        </div>
         
        {/* Optional: A small shadow "grounding" the pin beneath it */}
        <div className="absolute -bottom-2 h-3 w-8 bg-gray-300/50 rounded-[50%] blur-[2px]"></div>
      </div>
    </div>
  );
};

export default MapLoader;