"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transition from transparent to a deep, glassy obsidian
  const backgroundColor = useTransform(
    scrollY, 
    [0, 50], 
    ["rgba(2, 6, 23, 0)", "rgba(2, 6, 23, 0.8)"]
  );
  const borderBottom = useTransform(
    scrollY, 
    [0, 50], 
    ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(16, 185, 129, 0.2)"]
  );

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottom }}
      className="fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo with Emerald Zap */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap size={18} className="text-slate-950 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            SaaS<span className="text-emerald-400">ly</span>
          </span>
        </div>
        
        {/* Desktop Links - Emerald Hovers */}
        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide uppercase text-slate-400">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          
          <button className="relative px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Dark Theme */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#020617] border-b border-emerald-500/20 p-8 flex flex-col gap-6"
        >
          <a href="#features" className="text-lg text-white" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-lg text-white" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#pricing" className="text-lg text-white" onClick={() => setIsOpen(false)}>Pricing</a>
          <button className="w-full bg-emerald-500 text-slate-950 py-4 rounded-xl font-bold">
            Get Started
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}