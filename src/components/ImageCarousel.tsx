'use client';

import { useState, TouchEvent } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CircleButton from './CircleButton';

interface ImageCarouselProps {
  images: string[];
  altTitle: string;
}

export default function ImageCarousel({ images, altTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State to track touch coordinates for swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger a slide change
  const minSwipeDistance = 50;

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

  // --- Touch Handlers (Swipe Logic) ---
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide(); // Swipe Left -> Next Image
    }
    if (isRightSwipe) {
      prevSlide(); // Swipe Right -> Previous Image
    }
  };

  return (
    <div 
      className="w-full max-w-[1400px] h-[450px] w-full m-auto relative group bg-slate-100 touch-pan-y"
      // Attach touch handlers to the container
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Image Display */}
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500 transition-all ease-in-out border-b border-gray-200"
        role="img"
        aria-label={`${altTitle} - image ${currentIndex + 1}`}
      ></div>

      {/* Left Arrow */}
      {images.length > 1 && (
        <div className="absolute top-[50%] translate-y-[-50%] left-4">
            {/* We removed 'hidden'. 
               Now: 'opacity-100' on mobile (always visible), 
               'md:opacity-0 md:group-hover:opacity-100' on desktop (visible only on hover)
            */}
            <CircleButton 
              onClick={prevSlide}
              type='half-transparent'
              className="rounded-full transition opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <MdChevronLeft size={24} />
            </CircleButton>
        </div>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <div className="absolute top-[50%] translate-y-[-50%] right-4">
             <CircleButton 
              onClick={nextSlide}
              type='half-transparent'
              className="rounded-full transition opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <MdChevronRight size={24}  />
            </CircleButton>
        </div>
      )}

      {/* Dots Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center py-2 gap-2 absolute bottom-2 w-full pointer-events-none"> 
          {/* pointer-events-none prevents clicks on the container area around dots from blocking swipes, 
              but we need pointer-events-auto on the dots themselves */}
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`pointer-events-auto transition-all cursor-pointer w-2 h-2 rounded-full shadow-sm ${
                currentIndex === slideIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}