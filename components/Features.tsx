"use client";
import { Zap, Shield, BarChart3, Users, Globe, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Global Edge Network",
    desc: "Deploy your logic closer to your users for sub-10ms latency worldwide.",
    icon: <Globe className="text-emerald-400" />,
    className: "md:col-span-2", // Large card
  },
  {
    title: "Military Encryption",
    desc: "AES-256 at rest and TLS 1.3 in transit.",
    icon: <Lock className="text-emerald-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Real-time Intelligence",
    desc: "Deep-trace analytics powered by our proprietary vector engine.",
    icon: <BarChart3 className="text-emerald-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Advanced Team Control",
    desc: "RBAC, SSO, and granular audit logs for scaling engineering orgs.",
    icon: <Users className="text-emerald-400" />,
    className: "md:col-span-2", // Large card
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#020617]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-4">
            Core Infrastructure
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Built for the speed of <span className="text-emerald-400">now.</span>
          </h3>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 overflow-hidden relative ${f.className}`}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
              
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {f.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}