"use client";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#020617]">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Sparkles size={14} />
            <span>AI Study Assistant Now Live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-white leading-[0.95]">
            Master your studies <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              without the stress.
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate workspace for students. Organize assignments, 
            track your GPA, and use AI to simplify complex concepts—all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href="/dashboard"
              className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
            >
              <BookOpen size={18} />
              Enter Dashboard
            </a>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
              <Sparkles size={18} /> Take a Tour
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}