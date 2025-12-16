import React from 'react';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // scrollIntoView with block: 'start' aligns the top of the element with the top of the viewport
      // The CSS scroll-margin-top (scroll-mt-24) on the sections handles the sticky header offset
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToWaitlist = () => {
    const element = document.getElementById('join-waitlist');
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 transform-gpu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-lg tracking-tight">bloxs</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, 'how-it-works')} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#integration" 
              onClick={(e) => scrollToSection(e, 'integration')} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Integration
            </a>
          </nav>

          <div>
            <Button size="sm" onClick={scrollToWaitlist}>Join Waitlist</Button>
          </div>
        </div>
      </div>
    </header>
  );
};