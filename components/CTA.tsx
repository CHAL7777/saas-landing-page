"use client";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, Zap } from "lucide-react";
import React from "react";

export default function CTA() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          onMouseMove={handleMouseMove}
          className="group relative rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 overflow-hidden border border-white/10 bg-slate-900/20 backdrop-blur-3xl shadow-2xl"
        >
          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[3rem] md:rounded-[4rem] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(16, 185, 129, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Decorative Academic Background Element */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <GraduationCap size={300} className="text-emerald-500" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Live AI Status Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="flex items-center gap-3 mb-10 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                AI Tutor Online • 2,401 Students Active
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] lg:max-w-4xl">
              Stop the midnight cram. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-teal-400">
                Start the semester right.
              </span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Join the students using AI to automate their organization. Take back your weekends and ace your finals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:flex-1 px-8 py-5 bg-emerald-500 text-[#020617] rounded-2xl font-black text-sm uppercase tracking-widest transition-all overflow-hidden shadow-[0_20px_40px_rgba(16,185,129,0.3)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Scholar Free <Sparkles size={18} className="fill-current" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
              </motion.button>

              <button className="w-full sm:flex-1 flex items-center justify-center gap-2 px-8 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm group">
                Campus Plan <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Partner Universities Social Proof */}
            <div className="mt-20 pt-8 border-t border-white/5 w-full flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale brightness-200">
               <div className="font-black italic text-sm tracking-[0.3em]">STANFORD</div>
               <div className="font-black italic text-sm tracking-[0.3em]">OXFORD</div>
               <div className="font-black italic text-sm tracking-[0.3em]">MIT</div>
               <div className="font-black italic text-sm tracking-[0.3em]">HARVARD</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}