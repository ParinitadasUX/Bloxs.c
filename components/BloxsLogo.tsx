
import React from 'react';

export const BloxsLogo: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]"
      >
        <defs>
          <linearGradient id="bloxs-main-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Three isometric blocks stacked */}
        <path d="M50 15L85 32.5V67.5L50 85L15 67.5V32.5L50 15Z" fill="white" fillOpacity="0.05" />
        <path d="M50 15L85 32.5L50 50L15 32.5L50 15Z" fill="url(#bloxs-main-grad)" />
        <path d="M50 50V85L15 67.5V32.5L50 50Z" fill="#6D28D9" fillOpacity="0.8" />
        <path d="M50 50L85 32.5V67.5L50 85V50Z" fill="#5B21B6" fillOpacity="0.8" />
      </svg>
    </div>
  );
};
