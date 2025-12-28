"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Target, 
  Flame, 
  CalendarCheck 
} from "lucide-react";

const stats = [
  {
    label: "Current GPA",
    value: "3.84",
    trend: "+0.12",
    icon: GraduationCap,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Study Streak",
    value: "12 Days",
    trend: "Top 5%",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Tasks Done",
    value: "24/30",
    trend: "80%",
    icon: CalendarCheck,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Next Goal",
    value: "Dean's List",
    trend: "On Track",
    icon: Target,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 blur-[50px] opacity-20 rounded-full ${stat.bg}`} />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>
                {stat.trend}
              </span>
            </div>

            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-white italic">
                {stat.value}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}