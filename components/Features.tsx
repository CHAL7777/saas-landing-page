"use client";
import { CheckSquare, Calendar, Brain, Users } from "lucide-react";

const studentFeatures = [
  {
    title: "Task & Project Hub",
    desc: "Sync your syllabi and never miss an assignment deadline again with automated reminders.",
    icon: <CheckSquare className="text-emerald-400" />,
    className: "md:col-span-2",
  },
  {
    title: "AI Study Buddy",
    desc: "Upload lecture notes and get instant summaries or practice exam questions.",
    icon: <Brain className="text-emerald-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Smart Planner",
    desc: "AI-generated schedules that adapt to your study habits and upcoming exam dates.",
    icon: <Calendar className="text-emerald-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Peer Collaboration",
    desc: "Shared workspaces for group projects with real-time task tracking and chat.",
    icon: <Users className="text-emerald-400" />,
    className: "md:col-span-2",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#020617]">
      <div className="container mx-auto px-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-4 text-center">Toolkit</h2>
        <h3 className="text-4xl font-black text-white text-center mb-16">Everything you need to <span className="text-emerald-400">Ace</span> your classes.</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentFeatures.map((f, i) => (
            <div key={i} className={`p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 transition-all ${f.className}`}>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">{f.icon}</div>
              <h4 className="text-xl font-bold text-white mb-3">{f.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}