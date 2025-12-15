import React from 'react'


const styles = {
    white: 'bg-white text-black hover:opacity-80 border border-gray-200',
    black: 'bg-black text-white hover:opacity-80',
    'half-transparent': 'bg-black/50 text-white hover:opacity-80',
};
const CircleButton = ({
    onClick,
    children,
    className,
    type = 'black',
}: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    type?: 'white' | 'black' | 'half-transparent';
}) => {
  return (
    <div 
          onClick={onClick}
          className={`group-hover:block text-2xl rounded-full p-2 cursor-pointer transition shadow-lg ${styles[type]} ${className || ''}`}
        >
          {/* Simple Chevron Right Icon */}
          {children}
        </div>
  )
}

export default CircleButton