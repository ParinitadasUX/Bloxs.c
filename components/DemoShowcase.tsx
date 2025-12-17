
import React, { useState, useRef, useEffect } from 'react';
import { Badge } from './ui/Badge';
import { 
  Terminal, Zap, Loader2, Check, RefreshCw, CreditCard, 
  ArrowRight, Lock, Plus, X, Trash2, Activity, 
  Smartphone, Bitcoin, Landmark, Globe, Copy, Send,
  LayoutGrid, ListChecks, Code2, Cpu, Sparkles, Settings2, Eye, ShieldCheck, Info, Eraser,
  PlusCircle, MinusCircle, Wallet, Building2, Apple, ChevronRight, CreditCard as CardIcon
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
  "Create 2 plans. Annual pricing. Bitcoin enabled.",
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
  const [activePaymentMethods, setActivePaymentMethods] = useState<string[]>(['card', 'apple_pay', 'crypto']);
  const [newFeatureText, setNewFeatureText] = useState<Record<string, string>>({});
  
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'processing' | 'success'>('details');
  const [checkoutMethod, setCheckoutMethod] = useState<string>('card');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('ETH');
  
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
    { id: 'crypto', name: 'Crypto', icon: Bitcoin, description: 'Web3 / Native' },
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
    setIsWalletConnected(false);
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
    setActivePaymentMethods(['card', 'apple_pay', 'crypto']);
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
    <section className="py-20 bg-brand-dark scroll-mt-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-mono font-bold tracking-widest animate-pulse">
                   <Sparkles size={14} /> LIVE_MCP_SESSIONS
                </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              AI-Native Payment Logic
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Describe your model. Select your gateways. Test the portal. All within your Vibe-Coding session.
            </p>
        </div>

        <div className="relative group max-w-6xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple/20 to-blue-600/20 rounded-[2.5rem] blur-3xl opacity-20"></div>
            
            <div className="relative bg-[#080808] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[820px]">
              
              <div className="flex items-center gap-4 px-8 py-5 border-b border-white/5 bg-[#0a0a0a] shrink-0">
                 <div className="flex items-center gap-3 text-white font-mono text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
                    <Cpu size={16} className="text-brand-purple" />
                    <span>session: {status === 'idle' ? 'STANDBY' : status.toUpperCase()} // mcp_v2.4</span>
                 </div>
                 <div className="ml-auto flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/5"></div>
                 </div>
              </div>

              <div className="relative flex-1 overflow-hidden flex flex-col font-mono">
                
                {status === 'idle' && (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-fade-in relative">
                    <div className="w-20 h-20 rounded-[2rem] bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20 mb-10 shadow-2xl shadow-purple-900/10">
                        <Terminal size={36} />
                    </div>
                    
                    <div className="max-w-3xl w-full px-4">
                        <div className="relative mb-12 group/input">
                            <div className="absolute -inset-4 bg-brand-purple/5 rounded-[2.5rem] opacity-0 group-hover/input:opacity-100 transition-all duration-700 blur-3xl"></div>
                            
                            <form 
                                onSubmit={(e) => { e.preventDefault(); runSimulation(typedInput); }}
                                className="relative flex items-center gap-4 bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 shadow-2xl transition-all duration-500 group-focus-within/input:border-brand-purple/40 group-focus-within/input:bg-[#0e0e0e]"
                            >
                                <div className="flex items-center gap-4 text-brand-purple opacity-30 group-focus-within/input:opacity-100 transition-opacity">
                                    <Sparkles size={24} />
                                    <span className="text-3xl font-light">/</span>
                                </div>
                                
                                <div className="relative flex-1">
                                    <input 
                                        ref={inputRef}
                                        type="text"
                                        value={typedInput}
                                        onChange={(e) => setTypedInput(e.target.value)}
                                        placeholder={PLACEHOLDERS[placeholderIndex]}
                                        className="bg-transparent border-none outline-none w-full text-white text-xl placeholder-white/5 caret-brand-purple font-medium"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    {typedInput && (
                                        <button type="button" onClick={() => setTypedInput('')} className="p-3 text-gray-700 hover:text-white transition-colors">
                                            <Eraser size={20} />
                                        </button>
                                    )}
                                    <button 
                                        type="submit" 
                                        disabled={!typedInput.trim()}
                                        className={`p-5 rounded-2xl transition-all duration-300 transform ${typedInput.trim() ? 'bg-brand-purple text-white shadow-xl hover:scale-110 active:scale-95' : 'text-white/5 cursor-not-allowed'}`}
                                    >
                                        <Send size={22} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em]">Prompt Suggestions</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    { t: "Add 2 tier subscription", i: <ListChecks size={14} /> },
                                    { t: "Add payment portal", i: <Zap size={14} /> },
                                    { t: "Lock analytics for Pro tier", i: <Lock size={14} /> },
                                    { t: "Enable crypto gateway", i: <Bitcoin size={14} /> }
                                ].map((item, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => runSimulation(item.t)}
                                        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-500 hover:text-white hover:bg-white/5 hover:border-brand-purple/40 transition-all duration-300 font-bold uppercase tracking-widest group/btn"
                                    >
                                        <span className="text-brand-purple opacity-40 group-hover/btn:opacity-100 group-hover/btn:scale-110 transition-transform">{item.i}</span>
                                        {item.t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                {(status === 'analyzing' || status === 'building') && (
                  <div className="h-full flex flex-col p-12 font-mono text-sm leading-relaxed">
                    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-6 scrollbar-thin">
                      <div className="text-brand-purple/60 mb-10 pb-6 border-b border-white/5 flex items-center justify-between">
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Command Received</span>
                            <span className="text-white text-xl italic font-serif">"{typedInput}"</span>
                         </div>
                         <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-purple animate-ping"></div>
                            <div className="w-2 h-2 rounded-full bg-brand-purple opacity-20"></div>
                         </div>
                      </div>
                      {logs.map((log, i) => (
                        <div key={i} className="text-gray-500 flex gap-6 animate-fade-in font-mono">
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
                    <div className="flex-1 overflow-y-auto p-12 space-y-16 scrollbar-thin">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                <div className="space-y-1">
                                    <h3 className="text-white text-2xl font-black tracking-tighter">1. Payment Gateways</h3>
                                    <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Select your active merchant bridges</p>
                                </div>
                                <Badge text={`${activePaymentMethods.length} Methods Enabled`} />
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {paymentOptions.map((opt) => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => toggleGateway(opt.id)}
                                        className={`p-6 rounded-3xl border transition-all duration-300 text-center flex flex-col items-center gap-4 group/opt ${activePaymentMethods.includes(opt.id) ? 'bg-brand-purple/10 border-brand-purple/50 shadow-xl' : 'bg-[#0c0c0c] border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activePaymentMethods.includes(opt.id) ? 'bg-brand-purple text-white' : 'bg-white/5 text-gray-700'}`}>
                                            <opt.icon size={22} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{opt.name}</div>
                                            <div className="text-[8px] text-gray-700 font-bold uppercase">{opt.description}</div>
                                        </div>
                                        {activePaymentMethods.includes(opt.id) && <Check size={14} className="text-brand-purple" strokeWidth={4} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                <div className="space-y-1">
                                    <h3 className="text-white text-2xl font-black tracking-tighter">2. Subscription Architecture</h3>
                                    <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Refine tiers and subsection details</p>
                                </div>
                                <button onClick={handleAddTier} className="flex items-center gap-3 px-6 py-3 bg-brand-purple/5 text-brand-purple font-black text-[10px] uppercase tracking-widest rounded-2xl border border-brand-purple/20 hover:bg-brand-purple/15 transition-all">
                                    <Plus size={16} strokeWidth={4} /> Add Tier
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {tiers.map((tier, idx) => (
                                    <div key={tier.id} className="relative bg-[#0c0c0c] border border-white/10 rounded-[3rem] p-10 shadow-2xl transition-all hover:border-brand-purple/30">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-700 text-[10px] font-black">{idx + 1}</span>
                                                <input 
                                                    type="text" 
                                                    value={tier.name} 
                                                    onChange={(e) => setTiers(tiers.map(t => t.id === tier.id ? { ...t, name: e.target.value } : t))}
                                                    className="bg-transparent border-none outline-none text-white font-black text-2xl focus:text-brand-purple transition-colors"
                                                />
                                            </div>
                                            <button onClick={() => handleRemoveTier(tier.id)} className="text-gray-800 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-4">
                                                <label className="text-[10px] text-gray-800 uppercase font-black tracking-widest">Price Point ($)</label>
                                                <div className="flex items-center gap-4 bg-black border border-white/10 rounded-2xl px-6 py-4 focus-within:border-brand-purple transition-all">
                                                    <span className="text-gray-600 font-black">$</span>
                                                    <input 
                                                        type="text" 
                                                        value={tier.price} 
                                                        onChange={(e) => setTiers(tiers.map(t => t.id === tier.id ? { ...t, price: e.target.value } : t))}
                                                        className="bg-transparent border-none outline-none w-full text-white font-black text-lg"
                                                    />
                                                    <select 
                                                        value={tier.interval}
                                                        onChange={(e) => setTiers(tiers.map(t => t.id === tier.id ? { ...t, interval: e.target.value as 'month' | 'year' } : t))}
                                                        className="bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest border-none outline-none rounded-lg px-3 py-1"
                                                    >
                                                        <option value="month">/mo</option>
                                                        <option value="year">/yr</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] text-gray-800 uppercase font-black tracking-widest">Subsection Details (Features)</label>
                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap gap-2">
                                                        {tier.features.map((f, fIdx) => (
                                                            <div key={fIdx} className="group/feat flex items-center gap-3 px-4 py-2 bg-brand-purple/5 border border-brand-purple/10 rounded-xl hover:border-brand-purple/40 transition-all">
                                                                <span className="text-[10px] font-bold text-gray-400 group-hover/feat:text-white">{f}</span>
                                                                <button onClick={() => removeFeature(tier.id, fIdx)} className="text-gray-800 hover:text-red-400 transition-colors">
                                                                    <X size={12} strokeWidth={4} />
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
                                                            onKeyDown={(e) => e.key === 'Enter' && addFeature(tier.id)}
                                                            className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-[10px] text-white focus:border-brand-purple/40 outline-none transition-all"
                                                        />
                                                        <button 
                                                            onClick={() => addFeature(tier.id)}
                                                            className="p-3 bg-brand-purple/10 text-brand-purple rounded-xl hover:bg-brand-purple/20 transition-all"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-10 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between shrink-0">
                        <button onClick={handleReset} className="text-[11px] text-gray-800 hover:text-white font-black uppercase tracking-widest">Discard Changes</button>
                        <button 
                            onClick={handleDeploy} 
                            disabled={activePaymentMethods.length === 0}
                            className={`flex items-center gap-5 px-14 py-6 font-black text-sm rounded-[2rem] shadow-2xl transition-all transform active:scale-95 ${activePaymentMethods.length > 0 ? 'bg-brand-purple hover:bg-brand-purpleHover text-white' : 'bg-gray-900 text-gray-700 cursor-not-allowed'}`}
                        >
                           <Activity size={20} strokeWidth={3} /> Commit & Deploy
                        </button>
                    </div>
                  </div>
                )}

                {status === 'complete' && (
                  <div className="h-full flex flex-col items-center justify-center bg-[#080808] animate-fade-in relative overflow-hidden">
                    <div className="absolute top-10 left-12 flex items-center gap-5 text-green-500/40">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Live Production Bridge</span>
                    </div>

                    <div className="flex flex-row items-stretch justify-center gap-10 w-full overflow-x-auto p-20 no-scrollbar scroll-smooth">
                        {tiers.map((tier) => (
                            <div key={tier.id} className="w-[340px] shrink-0 bg-[#0c0c0c] border border-white/10 rounded-[3.5rem] p-12 flex flex-col shadow-3xl transition-all hover:-translate-y-4 hover:border-brand-purple/40 group/card relative">
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover/card:text-brand-purple transition-colors">{tier.name}</h3>
                                <div className="text-5xl font-black text-white mb-10 tracking-tighter">
                                    ${tier.price}
                                    <span className="text-xs font-bold text-gray-700 ml-2 uppercase tracking-widest">/{tier.interval === 'month' ? 'mo' : 'yr'}</span>
                                </div>
                                <ul className="space-y-6 mb-12 flex-1">
                                    {tier.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-4 text-[13px] text-gray-600 font-bold leading-snug">
                                            <Check size={18} className="text-brand-purple shrink-0 mt-0.5" strokeWidth={4} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => startTestCheckout(tier)} className="w-full py-5 bg-brand-purple text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-brand-purpleHover shadow-2xl transition-all">Select Plan</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleReset} className="mt-8 text-[11px] text-gray-800 hover:text-white uppercase font-black tracking-widest flex items-center gap-3"><RefreshCw size={16} /> Restart Session</button>
                  </div>
                )}

                {status === 'testing-checkout' && selectedTier && (
                    <div className="h-full flex items-center justify-center p-8 bg-[#050505] animate-fade-in relative">
                        <div className="w-full max-w-5xl h-[640px] bg-[#0c0c0c] border border-white/10 rounded-[3rem] overflow-hidden flex shadow-[0_0_100px_rgba(139,92,246,0.15)]">
                            {/* Summary Rail */}
                            <div className="w-[320px] bg-[#0a0a0a] border-r border-white/5 p-10 flex flex-col">
                                <button onClick={() => setStatus('complete')} className="text-gray-500 hover:text-white mb-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-colors"><ArrowRight className="rotate-180" size={14} /> Back</button>
                                
                                <div className="space-y-8 flex-1">
                                    <div>
                                        <Badge text="Checkout Summary" className="mb-4 bg-white/5 border-none" />
                                        <h2 className="text-white text-3xl font-black tracking-tighter mb-1">{selectedTier.name}</h2>
                                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Billed {selectedTier.interval}ly</p>
                                    </div>
                                    
                                    <div className="space-y-4 pt-8 border-t border-white/5">
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                            <span>Subtotal</span>
                                            <span className="text-white font-mono">${selectedTier.price}.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                            <span>Fees</span>
                                            <span className="text-white font-mono">$0.00</span>
                                        </div>
                                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-white text-sm font-black uppercase tracking-widest">Total</span>
                                            <span className="text-white text-2xl font-black font-mono tracking-tighter">${selectedTier.price}.00</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 flex items-center gap-3 text-gray-700">
                                    <ShieldCheck size={18} className="text-brand-purple" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Fully Encrypted Session</span>
                                </div>
                            </div>

                            {/* Payment Method Interface */}
                            <div className="flex-1 flex flex-col bg-[#0c0c0c] overflow-hidden">
                                {checkoutStep === 'details' && (
                                    <div className="flex flex-col h-full">
                                        {/* Method Selector Bar */}
                                        <div className="p-8 pb-4 grid grid-cols-5 gap-3">
                                            {activePaymentMethods.map(m => {
                                                const opt = paymentOptions.find(o => o.id === m);
                                                const isActive = checkoutMethod === m;
                                                return (
                                                    <button 
                                                        key={m} 
                                                        onClick={() => setCheckoutMethod(m)}
                                                        className={`h-24 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 group ${isActive ? 'bg-brand-purple/10 border-brand-purple/50 shadow-lg shadow-purple-900/10' : 'bg-black/40 border-white/5 hover:border-white/10'}`}
                                                    >
                                                        <div className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105 opacity-40'}`}>
                                                            {opt && <opt.icon size={24} className={isActive ? 'text-brand-purple' : 'text-gray-500'} />}
                                                        </div>
                                                        <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${isActive ? 'text-white' : 'text-gray-700'}`}>{opt?.name}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {/* Method Specific Content */}
                                        <div className="flex-1 p-10 pt-4 overflow-y-auto scrollbar-thin">
                                            <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
                                                
                                                {/* 1. CREDIT CARD FLOW */}
                                                {checkoutMethod === 'card' && (
                                                    <div className="space-y-6 pt-10">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="col-span-2 bg-black/40 border border-white/5 rounded-2xl p-6 focus-within:border-brand-purple/40 transition-all shadow-xl">
                                                                <label className="text-[10px] text-gray-700 font-black uppercase tracking-widest block mb-3">Card Number</label>
                                                                <div className="flex items-center gap-4">
                                                                    <CardIcon className="text-gray-600" size={20} />
                                                                    <input type="text" placeholder="4242 4242 4242 4242" className="bg-transparent border-none outline-none w-full text-white font-mono text-xl tracking-widest" />
                                                                </div>
                                                            </div>
                                                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 focus-within:border-brand-purple/40 transition-all">
                                                                <label className="text-[10px] text-gray-700 font-black uppercase tracking-widest block mb-3">Expiry Date</label>
                                                                <input type="text" placeholder="MM/YY" className="bg-transparent border-none outline-none w-full text-white font-mono text-lg" />
                                                            </div>
                                                            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 focus-within:border-brand-purple/40 transition-all">
                                                                <label className="text-[10px] text-gray-700 font-black uppercase tracking-widest block mb-3">CVC</label>
                                                                <input type="text" placeholder="•••" className="bg-transparent border-none outline-none w-full text-white font-mono text-lg" />
                                                            </div>
                                                            <div className="col-span-2 bg-black/40 border border-white/5 rounded-2xl p-6 focus-within:border-brand-purple/40 transition-all">
                                                                <label className="text-[10px] text-gray-700 font-black uppercase tracking-widest block mb-3">Card Holder Name</label>
                                                                <input type="text" placeholder="Jane Doe" className="bg-transparent border-none outline-none w-full text-white font-bold uppercase text-lg tracking-wider" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 2. APPLE PAY FLOW - Reimagined as Native View */}
                                                {checkoutMethod === 'apple_pay' && (
                                                    <div className="flex flex-col items-center justify-center h-[320px] p-6 text-center">
                                                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 w-full max-w-sm flex flex-col items-center shadow-2xl">
                                                            <Smartphone size={40} className="text-gray-400 mb-6 opacity-20" />
                                                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-10">Wallet Ready</div>
                                                            
                                                            {/* Apple Pay Button Visual from Image */}
                                                            <button 
                                                                onClick={processPayment}
                                                                className="group relative w-full h-[60px] bg-black border border-white/10 rounded-full flex items-center justify-center gap-1.5 overflow-hidden transition-all hover:bg-gray-900 active:scale-95 shadow-2xl"
                                                            >
                                                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                <Apple size={22} className="text-white fill-white -mt-0.5" />
                                                                <span className="text-white text-xl font-medium tracking-tight">Pay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 3. GOOGLE PAY FLOW - Refined Native Look */}
                                                {checkoutMethod === 'google_pay' && (
                                                    <div className="flex flex-col items-center justify-center h-[320px] p-6 text-center">
                                                        <div className="bg-[#4285F4]/5 border border-[#4285F4]/20 rounded-[2.5rem] p-12 w-full max-w-sm flex flex-col items-center shadow-2xl">
                                                            <div className="w-12 h-12 rounded-full bg-[#4285F4] flex items-center justify-center text-white mb-8">
                                                                <Globe size={24} />
                                                            </div>
                                                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-10">Chrome Auto-fill Active</div>
                                                            
                                                            <button 
                                                                onClick={processPayment}
                                                                className="w-full h-[60px] bg-black border border-white/10 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-gray-900 active:scale-95 shadow-2xl group"
                                                            >
                                                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                                </svg>
                                                                <span className="text-white text-lg font-medium">Buy with G Pay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 4. CRYPTO FLOW */}
                                                {checkoutMethod === 'crypto' && (
                                                    <div className="space-y-6">
                                                        <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem]">
                                                            <div className="flex items-center justify-between mb-10">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                                                                        <Wallet size={24} />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Web3 Status</div>
                                                                        <div className="text-sm text-white font-black">{isWalletConnected ? 'Connected' : 'Wallet Locked'}</div>
                                                                    </div>
                                                                </div>
                                                                {!isWalletConnected && (
                                                                    <button onClick={() => setIsWalletConnected(true)} className="px-6 py-3 bg-brand-purple text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-purpleHover transition-all shadow-xl">Connect</button>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="space-y-4">
                                                                <label className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-2 block">Available Assets</label>
                                                                <div className="grid grid-cols-3 gap-3">
                                                                    {['ETH', 'USDC', 'SOL'].map(coin => (
                                                                        <button key={coin} onClick={() => setSelectedCrypto(coin)} className={`py-5 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${selectedCrypto === coin ? 'bg-brand-purple/20 border-brand-purple/50 text-white' : 'border-white/5 bg-black/20 text-gray-600'}`}>
                                                                            <span className="text-xs font-black">{coin}</span>
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30"></div>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {isWalletConnected && (
                                                            <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center justify-between animate-fade-in">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">0x71C...4921</span>
                                                                </div>
                                                                <span className="text-[10px] text-white font-black uppercase">2.14 {selectedCrypto}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* 5. BANK PAY FLOW */}
                                                {checkoutMethod === 'bank' && (
                                                    <div className="space-y-6">
                                                        <div className="p-10 bg-black/40 border border-white/5 rounded-[3rem] shadow-2xl">
                                                            <div className="flex items-center gap-4 mb-10">
                                                                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                                                                    <Landmark size={24} />
                                                                </div>
                                                                <h4 className="text-xs text-white font-black uppercase tracking-[0.2em]">Plaid Verification</h4>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {['Chase Bank', 'Bank of America', 'Wells Fargo', 'Citibank'].map(bank => (
                                                                    <button key={bank} onClick={() => setSelectedBank(bank)} className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 group ${selectedBank === bank ? 'bg-brand-purple/20 border-brand-purple/50 text-white' : 'border-white/5 bg-black/20 text-gray-700'}`}>
                                                                        <Building2 size={24} className={selectedBank === bank ? 'text-brand-purple' : 'opacity-20'} />
                                                                        <span className="text-[10px] font-black uppercase tracking-tight">{bank}</span>
                                                                        {selectedBank === bank && <Check size={14} className="text-brand-purple" />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-[9px] text-gray-700 font-black text-center uppercase tracking-[0.4em] opacity-40 italic">End-to-end encrypted direct transfer</p>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        {/* Global Action Area - Dynamic Text Based on Selection */}
                                        <div className="p-10 pt-4 mt-auto">
                                            <button 
                                                onClick={processPayment} 
                                                disabled={
                                                    (checkoutMethod === 'crypto' && !isWalletConnected) || 
                                                    (checkoutMethod === 'bank' && !selectedBank)
                                                }
                                                className={`group relative w-full py-8 rounded-[2.5rem] flex items-center justify-center gap-4 text-white font-black text-base uppercase tracking-[0.2em] shadow-2xl transition-all transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden ${
                                                    checkoutMethod === 'apple_pay' ? 'bg-black border border-white/10 hover:bg-gray-900' : 
                                                    checkoutMethod === 'google_pay' ? 'bg-[#4285F4] hover:bg-[#357abd]' :
                                                    'bg-brand-purple hover:bg-brand-purpleHover'
                                                }`}
                                            >
                                                {checkoutMethod === 'apple_pay' && <Apple size={24} className="fill-white" />}
                                                {checkoutMethod === 'google_pay' && <Globe size={24} />}
                                                {checkoutMethod === 'crypto' && <Bitcoin size={24} />}
                                                {checkoutMethod === 'bank' && <Landmark size={24} />}
                                                {checkoutMethod === 'card' && <Zap size={24} fill="currentColor" />}
                                                
                                                {checkoutMethod === 'apple_pay' ? 'Pay' : 
                                                 checkoutMethod === 'google_pay' ? 'Buy with G Pay' : 
                                                 'Confirm Payment'}

                                                {/* Visual Pulse for emphasis */}
                                                {!((checkoutMethod === 'crypto' && !isWalletConnected) || (checkoutMethod === 'bank' && !selectedBank)) && (
                                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {checkoutStep === 'processing' && (
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-12">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-brand-purple/20 blur-3xl animate-pulse"></div>
                                            <Loader2 className="animate-spin text-brand-purple relative z-10" size={80} strokeWidth={1} />
                                        </div>
                                        <div className="text-center space-y-4">
                                            <h3 className="text-white text-3xl font-black tracking-tighter uppercase italic">Authorizing...</h3>
                                            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] max-w-[300px] leading-loose">Performing cross-check with the {checkoutMethod === 'crypto' ? 'Blockchain' : 'Merchant'} bridge...</p>
                                        </div>
                                    </div>
                                )}

                                {checkoutStep === 'success' && (
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-10 p-12 animate-fade-in">
                                        <div className="w-32 h-32 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_80px_rgba(34,197,94,0.15)]">
                                            <Check size={64} strokeWidth={3} />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-white text-5xl font-black tracking-tighter uppercase italic">Payment successful</h3>
                                            <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.5em]">Ref ID: BLOXS-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                                        </div>
                                        <button onClick={() => setStatus('complete')} className="px-14 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-200 transition-all shadow-xl">Dismiss</button>
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
