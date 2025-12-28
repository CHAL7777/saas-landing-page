"use client";
import { motion } from "framer-motion";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-slate-800 rounded w-48 mb-2"></div>
          <div className="h-4 bg-slate-800 rounded w-64"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 bg-slate-800 rounded-xl w-32"></div>
          <div className="h-10 bg-slate-800 rounded-xl w-10"></div>
        </div>
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-slate-800 rounded-xl w-24"></div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5">
            <div className="h-6 bg-slate-800 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-800 rounded"></div>
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-slate-800 rounded w-24"></div>
        <div className="h-8 bg-slate-800 rounded w-16"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-800 rounded"></div>
        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
        <div className="h-2 bg-slate-800 rounded-full"></div>
      </div>
    </div>
  );
}

export function TaskItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-slate-800 rounded"></div>
        <div>
          <div className="h-4 bg-slate-800 rounded w-32 mb-2"></div>
          <div className="h-3 bg-slate-800 rounded w-24"></div>
        </div>
      </div>
      <div className="h-6 bg-slate-800 rounded-full w-16"></div>
    </div>
  );
}

export function SyllabusSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 bg-slate-800 rounded-xl"></div>
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = "md", color = "emerald" }: { size?: "sm" | "md" | "lg", color?: "emerald" | "blue" | "white" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const colorClasses = {
    emerald: "text-emerald-500",
    blue: "text-blue-500",
    white: "text-white"
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${colorClasses[color]}`}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
}
