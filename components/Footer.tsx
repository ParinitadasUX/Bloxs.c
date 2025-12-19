
import React from 'react';
import { Button } from './ui/Button';
import { BloxsLogo } from './BloxsLogo';

export const Footer: React.FC = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('join-waitlist');
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <footer className="pt-24 pb-12 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA */}
        <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Start accepting payments with Bloxs
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Join the growing community of AI builders who focus on building great products, not complex payment systems.
            </p>
            <Button size="lg" onClick={scrollToWaitlist}>Join the Waitlist</Button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
            <div className="flex items-center gap-3">
                 <BloxsLogo size={24} className="opacity-80" />
                 <span className="text-white font-bold text-lg tracking-tighter">bloxs</span>
            </div>

            <div className="flex gap-10">
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Documentation</a>
            </div>

            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Bloxs Inc. All rights reserved.
            </div>
        </div>

      </div>
    </footer>
  );
};
