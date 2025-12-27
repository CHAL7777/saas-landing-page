"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { Share2, Target, Cpu, CheckCircle2, Zap, Github, Slack } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Connect your workspace",
    description: "Sync your existing tools like Slack, GitHub, and Jira in just a few clicks using our secure API bridge.",
    icon: <Share2 className="text-emerald-400" size={24} />,
    color: "emerald",
    visual: <VisualOne />
  },
  {
    number: "02",
    title: "Set your goals",
    description: "Define your KPIs and milestones. Our system automatically maps out the most efficient path to success.",
    icon: <Target className="text-emerald-400" size={24} />,
    color: "emerald",
    visual: <VisualTwo />
  },
  {
    number: "03",
    title: "Automate everything",
    description: "Our AI-driven engine handles the busy work, deployments, and scaling while you focus on strategy.",
    icon: <Cpu className="text-emerald-400" size={24} />,
    color: "emerald",
    visual: <VisualThree />
  }
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} id="how-it-works" className="py-32 bg-[#020617] relative">
      {/* 1. Progress Line with Glow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-emerald-500 via-teal-400 to-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4"
          >
            The Workflow
          </motion.h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Ship faster than <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">humanly possible.</span>
          </h3>
        </div>

        <div className="space-y-48">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 lg:gap-32`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                    Step {step.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">{step.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {['One-click setup', 'Real-time sync', 'End-to-end encryption'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced Visual Card */}
              <div className="flex-1 w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-slate-900/40 rounded-[2rem] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                  {step.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Micro-Visual Components for each step ---

function VisualOne() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#030712] relative overflow-hidden">
      <div className="flex items-center gap-8 z-10">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl"><Github className="text-white" size={32} /></div>
        <div className="relative flex items-center">
            <div className="w-24 h-[2px] bg-emerald-500/30 overflow-hidden">
                <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-1/2 bg-emerald-400" />
            </div>
            <Zap className="absolute left-1/2 -translate-x-1/2 text-emerald-400 fill-emerald-400" size={20} />
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl"><Slack className="text-white" size={32} /></div>
      </div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
    </div>
  );
}

function VisualTwo() {
    return (
      <div className="w-full h-full p-8 bg-[#030712] flex flex-col justify-end">
        <div className="flex items-end gap-2 h-32">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <motion.div 
                    key={i} 
                    initial={{ height: 0 }} 
                    whileInView={{ height: `${h}%` }} 
                    className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-400 rounded-t-sm" 
                />
            ))}
        </div>
      </div>
    );
}

function VisualThree() {
    return (
      <div className="w-full h-full bg-[#030712] flex flex-col p-6 font-mono text-[10px] text-emerald-500/50">
        <div className="flex-1 space-y-2 border border-white/5 rounded-lg p-4 bg-black/20">
            <p>{">"} initiating_auto_scale...</p>
            <p className="text-emerald-400">{">"} instance_01: healthy</p>
            <p className="text-emerald-400">{">"} instance_02: healthy</p>
            <p className="text-white animate-pulse">{">"} monitoring traffic patterns...</p>
        </div>
      </div>
    );
}