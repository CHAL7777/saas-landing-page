
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GraduationCap, Menu, X, User, LogOut, Settings, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PWAInstall from "@/components/PWAInstall";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Authentication
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Navigate to dashboard
  const handleNavigateToDashboard = () => {
    router.push('/dashboard');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [showUserMenu]);

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
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-20 h-10 bg-white/10 rounded-xl animate-pulse"></div>
                <div className="w-20 h-10 bg-white/10 rounded-xl animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleNavigateToDashboard}
                  className="px-6 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all"
                >
                  Dashboard
                </button>
                {/* User Menu */}
                <div className="relative user-menu-container">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <User size={16} className="text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-white/10 mb-2">
                        <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                      </div>
                      <button 
                        onClick={handleNavigateToDashboard}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        <User size={16} />
                        Dashboard
                      </button>
                      <button 
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        <Settings size={16} />
                        Settings
                      </button>
                      <hr className="my-2 border-white/10" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="px-6 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all">
                  Sign In
                </Link>
                <Link href="/sign-up" className="px-6 py-2 border border-white/10 text-white rounded-xl font-bold hover:bg-white/5 transition-all">
                  Join Free
                </Link>
              </div>
            )}
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
              {isLoading ? (
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="w-full h-12 bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="w-full h-12 bg-white/10 rounded-xl animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <User size={20} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user?.name || 'User'}</p>
                        <p className="text-slate-400 text-sm">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Button */}
                  <button 
                    onClick={() => {
                      handleNavigateToDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full bg-emerald-500 text-slate-950 py-3 rounded-xl font-bold text-center hover:bg-emerald-400 transition-all"
                  >
                    Dashboard
                  </button>
                  
                  {/* User Menu Options */}
                  <div className="space-y-1">
                    <button 
                      onClick={() => {
                        handleNavigateToDashboard();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                      <User size={18} />
                      Dashboard
                    </button>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                      <Settings size={18} />
                      Settings
                    </button>
                    <hr className="my-2 border-white/10" />
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <Link href="/sign-in" className="block w-full bg-emerald-500 text-slate-950 py-3 rounded-xl font-bold text-center hover:bg-emerald-400 transition-all">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="block w-full border border-white/10 text-white py-3 rounded-xl font-bold text-center hover:bg-white/5 transition-all">
                    Join Free
                  </Link>
                </div>
              )}
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
