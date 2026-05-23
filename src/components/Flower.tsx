import React, { useState } from 'react';
import { motion } from 'motion/react';

interface FlowerProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  centerColor?: string;
  petals?: number;
}

export const Flower: React.FC<FlowerProps> = ({ 
  color = '#3066FF', 
  centerColor = '#FFD541',
  petals = 8,
  className = '',
  ...props 
}) => {
  const rotationStep = 360 / petals;
  const [rotation, setRotation] = useState(0);

  const handleMouseEnter = () => {
    setRotation(prev => prev + 360);
  };
  
  return (
    <motion.svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none cursor-pointer ${className}`}
      animate={{ rotate: rotation }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      onMouseEnter={handleMouseEnter}
      {...(props as any)}
    >
      {Array.from({ length: petals }).map((_, i) => (
        <path 
          key={i}
          d={petals <= 6 
            ? "M100 20C120 20 130 40 130 60C130 80 115 90 100 100C85 90 70 80 70 60C70 40 80 20 100 20Z" 
            : "M100 20C110 20 115 35 115 50C115 65 110 80 100 80C90 80 85 65 85 50C85 35 90 20 100 20Z"} 
          fill={color} 
          transform={`rotate(${i * rotationStep} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r={petals <= 6 ? "30" : "25"} fill={centerColor} />
    </motion.svg>
  );
};
