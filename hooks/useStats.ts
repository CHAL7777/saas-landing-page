"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UserStats, DEFAULT_STATS } from "@/types/dashboard";

export function useStats() {
  const [stats, setStats] = useLocalStorage<UserStats>("dashboard-stats", DEFAULT_STATS);

  const updateStats = useCallback((updates: Partial<UserStats>) => {
    setStats(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const incrementStudyStreak = useCallback(() => {
    setStats(prev => ({
      ...prev,
      studyStreak: prev.studyStreak + 1,
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const resetStudyStreak = useCallback(() => {
    setStats(prev => ({
      ...prev,
      studyStreak: 0,
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const updateTaskProgress = useCallback((completed: boolean) => {
    setStats(prev => ({
      ...prev,
      tasksCompleted: completed ? prev.tasksCompleted + 1 : Math.max(0, prev.tasksCompleted - 1),
      totalTasks: prev.totalTasks + (completed ? 1 : 0),
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const addCompletedTask = useCallback(() => {
    setStats(prev => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + 1,
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const removeCompletedTask = useCallback(() => {
    setStats(prev => ({
      ...prev,
      tasksCompleted: Math.max(0, prev.tasksCompleted - 1),
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const setGPA = useCallback((gpa: string) => {
    updateStats({ currentGPA: gpa });
  }, [updateStats]);

  const setNextGoal = useCallback((goal: string, status?: string) => {
    setStats(prev => ({
      ...prev,
      nextGoal: goal,
      goalStatus: status || prev.goalStatus,
      updatedAt: new Date(),
    }));
  }, [setStats]);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
  }, [setStats]);

  const getCompletionPercentage = useCallback(() => {
    return stats.totalTasks > 0 ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100) : 0;
  }, [stats]);

  return {
    stats,
    updateStats,
    incrementStudyStreak,
    resetStudyStreak,
    updateTaskProgress,
    addCompletedTask,
    removeCompletedTask,
    setGPA,
    setNextGoal,
    resetStats,
    getCompletionPercentage,
  };
}
