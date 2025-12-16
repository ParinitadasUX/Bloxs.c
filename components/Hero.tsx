import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Sparkle, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Simulate API call
      console.log('Joined waitlist:', email);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" id="hero">
      {/* Decorative background effects - Optimized: Replaced expensive blur with radial gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
        }}
      ></div>
      
      {/* Floating asterisk icon */}
      <div className="hidden lg:block absolute top-40 right-10 animate-pulse text-yellow-300/80">
         <Sparkle size={48} strokeWidth={1} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <Badge text="Payment infrastructure" className="mb-8" />
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-white">Payments for</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">
            AI-first builders
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed">
          Zero-code payment integration. Tell your AI tool what you need, and bloxs handles the rest—checkout, tax, compliance, analytics.
        </p>

        <div className="max-w-md mx-auto mb-4 min-h-[100px]" id="join-waitlist">
          {submitted ? (
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={20} />
                <span className="font-semibold">You're on the list!</span>
              </div>
              <p className="text-sm opacity-80">We'll notify you when we launch.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-3">Join the waitlist to try the product</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                />
                <Button type="submit">Join Waitlist</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};