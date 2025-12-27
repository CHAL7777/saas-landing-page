"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Terminal, Cpu, Zap, Globe, Lock, BarChart3 } from "lucide-react";

// --- Sub-Component: Live Terminal Mockup ---
const logs = [
  "Initializing edge functions...",
  "Building dependency graph...",
  "Optimizing build artifacts...",
  "Deploying to global nodes...",
  "Health checks passing: 100%",
  "Site live at v2.4.0",
];

function LiveMockup() {
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => setCurrentLog((p) => (p + 1) % logs.length), 3500);
    const progInterval = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100);
    return () => { clearInterval(logInterval); clearInterval(progInterval); };
  }, []);

  return (
    <div className="w-full h-full p-4 md:p-8 flex flex-col font-mono text-left">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
        </div>
        <div className="text-[10px] text-emerald-500/50 uppercase tracking-widest font-bold">System: Stable</div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase">Deployment</p>
            <p className="text-sm text-white font-bold tracking-tight">prod-cluster-alpha</p>
          </div>
          <p className="text-xs text-emerald-400 font-bold">{Math.floor(progress)}%</p>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
            animate={{ width: `${progress}%` }} 
          />
        </div>

        <div className="bg-black/40 rounded-xl p-4 border border-white/5 min-h-[100px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLog}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-[11px] md:text-xs text-slate-300 flex gap-3"
            >
              <span className="text-emerald-500">$</span>
              <span>{logs[currentLog]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- Main Hero Component ---
export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-52 lg:pb-40 overflow-hidden bg-[#020617]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div style={{ y, opacity }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            <ShieldCheck size={14} /> Enterprise Grade Security
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[0.85]">
            The fast way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              ship your vision.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Deploy in seconds, scale to millions. The infrastructure layer <br className="hidden md:block" /> 
            designed for the next generation of software builders.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="group relative px-10 py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
              <span className="relative z-10 flex items-center gap-2">
                Deploy Project <ArrowRight size={18} />
              </span>
            </button>
            <button className="flex items-center gap-2 px-10 py-4 bg-slate-900/50 text-white border border-slate-800 rounded-xl font-bold hover:bg-slate-800 transition-all backdrop-blur-md">
              <PlayCircle size={18} /> View Docs
            </button>
          </div>
        </motion.div>

        {/* Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 relative mx-auto max-w-5xl"
        >
          {/* Floating Feature Tags */}
          <div className="hidden lg:block">
            <FloatingCard icon={<Terminal size={16}/>} label="Auto-Scale" top="-5%" left="-2%" delay={0} />
            <FloatingCard icon={<Zap size={16}/>} label="Edge Net" bottom="15%" right="-5%" delay={1} />
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-slate-900/40 p-2 md:p-4 backdrop-blur-3xl shadow-2xl">
            <div className="rounded-2xl bg-[#030712] aspect-[16/10] md:aspect-video overflow-hidden border border-emerald-500/20 relative">
              <LiveMockup />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent h-[50%] w-full animate-[scan_4s_linear_infinite] pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function FloatingCard({ icon, label, top, bottom, left, right, delay }: any) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute z-20 px-4 py-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-3 shadow-2xl"
      style={{ top, bottom, left, right }}
    >
      <div className="text-emerald-400">{icon}</div>
      <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}