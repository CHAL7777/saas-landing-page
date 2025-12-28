"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Target, 
  Flame, 
  CalendarCheck,
  Edit2,
  X,
  TrendingUp,
  Save
} from "lucide-react";
import { useStats } from "@/hooks/useStats";

export default function StatsEditor() {
  const { 
    stats, 
    updateStats, 
    incrementStudyStreak, 
    resetStudyStreak, 
    setGPA, 
    setNextGoal,
    getCompletionPercentage 
  } = useStats();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentGPA: stats.currentGPA,
    studyStreak: stats.studyStreak.toString(),
    nextGoal: stats.nextGoal,
    goalStatus: stats.goalStatus,
  });

  const completionPercentage = getCompletionPercentage();

  const handleSave = () => {
    updateStats({
      currentGPA: formData.currentGPA,
      studyStreak: parseInt(formData.studyStreak) || 0,
      nextGoal: formData.nextGoal,
      goalStatus: formData.goalStatus,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      currentGPA: stats.currentGPA,
      studyStreak: stats.studyStreak.toString(),
      nextGoal: stats.nextGoal,
      goalStatus: stats.goalStatus,
    });
    setIsEditing(false);
  };

  const handleIncrementStreak = () => {
    incrementStudyStreak();
    setFormData(prev => ({
      ...prev,
      studyStreak: (stats.studyStreak + 1).toString(),
    }));
  };

  const handleResetStreak = () => {
    resetStudyStreak();
    setFormData(prev => ({
      ...prev,
      studyStreak: "0",
    }));
  };

  const statsData = [
    {
      label: "Current GPA",
      value: stats.currentGPA,
      trend: "Academic Performance",
      icon: GraduationCap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Study Streak",
      value: `${stats.studyStreak} Days`,
      trend: "Keep it up!",
      icon: Flame,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      actions: (
        <div className="flex gap-1 mt-2">
          <button
            onClick={handleIncrementStreak}
            className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs hover:bg-orange-500/30 transition-colors"
          >
            +1 Day
          </button>
          <button
            onClick={handleResetStreak}
            className="px-2 py-1 bg-slate-600/20 text-slate-400 rounded text-xs hover:bg-slate-600/30 transition-colors"
          >
            Reset
          </button>
        </div>
      ),
    },
    {
      label: "Tasks Done",
      value: `${stats.tasksCompleted}/${stats.totalTasks}`,
      trend: `${completionPercentage}%`,
      icon: CalendarCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Next Goal",
      value: stats.nextGoal,
      trend: stats.goalStatus,
      icon: Target,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Progress</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
        >
          <Edit2 size={18} />
          {isEditing ? "Cancel Edit" : "Edit Stats"}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
          >
            {/* Decorative Glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 blur-[50px] opacity-20 rounded-full ${stat.bg}`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>
                  {stat.trend}
                </span>
              </div>

              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-white italic mb-2">
                  {stat.value}
                </h3>
                {stat.actions && stat.actions}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Form */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-emerald-400" size={20} />
              Edit Your Stats
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Current GPA
                </label>
                <input
                  type="text"
                  value={formData.currentGPA}
                  onChange={(e) => setFormData({ ...formData, currentGPA: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="e.g., 3.84"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Study Streak (Days)
                </label>
                <input
                  type="number"
                  value={formData.studyStreak}
                  onChange={(e) => setFormData({ ...formData, studyStreak: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Next Goal
                </label>
                <input
                  type="text"
                  value={formData.nextGoal}
                  onChange={(e) => setFormData({ ...formData, nextGoal: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="e.g., Dean's List"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Goal Status
                </label>
                <input
                  type="text"
                  value={formData.goalStatus}
                  onChange={(e) => setFormData({ ...formData, goalStatus: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="e.g., On Track"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-medium hover:bg-emerald-400 transition-colors"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Visualization */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Progress Overview</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Task Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>GPA Progress</span>
              <span>{stats.currentGPA}/4.0</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(parseFloat(stats.currentGPA) / 4.0) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
