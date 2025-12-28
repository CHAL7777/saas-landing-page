"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageSquare, User, Bot, Zap, BookOpen, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function StudyBuddy() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I've analyzed your Organic Chemistry syllabus. You have a midterm in 12 days worth 25% of your grade. How can I help you prepare?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Response Logic
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on the syllabus, the exam covers Chapters 1-4. Would you like me to generate a 10-day study plan or explain the grading curve for this course?"
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-slate-950/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Header with Context Status */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="text-white font-black text-sm italic">Study Buddy</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-400/80 uppercase tracking-widest">Syllabus Synced</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500">
            <Zap size={18} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border ${
                  msg.role === "user" ? "bg-white/5 border-white/10 text-slate-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}>
                  {msg.role === "user" ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                  ? "bg-emerald-500 text-slate-950 font-medium rounded-tr-none" 
                  : "bg-white/5 text-slate-300 border border-white/5 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Loader2 size={14} className="text-emerald-400 animate-spin" />
               </div>
               <div className="p-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <form onSubmit={handleSendMessage} className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your course..."
            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-600 mt-4 font-bold uppercase tracking-widest">
          Powered by Scholarly AI Engine
        </p>
      </div>
    </div>
  );
}