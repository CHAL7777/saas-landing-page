"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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
  Settings as SettingsIcon,
  User,
  Upload,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardOverview from "@/components/DashboardOverview";
import DashboardPreview from "@/components/DashboardPreview";
import StatsEditor from "@/components/StatsEditor";
import TaskManager from "@/components/TaskManager";
import EventManager from "@/components/EventManager";
import StudyPlan from "@/components/StudyPlan";
import StudyBuddy from "@/components/StudyBuddy";
import SyllabusUploader from "@/components/SyllabusUploader";
import SettingsComponent from "@/components/Settings";
import NotificationCenter from "@/components/NotificationCenter";
import PWAInstall from "@/components/PWAInstall";
import { useTasks } from "@/hooks/useTasks";
import { useEvents } from "@/hooks/useEvents";
import { useSettings } from "@/hooks/useSettings";
import { useReminders } from "@/hooks/useReminders";
import { useAutoReminders } from "@/hooks/useAutoReminders";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  
  const { tasks, getIncompleteTasks } = useTasks();
  const { events } = useEvents();
  const { settings } = useSettings();
  const { reminders } = useReminders();
  useAutoReminders(); // Initialize auto-reminders

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
    router.push('/sign-in');
  };

  // Get unread notifications count
  const unreadCount = reminders.filter(r => !r.isRead && !r.isCompleted).length;

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "tasks", label: "Tasks", icon: CheckCircle2 },
    { id: "stats", label: "Stats", icon: Target },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "study-plan", label: "Study Plan", icon: BookOpen },
    { id: "syllabus", label: "Syllabus Uploader", icon: Upload },
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
              <p className="text-slate-400 text-sm">Welcome back{user ? `, ${user.name}` : ''}! Ready to crush your goals?</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-400 border border-white/10 rounded-xl hover:text-white hover:bg-white/10 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
              </Link>
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
              <button 
                onClick={() => setShowNotifications(true)}
                className="relative p-2 bg-slate-900/50 border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{unreadCount}</span>
                  </div>
                )}
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 bg-slate-900/50 border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors"
              >
                <SettingsIcon size={20} />
              </button>
              {/* User Menu */}
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/50 border border-white/10 rounded-xl">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <User size={16} className="text-emerald-400" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">{user?.name || 'User'}</p>
                  <p className="text-slate-400 text-xs">{user?.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="p-1 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
              </div>
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
                
                {/* Semester Overview */}
                <DashboardPreview useRealData={true} />
                
                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Target className="text-emerald-400" size={20} />
                      Today's Focus
                    </h3>
                    <div className="space-y-3">
                      {getIncompleteTasks().slice(0, 3).map((task) => (
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
                      {getIncompleteTasks().length === 0 && (
                        <p className="text-slate-500 text-sm">No pending tasks. Great job!</p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Calendar className="text-blue-400" size={20} />
                      Upcoming Events
                    </h3>
                    <div className="space-y-3">
                      {events.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl">
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-slate-500">{event.date} at {event.time}</p>
                          </div>
                        </div>
                      ))}
                      {events.length === 0 && (
                        <p className="text-slate-500 text-sm">No upcoming events.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tasks" && <TaskManager />}

            {activeTab === "stats" && <StatsEditor />}

            {activeTab === "study-plan" && <StudyPlan />}
            
            {activeTab === "syllabus" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-white mb-2">Syllabus Uploader</h2>
                  <p className="text-slate-400">Upload your course syllabus and let AI extract all important dates and assignments</p>
                </div>
                <SyllabusUploader />
              </div>
            )}
            
            {activeTab === "buddy" && <StudyBuddy />}
            
            {activeTab === "calendar" && <EventManager />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <SettingsComponent 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      
      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
  );
}
