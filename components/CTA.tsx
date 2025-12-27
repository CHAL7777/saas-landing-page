"use client";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Sparkles, Globe2, Zap } from "lucide-react";
import React, { MouseEvent } from "react";

export default function CTA() {
  // Mouse tracking for the spotlight effect
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          onMouseMove={handleMouseMove}
          className="group relative rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 overflow-hidden border border-white/10 bg-slate-900/20 backdrop-blur-3xl shadow-2xl"
        >
          {/* 1. Interactive Spotlight Background */}
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

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe2 size={200} className="text-emerald-500" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Live Badge */}
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
                v2.4.0 Now Deploying Worldwide
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] lg:max-w-4xl">
              Stop managing server racks. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-teal-400">
                Start shipping products.
              </span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Experience the world's fastest deployment engine. Scale from one user to a million without touching a single config file.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:flex-1 px-8 py-5 bg-emerald-500 text-[#020617] rounded-2xl font-black text-sm uppercase tracking-widest transition-all overflow-hidden shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free <Zap size={18} className="fill-current" />
                </span>
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
              </motion.button>

              <button className="w-full sm:flex-1 flex items-center justify-center gap-2 px-8 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm group">
                Enterprise <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Social Proof Footer */}
            <div className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-center gap-8 opacity-40 grayscale">
               <div className="flex items-center gap-2 font-black italic text-xl">QUANTUM</div>
               <div className="flex items-center gap-2 font-black italic text-xl">BOLT</div>
               <div className="flex items-center gap-2 font-black italic text-xl">CYPHER</div>
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