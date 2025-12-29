
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PWAInstall from "@/components/PWAInstall";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Marketing Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#020617]/90 border-b border-emerald-500/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
              <GraduationCap size={22} className="text-slate-950" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              StudyMaster<span className="text-emerald-400 not-italic">.</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="px-6 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all">
                Sign In
              </Link>
              <Link href="/sign-up" className="px-6 py-2 border border-white/10 text-white rounded-xl font-bold hover:bg-white/5 transition-all">
                Join Free
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#020617] border-t border-emerald-500/10">
            <div className="px-6 py-4 space-y-4">
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Link href="/sign-in" className="block w-full bg-emerald-500 text-slate-950 py-3 rounded-xl font-bold text-center hover:bg-emerald-400 transition-all">
                  Sign In
                </Link>
                <Link href="/sign-up" className="block w-full border border-white/10 text-white py-3 rounded-xl font-bold text-center hover:bg-white/5 transition-all">
                  Join Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Full Marketing Landing Page */}
      <div className="overflow-hidden">
        
        {/* Hero Section - Always visible for marketing */}
        <Hero />
        
        {/* Features Section - Always visible for marketing */}
        <Features />
        
        {/* Testimonials Section - Always visible for marketing */}
        <Testimonials />
        
        {/* Call to Action - Always visible for marketing */}
        <CTA />
        

        
        {/* Marketing Footer */}
        <Footer />
      </div>

      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
  );
}
