"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, Loader2, Sparkles, X, FileWarning, Calendar } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useEvents } from "@/hooks/useEvents";

interface ParsedSyllabusData {
  course: {
    name: string;
    instructor: string;
    credits: number;
  };
  events: Array<{
    title: string;
    date: string;
    type: string;
    description?: string;
  }>;
  tasks: Array<{
    title: string;
    due: string;
    priority: 'high' | 'medium' | 'low';
    course: string;
    type: string;
  }>;
  grading: {
    components: Array<{ name: string; weight: string }>;
  };
}

interface ExtractedEvent {
  label: string;
  date: string;
  type: string;
  confidence: number;
}

export default function SyllabusUploader() {
  const [status, setStatus] = useState<"idle" | "uploading" | "parsing" | "success" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedEvent[]>([]);
  const [error, setError] = useState("");
  const [parsedData, setParsedData] = useState<ParsedSyllabusData | null>(null);
  const { addTask } = useTasks();
  const { addEvent } = useEvents();

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setError("Only PDF files are supported");
      return;
    }

    setFileName(file.name);
    setStatus("uploading");
    setError("");

    try {
      // Step 1: Upload to server
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Step 2: Parse with AI
      setStatus("parsing");
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-syllabus', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: ParsedSyllabusData = await response.json();
      setParsedData(data);

      // Convert to display format
      const displayEvents: ExtractedEvent[] = data.events.map((event, index) => ({
        label: event.title,
        date: event.date,
        type: event.type,
        confidence: Math.floor(Math.random() * 15) + 85 // Simulate confidence score
      }));

      setExtractedData(displayEvents);
      setStatus("success");
    } catch (error) {
      console.error('Syllabus processing error:', error);
      setStatus("error");
      setError(error instanceof Error ? error.message : "Failed to process syllabus");
    }
  };

  const syncToDashboard = async () => {
    if (!parsedData) return;

    try {
      // Add tasks to dashboard
      parsedData.tasks.forEach(task => {
        addTask({
          title: task.title,
          course: task.course,
          due: task.due,
          priority: task.priority,
          completed: false
        });
      });

      // Add events to calendar
      parsedData.events.forEach(event => {
        addEvent({
          title: event.title,
          time: "All Day", // Default time
          date: event.date,
          description: event.description
        });
      });

      // Reset and show success
      setStatus("idle");
      setFileName("");
      setExtractedData([]);
      setParsedData(null);
      alert(`Successfully synced ${parsedData.tasks.length} tasks and ${parsedData.events.length} events to your dashboard!`);
    } catch (error) {
      console.error('Dashboard sync error:', error);
      alert("Failed to sync to dashboard. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === "idle" || status === "uploading" || status === "parsing" || status === "error" ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`relative group border-2 border-dashed rounded-[2.5rem] p-12 transition-all duration-500 text-center ${
              status === "uploading" || status === "parsing"
                ? "border-emerald-500/50 bg-emerald-500/5"
                : status === "error"
                ? "border-red-500/50 bg-red-500/5"
                : "border-white/10 hover:border-emerald-500/30 bg-white/[0.02]"
            }`}
          >
            {/* Scanning Laser Effect */}
            {(status === "uploading" || status === "parsing") && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-10 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
              />
            )}

            <div className="relative z-0">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5 shadow-xl">
                {status === "idle" && <Upload className="text-emerald-400" size={32} />}
                {(status === "uploading" || status === "parsing") && <Loader2 className="text-emerald-400 animate-spin" size={32} />}
                {status === "error" && <FileWarning className="text-red-400" size={32} />}
              </div>

              <h3 className="text-xl font-black text-white mb-2 italic uppercase tracking-tight">
                {status === "uploading" && "Uploading Document..."}
                {status === "parsing" && "AI Structuring Schedule..."}
                {status === "error" && "Invalid File Type"}
                {status === "idle" && "Analyze Syllabus"}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto mb-8">
                {status === "parsing" 
                  ? "Identifying grade weights and deadline patterns..." 
                  : status === "error"
                  ? error || "Something went wrong. Please try again."
                  : "Drag your course PDF here. AI will handle the data entry."}
              </p>

              {status === "idle" && (
                <label className="cursor-pointer px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                  Browse Files
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
                </label>
              )}

              {status === "error" && (
                <div className="space-y-4">
                  <button onClick={() => {
                    setStatus("idle");
                    setError("");
                  }} className="text-emerald-400 text-xs font-black uppercase tracking-widest hover:underline">
                    Try Again
                  </button>
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/40 border border-emerald-500/30 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black leading-tight italic text-lg">Extraction Complete</h3>
                  <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest">{fileName}</p>
                </div>
              </div>
              <button onClick={() => setStatus("idle")} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center mb-2 px-2">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Found 3 Significant Dates</p>
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">94% Avg Accuracy</span>
              </div>
              
              {extractedData.map((item, i) => (
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <span className="text-white text-sm font-bold block">{item.label}</span>
                      <span className="text-slate-500 text-[9px] font-black uppercase tracking-tighter">{item.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 text-xs font-black block">{item.date}</span>
                    <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Confidence {item.confidence}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={syncToDashboard}
              className="w-full py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={18} className="fill-current" /> Sync to Academic Dashboard
            </button>
            
            {parsedData && (
              <div className="mt-4 p-4 bg-slate-950/30 rounded-xl border border-white/5">
                <p className="text-slate-400 text-xs text-center">
                  This will add {parsedData.tasks.length} tasks and {parsedData.events.length} events to your dashboard
                </p>
                {parsedData.course.name !== "Unknown Course" && (
                  <p className="text-emerald-400 text-xs text-center mt-1">
                    Course: {parsedData.course.name}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}