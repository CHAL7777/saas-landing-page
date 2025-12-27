"use client";
import { motion } from "framer-motion";

const logos = [
  { name: "Acme Corp" },
  { name: "GlobalX" },
  { name: "Stripe" },
  { name: "Vercel" },
  { name: "Slack" },
  { name: "Amazon" },
  { name: "Linear" },
  { name: "Supabase" },
];

export default function LogoMarquee() {
  return (
    <section className="py-16 bg-[#020617] border-y border-white/5 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Powering the next generation of <span className="text-emerald-500/80">Tech Giants</span>
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* The Marquee Container */}
        <motion.div
          className="flex whitespace-nowrap gap-20 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30, // Slower duration feels more premium
            repeat: Infinity,
          }}
        >
          {/* We render the list twice to ensure seamless looping */}
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center min-w-[150px]">
               <span className="text-xl md:text-2xl font-black text-slate-700 hover:text-emerald-400 transition-all duration-500 cursor-default uppercase tracking-tighter filter hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                 {logo.name}
               </span>
            </div>
          ))}
        </motion.div>

        {/* Deep Gradient Fades for the edges to match Obsidian theme */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-10" />
      </div>
    </section>
  );
}