"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Brain, 
  Volume2, 
  VolumeX, 
  X,
  Music
} from "lucide-react";
import Link from "next/link";

export default function FocusMode() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setIsBreak(!isBreak);
      setSeconds(isBreak ? 25 * 60 : 5 * 60);
      // Play a subtle notification sound here
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? (seconds / (5 * 60)) * 100 
    : (seconds / (25 * 60)) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isBreak ? 'bg-blue-500/5' : 'bg-emerald-500/5'}`} />
      
      {/* Header */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
            <Brain className={isBreak ? "text-blue-400" : "text-emerald-400"} />
          </div>
          <div>
            <h2 className="text-white font-black italic uppercase tracking-tighter">Deep Focus</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Organic Chemistry II</p>
          </div>
        </div>
        <Link href="/dashboard" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-all">
          <X size={20} />
        </Link>
      </div>

      {/* Main Timer Display */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="4"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={isBreak ? "#60a5fa" : "#10b981"}
              strokeWidth="4"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: progress }}
              transition={{ duration: 1, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">
            <motion.span 
              key={isBreak ? "break" : "work"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2"
            >
              {isBreak ? "Break Time" : "Focus Interval"}
            </motion.span>
            <h1 className="text-8xl md:text-9xl font-black text-white tabular-nums tracking-tighter italic">
              {formatTime(seconds)}
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-8">
          <button 
            onClick={() => {setSeconds(25 * 60); setIsActive(false);}}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all"
          >
            <RotateCcw size={24} />
          </button>
          
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all ${
              isActive ? 'bg-white/10 text-white' : 'bg-emerald-500 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
            }`}
          >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={() => setIsBreak(!isBreak)}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all"
          >
            <Coffee size={24} />
          </button>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="absolute bottom-10 flex items-center gap-6 z-10 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 text-slate-400">
          <Music size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Lofi Beats</span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}