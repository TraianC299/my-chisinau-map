'use client';

import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CircleButton from './CircleButton';

interface ImageCarouselProps {
  images: string[];
  altTitle: string;
}

export default function ImageCarousel({ images, altTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Guard clause: if no images, show nothing or a placeholder
  if (!images || images.length === 0) {
    return <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>;
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[400px] w-full m-auto relative group bg-slate-100">
      {/* Main Image Display */}
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500 transition-all ease-in-out border-b border-gray-200"
        role="img"
        aria-label={`${altTitle} - image ${currentIndex + 1}`}
      ></div>

      {/* Left Arrow (Only show if more than 1 image) */}
      {images.length > 1 && (
        <CircleButton 
          onClick={prevSlide}
          type='half-transparent'
          className="hidden absolute top-[50%] translate-y-[-50%] left-4 rounded-full transition"
        >
          {/* Simple Chevron Left Icon */}
          <MdChevronLeft size={30} />
        </CircleButton>
      )}

      {/* Right Arrow (Only show if more than 1 image) */}
      {images.length > 1 && (
        <CircleButton 
          onClick={nextSlide}
          type='half-transparent'
          className="hidden absolute top-[50%] translate-y-[-50%] right-4 rounded-full transition"
        >
          {/* Simple Chevron Right Icon */}
          <MdChevronRight size={30}  />
        </CircleButton>
      )}

      {/* Dots Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center py-2 gap-2 absolute bottom-2 w-full">
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`transition-all cursor-pointer w-2 h-2 rounded-full ${
                currentIndex === slideIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}