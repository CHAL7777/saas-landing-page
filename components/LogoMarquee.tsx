"use client";
import { motion } from "framer-motion";

const institutions = [
  { name: "AAU" },
  { name: "MIT" },
  { name: "Harvard" },
  { name: "Oxford" },
  { name: "Berkeley" },
  { name: "ETH Zurich" },
  { name: "UCLA" },
  { name: "Toronto" },
];

export default function LogoMarquee() {
  return (
    <section className="py-16 bg-[#020617] border-y border-white/5 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Trusted by students at <span className="text-emerald-500/80">World-Class Institutions</span>
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* The Marquee Container */}
        <motion.div
          className="flex whitespace-nowrap gap-24 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40, // Even slower for a "prestigious" feel
            repeat: Infinity,
          }}
        >
          {/* Loop institutions */}
          {[...institutions, ...institutions].map((edu, i) => (
            <div key={i} className="flex items-center justify-center min-w-[180px]">
               <span className="text-xl md:text-2xl font-black text-slate-800 hover:text-emerald-400/80 transition-all duration-700 cursor-default uppercase tracking-tight filter hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                 {edu.name}
               </span>
            </div>
          ))}
        </motion.div>

        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent z-10" />
      </div>
    </section>
  );
}