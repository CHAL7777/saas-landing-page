'use client';

import React from 'react';

interface ClerkProviderProps {
  children: React.ReactNode;
}

export default function ClerkProvider({ children }: ClerkProviderProps) {
  // Check if Clerk is properly configured
  const isClerkConfigured = () => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;
    
    // Allow access if keys are valid (not placeholder values)
    return publishableKey && 
           secretKey && 
           publishableKey !== 'pk_test_your_publishable_key_here' && 
           secretKey !== 'sk_test_your_secret_key_here' &&
           publishableKey.trim() !== '' &&
           secretKey.trim() !== '';
  };

  // If Clerk is not configured, render without authentication
  if (!isClerkConfigured()) {
    console.log('[ClerkProvider] Using fallback mode (no authentication)');
    return <>{children}</>;
  }

  // Try to import ClerkProvider dynamically
  try {
    // @ts-ignore - Dynamic import for Clerk
    const { ClerkProvider: ActualClerkProvider } = require('@clerk/nextjs');
    
    return (
      <ActualClerkProvider>
        {children}
      </ActualClerkProvider>
    );
  } catch (error) {
    console.warn('[ClerkProvider] Failed to load Clerk, using fallback mode:', error);
    return <>{children}</>;
  }
}

