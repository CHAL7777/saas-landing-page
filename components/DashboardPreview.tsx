"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

const courses = [
  {
    name: "Organic Chemistry II",
    code: "CHEM-202",
    progress: 65,
    nextDeadline: "Exam: Friday",
    status: "warning",
    color: "from-emerald-500 to-teal-400"
  },
  {
    name: "Applied Macroeconomics",
    code: "ECON-310",
    progress: 88,
    nextDeadline: "Problem Set #4",
    status: "good",
    color: "from-blue-500 to-indigo-400"
  },
  {
    name: "Modern Art History",
    code: "ARH-105",
    progress: 42,
    nextDeadline: "Essay: 2 Days",
    status: "urgent",
    color: "from-rose-500 to-orange-400"
  }
];

export default function DashboardPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 bg-slate-950 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Subtle Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight italic">Semester Overview<span className="text-emerald-500">.</span></h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Spring 2025 • 16 Credits</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
            <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
               <span className="text-emerald-400 text-xs font-black tracking-tighter">Current GPA: 3.82</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${course.color} text-slate-950 shadow-lg`}>
                   <BookOpen size={20} />
                </div>
                {course.status === "urgent" && (
                  <div className="animate-pulse flex items-center gap-1 text-rose-400 text-[10px] font-black uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                    <AlertCircle size={10} /> Urgent
                  </div>
                )}
              </div>

              <h3 className="text-white font-black text-lg leading-tight mb-1">{course.name}</h3>
              <p className="text-slate-500 text-xs font-bold mb-6 tracking-widest uppercase">{course.code}</p>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Course Progress</span>
                  <span className="text-white">{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{course.nextDeadline}</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Preview (Simplified) */}
        <div className="mt-12 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Weekly Sprint
                </h4>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">March 12 - March 19</span>
            </div>
            <div className="flex gap-4">
                {[12, 13, 14, 15, 16, 17, 18].map((day) => (
                    <div key={day} className={`flex-1 flex flex-col items-center py-4 rounded-2xl border transition-colors ${day === 14 ? 'bg-emerald-500/10 border-emerald-500/30' : 'border-transparent text-slate-600'}`}>
                        <span className="text-[10px] font-black mb-1">MAR</span>
                        <span className={`text-lg font-black ${day === 14 ? 'text-emerald-400' : 'text-slate-400'}`}>{day}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}