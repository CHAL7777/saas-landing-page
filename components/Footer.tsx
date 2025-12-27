"use client";
import { Twitter, Github, Linkedin, Zap, Globe, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const links = {
  infrastructure: ["Edge Network", "Serverless Functions", "Global DB", "Dev Tools"],
  resources: ["Documentation", "API Reference", "Guides", "System Status"],
  company: ["Changelog", "Security", "Privacy", "Terms of Service"]
};

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter Section */}
          <div className="col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer w-fit">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:rotate-6">
                <Zap size={22} className="text-slate-950 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                CHAL<span className="text-emerald-400">DEV</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-8">
              Engineering the next generation of digital infrastructure. 
              Built for speed, scaled for global performance.
            </p>

            {/* Newsletter Input */}
            <div className="max-w-md relative group">
              <input 
                type="email" 
                placeholder="engineering@chaldev.com" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all flex items-center justify-center group/btn">
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Dynamic Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="col-span-1">
              <h4 className="font-black mb-8 uppercase text-[11px] tracking-[0.25em] text-slate-500">
                {title}
              </h4>
              <ul className="space-y-4">
                {items.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 group/link">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials & Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <motion.a 
                  whileHover={{ y: -3 }}
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/20 transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <div className="hidden md:block h-6 w-px bg-white/5" />
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <Globe size={14} className="text-emerald-500/50" />
              <span>Edge Network Optimized</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center">
             <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
               © 2025 Chaldev. All rights reserved.
             </p>
             <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}