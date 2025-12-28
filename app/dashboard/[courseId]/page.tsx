"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default async function CourseDetails({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  // In a real app, you'd fetch this data based on the courseId
  const courseData = {
    name: "Organic Chemistry II",
    code: "CHM202",
    instructor: "Dr. Aris Thorne",
    gradeWeight: [
      { label: "Midterm 1", weight: 20 },
      { label: "Midterm 2", weight: 20 },
      { label: "Problem Sets", weight: 30 },
      { label: "Final Exam", weight: 30 },
    ],
    timeline: [
      { id: 1, title: "Stereochemistry Quiz", date: "Oct 12", type: "Quiz", status: "completed" },
      { id: 2, title: "Midterm #1", date: "Oct 24", type: "Exam", status: "upcoming" },
      { id: 3, title: "Lab Report: Distillation", date: "Nov 02", type: "Assignment", status: "upcoming" },
      { id: 4, title: "Final Capstone", date: "Dec 15", type: "Major", status: "upcoming" },
    ]
  };

  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Command Center</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-500/20">Active Course</span>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-tighter">{courseData.code}</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight">
              {courseData.name}
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Edit Syllabus
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Timeline (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-emerald-500" /> Syllabus Timeline
            </h2>
            
            <div className="space-y-4">
              {courseData.timeline.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-[2rem] border flex items-center justify-between group transition-all ${
                    item.status === 'completed' 
                    ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' 
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle2 size={24} /> : <FileText size={24} />}
                    </div>
                    <div>
                      <h3 className="text-white font-bold group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[10px] text-emerald-400/80 font-black uppercase tracking-widest">{item.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-600 hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Grading Insights (Right) */}
          <div className="space-y-8">
            <section className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500" /> Grade Weights
              </h2>
              <div className="space-y-4">
                {courseData.gradeWeight.map((weight, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black text-white uppercase italic">
                      <span>{weight.label}</span>
                      <span className="text-emerald-400">{weight.weight}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-900 rounded-full">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${weight.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] relative overflow-hidden group">
              <AlertCircle className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              <h3 className="text-white font-black italic mb-2">AI Tip</h3>
              <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                This course weights <strong>Problem Sets</strong> heavily (30%). Consistently high scores here can buffer a lower exam grade.
              </p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}