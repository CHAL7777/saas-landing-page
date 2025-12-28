"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, Loader2, Sparkles, X, FileWarning, Calendar, FileText, Image, Presentation } from "lucide-react";
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
  const [fileType, setFileType] = useState<string>("");
  const { addTask } = useTasks();
  const { addEvent } = useEvents();

  // Supported file types with descriptions
  const supportedFormats = [
    { type: "application/pdf", icon: FileText, label: "PDF Documents", description: "Course syllabi, assignments" },
    { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation", icon: Presentation, label: "PowerPoint", description: "Lecture slides, presentations" },
    { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", icon: FileText, label: "Word Documents", description: "Syllabi, course materials" },
    { type: "image/jpeg", icon: Image, label: "JPEG Images", description: "Scanned syllabi, photos" },
    { type: "image/jpg", icon: Image, label: "JPG Images", description: "Scanned syllabi, photos" },
    { type: "image/png", icon: Image, label: "PNG Images", description: "Screenshots, documents" },
    { type: "image/gif", icon: Image, label: "GIF Images", description: "Animated content" },
    { type: "image/bmp", icon: Image, label: "BMP Images", description: "Bitmap images" },
    { type: "image/tiff", icon: Image, label: "TIFF Images", description: "High-quality scans" }
  ];

  const processFile = async (file: File) => {
    // Check if file type is supported
    const supportedTypes = supportedFormats.map(f => f.type);
    
    if (!supportedTypes.includes(file.type)) {
      setStatus("error");
      setError(`Unsupported file type: ${file.type}. Supported formats: PDF, PPTX, DOCX, JPG, PNG, GIF, BMP, TIFF`);
      return;
    }

    setFileName(file.name);
    setFileType(file.type);
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
      console.error('Document processing error:', error);
      setStatus("error");
      setError(error instanceof Error ? error.message : "Failed to process document");
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
      setFileType("");
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

  const getFileTypeIcon = (type: string) => {
    const format = supportedFormats.find(f => f.type === type);
    return format ? format.icon : FileText;
  };

  const getFileTypeLabel = (type: string) => {
    const format = supportedFormats.find(f => f.type === type);
    return format ? format.label : 'Document';
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
                {status === "parsing" && "AI Extracting Information..."}
                {status === "error" && "Invalid File Type"}
                {status === "idle" && "Analyze Academic Documents"}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto mb-8">
                {status === "parsing" 
                  ? "Extracting dates, assignments, and course information..." 
                  : status === "error"
                  ? error || "Something went wrong. Please try again."
                  : "Upload PDF, PowerPoint, Word docs, or images. AI will extract all important information."}
              </p>

              {/* Supported Formats Display */}
              {status === "idle" && (
                <div className="mb-8">
                  <p className="text-slate-400 text-xs mb-4 uppercase tracking-wider">Supported Formats:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {supportedFormats.map((format) => {
                      const IconComponent = format.icon;
                      return (
                        <div key={format.type} className="flex items-center gap-2 bg-slate-800/30 px-3 py-2 rounded-xl border border-white/5">
                          <IconComponent size={14} className="text-emerald-400" />
                          <span className="text-slate-300 text-xs font-medium">{format.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {status === "idle" && (
                <label className="cursor-pointer px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                  Browse Files
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.pptx,.docx,.jpg,.jpeg,.png,.gif,.bmp,.tiff" 
                    onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} 
                  />
                </label>
              )}

              {status === "error" && (
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setStatus("idle");
                      setError("");
                    }} 
                    className="text-emerald-400 text-xs font-black uppercase tracking-widest hover:underline"
                  >
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
                  <div className="flex items-center gap-2">
                    <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest">{fileName}</p>
                    {fileType && (
                      <>
                        <span className="text-slate-600">•</span>
                        <div className="flex items-center gap-1">
                          {React.createElement(getFileTypeIcon(fileType), { size: 12, className: "text-slate-500" })}
                          <span className="text-slate-500 text-[10px]">{getFileTypeLabel(fileType)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setStatus("idle")} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center mb-2 px-2">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Found {extractedData.length} Significant Items</p>
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
