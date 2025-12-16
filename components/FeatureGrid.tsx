import React from 'react';
import { Badge } from './ui/Badge';
import { MessageSquareHeart, CalendarClock, Gavel } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark scroll-mt-24" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
            <Badge text="Features" className="mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
                What Bloxs <span className="text-gray-500">Does?</span>
            </h2>
            <p className="max-w-3xl text-gray-400 text-lg">
                Your AI nails the prototype and users want it but when it's time to charge, subscriptions get messy, legal questions creep in, and momentum slows. Bloxs helps you understand what matters when money flows from billing setup to basic legal readiness.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-12">
            
            {/* Feature 1 */}
            <div className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white mb-4">
                    <MessageSquareHeart size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Prompt it. It works.</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    One prompt in your AI tool creates working payments and subscriptions.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white mb-4">
                    <CalendarClock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Handle subscriptions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Bloxs manages upgrades, cancellations, renewals, and failed payments for you.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white mb-4">
                    <Gavel size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Legal clarity, not confusion</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Bloxs surfaces the right legal and tax steps when you start charging without jargon or overwhelm.
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};