"use client";
import { Quote, CheckCircle2, Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  stars: number;
}

const studentTestimonials: Testimonial[] = [
  {
    quote: "I used to spend 5 hours a week just manually entering deadlines. Scholarly did it in seconds by scanning my syllabus. My GPA has never been higher.",
    author: "Sarah Chen",
    role: "Pre-Med at Stanford",
    initials: "SC",
    stars: 5
  },
  {
    quote: "The AI study guide feature is terrifyingly good. It turned a 200-page textbook into a 10-page master summary that actually made sense.",
    author: "Karl .E",
    role: "Law Student, Oxford",
    initials: "KE",
    stars: 5
  },
  {
    quote: "Finally, a planner that doesn't feel like a chore. The Obsidian theme keeps me focused during late-night study sessions without eye strain.",
    author: "Gudina W.",
    role: "CS Major at MIT",
    initials: "GW",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-6"
          >
            <Star size={12} className="fill-current" /> Peer Reviews
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Trusted by the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dean's List.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Join 50,000+ students from 1,200+ universities worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {studentTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
        
        {/* Academic Proof Footer */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale brightness-200">
             <span className="text-white font-black text-xs tracking-[0.3em] uppercase">Canvas Verified</span>
             <span className="text-white font-black text-xs tracking-[0.3em] uppercase">Blackboard Sync</span>
             <span className="text-white font-black text-xs tracking-[0.3em] uppercase">Google Classroom</span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] transition-colors duration-500 hover:border-emerald-500/40 backdrop-blur-md"
    >
      <div className="absolute top-6 right-8 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors pointer-events-none">
        <Quote size={80} fill="currentColor" />
      </div>

      <div className="flex gap-1 mb-6">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} size={14} className="fill-emerald-400 text-emerald-400" />
        ))}
      </div>

      <p className="text-slate-300 text-lg leading-relaxed mb-10 relative z-10 italic">
        "{t.quote}"
      </p>

      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-lg group-hover:shadow-emerald-500/20 transition-all">
            {t.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-white text-sm tracking-tight">{t.author}</h4>
                <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
            <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest">
              {t.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}