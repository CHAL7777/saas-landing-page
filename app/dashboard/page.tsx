"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Plus,
  Filter,
  Search,
  Bell,
  Settings,
  User
} from "lucide-react";
import DashboardOverview from "@/components/DashboardOverview";
import StudyPlan from "@/components/StudyPlan";
import StudyBuddy from "@/components/StudyBuddy";
import SyllabusUploader from "@/components/SyllabusUploader";

const recentTasks = [
  { id: 1, title: "Complete Math Assignment", course: "Calculus II", due: "2 hours", priority: "high", completed: false },
  { id: 2, title: "Read Chapter 5", course: "Physics", due: "1 day", priority: "medium", completed: true },
  { id: 3, title: "Prepare for Quiz", course: "Chemistry", due: "3 days", priority: "high", completed: false },
  { id: 4, title: "Group Project Meeting", course: "Computer Science", due: "Tomorrow", priority: "low", completed: false },
];

const upcomingEvents = [
  { id: 1, title: "Math Exam", time: "10:00 AM", date: "Tomorrow" },
  { id: 2, title: "Study Group", time: "3:00 PM", date: "Friday" },
  { id: 3, title: "Lab Session", time: "2:00 PM", date: "Monday" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "tasks", label: "Tasks", icon: CheckCircle2 },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "study-plan", label: "Study Plan", icon: BookOpen },
    { id: "buddy", label: "Study Buddy", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white">Dashboard</h1>
              <p className="text-slate-400 text-sm">Welcome back! Ready to crush your goals?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder="Search courses, tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <button className="p-2 bg-slate-900/50 border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 bg-slate-900/50 border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <DashboardOverview />
                
                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Target className="text-emerald-400" size={20} />
                      Today's Focus
                    </h3>
                    <div className="space-y-3">
                      {recentTasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl">
                          <div>
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-slate-500">{task.course}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === "high" ? "bg-red-500/20 text-red-400" :
                            task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Calendar className="text-blue-400" size={20} />
                      Upcoming Events
                    </h3>
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl">
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-slate-500">{event.date} at {event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Tasks</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-medium hover:bg-emerald-400 transition-colors">
                    <Plus size={18} />
                    Add Task
                  </button>
                </div>
                
                <div className="grid gap-4">
                  {recentTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <button className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed 
                            ? "bg-emerald-500 border-emerald-500" 
                            : "border-slate-600 hover:border-emerald-500"
                        }`}>
                          {task.completed && <CheckCircle2 size={14} className="text-slate-950" />}
                        </button>
                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? "line-through text-slate-500" : ""}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-slate-500">{task.course} • {task.due}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === "high" ? "bg-red-500/20 text-red-400" :
                          task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "study-plan" && <StudyPlan />}
            {activeTab === "buddy" && <StudyBuddy />}
            
            {activeTab === "calendar" && (
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                <Calendar className="mx-auto mb-4 text-slate-500" size={48} />
                <h3 className="text-xl font-bold mb-2">Calendar View</h3>
                <p className="text-slate-500">Calendar integration coming soon!</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
