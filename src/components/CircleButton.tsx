import React from 'react'


const styles = {
    white: 'bg-white text-black hover:bg-gray-100 border border-gray-200',
    black: 'bg-black text-white hover:bg-gray-800',
    'half-transparent': 'bg-black/50 text-white hover:bg-black/70',
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