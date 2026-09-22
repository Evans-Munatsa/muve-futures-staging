import React from 'react';

// Floating white triangle
export const WhiteTriangle: React.FC<{
  className?: string;
  rotation?: number;
  size?: number;
}> = ({ className = '', rotation = 0, size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`pointer-events-none drop-shadow-sm ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
    aria-hidden="true"
  >
    <polygon points="50,15 90,85 10,85" fill="#ffffff" />
  </svg>
);

// Floating pink polygon / triangle
export const PinkPolygon: React.FC<{
  className?: string;
  rotation?: number;
  size?: number;
}> = ({ className = '', rotation = 15, size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className={`pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
    aria-hidden="true"
  >
    <polygon points="60,10 115,100 15,90" fill="#f472b6" />
  </svg>
);

// Floating coral/orange triangle
export const OrangeTriangle: React.FC<{
  className?: string;
  rotation?: number;
  size?: number;
}> = ({ className = '', rotation = 0, size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
    aria-hidden="true"
  >
    <polygon points="50,15 90,85 10,85" fill="#F05B25" />
  </svg>
);

// Soft Cyan circle
export const CyanCircle: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 80 }) => (
  <div
    className={`rounded-full bg-[#7dd3fc] pointer-events-none ${className}`}
    style={{ width: `${size}px`, height: `${size}px` }}
    aria-hidden="true"
  />
);
