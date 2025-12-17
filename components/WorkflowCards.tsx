import React from 'react';
import { Code2, Sparkles, Eye, Zap } from 'lucide-react';

const Card = ({ 
  icon: Icon, 
  title, 
  description, 
  badge 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  badge: string 
}) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
    <div className="relative h-full bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 hover:bg-[#141414] transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
          <Icon size={24} />
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/5 text-gray-400 px-2 py-1 rounded">
          {badge}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export const WorkflowCards: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Human-in-the-loop bridge text */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple text-sm mb-4">
              <Zap size={14} fill="currentColor" />
              <span className="font-medium">Human-in-the-loop control ensures safety and customization</span>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-brand-purple/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            icon={Code2}
            badge="Setup"
            title="Connect through MCP"
            description="Bloxs connects to your AI tool via Model Context Protocol. One-time setup gives your AI native access to payment infrastructure."
          />
          <Card 
            icon={Sparkles}
            badge="Process"
            title="Prompt in your fav AI tool"
            description="Describe what you need in plain English. 'Add subscription tiers' or 'Lock this feature for Pro users.' Bloxs understands and generates the solution."
          />
          <Card 
            icon={Eye}
            badge="Approval"
            title="Control over output"
            description="Review generated code, UI, and payment flows before deployment. You stay in control: approve, customize, or iterate until it's right."
          />
        </div>
      </div>
    </section>
  );
};