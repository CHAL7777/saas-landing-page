"use client";
import { Quote, CheckCircle2, Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

const testimonials = [
  {
    quote: "This platform saved us over 20 hours a week on project management alone. It's a total game changer for our engineering team.",
    author: "Sarah Chen",
    role: "CTO at TechFlow",
    initials: "SC",
    stars: 5
  },
  {
    quote: "The interface is so intuitive that our whole team was onboarded in less than a day. The Emerald UI is beautiful and fast.",
    author: "Karl .E",
    role: "Director of Ops",
    initials: "KE",
    stars: 5
  },
  {
    quote: "The best ROI we've seen from any SaaS tool this year. The automation features paid for themselves in month one.",
    author: "Gudina W.",
    role: "Founder of Scaleup",
    initials: "ER",
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
            <Star size={12} className="fill-current" /> Trust & Reliability
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Loved by the world's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">best builders.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
        
        {/* Simplified "Verified" footer */}
        <div className="mt-16 flex justify-center items-center gap-8 opacity-30 grayscale contrast-125">
             <span className="text-white font-black text-xl italic tracking-tighter">TRUSTPILOT</span>
             <span className="text-white font-black text-xl italic tracking-tighter">G2 CROWD</span>
             <span className="text-white font-black text-xl italic tracking-tighter">CAPTERRA</span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0], index: number }) {
  // Mouse tracking for subtle card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

      <p className="text-slate-300 text-lg leading-relaxed mb-10 relative z-10 font-medium">
        "{t.quote}"
      </p>

      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm group-hover:scale-110 transition-transform shadow-lg">
            {t.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-white text-sm tracking-tight">{t.author}</h4>
                <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500/10" />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {t.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}