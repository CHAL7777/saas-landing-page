"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Task, DEFAULT_TASKS } from "@/types/dashboard";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("dashboard-tasks", DEFAULT_TASKS);

  const addTask = useCallback((taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  }, [setTasks]);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

  const getTasksByPriority = useCallback((priority: 'high' | 'medium' | 'low') => {
    return tasks.filter(task => task.priority === priority);
  }, [tasks]);

  const getCompletedTasks = useCallback(() => {
    return tasks.filter(task => task.completed);
  }, [tasks]);

  const getIncompleteTasks = useCallback(() => {
    return tasks.filter(task => !task.completed);
  }, [tasks]);

  const getTasksByCourse = useCallback((course: string) => {
    return tasks.filter(task => task.course.toLowerCase().includes(course.toLowerCase()));
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    clearAllTasks,
    getTasksByPriority,
    getCompletedTasks,
    getIncompleteTasks,
    getTasksByCourse,
  };
}
