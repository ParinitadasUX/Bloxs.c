
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative pt-40 pb-32 overflow-hidden bg-black" id="hero">
      {/* Mesh Gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none opacity-40">
        <div 
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle at 50% 0%, #1a1a1a 0%, transparent 60%)'
          }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center z-10 animate-fade-in">
        <div className="flex justify-center mb-6">
          <Badge className="bg-[#111] border-[#333] text-gray-400 py-1.5 px-4 font-normal hover:border-gray-500 transition-colors cursor-default">
            Now available for Model Context Protocol →
          </Badge>
        </div>
        
        <h1 className="text-6xl md:text-[100px] font-black tracking-[-0.05em] mb-8 leading-[0.9] text-white">
          Payments for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            AI-first builders.
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-xl text-gray-400 mb-12 leading-tight font-medium">
          Zero-code payment infrastructure. Connect through MCP and tell your AI to handle checkout, tax, and subscriptions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" id="join-waitlist">
          {submitted ? (
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white animate-fade-in">
              <CheckCircle2 size={18} className="text-brand-purple" />
              <span className="text-sm font-medium">You're on the waitlist!</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black border border-[#333] rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-all placeholder:text-gray-600"
              />
              <Button onClick={handleSubmit} variant="primary" size="md">
                Join Waitlist
              </Button>
            </div>
          )}
          <Button variant="outline" className="gap-2">
            Documentation <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
};
