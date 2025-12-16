import React from 'react';
import { Badge } from './ui/Badge';
import { Terminal, ArrowRight, Zap } from 'lucide-react';

export const DemoShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark scroll-mt-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <Badge text="How it Works" className="mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See it in action
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Watch how Bloxs transforms a simple prompt into a complete payment system in seconds.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-200 text-sm">
              <Zap size={14} />
              <span>Human-in-the-loop control ensures safety and customization</span>
            </div>
            
             <p className="text-gray-500 mt-6 text-sm">
              Tell your AI tool what you need, and Bloxs generates production-ready payment code
            </p>
          </div>

          {/* UI Mockup - "Terminal/IDE" */}
          <div className="relative group">
             {/* Glow effect - Optimized: Removed heavy blur filter, used shadow/opacity instead */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-blue-600 rounded-2xl opacity-20"></div>
            
            <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Fake IDE Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                  <Terminal size={14} />
                  <span>Enter prompt</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                    <span className="font-bold text-gray-400">Lovable</span>
                    <span className="flex items-center gap-1"><span className="text-blue-400">W</span> Windsurf</span>
                    <span className="font-bold">v0</span>
                </div>
              </div>

              {/* Fake IDE Content */}
              <div className="p-6 font-mono text-sm space-y-6 min-h-[320px]">
                
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <span className="text-purple-500 mt-1">{'>'}</span>
                        <p className="text-gray-300">What would you like to build?</p>
                    </div>
                </div>

                <div className="space-y-4 pl-4">
                    {/* Step 1 */}
                    <div className="group flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 flex items-center justify-center rounded bg-purple-900/50 text-purple-300 text-xs">1</span>
                            <span className="text-gray-200">Create subscription tiers</span>
                        </div>
                        <ArrowRight size={14} className="text-gray-600 group-hover:text-gray-400" />
                    </div>

                    {/* Step 2 */}
                     <div className="group flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 flex items-center justify-center rounded bg-purple-900/50 text-purple-300 text-xs">2</span>
                            <span className="text-gray-200">Lock features behind payment</span>
                        </div>
                        <ArrowRight size={14} className="text-gray-600 group-hover:text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-brand-purple animate-pulse mt-4">
                    <div className="w-2 h-4 bg-brand-purple"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};