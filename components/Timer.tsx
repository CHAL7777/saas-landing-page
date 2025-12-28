"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Brain, 
  Volume2, 
  VolumeX, 
  Settings,
  Timer as TimerIcon
} from "lucide-react";

interface TimerProps {
  initialWorkTime?: number; // in minutes
  initialBreakTime?: number; // in minutes
  onComplete?: (sessionType: 'work' | 'break') => void;
  onTick?: (seconds: number, sessionType: 'work' | 'break') => void;
  autoStart?: boolean;
  className?: string;
  showControls?: boolean;
  compact?: boolean;
}

interface TimerSettings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  notificationsEnabled: true,
};

export default function Timer({
  initialWorkTime = 25,
  initialBreakTime = 5,
  onComplete,
  onTick,
  autoStart = false,
  className = "",
  showControls = true,
  compact = false
}: TimerProps) {
  const [settings, setSettings] = useState<TimerSettings>({
    ...DEFAULT_SETTINGS,
    workDuration: initialWorkTime,
    breakDuration: initialBreakTime
  });
  
  const [isActive, setIsActive] = useState(autoStart);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(!settings.soundEnabled);
  const [showSettings, setShowSettings] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  
  const [seconds, setSeconds] = useState((isBreak ? initialBreakTime : initialWorkTime) * 60);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notificationPermission = useRef<NotificationPermission>('default');

  // Initialize audio
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createAudioContext = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        return audioContext;
      } catch {
        return null;
      }
    };

    const playNotificationSound = () => {
      if (isMuted || !settings.soundEnabled) return;
      
      const audioContext = createAudioContext();
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    playNotificationSound();
  }, [isMuted, settings.soundEnabled]);

  // Initialize notifications
  useEffect(() => {
    if ('Notification' in window) {
      notificationPermission.current = Notification.permission;
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => {
          const newSeconds = s - 1;
          onTick?.(newSeconds, isBreak ? 'break' : 'work');
          
          if (newSeconds === 0) {
            setIsActive(false);
            handleSessionComplete();
            return s; // Keep at 0 briefly
          }
          
          return newSeconds;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, onTick]);

  const handleSessionComplete = useCallback(() => {
    const nextIsBreak = !isBreak;
    const isLongBreak = nextIsBreak && (completedSessions + 1) % settings.sessionsUntilLongBreak === 0;
    
    // Update session count
    if (!isBreak) {
      setCompletedSessions(prev => prev + 1);
    }
    
    // Show notification
    if (settings.notificationsEnabled && notificationPermission.current === 'granted') {
      const title = nextIsBreak ? 'Work Session Complete!' : 'Break Time Over!';
      const body = isLongBreak 
        ? `Time for a ${settings.longBreakDuration} minute long break!`
        : `Time for a ${settings.breakDuration} minute break!`;
      
      new Notification(title, {
        body,
        icon: '/icon.svg',
        badge: '/icon.svg'
      });
    }
    
    // Call completion callback
    onComplete?.(isBreak ? 'work' : 'break');
    
    // Switch to next session
    setIsBreak(nextIsBreak);
    const nextDuration = nextIsBreak 
      ? (isLongBreak ? settings.longBreakDuration : settings.breakDuration)
      : settings.workDuration;
    setSeconds(nextDuration * 60);
  }, [isBreak, completedSessions, settings, onComplete]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? (seconds / (settings.breakDuration * 60)) * 100 
    : (seconds / (settings.workDuration * 60)) * 100;

  const handleReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(settings.workDuration * 60);
    setCompletedSessions(0);
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  if (compact) {
    return (
      <div className={`bg-slate-800/50 rounded-lg p-4 border border-slate-700 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TimerIcon size={16} className="text-emerald-400" />
            <span className="text-xs text-slate-400 font-medium">
              {isBreak ? "Break" : "Focus"}
            </span>
          </div>
          <span className="text-lg font-mono text-white tabular-nums">
            {formatTime(seconds)}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleStartPause}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs py-1 px-2 rounded"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="bg-slate-700 hover:bg-slate-600 text-white text-xs py-1 px-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-0 right-0 bg-slate-800 border border-slate-700 rounded-lg p-4 z-10 w-72"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Timer Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Work Duration (minutes)</label>
                <input
                  type="number"
                  value={settings.workDuration}
                  onChange={(e) => setSettings(prev => ({ ...prev, workDuration: parseInt(e.target.value) || 25 }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1 text-white"
                  min="1"
                  max="120"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Break Duration (minutes)</label>
                <input
                  type="number"
                  value={settings.breakDuration}
                  onChange={(e) => setSettings(prev => ({ ...prev, breakDuration: parseInt(e.target.value) || 5 }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1 text-white"
                  min="1"
                  max="60"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-400">Sound</label>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-400">Notifications</label>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }))}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={isBreak ? "#60a5fa" : "#10b981"}
            strokeWidth="6"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 0.5, ease: "linear" }}
            strokeLinecap="round"
          />
        </svg>

        <div className="text-center">
          <motion.span 
            key={isBreak ? "break" : "work"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-xs font-medium text-slate-400 mb-2"
          >
            {isBreak ? "Break Time" : "Focus Time"}
          </motion.span>
          <h2 className="text-5xl font-bold text-white tabular-nums">
            {formatTime(seconds)}
          </h2>
          <div className="mt-2 text-xs text-slate-500">
            Session {completedSessions + 1}
          </div>
        </div>
      </div>

      {showControls && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button 
            onClick={handleReset}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
          
          <button 
            onClick={handleStartPause}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isActive 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg'
            }`}
          >
            {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
