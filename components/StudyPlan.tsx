"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, CalendarDays, Flame, ChevronRight, Target } from "lucide-react";

const planSteps = [
  { day: "Today", task: "Review Syllabus & Chapter 1 notes", type: "Review", duration: "20 min" },
  { day: "Tomorrow", task: "Flashcards: Core Concepts", type: "Active Recall", duration: "30 min" },
  { day: "Wednesday", task: "Practice Quiz: Modules 1-2", type: "Quiz", duration: "45 min" },
  { day: "Thursday", task: "Deep Dive: Problem Areas", type: "Focus", duration: "60 min" },
];

export default function StudyPlan() {
  return (
    <div className="w-full max-w-3xl mx-auto p-1 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-[2.5rem]">
      <div className="bg-slate-950 p-8 md:p-10 rounded-[2.4rem] border border-white/5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white italic">Plan of Attack</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Target: Midterm Exam (Oct 24)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Flame size={14} className="text-orange-500" /> 4 Day Streak
            </div>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4">
          {planSteps.map((step, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="group relative flex items-center gap-6 p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all cursor-pointer"
            >
              <div className="text-center min-w-[60px]">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-tighter">Day</span>
                <span className="text-lg font-black text-white italic">{i + 1}</span>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md ${
                    step.type === "Quiz" ? "bg-purple-500/20 text-purple-400" : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {step.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold italic">{step.duration}</span>
                </div>
                <p className="text-sm font-bold text-slate-200">{step.task}</p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} className="text-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <button className="mt-10 w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl flex items-center justify-center gap-2">
          <Brain size={18} /> Start Session #1
        </button>
      </div>
    </div>
  );
}