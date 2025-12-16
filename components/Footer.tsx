import React from 'react';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('join-waitlist');
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <footer className="pt-24 pb-8 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA */}
        <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Start accepting payments with Bloxs
            </h2>
            <p className="text-gray-500 mb-8">Join the waitlist to try the product</p>
            <Button size="lg" onClick={scrollToWaitlist}>Join Now</Button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                 <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                 </div>
                 <span className="text-gray-500 text-sm">bloxs</span>
            </div>

            <div className="flex gap-8">
                <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Docs</a>
            </div>
        </div>

      </div>
    </footer>
  );
};