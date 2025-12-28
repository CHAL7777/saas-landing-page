"use client";
import { useEffect } from "react";

export function usePWA() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });
          console.log("PWA Service Worker registered successfully");
        } catch (error) {
          console.error("PWA Service Worker registration failed:", error);
        }
      };

      registerSW();
    }
  }, []);

  useEffect(() => {
    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Store the event for later use
      (window as any).deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return {
    isInstallable: typeof window !== "undefined" && "beforeinstallprompt" in window,
  };
}
