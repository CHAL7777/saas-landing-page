'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

export default function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}

