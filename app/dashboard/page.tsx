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
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  ArrowLeft
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

// Simple Loading State Component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg">Loading StudyMaster...</p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Simple Mobile Navigation Component
function MobileBottomNav({ activeTab, onTabChange, tabs, notificationCount, onNavigateHome }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{ id: string; label: string; icon: any }>;
  notificationCount: number;
  onNavigateHome: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="grid grid-cols-6 gap-1 p-2">
        {/* Home Navigation */}
        <button
          onClick={onNavigateHome}
          className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-white/5"
        >
          <Home size={20} />
          <span className="text-xs font-medium">Home</span>
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-emerald-500 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="relative">
              <tab.icon size={20} />
              {tab.id === "tasks" && notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{notificationCount}</span>
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Enhanced Button Component
function EnhancedButton({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "", 
  disabled = false,
  size = "md",
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  [key: string]: any;
}) {
  const baseClasses = "rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function DashboardPage() {
  // Core state
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Enhanced state
  const [isMobile, setIsMobile] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);

  // Enhanced hooks
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { tasks, getIncompleteTasks } = useTasks();
  const { events } = useEvents();
  const { settings } = useSettings();
  const { reminders } = useReminders();
  useAutoReminders();

  // Initialize loading state and mobile detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle navigation to home page
  const handleNavigateHome = () => {
    router.push('/');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
  };

  // Get unread notifications count
  const unreadCount = reminders.filter(r => !r.isRead && !r.isCompleted).length;

  // Navigation tabs
  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "tasks", label: "Tasks", icon: CheckCircle2 },
    { id: "stats", label: "Stats", icon: Target },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "study-plan", label: "Study Plan", icon: BookOpen },
    { id: "syllabus", label: "Syllabus", icon: Upload },
    { id: "buddy", label: "Study Buddy", icon: User },
  ];

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setShowAddModal(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <DashboardOverview />
            <DashboardPreview useRealData={true} />
            
            {/* Enhanced Quick Actions */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-6'}`}>
              <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target className="text-emerald-400" size={20} />
                  Today&apos;s Focus
                </h3>
                <div className="space-y-3">
                  {getIncompleteTasks().slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl hover:bg-slate-900/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-slate-500">{task.course}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === "high" ? "bg-red-500/20 text-red-400" :
                          task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {task.priority}
                        </span>
                        <ChevronRight size={16} className="text-slate-500" />
                      </div>
                    </div>
                  ))}
                  {getIncompleteTasks().length === 0 && (
                    <div className="text-center py-6">
                      <CheckCircle2 className="text-emerald-400 mx-auto mb-2" size={32} />
                      <p className="text-emerald-400 font-medium">All Caught Up!</p>
                      <p className="text-slate-500 text-sm">No pending tasks. Great job!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="text-blue-400" size={20} />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl hover:bg-slate-900/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-slate-500">{event.date} at {event.time}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-500" />
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="text-center py-6">
                      <Calendar className="text-blue-400 mx-auto mb-2" size={32} />
                      <p className="text-blue-400 font-medium">No Events Scheduled</p>
                      <p className="text-slate-500 text-sm">Your calendar is clear</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case "tasks":
        return <TaskManager />;
      case "stats":
        return <StatsEditor />;
      case "calendar":
        return <EventManager />;
      case "study-plan":
        return <StudyPlan />;
      case "syllabus":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white mb-2">Syllabus Uploader</h2>
              <p className="text-slate-400">Upload your course syllabus and let AI extract all important dates and assignments</p>
            </div>
            <SyllabusUploader />
          </div>
        );
      case "buddy":
        return <StudyBuddy />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen bg-[#020617] text-white transition-all duration-300 ${
        highContrast ? 'contrast-more' : ''
      }`}
      style={{
        fontSize: fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : fontSize === 'xl' ? '20px' : '16px'
      }}
    >
      {/* Desktop Header */}
      {!isMobile && (
        <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Home Navigation Button */}
                <EnhancedButton
                  onClick={handleNavigateHome}
                  variant="ghost"
                  className="flex items-center gap-2 text-slate-400 hover:text-white"
                >
                  <Home size={18} />
                  Home
                </EnhancedButton>
                
                <div className="h-6 w-px bg-white/10"></div>
                
                <div>
                  <h1 className="text-2xl font-black text-white">StudyMaster Dashboard</h1>
                  <p className="text-slate-400 text-sm">
                    Welcome back{user ? `, ${user.name}` : ''}! Ready to crush your goals?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Search */}
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
                
                {/* Notifications */}
                <EnhancedButton
                  onClick={() => setShowNotifications(true)}
                  variant="ghost"
                  className="relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{unreadCount}</span>
                    </div>
                  )}
                </EnhancedButton>

                {/* Accessibility Menu */}
                <div className="relative">
                  <EnhancedButton
                    onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
                    variant="ghost"
                  >
                    <SettingsIcon size={20} />
                  </EnhancedButton>
                  {showAccessibilityMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl p-4 z-50">
                      <h3 className="font-bold mb-3">Accessibility</h3>
                      
                      {/* Font Size */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Font Size</label>
                        <div className="grid grid-cols-4 gap-1">
                          {['small', 'medium', 'large', 'xl'].map((size) => (
                            <button
                              key={size}
                              onClick={() => setFontSize(size)}
                              className={`px-2 py-1 text-xs rounded ${
                                fontSize === size ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* High Contrast */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm">High Contrast</label>
                        <button
                          onClick={() => setHighContrast(!highContrast)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            highContrast ? 'bg-emerald-500' : 'bg-slate-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            highContrast ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/50 border border-white/10 rounded-xl">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <User size={16} className="text-emerald-400" />
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium">{user?.name || 'User'}</p>
                    <p className="text-slate-400 text-xs">{user?.email}</p>
                  </div>
                  <EnhancedButton
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    variant="ghost"
                    className="p-1 text-slate-400 hover:text-red-400"
                  >
                    <LogOut size={16} />
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <header className="bg-slate-950/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <EnhancedButton
                onClick={handleNavigateHome}
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <ArrowLeft size={18} />
              </EnhancedButton>
              <div>
                <h1 className="text-lg font-bold text-white">StudyMaster</h1>
                <p className="text-slate-400 text-sm">Welcome back, {user?.name || 'Student'}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EnhancedButton
                onClick={() => setShowNotifications(true)}
                variant="ghost"
                size="sm"
                className="relative"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{unreadCount}</span>
                  </div>
                )}
              </EnhancedButton>
              <EnhancedButton
                onClick={() => setShowAddModal(true)}
                variant="primary"
                size="sm"
              >
                <Plus size={18} />
              </EnhancedButton>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`${isMobile ? "pb-20" : "container mx-auto px-6 py-6"}`}>
        {/* Desktop Navigation Tabs */}
        {!isMobile && (
          <div className="flex items-center gap-2 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <EnhancedButton
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                variant={activeTab === tab.id ? "primary" : "ghost"}
                className="flex items-center gap-2"
              >
                <tab.icon size={18} />
                {tab.label}
              </EnhancedButton>
            ))}
          </div>
        )}

        {/* Content with animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={tabs}
          notificationCount={unreadCount}
          onNavigateHome={handleNavigateHome}
        />
      )}

      {/* Mobile Add Modal */}
      {isMobile && showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-slate-950 w-full rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              <EnhancedButton
                onClick={() => setShowAddModal(false)}
                variant="ghost"
                size="sm"
              >
                <X size={20} />
              </EnhancedButton>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setActiveTab("tasks");
                  setShowAddModal(false);
                }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Plus className="text-emerald-400" size={20} />
                <span className="text-white">Add New Task</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("calendar");
                  setShowAddModal(false);
                }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Calendar className="text-blue-400" size={20} />
                <span className="text-white">Schedule Event</span>
              </button>
              <button
                onClick={() => {
                  router.push("/dashboard/focus");
                  setShowAddModal(false);
                }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Target className="text-purple-400" size={20} />
                <span className="text-white">Start Focus Session</span>
              </button>
              <button
                onClick={() => {
                  handleNavigateHome();
                  setShowAddModal(false);
                }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Home className="text-green-400" size={20} />
                <span className="text-white">Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      )}

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

