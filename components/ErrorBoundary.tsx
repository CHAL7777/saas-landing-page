"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ComponentType<ErrorFallbackProps> }>,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-white/10 text-center"
      >
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        
        <p className="text-slate-400 mb-6">
          We encountered an unexpected error. Don't worry, your data is safe.
        </p>
        
        {process.env.NODE_ENV === "development" && error && (
          <div className="mb-6 p-4 bg-slate-800 rounded-xl text-left">
            <p className="text-red-400 text-sm font-mono">{error.message}</p>
            {error.stack && (
              <pre className="text-slate-500 text-xs mt-2 overflow-auto">
                {error.stack}
              </pre>
            )}
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={resetError}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = "/"}
            className="px-4 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors"
          >
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function DashboardErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <h3 className="text-red-400 font-bold">Dashboard Error</h3>
      </div>
      
      <p className="text-slate-400 mb-4">
        There was an error loading the dashboard. This might be a temporary issue.
      </p>
      
      {process.env.NODE_ENV === "development" && error && (
        <div className="mb-4 p-3 bg-slate-800 rounded-lg">
          <p className="text-red-400 text-sm">{error.message}</p>
        </div>
      )}
      
      <div className="flex gap-3">
        <button
          onClick={resetError}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
        
        <button
          onClick={() => window.location.href = "/"}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export function TaskManagerErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="space-y-4">
      <div className="text-center p-8">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-white font-bold mb-2">Tasks Error</h3>
        <p className="text-slate-400 mb-4">Unable to load your tasks right now.</p>
        
        <button
          onClick={resetError}
          className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
        >
          Load Tasks
        </button>
      </div>
    </div>
  );
}
