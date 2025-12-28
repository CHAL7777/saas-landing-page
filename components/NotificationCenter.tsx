"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Bell, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Info,
  Calendar,
  BookOpen,
  Trash2,
  Filter
} from "lucide-react";
import { useReminders } from "@/hooks/useReminders";
import { Reminder } from "@/types/dashboard";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { 
    reminders, 
    markAsRead, 
    markAsCompleted, 
    deleteReminder,
    getUpcomingReminders,
    getOverdueReminders,
    getRemindersByType 
  } = useReminders();
  
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');

  const upcomingReminders = getUpcomingReminders();
  const overdueReminders = getOverdueReminders();
  const completedReminders = reminders.filter(r => r.isCompleted);

  const getFilteredReminders = () => {
    switch (filter) {
      case 'upcoming':
        return upcomingReminders;
      case 'overdue':
        return overdueReminders;
      case 'completed':
        return completedReminders;
      default:
        return reminders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'task':
        return BookOpen;
      case 'event':
        return Calendar;
      default:
        return Bell;
    }
  };

  const getReminderColor = (reminder: Reminder) => {
    if (reminder.isCompleted) return 'text-emerald-400';
    if (new Date(reminder.scheduledTime) < new Date()) return 'text-red-400';
    return 'text-blue-400';
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const reminderDate = new Date(date);
    const diffMs = reminderDate.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 0) {
      return 'Overdue';
    } else if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      return `${diffDays}d`;
    }
  };

  const unreadCount = reminders.filter(r => !r.isRead && !r.isCompleted).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="text-emerald-400" size={24} />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{unreadCount}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Notifications</h2>
                  <p className="text-slate-400 text-sm">{reminders.length} reminders</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 mb-4 bg-slate-800/50 rounded-xl p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'overdue', label: 'Overdue' },
                { key: 'completed', label: 'Done' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    filter === tab.key
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              <AnimatePresence>
                {getFilteredReminders().map((reminder) => {
                  const Icon = getReminderIcon(reminder.type);
                  const colorClass = getReminderColor(reminder);
                  
                  return (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`p-3 rounded-xl border transition-colors ${
                        reminder.isRead || reminder.isCompleted
                          ? 'bg-white/[0.02] border-white/5'
                          : 'bg-emerald-500/5 border-emerald-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
                          <Icon size={16} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`font-medium text-sm ${
                              reminder.isCompleted ? 'line-through text-slate-500' : 'text-white'
                            }`}>
                              {reminder.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={12} />
                              {formatTime(reminder.scheduledTime)}
                            </div>
                          </div>
                          
                          <p className={`text-xs mt-1 ${
                            reminder.isCompleted ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {reminder.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              {!reminder.isRead && !reminder.isCompleted && (
                                <button
                                  onClick={() => markAsRead(reminder.id)}
                                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                  Mark as read
                                </button>
                              )}
                              
                              {!reminder.isCompleted && (
                                <button
                                  onClick={() => markAsCompleted(reminder.id)}
                                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  Mark done
                                </button>
                              )}
                            </div>
                            
                            <button
                              onClick={() => deleteReminder(reminder.id)}
                              className="p-1 hover:bg-red-500/10 rounded text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {getFilteredReminders().length === 0 && (
                <div className="text-center py-8">
                  <Bell className="text-slate-600 mx-auto mb-3" size={32} />
                  <p className="text-slate-500">
                    {filter === 'all' && 'No reminders yet'}
                    {filter === 'upcoming' && 'No upcoming reminders'}
                    {filter === 'overdue' && 'No overdue reminders'}
                    {filter === 'completed' && 'No completed reminders'}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {reminders.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      reminders.forEach(reminder => {
                        if (!reminder.isRead && !reminder.isCompleted) {
                          markAsRead(reminder.id);
                        }
                      });
                    }}
                    className="flex-1 py-2 px-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white rounded-lg text-sm transition-colors"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete all reminders?')) {
                        reminders.forEach(reminder => deleteReminder(reminder.id));
                      }
                    }}
                    className="flex-1 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg text-sm transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
