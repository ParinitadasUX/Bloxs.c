import React from 'react';
import { Badge } from './ui/Badge';

// Simple text-based logos to avoid external image dependencies while maintaining the aesthetic
const LogoText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`text-2xl font-bold text-gray-500 hover:text-white transition-colors cursor-default ${className}`}>
        {children}
    </span>
);

export const IntegrationLogos: React.FC = () => {
  return (
    <section className="py-24 text-center scroll-mt-24" id="integration">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge text="Integration" className="mb-6" />
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Works with your AI tool
        </h2>
        
        <p className="text-gray-400 mb-16">Just prompt. No code required.</p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-opacity duration-300">
             {/* Abstract representations of the logos from the PDF */}
            <LogoText className="font-serif italic">lit</LogoText>
            
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-500 rounded-tr-lg rounded-bl-lg"></div>
                <LogoText>Lovable</LogoText>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-3xl text-gray-500 font-mono">W</span>
                <LogoText>Windsurf</LogoText>
            </div>

            <LogoText className="font-mono tracking-tighter">v0</LogoText>
            
            <LogoText className="font-sans">Figma</LogoText>
            
            <LogoText className="font-bold italic">bolt<span className="not-italic font-normal text-sm">.new</span></LogoText>
        </div>
      </div>
    </section>
  );
};