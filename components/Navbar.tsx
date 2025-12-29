"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, LayoutDashboard } from "lucide-react";
import { FallbackSignedIn } from "./AuthFallback";
import Link from "next/link";
import SimpleLogout from "./SimpleLogout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transition from transparent to obsidian glass
  const backgroundColor = useTransform(
    scrollY, 
    [0, 50], 
    ["rgba(2, 6, 23, 0)", "rgba(2, 6, 23, 0.9)"]
  );
  const borderBottom = useTransform(
    scrollY, 
    [0, 50], 
    ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(16, 185, 129, 0.1)"]
  );

  // Simplified navigation for authenticated users only
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottom }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-300"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
            <GraduationCap size={22} className="text-slate-950" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            StudyMaster<span className="text-emerald-400 not-italic">.</span>
          </span>
        </Link>
        
        {/* Desktop Navigation - Authenticated Users Only */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-emerald-400 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          {/* Authentication Required - No Public Access */}
          <div className="flex items-center gap-4">
            <FallbackSignedIn>
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/10 transition-all">
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <SimpleLogout />
            </FallbackSignedIn>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617] border-b border-emerald-500/20 overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-2xl font-black text-white uppercase tracking-tighter">
                  {link.name}
                </Link>
              ))}
              <FallbackSignedIn>
                <div className="space-y-4">
                  <Link href="/dashboard" className="block w-full bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-center">
                    Go to Dashboard
                  </Link>
                  <SimpleLogout />
                </div>
              </FallbackSignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

