"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Event, DEFAULT_EVENTS } from "@/types/dashboard";

export function useEvents() {
  const [events, setEvents] = useLocalStorage<Event[]>("dashboard-events", DEFAULT_EVENTS);

  const addEvent = useCallback((eventData: Omit<Event, "id" | "createdAt" | "updatedAt">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, [setEvents]);

  const updateEvent = useCallback((id: string, updates: Partial<Omit<Event, "id" | "createdAt" | "updatedAt">>) => {
    setEvents(prev => prev.map(event => 
      event.id === id 
        ? { ...event, ...updates, updatedAt: new Date() }
        : event
    ));
  }, [setEvents]);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, [setEvents]);

  const clearAllEvents = useCallback(() => {
    setEvents([]);
  }, [setEvents]);

  const getEventsByDate = useCallback((date: string) => {
    return events.filter(event => event.date === date);
  }, [events]);

  const getEventsByTitle = useCallback((title: string) => {
    return events.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
  }, [events]);

  const reorderEvents = useCallback((startIndex: number, endIndex: number) => {
    setEvents(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setEvents]);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    clearAllEvents,
    getEventsByDate,
    getEventsByTitle,
    reorderEvents,
  };
}
