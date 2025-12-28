"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";

export default function PWAInstall() {
  const { isInstallable } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Show install prompt after a delay if installable
    if (isInstallable) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  const handleInstall = async () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowInstallPrompt(false);
      }
      
      (window as any).deferredPrompt = null;
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50"
        >
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Download size={16} className="text-slate-950" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Install StudyMaster</h3>
                  <p className="text-slate-400 text-xs">Get the full app experience</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-emerald-500 text-slate-950 py-2 px-3 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors"
              >
                Install App
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
