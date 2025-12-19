
import React from 'react';

const BoltLogo = () => (
  <div className="flex items-center gap-1 group/logo transition-all duration-500 hover:grayscale-0 grayscale opacity-40 hover:opacity-100 cursor-default px-8">
    <div className="w-6 h-6">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white group-hover/logo:text-brand-purple transition-colors">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
      </svg>
    </div>
    <span className="text-xl font-black italic tracking-tighter text-white">bolt.new</span>
  </div>
);

const LitLogo = () => (
  <div className="flex items-center group/logo transition-all duration-500 hover:grayscale-0 grayscale opacity-40 hover:opacity-100 cursor-default px-8">
    <span className="text-2xl font-serif italic font-black text-white tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>lit</span>
  </div>
);

const LovableLogo = () => (
  <div className="flex items-center gap-2 group/logo transition-all duration-500 hover:grayscale-0 grayscale opacity-40 hover:opacity-100 cursor-default px-8">
    <div className="w-8 h-8 relative">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="lov-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="50%" stopColor="#FF0055" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path d="M35 25C21.1929 25 10 36.1929 10 50V75C10 83.2843 16.7157 90 25 90H50C63.8071 90 75 78.8071 75 65V40C75 31.7157 68.2843 25 60 25H35Z" fill="url(#lov-grad)" className="group-hover/logo:fill-[url(#lov-grad)] fill-white" />
        <rect x="35" y="10" width="15" height="40" rx="7.5" fill="url(#lov-grad)" className="group-hover/logo:fill-[url(#lov-grad)] fill-white" />
        <rect x="50" y="25" width="40" height="15" rx="7.5" fill="url(#lov-grad)" className="group-hover/logo:fill-[url(#lov-grad)] fill-white" />
      </svg>
    </div>
    <span className="text-xl font-bold text-white tracking-tight">Lovable</span>
  </div>
);

const WindsurfLogo = () => (
  <div className="flex items-center gap-2.5 group/logo transition-all duration-500 hover:grayscale-0 grayscale opacity-40 hover:opacity-100 cursor-default px-8">
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M4 4L9 12L4 20H8.5L13.5 12L8.5 4H4Z" fill="black" />
        <path d="M10.5 4L15.5 12L10.5 20H15L20 12L15 4H10.5Z" fill="black" />
      </svg>
    </div>
    <span className="text-xl font-bold text-white tracking-tight">Windsurf</span>
  </div>
);

const V0Logo = () => (
  <div className="flex items-center gap-2 group/logo transition-all duration-500 hover:grayscale-0 grayscale opacity-40 hover:opacity-100 cursor-default px-8">
    <svg width="20" height="20" viewBox="0 0 76 76" fill="white">
      <path d="M38 0L76 76H0L38 0Z" />
    </svg>
    <span className="text-2xl font-bold text-white tracking-tighter">v0</span>
  </div>
);

const FigmaLogo = () => (
  <div className="flex items-center gap-2 group/logo transition-all duration-500 hover:grayscale-0 grayscale opacity-40 hover:opacity-100 cursor-default px-8">
    <svg width="18" height="27" viewBox="0 0 24 36" fill="none">
      <path d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#F24E1E" className="group-hover/logo:fill-[#F24E1E] fill-white" />
      <path d="M18 12C21.3137 12 24 9.31371 24 6C24 2.68629 21.3137 0 18 0C14.6863 0 12 2.68629 12 6C12 9.31371 14.6863 12 18 12Z" fill="#FF7262" className="group-hover/logo:fill-[#FF7262] fill-white" />
      <path d="M6 24C9.31371 24 12 21.3137 12 18C12 14.6863 9.31371 12 6 12C2.68629 12 0 14.6863 0 18C0 21.3137 2.68629 24 6 24Z" fill="#A259FF" className="group-hover/logo:fill-[#A259FF] fill-white" />
      <path d="M12 18C12 21.3137 14.6863 24 18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18Z" fill="#1ABCFE" className="group-hover/logo:fill-[#1ABCFE] fill-white" />
      <path d="M6 36C9.31371 36 12 33.3137 12 30V24H6C2.68629 24 0 26.6863 0 30C0 33.3137 2.68629 36 6 36Z" fill="#0ACF83" className="group-hover/logo:fill-[#0ACF83] fill-white" />
    </svg>
    <span className="text-xl font-bold text-white">Figma</span>
  </div>
);

export const IntegrationLogos: React.FC = () => {
  const logos = [
    <BoltLogo key="bolt" />,
    <LitLogo key="lit" />,
    <LovableLogo key="lovable" />,
    <WindsurfLogo key="windsurf" />,
    <V0Logo key="v0" />,
    <FigmaLogo key="figma" />,
  ];

  return (
    <section className="py-20 bg-black border-y border-[#111] overflow-hidden">
      <div className="relative flex">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {logos}
          {logos}
          {logos}
          {logos}
        </div>
        <div className="flex items-center whitespace-nowrap animate-marquee" aria-hidden="true">
          {logos}
          {logos}
          {logos}
          {logos}
        </div>
        
        {/* Gradient edge fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};
