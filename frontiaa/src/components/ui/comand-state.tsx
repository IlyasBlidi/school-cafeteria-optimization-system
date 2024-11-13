'use client';
import React from 'react';

// Define the props interface
interface ComandStateProps {
  isActive: boolean;
  color: string; 
  text: string;
}




const ComandState: React.FC<ComandStateProps> = ({ isActive, text, color }) => {


  const getColorClass = (colorProp: string) => {
    const colorMap: { [key: string]: string } = {
      'red-500': 'bg-red-500',
      'green-500': 'bg-green-500',
      'emerald-500': 'bg-emerald-500',
      'pink-500': 'bg-pink-500',
      'lime-500': 'bg-lime-500'
    };
    return colorMap[colorProp] || 'bg-gray-500'; // fallback color
  };
  
  const circleClass = isActive 
    ? 'bg-white text-black' 
    : getColorClass(color);


  return (
    <div
      className={`flex rounded-lg items-center ${
        isActive ? 'bg-faragh text-byed' : 'bg-byed text-faragh'
      } gap-2 p-2 h-full text-base`}
    >
      <div
        className={`rounded-full w-10 h-10 ${circleClass}  flex items-center justify-center`}
      >
        5
      </div>
      <span className="w-5/6 ">{text}</span>
    </div>
  );
};

export default ComandState;
