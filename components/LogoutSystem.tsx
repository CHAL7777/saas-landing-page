
"use client";
import React, { useState } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';

interface LogoutSystemProps {
  afterSignOutUrl?: string;
}

export default function LogoutSystem({ afterSignOutUrl = '/' }: LogoutSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Clear any stored user data
      localStorage.removeItem('clerk-session');
      localStorage.removeItem('user-data');
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      
      // Small delay for user feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to sign-in or specified URL
      window.location.href = '/sign-in';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, redirect to sign-in
      window.location.href = '/sign-in';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white"
      >
        <User size={18} />
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-50">
          <div className="p-2">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-50"
            >
              <LogOut size={16} />
              {isLoggingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
      
      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Hook for manual logout
export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async (redirectUrl = '/sign-in') => {
    setIsLoggingOut(true);
    
    try {
      // Clear all stored data
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = redirectUrl;
    }
  };

  return { logout, isLoggingOut };
}
