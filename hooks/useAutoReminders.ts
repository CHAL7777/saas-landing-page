"use client";
import { useEffect } from "react";
import { useTasks } from "./useTasks";
import { useEvents } from "./useEvents";
import { useReminders } from "./useReminders";
import { useSettings } from "./useSettings";

export function useAutoReminders() {
  const { tasks } = useTasks();
  const { events } = useEvents();
  const { 
    reminders, 
    createTaskReminder, 
    createEventReminder, 
    deleteReminder 
  } = useReminders();
  const { settings } = useSettings();

  // Auto-create reminders for new tasks
  useEffect(() => {
    if (!settings.notifications) return;

    tasks.forEach(task => {
      // Check if reminder already exists for this task
      const existingReminder = reminders.find(r => r.relatedId === task.id && r.type === 'task');
      
      if (!existingReminder && !task.completed) {
        createTaskReminder(task);
      }
    });
  }, [tasks, reminders, createTaskReminder, settings.notifications]);

  // Auto-create reminders for new events
  useEffect(() => {
    if (!settings.notifications) return;

    events.forEach(event => {
      // Check if reminder already exists for this event
      const existingReminder = reminders.find(r => r.relatedId === event.id && r.type === 'event');
      
      if (!existingReminder) {
        createEventReminder(event);
      }
    });
  }, [events, reminders, createEventReminder, settings.notifications]);

  // Clean up reminders for completed/deleted tasks
  useEffect(() => {
    reminders.forEach(reminder => {
      if (reminder.type === 'task') {
        const relatedTask = tasks.find(t => t.id === reminder.relatedId);
        if (!relatedTask || relatedTask.completed) {
          // Task is deleted or completed, remove reminder
          deleteReminder(reminder.id);
        }
      } else if (reminder.type === 'event') {
        const relatedEvent = events.find(e => e.id === reminder.relatedId);
        if (!relatedEvent) {
          // Event is deleted, remove reminder
          deleteReminder(reminder.id);
        }
      }
    });
  }, [tasks, events, reminders, deleteReminder]);

  return {
    // This hook doesn't return anything specific, it just manages auto-reminders
  };
}
