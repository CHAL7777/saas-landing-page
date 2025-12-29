"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, CheckCircle2, AlertCircle, ChevronRight, TrendingUp } from "lucide-react";
import { DashboardPreviewProps, DashboardPreviewCourse, Task } from "@/types/dashboard";
import { useStats } from "@/hooks/useStats";
import { useTasks } from "@/hooks/useTasks";
import { useSettings } from "@/hooks/useSettings";

// Default course data
const DEFAULT_COURSES: DashboardPreviewCourse[] = [
  {
    name: "Organic Chemistry II",
    code: "CHEM-202",
    progress: 65,
    nextDeadline: "Exam: Friday",
    status: "warning",
    color: "from-emerald-500 to-teal-400"
  },
  {
    name: "Applied Macroeconomics",
    code: "ECON-310",
    progress: 88,
    nextDeadline: "Problem Set #4",
    status: "good",
    color: "from-blue-500 to-indigo-400"
  },
  {
    name: "Modern Art History",
    code: "ARH-105",
    progress: 42,
    nextDeadline: "Essay: 2 Days",
    status: "urgent",
    color: "from-rose-500 to-orange-400"
  }
];

// Helper function to calculate course progress from tasks
function calculateCourseProgress(tasks: Task[], courseName: string): number {
  const courseTasks = tasks.filter(task => task.course === courseName);
  if (courseTasks.length === 0) return 0;
  
  const completedTasks = courseTasks.filter(task => task.completed);
  return Math.round((completedTasks.length / courseTasks.length) * 100);
}

// Helper function to get next deadline from tasks
function getNextDeadline(tasks: Task[], courseName: string): string {
  const courseTasks = tasks.filter(task => task.course === courseName && !task.completed);
  if (courseTasks.length === 0) return "All caught up!";
  
  // Sort by due date priority (simple implementation)
  const urgentTasks = courseTasks.filter(task => task.priority === 'high');
  if (urgentTasks.length > 0) return "High Priority Task";
  
  return courseTasks[0]?.due || "Upcoming Task";
}

// Helper function to determine course status
function getCourseStatus(progress: number): 'good' | 'warning' | 'urgent' {
  if (progress >= 80) return 'good';
  if (progress >= 50) return 'warning';
  return 'urgent';
}

export default function DashboardPreview(props: DashboardPreviewProps = {}) {
  const { courses: customCourses, semester, gpa: customGPA, streak: customStreak, timeline, theme, useRealData = false } = props;
  
  // Use real data hooks if useRealData is true
  const { stats } = useStats();
  const { tasks } = useTasks();
  const { settings } = useSettings();
  
  // Determine data source
  const courses = customCourses || (useRealData ? generateCoursesFromTasks(tasks) : DEFAULT_COURSES);
  const gpa = customGPA || (useRealData ? stats.currentGPA : "3.82");
  const streak = customStreak !== undefined ? customStreak : (useRealData ? stats.studyStreak : 12);
  
  // Use custom semester or show setup prompt
  const semesterInfo = semester;
  
  // Use custom timeline or generate current week
  const timelineInfo = timeline || generateCurrentWeekTimeline();

  // Get timeline title from settings if using real data, otherwise use default
  const timelineTitle = useRealData ? settings.timelineTitle : "Weekly Sprint";

  // Generate current week timeline
  function generateCurrentWeekTimeline() {
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
  }

  // Generate courses from real task data
  function generateCoursesFromTasks(tasks: Task[]): DashboardPreviewCourse[] {
    const uniqueCourses = [...new Set(tasks.map(task => task.course))];
    
    return uniqueCourses.map(courseName => {
      const progress = calculateCourseProgress(tasks, courseName);
      const nextDeadline = getNextDeadline(tasks, courseName);
      const status = getCourseStatus(progress);
      
      // Assign colors based on status
      const colorMap = {
        good: "from-blue-500 to-indigo-400",
        warning: "from-emerald-500 to-teal-400",
        urgent: "from-rose-500 to-orange-400"
      };
      
      return {
        name: courseName,
        code: courseName.split(' ').map((word: string) => word.substring(0, 3).toUpperCase()).join('-'),
        progress,
        nextDeadline,
        status,
        color: colorMap[status]
      };
    }).slice(0, 3); // Limit to 3 courses for preview
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 bg-slate-950 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Subtle Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight italic">Semester Overview<span className="text-emerald-500">.</span></h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
              {semesterInfo?.term && semesterInfo?.year 
                ? `${semesterInfo.term} ${semesterInfo.year} • ${semesterInfo.credits || 0} Credits`
                : "Configure your semester in settings"
              }
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
            <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
               <span className="text-emerald-400 text-xs font-black tracking-tighter">Current GPA: {gpa}</span>
            </div>
            {streak > 0 && (
              <div className="px-4 py-2 bg-orange-500/10 rounded-xl border border-orange-500/20 flex items-center gap-2">
                <TrendingUp size={14} className="text-orange-400" />
                <span className="text-orange-400 text-xs font-black tracking-tighter">{streak} day streak</span>
              </div>
            )}
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${course.color} text-slate-950 shadow-lg`}>
                   <BookOpen size={20} />
                </div>
                {course.status === "urgent" && (
                  <div className="animate-pulse flex items-center gap-1 text-rose-400 text-[10px] font-black uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                    <AlertCircle size={10} /> Urgent
                  </div>
                )}
              </div>

              <h3 className="text-white font-black text-lg leading-tight mb-1">{course.name}</h3>
              <p className="text-slate-500 text-xs font-bold mb-6 tracking-widest uppercase">{course.code}</p>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Course Progress</span>
                  <span className="text-white">{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{course.nextDeadline}</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Preview */}
        <div className="mt-12 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> {timelineTitle}
                </h4>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{timelineInfo.startDate} - {timelineInfo.endDate}</span>
            </div>
            <div className="flex gap-4">
                {timelineInfo.days?.map((day: number) => (
                    <div key={day} className={`flex-1 flex flex-col items-center py-4 rounded-2xl border transition-colors ${day === 14 ? 'bg-emerald-500/10 border-emerald-500/30' : 'border-transparent text-slate-600'}`}>
                        <span className="text-[10px] font-black mb-1">MAR</span>
                        <span className={`text-lg font-black ${day === 14 ? 'text-emerald-400' : 'text-slate-400'}`}>{day}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
