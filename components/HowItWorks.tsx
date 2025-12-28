"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { Import, CalendarCheck, Sparkles, CheckCircle2, BookOpen, GraduationCap } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Import your Syllabus",
    description: "Upload your course documents or sync with Canvas and Google Classroom. We'll automatically extract every deadline.",
    icon: <Import className="text-emerald-400" size={24} />,
    visual: <VisualOne />
  },
  {
    number: "02",
    title: "Generate Study Plans",
    description: "Our AI analyzes exam dates and your personal habits to create a balanced weekly study schedule that prevents burnout.",
    icon: <CalendarCheck className="text-emerald-400" size={24} />,
    visual: <VisualTwo />
  },
  {
    number: "03",
    title: "Learn with AI Help",
    description: "Stuck on a concept? Use the built-in AI assistant to summarize readings and generate practice quizzes instantly.",
    icon: <Sparkles className="text-emerald-400" size={24} />,
    visual: <VisualThree />
  }
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} id="how-it-works" className="py-32 bg-[#020617] relative">
      {/* Scroll-linked Progress Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-emerald-500 via-teal-400 to-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-4"
          >
            Your Academic Engine
          </motion.h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Master your semester <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">on autopilot.</span>
          </h3>
        </div>

        <div className="space-y-48">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 lg:gap-32`}
            >
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                    Step {step.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">{step.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {['Canvas/LMS Sync', 'Smart Prioritization', 'AI Summaries'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced Visual Card */}
              <div className="flex-1 w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-slate-900/40 rounded-[2rem] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                  {step.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Student-Focused Visuals ---

function VisualOne() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#030712] p-8">
      <div className="w-full max-w-[200px] space-y-3">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="h-10 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 gap-3"
          >
            <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40" />
            <div className="h-2 w-24 bg-slate-700 rounded-full" />
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-emerald-400 text-[10px] font-mono animate-pulse uppercase tracking-widest">
        Syncing_Syllabus_Data...
      </div>
    </div>
  );
}

function VisualTwo() {
  return (
    <div className="w-full h-full p-6 bg-[#030712] flex flex-col">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-20 bg-emerald-500/20 rounded-full border border-emerald-500/30" />
        <div className="h-4 w-12 bg-white/5 rounded-full" />
      </div>
      <div className="grid grid-cols-7 gap-2 flex-grow">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-md border border-white/5 ${i === 8 ? 'bg-emerald-500/40 border-emerald-400' : 'bg-white/5'}`}
          />
        ))}
      </div>
    </div>
  );
}

function VisualThree() {
  return (
    <div className="w-full h-full bg-[#030712] p-6 flex flex-col gap-4">
      <div className="self-start bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-3 max-w-[80%]">
        <p className="text-[10px] text-slate-400">Explain Quantum Entanglement like I'm 5.</p>
      </div>
      <div className="self-end bg-emerald-500/10 border border-emerald-500/30 rounded-2xl rounded-br-none p-3 max-w-[80%]">
        <p className="text-[10px] text-emerald-400">Imagine you have two magic coins. When you flip one, the other always shows the same result, no matter how far away it is...</p>
      </div>
    </div>
  );
}