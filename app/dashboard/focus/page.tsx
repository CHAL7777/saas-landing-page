"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  X,
  Music,
  Target,
  BookOpen,
  Coffee,
  Brain,
  Volume2,
  VolumeX
} from "lucide-react";
import Link from "next/link";
import Timer from "@/components/Timer";
import { useAuth } from "@/contexts/AuthContext";
import { Task } from "@/types/dashboard";
import { useTasks } from "@/hooks/useTasks";

export default function FocusMode() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTasks, setShowTasks] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Use the task management system instead of hardcoded tasks
  const { tasks, toggleTaskCompletion } = useTasks();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  // Get incomplete tasks for focus selection, sorted by priority
  const focusTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleTimerComplete = (sessionType: 'work' | 'break') => {
    console.log(`${sessionType} session completed!`);
    
    // Auto-complete the task if it's a work session
    if (sessionType === 'work' && selectedTask) {
      toggleTaskCompletion(selectedTask.id);
      setSelectedTask(null);
    }
  };

  const handleTimerTick = (seconds: number, sessionType: 'work' | 'break') => {
    // Update real-time stats or achievements here
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className={`absolute inset-0 transition-colors duration-1000 bg-emerald-500/5`} />
      
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

      {/* Task Selection */}
      <AnimatePresence>
        {!selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md">
              <h3 className="text-white font-bold text-center mb-4">Choose Your Focus Task</h3>
              <div className="space-y-3">
                {focusTasks.length > 0 ? (
                  focusTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Target size={16} className={`${
                          task.priority === 'high' ? 'text-red-400' : 
                          task.priority === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                        }`} />
                        <div>
                          <div className="text-white font-medium">{task.title}</div>
                          <div className="text-xs text-slate-400">{task.course}</div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target size={32} className="text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm mb-2">No tasks available</p>
                    <p className="text-slate-500 text-xs">Add some tasks to your dashboard to start focusing!</p>
                  </div>
                )}
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-all border border-dashed border-slate-600"
                >
                  <div className="flex items-center gap-3 text-slate-400">
                    <BookOpen size={16} />
                    <span>Go to Dashboard</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Timer Display */}
      <div className="relative z-10 flex flex-col items-center">
        {selectedTask ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 text-center"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 max-w-sm">
              <div className="flex items-center gap-3 mb-2">
                <Target size={16} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider">Focusing On</span>
              </div>
              <h3 className="text-white font-bold text-lg">{selectedTask.title}</h3>
              <p className="text-slate-400 text-sm">{selectedTask.course}</p>
              <button
                onClick={() => setSelectedTask(null)}
                className="mt-3 text-xs text-slate-500 hover:text-white transition-colors"
              >
                Change Task
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="mb-16 text-center">
            <h2 className="text-white font-black text-2xl italic mb-2">Ready to Focus?</h2>
            <p className="text-slate-400">Select a task to begin your focus session</p>
          </div>
        )}

        {/* Timer Component */}
        <Timer
          onComplete={handleTimerComplete}
          onTick={handleTimerTick}
          className="mb-8"
        />
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
