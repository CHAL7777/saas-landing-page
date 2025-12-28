"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Target, 
  Flame,
  CalendarCheck,
  BookOpen,
  Clock,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { useTasks } from "@/hooks/useTasks";
import { useSemester } from "@/hooks/useSemester";
import { DashboardPreviewCourse } from "@/types/dashboard";
import Timer from "./Timer";
import Link from "next/link";

export default function DashboardOverview() {
  const { stats, getCompletionPercentage } = useStats();
  const { tasks } = useTasks();
  const { semester } = useSemester();
  const completionPercentage = getCompletionPercentage();

  // Generate course data from real tasks
  const courses = React.useMemo((): DashboardPreviewCourse[] => {
    const uniqueCourses = [...new Set(tasks.map(task => task.course))];
    
    return uniqueCourses.map(courseName => {
      const courseTasks = tasks.filter(task => task.course === courseName);
      const completedTasks = courseTasks.filter(task => task.completed);
      const progress = courseTasks.length > 0 ? Math.round((completedTasks.length / courseTasks.length) * 100) : 0;
      
      // Get next deadline from tasks
      const incompleteTasks = courseTasks.filter(task => !task.completed);
      let nextDeadline = "All caught up!";
      
      if (incompleteTasks.length > 0) {
        const urgentTasks = incompleteTasks.filter(task => task.priority === 'high');
        if (urgentTasks.length > 0) {
          nextDeadline = "High Priority Task";
        } else {
          nextDeadline = incompleteTasks[0]?.due || "Upcoming Task";
        }
      }
      
      // Determine status based on progress
      const status = progress >= 80 ? 'good' : progress >= 50 ? 'warning' : 'urgent';
      
      // Assign colors based on status
      const colorMap = {
        good: "from-blue-500 to-indigo-400",
        warning: "from-emerald-500 to-teal-400", 
        urgent: "from-rose-500 to-orange-400"
      };
      
      return {
        name: courseName,
        code: courseName.split(' ').map(word => word.substring(0, 3).toUpperCase()).join('-'),
        progress,
        nextDeadline,
        status,
        color: colorMap[status]
      };
    });
  }, [tasks]);

  // Generate timeline data
  const timelineInfo = React.useMemo(() => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Start of week (Monday)
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day.getDate());
    }
    
    return {
      startDate: `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      endDate: `${new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      days
    };
  }, []);

  const statsData = [
    {
      label: "Current GPA",
      value: semester.gpa || stats.currentGPA,
      trend: "Academic Performance",
      icon: GraduationCap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Study Streak",
      value: `${stats.studyStreak} Days`,
      trend: stats.studyStreak > 0 ? "Keep it up!" : "Start today!",
      icon: Flame,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
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
    <div className="space-y-8">
      {/* Semester Overview Header */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight italic">
              Semester Overview<span className="text-emerald-500">.</span>
            </h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
              {semester.term} {semester.year} • {semester.credits} Credits
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
            <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <span className="text-emerald-400 text-xs font-black tracking-tighter">
                Current GPA: {semester.gpa || stats.currentGPA}
              </span>
            </div>
            {stats.studyStreak > 0 && (
              <div className="px-4 py-2 bg-orange-500/10 rounded-xl border border-orange-500/20 flex items-center gap-2">
                <TrendingUp size={14} className="text-orange-400" />
                <span className="text-orange-400 text-xs font-black tracking-tighter">
                  {stats.studyStreak} day streak
                </span>
              </div>
            )}
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
          </div>
        </div>

        {/* Course Cards Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl backdrop-blur-md relative group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${course.color} text-slate-950 shadow-lg`}>
                    <BookOpen size={16} />
                  </div>
                  {course.status === "urgent" && (
                    <div className="animate-pulse flex items-center gap-1 text-rose-400 text-[10px] font-black uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                      <AlertCircle size={10} /> Urgent
                    </div>
                  )}
                </div>

                <h3 className="text-white font-black text-sm leading-tight mb-1">{course.name}</h3>
                <p className="text-slate-500 text-xs font-bold mb-3 tracking-widest uppercase">{course.code}</p>

                {/* Progress Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{course.nextDeadline}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <BookOpen size={32} className="mx-auto mb-3 opacity-50" />
            <p>No courses yet. Add some tasks to see course progress!</p>
          </div>
        )}

        {/* Timeline Preview */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" /> Weekly Sprint
            </h4>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {timelineInfo.startDate} - {timelineInfo.endDate}
            </span>
          </div>
          <div className="flex gap-2">
            {timelineInfo.days.map((day, index) => (
              <div 
                key={index} 
                className={`flex-1 flex flex-col items-center py-2 rounded-xl border transition-colors ${
                  index === 3 ? 'bg-emerald-500/10 border-emerald-500/30' : 'border-transparent text-slate-600'
                }`}
              >
                <span className="text-[10px] font-black mb-1">MAR</span>
                <span className={`text-sm font-black ${index === 3 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Stats Grid */}
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
                <h3 className="text-2xl font-black text-white italic">
                  {stat.value}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Focus Timer Widget */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-black text-lg italic">
              Quick Focus<span className="text-emerald-500">.</span>
            </h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
              Jump into a focused study session
            </p>
          </div>
          <Link 
            href="/dashboard/focus"
            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-bold transition-colors"
          >
            Full Focus Mode
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Compact Timer */}
          <div className="flex-1 max-w-sm">
            <Timer
              initialWorkTime={25}
              initialBreakTime={5}
              compact={true}
              onComplete={(sessionType) => {
                console.log(`${sessionType} completed!`);
                // Could update stats or show achievements
              }}
              className="w-full"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-white/10 rounded-xl text-left transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Clock size={16} className="text-emerald-400" />
                  </div>
                  <span className="text-white font-bold text-sm">Pomodoro</span>
                </div>
                <p className="text-xs text-slate-400">25min work, 5min break</p>
              </button>

              <button className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-white/10 rounded-xl text-left transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-blue-400" />
                  </div>
                  <span className="text-white font-bold text-sm">Deep Work</span>
                </div>
                <p className="text-xs text-slate-400">50min focused session</p>
              </button>
            </div>

            <div className="bg-slate-800/30 border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-sm">Today's Focus</span>
                <span className="text-emerald-400 text-xs font-black tracking-tighter">2.5 hours</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Flame size={12} />
                <span>Streak: 5 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
