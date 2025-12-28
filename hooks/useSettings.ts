"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DashboardSettings, DEFAULT_SETTINGS } from "@/types/dashboard";

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<DashboardSettings>("dashboard-settings", DEFAULT_SETTINGS);

  const updateSettings = useCallback((updates: Partial<Omit<DashboardSettings, "updatedAt">>) => {
    setSettings(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  }, [setSettings]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, [setSettings]);

  const toggleNotifications = useCallback(() => {
    updateSettings({ notifications: !settings.notifications });
  }, [settings.notifications, updateSettings]);

  const toggleBrowserNotifications = useCallback(() => {
    updateSettings({ browserNotifications: !settings.browserNotifications });
  }, [settings.browserNotifications, updateSettings]);

  const toggleSound = useCallback(() => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  }, [settings.soundEnabled, updateSettings]);

  const setReminderTime = useCallback((minutes: number) => {
    updateSettings({ reminderTime: minutes });
  }, [updateSettings]);

  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  }, []);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!settings.browserNotifications || Notification.permission !== "granted") {
      return;
    }

    const notification = new Notification(title, {
      icon: "/favicon.ico",
      ...options,
    });

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);

    return notification;
  }, [settings.browserNotifications]);

  return {
    settings,
    updateSettings,
    resetSettings,
    toggleNotifications,
    toggleBrowserNotifications,
    toggleSound,
    setReminderTime,
    requestNotificationPermission,
    showNotification,
  };
}
