
"use client";

import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function SignUpPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Join <span className="text-emerald-400">StudyMaster</span>
          </h1>
          <p className="text-slate-400">Create your account to start your academic journey</p>
        </div>
        
        <div className="bg-[#0f172a] border border-emerald-500/20 rounded-2xl p-8">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-0 p-0",
                headerTitle: "text-white text-xl font-bold",
                headerSubtitle: "text-slate-400",
                socialButtonsBlockButton: "bg-slate-900/50 border border-white/10 text-white hover:bg-white/5",
                socialButtonsBlockButtonText: "text-white",
                formButtonPrimary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
                formFieldInput: "bg-slate-900/50 border border-white/10 text-white focus:border-emerald-500/50",
                formFieldLabel: "text-slate-300",
                footerActionLink: "text-emerald-400 hover:text-emerald-300"
              }
            }}
            routing="path"
            path="/sign-up"
            redirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <Link className="text-emerald-400 hover:text-emerald-300 font-medium" href="/sign-in">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
