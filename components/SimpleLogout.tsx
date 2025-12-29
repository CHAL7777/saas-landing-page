"use client";
import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface SimpleLogoutProps {
  className?: string;
}

export default function SimpleLogout({ className = "" }: SimpleLogoutProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Use Clerk's signOut function
      await fetch('/api/auth/signout', {
        method: 'POST',
      });
      
      // Redirect to sign in page
      router.push('/sign-in');
      router.refresh();
      
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback to manual redirect
      window.location.href = '/sign-in';
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all text-white disabled:opacity-50 ${className}`}
    >
      <LogOut size={16} />
      {isLoggingOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
