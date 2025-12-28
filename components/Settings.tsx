"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Palette, 
  Bell, 
  Volume2, 
  VolumeX, 
  Mail, 
  Clock,
  RotateCcw,
  Save,
  Monitor,
  Sun,
  Moon,
  GraduationCap
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useSemester } from "@/hooks/useSemester";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { 
    settings, 
    updateSettings, 
    resetSettings, 
    toggleNotifications,
    toggleBrowserNotifications,
    toggleSound,
    setReminderTime,
    requestNotificationPermission
  } = useSettings();
  
  const { 
    semester, 
    updateSemester, 
    setSemesterInfo, 
    setGPA, 
    resetSemester 
  } = useSemester();
  
  const [localSettings, setLocalSettings] = useState(settings);
  const [localSemester, setLocalSemester] = useState(semester);

  const handleSave = () => {
    updateSettings(localSettings);
    updateSemester(localSemester);
    onClose();
  };

  const handleReset = () => {
    resetSettings();
    resetSemester();
    setLocalSettings(settings);
    setLocalSemester(semester);
  };

  const requestBrowserNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      toggleBrowserNotifications();
    } else {
      alert("Notification permission denied. Please enable notifications in your browser settings.");
    }
  };

  const reminderTimeOptions = [
    { value: 5, label: "5 minutes before" },
    { value: 15, label: "15 minutes before" },
    { value: 30, label: "30 minutes before" },
    { value: 60, label: "1 hour before" },
    { value: 120, label: "2 hours before" },
    { value: 1440, label: "1 day before" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <Palette className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Dashboard Settings</h2>
                  <p className="text-slate-400 text-sm">Customize your dashboard experience</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Appearance Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Monitor size={18} />
                  Appearance
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLocalSettings(prev => ({ ...prev, theme: 'dark' }))}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      localSettings.theme === 'dark'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Moon className="text-slate-400 mx-auto mb-2" size={24} />
                    <p className="text-sm font-medium text-white">Dark Theme</p>
                  </button>
                  
                  <button
                    onClick={() => setLocalSettings(prev => ({ ...prev, theme: 'light' }))}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      localSettings.theme === 'light'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Sun className="text-slate-400 mx-auto mb-2" size={24} />
                    <p className="text-sm font-medium text-white">Light Theme</p>
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Bell size={18} />
                  Notifications
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium text-white">In-App Notifications</p>
                      <p className="text-sm text-slate-400">Show notifications within the dashboard</p>
                    </div>
                    <button
                      onClick={() => setLocalSettings(prev => ({ ...prev, notifications: !prev.notifications }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        localSettings.notifications ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        localSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium text-white">Browser Notifications</p>
                      <p className="text-sm text-slate-400">Receive notifications even when dashboard is closed</p>
                    </div>
                    <button
                      onClick={requestBrowserNotifications}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        localSettings.browserNotifications ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        localSettings.browserNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium text-white">Sound Notifications</p>
                      <p className="text-sm text-slate-400">Play sounds with notifications</p>
                    </div>
                    <button
                      onClick={() => setLocalSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        localSettings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        localSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium text-white">Email Notifications</p>
                      <p className="text-sm text-slate-400">Receive notifications via email</p>
                    </div>
                    <button
                      onClick={() => setLocalSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        localSettings.emailNotifications ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        localSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Semester Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <GraduationCap size={18} />
                  Semester Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Term</label>
                    <select
                      value={localSemester.term}
                      onChange={(e) => setLocalSemester(prev => ({ ...prev, term: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Fall">Fall</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Year</label>
                    <input
                      type="number"
                      value={localSemester.year}
                      onChange={(e) => setLocalSemester(prev => ({ ...prev, year: e.target.value }))}
                      min="2020"
                      max="2030"
                      className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Credits</label>
                    <input
                      type="number"
                      value={localSemester.credits}
                      onChange={(e) => setLocalSemester(prev => ({ ...prev, credits: parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="25"
                      className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Current GPA</label>
                    <input
                      type="text"
                      value={localSemester.gpa || ""}
                      onChange={(e) => setLocalSemester(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="3.84"
                      pattern="[0-4]\.[0-9]{2}"
                      className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                  <p className="text-sm text-slate-400">
                    <strong>Preview:</strong> {localSemester.term} {localSemester.year} • {localSemester.credits} Credits • GPA: {localSemester.gpa || "Not set"}
                  </p>
                </div>
              </div>

              {/* Reminder Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Clock size={18} />
                  Reminders
                </h3>
                
                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                  <p className="font-medium text-white mb-3">Default Reminder Time</p>
                  <select
                    value={localSettings.reminderTime}
                    onChange={(e) => setLocalSettings(prev => ({ ...prev, reminderTime: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    {reminderTimeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    This setting applies to new tasks and events
                  </p>
                </div>
              </div>

              {/* Auto-save Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Data & Sync</h3>
                
                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                  <div>
                    <p className="font-medium text-white">Auto-save Changes</p>
                    <p className="text-sm text-slate-400">Automatically save your data as you work</p>
                  </div>
                  <button
                    onClick={() => setLocalSettings(prev => ({ ...prev, autoSave: !prev.autoSave }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      localSettings.autoSave ? 'bg-emerald-500' : 'bg-slate-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      localSettings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset to Default
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-white/20 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-slate-950 rounded-lg font-medium hover:bg-emerald-400 transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
