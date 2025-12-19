
import React from 'react';
import { Badge } from './ui/Badge';
import { MessageSquareHeart, CalendarClock, ShieldCheck, Globe, CreditCard, Activity } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, className = "" }: { icon: any, title: string, description: string, className?: string }) => (
  <div className={`p-8 border border-[#171717] bg-[#0A0A0A] hover:bg-[#111111] transition-all duration-300 group ${className}`}>
    <div className="w-10 h-10 flex items-center justify-center bg-black border border-[#333] rounded-lg mb-6 group-hover:border-brand-purple transition-colors">
      <Icon size={20} className="text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed font-medium">{description}</p>
  </div>
);

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-32 bg-black scroll-mt-24" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
            Everything for <br />
            <span className="text-gray-500">global AI commerce.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 vercel-border overflow-hidden rounded-xl">
          <FeatureCard 
            icon={MessageSquareHeart} 
            title="Prompt-to-Product" 
            description="Convert high-level requirements into production-ready payment flows instantly via natural language."
          />
          <FeatureCard 
            icon={CalendarClock} 
            title="Subscription Engine" 
            description="Automated lifecycle management for tiered billing, annual plans, and custom enterprise contracts."
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Global Compliance" 
            description="Built-in tax calculation, AML/KYC checks, and localized payment laws across 170+ countries."
          />
          <FeatureCard 
            icon={Globe} 
            title="Localized Checkout" 
            description="Support for 100+ payment methods including Apple Pay, Google Pay, and localized bank transfers."
          />
          <FeatureCard 
            icon={CreditCard} 
            title="Frictionless Payouts" 
            description="Distribute funds to partners and developers with low latency and complete transparency."
          />
          <FeatureCard 
            icon={Activity} 
            title="Real-time Analytics" 
            description="Deep insights into MRR, Churn, and LTV directly in your AI dashboard through our MCP bridge."
          />
        </div>
      </div>
    </section>
  );
};
