'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem('studyMasterUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        localStorage.removeItem('studyMasterUser');
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (demo mode)
      const users = JSON.parse(localStorage.getItem('studyMasterUsers') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userSession = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name
        };
        
        setUser(userSession);
        localStorage.setItem('studyMasterUser', JSON.stringify(userSession));
        setIsLoading(false);
        return true;
      }
      
      // For demo purposes, allow any email/password combination
      // In production, this would be replaced with actual API calls
      if (email && password) {
        const userSession = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0]
        };
        
        setUser(userSession);
        localStorage.setItem('studyMasterUser', JSON.stringify(userSession));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('studyMasterUsers') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      };
      
      users.push(newUser);
      localStorage.setItem('studyMasterUsers', JSON.stringify(users));
      
      // Auto-login after signup
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      
      setUser(userSession);
      localStorage.setItem('studyMasterUser', JSON.stringify(userSession));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studyMasterUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
