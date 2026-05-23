import React from 'react';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '',
  bgColor = 'bg-brand-surface',
  ...props
}) => {
  return (
    <div 
      className={`rounded-[2rem] p-8 overflow-hidden ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
