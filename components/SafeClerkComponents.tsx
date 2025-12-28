'use client';

import React from 'react';

// Safe wrapper for Clerk components that gracefully handles missing Clerk
interface SafeClerkComponentsProps {
  children: React.ReactNode;
}

export function SafeSignInButton({ children, mode = 'modal' }: { children: React.ReactNode; mode?: 'modal' | 'redirect' }) {
  try {
    // @ts-ignore - Dynamic import for Clerk
    const { SignInButton: ActualSignInButton } = require('@clerk/nextjs');
    return (
      <ActualSignInButton mode={mode}>
        {children}
      </ActualSignInButton>
    );
  } catch (error) {
    console.warn('[SafeClerkComponents] SignInButton not available, falling back');
    return <>{children}</>;
  }
}

export function SafeSignedIn({ children }: SafeClerkComponentsProps) {
  try {
    // @ts-ignore - Dynamic import for Clerk
    const { SignedIn: ActualSignedIn } = require('@clerk/nextjs');
    return <ActualSignedIn>{children}</ActualSignedIn>;
  } catch (error) {
    console.warn('[SafeClerkComponents] SignedIn not available');
    return null;
  }
}

export function SafeSignedOut({ children }: SafeClerkComponentsProps) {
  try {
    // @ts-ignore - Dynamic import for Clerk
    const { SignedOut: ActualSignedOut } = require('@clerk/nextjs');
    return <ActualSignedOut>{children}</ActualSignedOut>;
  } catch (error) {
    console.warn('[SafeClerkComponents] SignedOut not available, showing content anyway');
    return <>{children}</>;
  }
}

export function SafeUserButton({ afterSignOutUrl = '/' }: { afterSignOutUrl?: string }) {
  try {
    // @ts-ignore - Dynamic import for Clerk
    const { UserButton: ActualUserButton } = require('@clerk/nextjs');
    return <ActualUserButton afterSignOutUrl={afterSignOutUrl} />;
  } catch (error) {
    console.warn('[SafeClerkComponents] UserButton not available');
    return null;
  }
}

// Check if Clerk is available and configured
export function isClerkAvailable(): boolean {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;
    
    // Check if keys are valid (not placeholder values)
    return Boolean(publishableKey && 
           secretKey && 
           publishableKey !== 'pk_test_your_publishable_key_here' && 
           secretKey !== 'sk_test_your_secret_key_here' &&
           publishableKey.trim() !== '' &&
           secretKey.trim() !== '');
  } catch (error) {
    return false;
  }
}

