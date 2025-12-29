'use client';

import React, { createContext, useContext } from 'react';
import { useUser } from '@clerk/nextjs';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoaded, isSignedIn } = useUser();

  // Convert Clerk user to our User interface
  const authUser: User | null = user ? {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.username || user.emailAddresses[0]?.emailAddress || 'User'
  } : null;

  const logout = () => {
    // Use Clerk's built-in sign out functionality
    // This will be handled by Clerk components that support signOut
    window.location.href = '/sign-in';
  };

  const value = {
    user: authUser,
    isAuthenticated: Boolean(isSignedIn),
    isLoading: !isLoaded,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
