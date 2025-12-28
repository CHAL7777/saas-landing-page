"use client";
import { useCallback, useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Reminder } from "@/types/dashboard";
import { useSettings } from "./useSettings";

export function useReminders() {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("dashboard-reminders", []);
  const { settings, showNotification } = useSettings();
  const reminderTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addReminder = useCallback((reminderData: Omit<Reminder, "id" | "createdAt" | "updatedAt">) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setReminders(prev => [...prev, newReminder]);
    return newReminder;
  }, [setReminders]);

  const updateReminder = useCallback((id: string, updates: Partial<Omit<Reminder, "id" | "createdAt" | "updatedAt">>) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, ...updates, updatedAt: new Date() }
        : reminder
    ));
  }, [setReminders]);

  const deleteReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    // Clear any pending timeout
    const timeout = reminderTimeouts.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      reminderTimeouts.current.delete(id);
    }
  }, [setReminders]);

  const markAsRead = useCallback((id: string) => {
    updateReminder(id, { isRead: true });
  }, [updateReminder]);

  const markAsCompleted = useCallback((id: string) => {
    updateReminder(id, { isCompleted: true });
    // Clear pending timeout
    const timeout = reminderTimeouts.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      reminderTimeouts.current.delete(id);
    }
  }, [updateReminder]);

  const getUpcomingReminders = useCallback(() => {
    const now = new Date();
    return reminders
      .filter(reminder => !reminder.isCompleted && new Date(reminder.scheduledTime) > now)
      .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
  }, [reminders]);

  const getOverdueReminders = useCallback(() => {
    const now = new Date();
    return reminders
      .filter(reminder => !reminder.isCompleted && new Date(reminder.scheduledTime) <= now)
      .sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());
  }, [reminders]);

  const getRemindersByType = useCallback((type: 'task' | 'event' | 'custom') => {
    return reminders.filter(reminder => reminder.type === type);
  }, [reminders]);

  // Schedule a reminder notification
  const scheduleReminder = useCallback((reminder: Reminder) => {
    const now = new Date();
    const reminderTime = new Date(reminder.scheduledTime);
    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    if (timeUntilReminder <= 0) {
      // Reminder is overdue, show immediately
      showNotification(reminder.title, {
        body: reminder.message,
        tag: reminder.id,
      });
      markAsRead(reminder.id);
      return;
    }

    // Clear existing timeout if any
    const existingTimeout = reminderTimeouts.current.get(reminder.id);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      showNotification(reminder.title, {
        body: reminder.message,
        tag: reminder.id,
      });
      markAsRead(reminder.id);
      reminderTimeouts.current.delete(reminder.id);
    }, timeUntilReminder);

    reminderTimeouts.current.set(reminder.id, timeout);
  }, [showNotification, markAsRead]);

  // Set up automatic scheduling for all active reminders
  useEffect(() => {
    if (!settings.notifications) return;

    const activeReminders = reminders.filter(reminder => 
      !reminder.isCompleted && new Date(reminder.scheduledTime) > new Date()
    );

    activeReminders.forEach(scheduleReminder);

    // Cleanup function
    return () => {
      reminderTimeouts.current.forEach(timeout => clearTimeout(timeout));
      reminderTimeouts.current.clear();
    };
  }, [reminders, settings.notifications, scheduleReminder]);

  // Create reminder from task
  const createTaskReminder = useCallback((task: any) => {
    const taskTime = new Date(task.due);
    const reminderTime = new Date(taskTime.getTime() - (settings.reminderTime * 60 * 1000));

    return addReminder({
      title: `Task Due: ${task.title}`,
      message: `Your task "${task.title}" for ${task.course} is due soon!`,
      type: 'task',
      relatedId: task.id,
      scheduledTime: reminderTime,
      isRead: false,
      isCompleted: false,
    });
  }, [addReminder, settings.reminderTime]);

  // Create reminder from event
  const createEventReminder = useCallback((event: any) => {
    const eventTime = new Date(`${event.date} ${event.time}`);
    const reminderTime = new Date(eventTime.getTime() - (settings.reminderTime * 60 * 1000));

    return addReminder({
      title: `Event Reminder: ${event.title}`,
      message: `You have "${event.title}" coming up soon!`,
      type: 'event',
      relatedId: event.id,
      scheduledTime: reminderTime,
      isRead: false,
      isCompleted: false,
    });
  }, [addReminder, settings.reminderTime]);

  // Clear all completed reminders
  const clearCompletedReminders = useCallback(() => {
    setReminders(prev => prev.filter(reminder => !reminder.isCompleted));
  }, [setReminders]);

  // Clear all reminders
  const clearAllReminders = useCallback(() => {
    // Clear all timeouts
    reminderTimeouts.current.forEach(timeout => clearTimeout(timeout));
    reminderTimeouts.current.clear();
    setReminders([]);
  }, [setReminders]);

  return {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    markAsRead,
    markAsCompleted,
    getUpcomingReminders,
    getOverdueReminders,
    getRemindersByType,
    scheduleReminder,
    createTaskReminder,
    createEventReminder,
    clearCompletedReminders,
    clearAllReminders,
  };
}
