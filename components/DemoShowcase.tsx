
import React, { useState, useRef, useEffect } from 'react';
import { Badge } from './ui/Badge';
import { 
  Terminal, Zap, Loader2, Check, RefreshCw, CreditCard, 
  ArrowRight, Lock, Plus, X, Trash2, Activity, 
  Smartphone, Landmark, Globe, Copy, Send,
  ListChecks, Cpu, Sparkles, Building2, Apple, CreditCard as CardIcon,
  ShieldCheck
} from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  price: string;
  interval: 'month' | 'year';
  features: string[];
}

type Intent = 'subscription' | 'checkout' | 'gateways';

const PLACEHOLDERS = [
  "Setup 2 tiers: $0, $29. Lock API for Pro.",
  "Add a secure checkout portal with Apple Pay.",
  "Create 2 plans. Annual pricing.",
  "Add subscription tiers and lock Analytics for Enterprise.",
  "Configure a payment gateway with bank redirect support."
];

export const DemoShowcase: React.FC = () => {
  const [typedInput, setTypedInput] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'configuring' | 'building' | 'complete' | 'testing-checkout'>('idle');
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [intent, setIntent] = useState<Intent>('subscription');
  const [logs, setLogs] = useState<string[]>([]);
  
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [activePaymentMethods, setActivePaymentMethods] = useState<string[]>(['card', 'apple_pay']);
  const [newFeatureText, setNewFeatureText] = useState<Record<string, string>>({});
  
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'processing' | 'success'>('details');
  const [checkoutMethod, setCheckoutMethod] = useState<string>('card');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'idle') {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'idle') {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const paymentOptions = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, description: 'Visa, MC, Amex' },
    { id: 'apple_pay', name: 'Apple Pay', icon: Smartphone, description: 'One-click pay' },
    { id: 'google_pay', name: 'Google Pay', icon: Globe, description: 'Fast Checkout' },
    { id: 'bank', name: 'Bank Pay', icon: Landmark, description: 'ACH / Instant' },
  ];

  const runSimulation = (prompt: string) => {
    if (!prompt.trim()) return;
    
    setTypedInput(prompt);
    setStatus('analyzing');
    setLogs([
      '> BLOXS_MCP_BRIDGE_v2.4: CONNECTED',
      '> Initializing deep semantic parsing...',
      `> ANALYZING_CONTEXT: "${prompt}"`
    ]);

    const low = prompt.toLowerCase();
    const isCheckout = low.includes('checkout') || low.includes('pay') || low.includes('gateway') || low.includes('portal');
    setIntent(isCheckout ? 'checkout' : 'subscription');

    setTimeout(() => {
      let generatedTiers: Tier[] = [];
      
      if (isCheckout) {
        generatedTiers = [{ 
          id: 't-chk', 
          name: 'Secure Payment Portal', 
          price: '0', 
          interval: 'month', 
          features: ['SSL Secured', 'Webhooks Enabled', 'Tax Compliance'] 
        }];
      } else {
        const numberMap: Record<string, number> = { "one": 1, "two": 2, "three": 3, "four": 4, "five": 5 };
        const tierMatch = low.match(/(\d+|one|two|three|four|five)\s*(tier|tera|plan|package)/);
        const priceMatches = low.match(/\$?\d+/g);
        const extractedPrices = priceMatches ? priceMatches.map(m => m.replace('$', '')) : [];

        const tierNamesMatch = prompt.match(/([A-Z][a-z]+(?: [A-Z][a-z]+)*)/g);
        const filteredNames = tierNamesMatch?.filter(n => !['Generate', 'Add', 'Setup', 'Lock', 'For'].includes(n)) || [];

        let tierCount = 2;
        if (tierMatch) {
          const val = tierMatch[1];
          tierCount = isNaN(parseInt(val)) ? (numberMap[val] || 2) : parseInt(val);
        } else if (filteredNames.length > 0) {
          tierCount = filteredNames.length;
        } else if (extractedPrices.length > 0) {
          tierCount = extractedPrices.length;
        }

        const defaultInterval = low.includes('year') || low.includes('annual') ? 'year' : 'month';

        for (let i = 0; i < tierCount; i++) {
          let name = filteredNames[i] || '';
          if (!name) {
            if (i === 0) name = low.includes('free') ? 'Free' : 'Starter';
            else if (i === tierCount - 1) name = low.includes('enterprise') ? 'Enterprise' : 'Pro';
            else name = `Growth Tier ${i}`;
          }

          let price = extractedPrices[i] || (19 * (i + 1)).toString();
          if (name.toLowerCase() === 'free') price = '0';
          
          const baseFeatures = i === 0 ? ['Core Access', 'Standard API'] : ['Priority Support', 'Custom Branding'];
          const lockRegex = /lock\s+([a-z\s]+)\s+for\s+([a-z\s]+)/gi;
          let match;
          while ((match = lockRegex.exec(low)) !== null) {
              const featureToLock = match[1].trim();
              const targetTier = match[2].trim();
              if (name.toLowerCase().includes(targetTier)) {
                  baseFeatures.push(`Exclusive: ${featureToLock.charAt(0).toUpperCase() + featureToLock.slice(1)}`);
              }
          }

          generatedTiers.push({
            id: `t${i}-${Math.random().toString(36).substr(2, 4)}`,
            name,
            price,
            interval: defaultInterval as 'month' | 'year',
            features: baseFeatures
          });
        }
      }
      
      setTiers(generatedTiers);
      setLogs(prev => [
        ...prev, 
        `> SUCCESS: Resolved ${generatedTiers.length} distinct billing entities.`,
        `> DETECTED_INTENT: ${intent.toUpperCase()} sequence initiated.`,
        `> READY_FOR_CONFIGURATION.`,
      ]);
      
      setTimeout(() => setStatus('configuring'), 1000);
    }, 1200);
  };

  const handleDeploy = () => {
    setStatus('building');
    const steps = [
      { msg: `> Injecting billing logic into codebase...`, delay: 300 },
      { msg: '> Synchronizing webhooks with backend cluster...', delay: 900 },
      { msg: '> Deploying secure transaction layer...', delay: 1600 },
      { msg: '> SYSTEM_LIVE: Bridge finalized. UI is now interactive.', delay: 2300 },
    ];
    steps.forEach(({ msg, delay }) => {
      setTimeout(() => setLogs(prev => [...prev, msg]), delay);
    });
    setTimeout(() => setStatus('complete'), 3000);
  };

  const startTestCheckout = (tier: Tier) => {
    setSelectedTier(tier);
    setCheckoutStep('details');
    setCheckoutMethod(activePaymentMethods[0] || 'card');
    setSelectedBank(null);
    setStatus('testing-checkout');
  };

  const processPayment = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2000);
  };

  const handleReset = () => {
    setStatus('idle');
    setLogs([]);
    setTypedInput('');
    setSelectedTier(null);
    setActivePaymentMethods(['card', 'apple_pay']);
  };

  const handleAddTier = () => {
    const newId = `t${Math.random().toString(36).substr(2, 5)}`;
    setTiers([...tiers, { id: newId, name: 'Growth', price: '99', interval: 'month', features: ['Advanced Stats'] }]);
  };

  const handleRemoveTier = (id: string) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter(t => t.id !== id));
    }
  };

  const toggleGateway = (id: string) => {
    setActivePaymentMethods(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const addFeature = (tierId: string) => {
    const text = newFeatureText[tierId];
    if (!text?.trim()) return;
    
    setTiers(tiers.map(t => 
      t.id === tierId ? { ...t, features: [...t.features, text.trim()] } : t
    ));
    setNewFeatureText({ ...newFeatureText, [tierId]: '' });
  };

  const removeFeature = (tierId: string, featureIndex: number) => {
    setTiers(tiers.map(t => 
      t.id === tierId ? { ...t, features: t.features.filter((_, i) => i !== featureIndex) } : t
    ));
  };

  return (
    <section className="py-10 bg-brand-dark scroll-mt-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="flex justify-center mb-4">
                <Badge>
                   How it works
                </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              AI-Native Payment Logic
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Describe your model. Select your gateways. Test the portal.
            </p>
        </div>

        <div className="relative group max-w-6xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple/20 to-blue-600/20 rounded-[2.5rem] blur-3xl opacity-20"></div>
            
            <div className="relative bg-[#080808] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[540px]">
              
              {/* COMPACT SESSION HEADER */}
              <div className="flex items-center gap-4 px-4 py-1.5 border-b border-white/5 bg-[#0a0a0a] shrink-0">
                 <div className="flex items-center gap-2.5 text-white font-mono text-[9px] font-black uppercase tracking-[0.3em] opacity-60">
                    <Cpu size={12} className="text-brand-purple" />
                    <span>session: {status === 'idle' ? 'STANDBY' : status.toUpperCase()}</span>
                 </div>
                 <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5"></div>
                 </div>
              </div>

              <div className="relative flex-1 overflow-hidden flex flex-col font-mono">
                
                {status === 'idle' && (
                  <div className="h-full flex flex-col items-center justify-center p-4 text-center animate-fade-in relative">
                    <div className="w-11 h-11 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20 mb-4 shadow-xl">
                        <Terminal size={20} />
                    </div>
                    
                    <div className="max-w-md w-full px-4">
                        <div className="relative mb-4 group/input">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); runSimulation(typedInput); }}
                                className="relative flex items-center gap-3 bg-[#0c0c0c] border border-white/10 rounded-xl p-3.5 shadow-xl transition-all duration-500 group-focus-within/input:border-brand-purple/40"
                            >
                                <div className="flex items-center gap-2 text-brand-purple opacity-30 group-focus-within/input:opacity-100">
                                    <Sparkles size={16} />
                                    <span className="text-lg font-light">/</span>
                                </div>
                                
                                <div className="relative flex-1">
                                    <input 
                                        ref={inputRef}
                                        type="text"
                                        value={typedInput}
                                        onChange={(e) => setTypedInput(e.target.value)}
                                        placeholder={PLACEHOLDERS[placeholderIndex]}
                                        className="bg-transparent border-none outline-none w-full text-white text-sm placeholder-white/5 caret-brand-purple font-medium"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={!typedInput.trim()}
                                    className={`p-2.5 rounded-lg transition-all duration-300 ${typedInput.trim() ? 'bg-brand-purple text-white shadow-xl hover:scale-105' : 'text-white/5 cursor-not-allowed'}`}
                                >
                                    <Send size={14} strokeWidth={2.5} />
                                </button>
                            </form>
                        </div>

                        <div className="space-y-2.5">
                            <p className="text-[8px] text-gray-800 font-black uppercase tracking-[0.4em]">Prompt suggestion</p>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {[
                                    { t: "Add 2 tier subscription", i: <ListChecks size={10} /> },
                                    { t: "Add payment portal", i: <Zap size={10} /> }
                                ].map((item, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => runSimulation(item.t)}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-[8px] text-gray-500 hover:text-white hover:bg-white/5 hover:border-brand-purple/40 transition-all font-bold uppercase tracking-widest group/btn"
                                    >
                                        <span className="text-brand-purple opacity-40 group-hover/btn:opacity-100 transition-transform">{item.i}</span>
                                        {item.t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                {(status === 'analyzing' || status === 'building') && (
                  <div className="h-full flex flex-col p-6 font-mono text-[11px] leading-relaxed">
                    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2.5 pr-4 scrollbar-thin">
                      <div className="text-brand-purple/60 mb-4 pb-3 border-b border-white/5 flex items-center justify-between">
                         <div className="flex flex-col gap-0.5">
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Command Received</span>
                            <span className="text-white text-base italic">"{typedInput}"</span>
                         </div>
                         <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping"></div>
                         </div>
                      </div>
                      {logs.map((log, i) => (
                        <div key={i} className="text-gray-500 flex gap-3 animate-fade-in">
                           <span className="text-brand-purple/20 font-bold shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]</span>
                           <span className={log.includes('SUCCESS') || log.includes('LIVE') ? 'text-green-500' : (log.startsWith('>') ? 'text-gray-200' : 'text-gray-500')}>
                             {log}
                           </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {status === 'configuring' && (
                  <div className="h-full flex flex-col animate-fade-in overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-thin">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <h3 className="text-white text-lg font-black tracking-tighter">1. Gateways</h3>
                                <Badge text={`${activePaymentMethods.length} Active`} />
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                                {paymentOptions.map((opt) => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => toggleGateway(opt.id)}
                                        className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center gap-2 ${activePaymentMethods.includes(opt.id) ? 'bg-brand-purple/10 border-brand-purple/50 shadow-md' : 'bg-[#0c0c0c] border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${activePaymentMethods.includes(opt.id) ? 'bg-brand-purple text-white' : 'bg-white/5 text-gray-700'}`}>
                                            <opt.icon size={16} />
                                        </div>
                                        <div className="text-[8px] font-black text-white uppercase tracking-widest">{opt.name}</div>
                                        {/* Tick sign removed as requested */}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <h3 className="text-white text-lg font-black tracking-tighter">2. Tiers</h3>
                                <button onClick={handleAddTier} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-purple/5 text-brand-purple font-black text-[8px] uppercase tracking-widest rounded-lg border border-brand-purple/20 hover:bg-brand-purple/15 transition-all">
                                    <Plus size={12} strokeWidth={4} /> Add Tier
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {tiers.map((tier, idx) => (
                                    <div key={tier.id} className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-4 shadow-md transition-all hover:border-brand-purple/30">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-gray-700 text-[8px] font-black">{idx + 1}</span>
                                                <input 
                                                    type="text" 
                                                    value={tier.name} 
                                                    onChange={(e) => setTiers(tiers.map(t => t.id === tier.id ? { ...t, name: e.target.value } : t))}
                                                    className="bg-transparent border-none outline-none text-white font-black text-base focus:text-brand-purple transition-colors"
                                                />
                                            </div>
                                            <button onClick={() => handleRemoveTier(tier.id)} className="text-gray-800 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[8px] text-gray-800 uppercase font-black tracking-widest">Price ($)</label>
                                                <div className="flex items-center gap-2.5 bg-black border border-white/10 rounded-lg px-3 py-1.5">
                                                    <span className="text-gray-600 font-black text-xs">$</span>
                                                    <input 
                                                        type="text" 
                                                        value={tier.price} 
                                                        onChange={(e) => setTiers(tiers.map(t => t.id === tier.id ? { ...t, price: e.target.value } : t))}
                                                        className="bg-transparent border-none outline-none w-full text-white font-black text-xs"
                                                    />
                                                    <select 
                                                        value={tier.interval}
                                                        onChange={(e) => setTiers(tiers.map(t => t.id === tier.id ? { ...t, interval: e.target.value as 'month' | 'year' } : t))}
                                                        className="bg-white/5 text-gray-400 text-[8px] font-black uppercase tracking-widest border-none outline-none rounded px-1.5 py-0.5"
                                                    >
                                                        <option value="month">/mo</option>
                                                        <option value="year">/yr</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[8px] text-gray-800 uppercase font-black tracking-widest">Features</label>
                                                
                                                {/* Visual list of features to be configured */}
                                                <div className="flex flex-wrap gap-1.5 mb-2">
                                                    {tier.features.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md px-1.5 py-1 group/feat">
                                                            <span className="text-[8px] text-gray-400 font-bold">{f}</span>
                                                            <button 
                                                                onClick={() => removeFeature(tier.id, i)}
                                                                className="text-gray-700 hover:text-red-400 transition-colors"
                                                            >
                                                                <X size={8} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex gap-2">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Add feature..." 
                                                        value={newFeatureText[tier.id] || ''}
                                                        onChange={(e) => setNewFeatureText({ ...newFeatureText, [tier.id]: e.target.value })}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                addFeature(tier.id);
                                                            }
                                                        }}
                                                        className="flex-1 bg-black/40 border border-white/5 rounded-lg px-2.5 py-1.5 text-[8px] text-white focus:border-brand-purple/40 outline-none"
                                                    />
                                                    <button onClick={() => addFeature(tier.id)} className="p-1.5 bg-brand-purple/10 text-brand-purple rounded-lg hover:bg-brand-purple/20 transition-all"><Plus size={12} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between shrink-0">
                        <button onClick={handleReset} className="text-[8px] text-gray-800 hover:text-white font-black uppercase tracking-widest">Discard</button>
                        <button 
                            onClick={handleDeploy} 
                            disabled={activePaymentMethods.length === 0}
                            className={`flex items-center gap-2.5 px-6 py-3 font-black text-[10px] rounded-lg shadow-xl transition-all transform active:scale-95 ${activePaymentMethods.length > 0 ? 'bg-brand-purple hover:bg-brand-purpleHover text-white' : 'bg-gray-900 text-gray-700 cursor-not-allowed'}`}
                        >
                           <Activity size={14} strokeWidth={3} /> Commit & Deploy
                        </button>
                    </div>
                  </div>
                )}

                {status === 'complete' && (
                  <div className="h-full flex flex-col items-center justify-center bg-[#080808] animate-fade-in relative overflow-hidden">
                    <div className="absolute top-5 left-6 flex items-center gap-2 text-green-500/40">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em]">Live Production Bridge</span>
                    </div>

                    <div className="flex flex-row items-stretch justify-center gap-5 w-full overflow-x-auto p-10 no-scrollbar scroll-smooth">
                        {tiers.map((tier) => (
                            <div key={tier.id} className="w-[240px] shrink-0 bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-6 flex flex-col shadow-2xl transition-all hover:-translate-y-2 hover:border-brand-purple/40 group/card relative">
                                <h3 className="text-lg font-black text-white mb-1.5 tracking-tighter group-hover/card:text-brand-purple transition-colors">{tier.name}</h3>
                                <div className="text-2xl font-black text-white mb-4 tracking-tighter">
                                    ${tier.price}
                                    <span className="text-[9px] font-bold text-gray-700 ml-1 uppercase tracking-widest">/{tier.interval === 'month' ? 'mo' : 'yr'}</span>
                                </div>
                                <ul className="space-y-2.5 mb-6 flex-1">
                                    {tier.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[10px] text-gray-600 font-bold leading-tight">
                                            <Check size={12} className="text-brand-purple shrink-0 mt-0.5" strokeWidth={4} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => startTestCheckout(tier)} className="w-full py-3 bg-brand-purple text-white font-black text-[8px] uppercase tracking-widest rounded-lg hover:bg-brand-purpleHover transition-all">Select Plan</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleReset} className="mt-2 text-[8px] text-gray-800 hover:text-white uppercase font-black tracking-widest flex items-center gap-2"><RefreshCw size={12} /> Restart</button>
                  </div>
                )}

                {status === 'testing-checkout' && selectedTier && (
                    <div className="h-full flex items-center justify-center p-4 bg-[#050505] animate-fade-in relative">
                        <div className="w-full max-w-4xl h-[480px] bg-[#0c0c0c] border border-white/10 rounded-[1.5rem] overflow-hidden flex shadow-[0_0_80px_rgba(139,92,246,0.1)]">
                            {/* Summary Rail */}
                            <div className="w-[220px] bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col">
                                <button onClick={() => setStatus('complete')} className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] transition-colors"><ArrowRight className="rotate-180" size={10} /> Back</button>
                                
                                <div className="space-y-5 flex-1">
                                    <div>
                                        <Badge text="Summary" className="mb-2 bg-white/5 border-none" />
                                        <h2 className="text-white text-lg font-black tracking-tighter mb-0.5">{selectedTier.name}</h2>
                                        <p className="text-gray-600 text-[8px] font-bold uppercase tracking-widest">Billed {selectedTier.interval}ly</p>
                                    </div>
                                    
                                    <div className="space-y-2.5 pt-5 border-t border-white/5">
                                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                                            <span>Subtotal</span>
                                            <span className="text-white font-mono">${selectedTier.price}.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                                            <span>Fees and Tax</span>
                                            <span className="text-white font-mono">$0.00</span>
                                        </div>
                                        <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Total</span>
                                            <span className="text-white text-lg font-black font-mono tracking-tighter">${selectedTier.price}.00</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-5 flex items-center gap-2 text-gray-700">
                                    <ShieldCheck size={14} className="text-brand-purple" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.1em]">Secure Session</span>
                                </div>
                            </div>

                            {/* Payment Method Interface */}
                            <div className="flex-1 flex flex-col bg-[#0c0c0c] overflow-hidden">
                                {checkoutStep === 'details' && (
                                    <div className="flex flex-col h-full">
                                        {/* Method Selector Bar */}
                                        <div className="p-5 pb-1.5 grid grid-cols-4 gap-2">
                                            {activePaymentMethods.map(m => {
                                                const opt = paymentOptions.find(o => o.id === m);
                                                const isActive = checkoutMethod === m;
                                                return (
                                                    <button 
                                                        key={m} 
                                                        onClick={() => setCheckoutMethod(m)}
                                                        className={`h-16 rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 group ${isActive ? 'bg-brand-purple/10 border-brand-purple/50 shadow-md' : 'bg-black/40 border-white/5 hover:border-white/10'}`}
                                                    >
                                                        <div className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105 opacity-40'}`}>
                                                            {opt && <opt.icon size={18} className={isActive ? 'text-brand-purple' : 'text-gray-500'} />}
                                                        </div>
                                                        <span className={`text-[8px] font-black uppercase tracking-[0.15em] ${isActive ? 'text-white' : 'text-gray-700'}`}>{opt?.name}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {/* Method Specific Content */}
                                        <div className="flex-1 p-6 pt-1 overflow-y-auto scrollbar-thin">
                                            <div className="max-w-xs mx-auto space-y-4 animate-fade-in">
                                                
                                                {/* 1. CREDIT CARD FLOW */}
                                                {checkoutMethod === 'card' && (
                                                    <div className="space-y-3 pt-3">
                                                        <div className="grid grid-cols-2 gap-2.5">
                                                            <div className="col-span-2 bg-black/40 border border-white/5 rounded-lg p-3 focus-within:border-brand-purple/40">
                                                                <label className="text-[8px] text-gray-700 font-black uppercase tracking-widest block mb-1.5">Card Number</label>
                                                                <div className="flex items-center gap-2.5">
                                                                    <CardIcon className="text-gray-600" size={14} />
                                                                    <input type="text" placeholder="4242 4242 4242 4242" className="bg-transparent border-none outline-none w-full text-white font-mono text-sm tracking-widest" />
                                                                </div>
                                                            </div>
                                                            <div className="bg-black/40 border border-white/5 rounded-lg p-3 focus-within:border-brand-purple/40">
                                                                <label className="text-[8px] text-gray-700 font-black uppercase tracking-widest block mb-1.5">Expiry</label>
                                                                <input type="text" placeholder="MM/YY" className="bg-transparent border-none outline-none w-full text-white font-mono text-xs" />
                                                            </div>
                                                            <div className="bg-black/40 border border-white/5 rounded-lg p-3 focus-within:border-brand-purple/40">
                                                                <label className="text-[8px] text-gray-700 font-black uppercase tracking-widest block mb-1.5">CVC</label>
                                                                <input type="text" placeholder="•••" className="bg-transparent border-none outline-none w-full text-white font-mono text-xs" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 2. APPLE PAY FLOW */}
                                                {checkoutMethod === 'apple_pay' && (
                                                    <div className="flex flex-col items-center justify-center h-[180px] p-2 text-center">
                                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-md">
                                                            <Smartphone size={28} className="text-gray-400 mb-3 opacity-20" />
                                                            <div className="text-[8px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">Apple Wallet</div>
                                                            <button 
                                                                onClick={processPayment}
                                                                className="group relative w-full h-[44px] bg-black border border-white/10 rounded-full flex items-center justify-center gap-1.5 transition-all hover:bg-gray-900 shadow-md"
                                                            >
                                                                <Apple size={16} className="text-white fill-white -mt-0.5" />
                                                                <span className="text-white text-base font-medium tracking-tight">Pay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 3. GOOGLE PAY FLOW */}
                                                {checkoutMethod === 'google_pay' && (
                                                    <div className="flex flex-col items-center justify-center h-[180px] p-2 text-center">
                                                        <div className="bg-[#4285F4]/5 border border-[#4285F4]/20 rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-md">
                                                            <div className="w-8 h-8 rounded-full bg-[#4285F4] flex items-center justify-center text-white mb-4">
                                                                <Globe size={16} />
                                                            </div>
                                                            <div className="text-[8px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">G Pay Integrated</div>
                                                            <button 
                                                                onClick={processPayment}
                                                                className="w-full h-[44px] bg-black border border-white/10 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-gray-900 shadow-md"
                                                            >
                                                                <span className="text-white text-sm font-medium">Buy with G Pay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 4. BANK PAY FLOW */}
                                                {checkoutMethod === 'bank' && (
                                                    <div className="space-y-3 pt-3">
                                                        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl shadow-md">
                                                            <div className="grid grid-cols-2 gap-2.5">
                                                                {['Chase', 'BoA', 'Wells', 'Citi'].map(bank => (
                                                                    <button key={bank} onClick={() => setSelectedBank(bank)} className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-1.5 ${selectedBank === bank ? 'bg-brand-purple/20 border-brand-purple/50 text-white' : 'border-white/5 bg-black/20 text-gray-700'}`}>
                                                                        <Building2 size={16} className={selectedBank === bank ? 'text-brand-purple' : 'opacity-20'} />
                                                                        <span className="text-[8px] font-black uppercase tracking-tight">{bank}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        {/* Global Action Area */}
                                        <div className="p-6 pt-1 mt-auto">
                                            <button 
                                                onClick={processPayment} 
                                                disabled={checkoutMethod === 'bank' && !selectedBank}
                                                className={`group relative w-full py-4 rounded-xl flex items-center justify-center gap-2.5 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${
                                                    checkoutMethod === 'apple_pay' ? 'bg-black border border-white/10 hover:bg-gray-900' : 
                                                    checkoutMethod === 'google_pay' ? 'bg-[#4285F4] hover:bg-[#357abd]' :
                                                    'bg-brand-purple hover:bg-brand-purpleHover'
                                                }`}
                                            >
                                                {checkoutMethod === 'apple_pay' ? 'Pay' : 
                                                 checkoutMethod === 'google_pay' ? 'Buy with G Pay' : 
                                                 'Confirm Payment'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {checkoutStep === 'processing' && (
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
                                        <Loader2 className="animate-spin text-brand-purple" size={48} strokeWidth={1} />
                                        <div className="text-center space-y-1.5">
                                            <h3 className="text-white text-lg font-black uppercase italic">Processing...</h3>
                                            <p className="text-[8px] text-gray-700 font-black uppercase tracking-[0.4em]">Bridging gateway...</p>
                                        </div>
                                    </div>
                                )}

                                {checkoutStep === 'success' && (
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-8 animate-fade-in">
                                        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shadow-lg">
                                            <Check size={40} strokeWidth={3} />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <h3 className="text-white text-2xl font-black uppercase italic">Payment successful</h3>
                                            <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.5em]">BLOXS-AUTH-OK</p>
                                        </div>
                                        <button onClick={() => setStatus('complete')} className="px-8 py-3 bg-white text-black font-black text-[8px] uppercase tracking-[0.2em] rounded-lg hover:bg-gray-200 transition-all">Dismiss</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};
