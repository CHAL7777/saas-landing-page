"use client";
import { useState } from "react";
import { Check, Zap, Building2, Rocket, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter",
    icon: <Rocket size={20} />,
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for side projects and experiments.",
    features: ["Up to 3 projects", "Basic analytics", "Community support", "1GB bandwidth"],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Pro",
    icon: <Zap size={20} />,
    price: { monthly: 29, yearly: 24 }, // $24 * 12 = $288
    description: "For professional builders and growing teams.",
    features: ["Unlimited projects", "Advanced AI tools", "Priority email support", "Custom domains", "50GB bandwidth", "Advanced Security"],
    cta: "Get Started Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: <Building2 size={20} />,
    price: { monthly: 99, yearly: 89 },
    description: "Global scale with advanced governance.",
    features: ["Custom contracts", "Dedicated manager", "SSO & Security", "24/7 Phone support", "Unlimited bandwidth", "White-labeling"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent blur-3xl" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-6"
          >
            <Crown size={12} /> Pricing Plans
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Plans for every <span className="text-emerald-400 text-glow">stage.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            From solo founders to global enterprises, our infrastructure scales with your ambition.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-6 mb-24">
          <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-9 bg-slate-900 border-2 border-slate-800 rounded-full p-1 relative transition-all hover:border-slate-700"
          >
            <motion.div 
              animate={{ x: isYearly ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-6 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)]"
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-white' : 'text-slate-500'}`}>Yearly</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-tighter">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500 group ${
                plan.highlighted 
                ? 'bg-slate-900/40 border-emerald-500/30 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.1)]' 
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.highlighted ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-emerald-400'}`}>
                  {plan.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-white font-black tracking-tight text-xl">{plan.name}</h3>
                  <p className="text-slate-500 text-xs">{plan.description}</p>
                </div>
              </div>
              
              <div className="mb-8 text-left h-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-5xl font-black text-white leading-none tracking-tighter">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                      /{isYearly ? 'mo' : 'mo'}
                    </span>
                  </motion.div>
                </AnimatePresence>
                {isYearly && plan.price.monthly > 0 && (
                   <p className="text-[10px] text-emerald-500/60 font-bold mt-1 uppercase tracking-widest">Billed annually</p>
                )}
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                    <Check size={16} className={`${plan.highlighted ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group/btn ${
                plan.highlighted 
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                <span className="relative z-10">{plan.cta}</span>
                {plan.highlighted && (
                  <motion.div 
                    className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"
                    initial={false}
                  />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}