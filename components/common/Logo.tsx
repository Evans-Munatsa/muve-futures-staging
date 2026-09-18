import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'light' }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#092233]';
  const subColor = isLight ? 'text-white/90' : 'text-[#334155]';

  const scaleClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl sm:text-5xl',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      {/* Playful brand typography */}
      <div className={`font-brand font-bold tracking-tight leading-none ${scaleClasses[size]} ${textColor} flex items-center justify-center gap-1`}>
        <span className="relative flex items-center">
          <span>mu</span>
          <span className="relative inline-block mx-[0.5px]">
            v
            {/* The signature playful red/coral dot above the v */}
            <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#f05a28] ring-1 ring-white/20"></span>
          </span>
          <span>e</span>
        </span>
        <span className="font-semibold text-white/95 ml-1">futures</span>
      </div>
      
      {/* Sub-label: Alternative Provision */}
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className={`w-2.5 h-[1.5px] ${isLight ? 'bg-white/70' : 'bg-[#092233]/40'}`}></span>
        <span className={`text-[10px] sm:text-xs tracking-wider uppercase font-semibold ${subColor}`}>
          Alternative Provision
        </span>
      </div>
    </div>
  );
};
