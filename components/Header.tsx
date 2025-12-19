
import React from 'react';
import { Button } from './ui/Button';
import { BloxsLogo } from './BloxsLogo';

export const Header: React.FC = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('join-waitlist');
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.08] transform-gpu">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <div 
            className="flex items-center gap-2.5 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <BloxsLogo size={22} />
            <span className="font-bold text-lg tracking-[-0.03em] text-white">bloxs</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#how-it-works" className="text-xs font-medium text-gray-500 hover:text-white transition-colors">How it Works</a>
            <a href="#features" className="text-xs font-medium text-gray-500 hover:text-white transition-colors">Features</a>
            <a href="#integration" className="text-xs font-medium text-gray-500 hover:text-white transition-colors">Integrations</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:block text-xs font-medium text-gray-500 hover:text-white transition-colors">Login</a>
            <Button size="sm" onClick={scrollToWaitlist} variant="primary">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
