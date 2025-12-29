
"use client";
import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useAuth } from '@/contexts/AuthContext';

interface LogoutSystemProps {
  afterSignOutUrl?: string;
}

export default function LogoutSystem({ afterSignOutUrl = '/sign-in' }: LogoutSystemProps) {
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, don't render anything
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="relative">
      <UserButton 
        afterSignOutUrl={afterSignOutUrl}
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
            userButtonPopover: "bg-slate-900 border border-white/10 rounded-xl shadow-xl",
            userButtonPopoverCard: "bg-transparent",
          },
        }}
      />
    </div>
  );
}

// Simple logout hook that clears local storage and redirects
export function useLogout() {
  const logout = (redirectUrl = '/sign-in') => {
    // Clear any local storage items that shouldn't persist after logout
    localStorage.removeItem('dashboard-tasks');
    localStorage.removeItem('dashboard-settings');
    localStorage.removeItem('dashboard-courses');
    localStorage.removeItem('dashboard-stats');
    localStorage.removeItem('dashboard-events');
    localStorage.removeItem('dashboard-profile');
    localStorage.removeItem('dashboard-study-plans');
    localStorage.removeItem('dashboard-semester');
    localStorage.removeItem('dashboard-reminders');
    
    // Clear session storage
    sessionStorage.clear();
    
    // Redirect to sign in
    window.location.href = redirectUrl;
  };

  return { logout };
}
