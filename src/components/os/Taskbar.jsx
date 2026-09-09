import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindow } from '../../context/WindowContext';
import { APPS_DATA } from './IconGrid';

export default function Taskbar() {
  const { openWindows, activeWindowId, focusWindow, minimizeWindow, restoreWindow } =
    useWindow();

  if (openWindows.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Open Applications" className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.5rem)] md:max-w-4xl w-auto px-2 py-1.5 rounded-xl bg-dev-surface/90 border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-1.5 overflow-x-auto select-none">
      <AnimatePresence>
        {openWindows.map((win) => {
          const appMeta = APPS_DATA.find((a) => a.id === win.appId) || {};
          const IconComponent = appMeta.icon;
          const isActive = activeWindowId === win.id && !win.isMinimized;
          const isMinimized = win.isMinimized;

          const handleTaskbarClick = () => {
            if (isMinimized) {
              restoreWindow(win.id);
            } else if (isActive) {
              minimizeWindow(win.id);
            } else {
              focusWindow(win.id);
            }
          };

          return (
            <motion.button
              key={win.id}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={handleTaskbarClick}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white border border-dev-cyan/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : isMinimized
                  ? 'bg-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {/* App Icon */}
              {IconComponent && (
                <IconComponent
                  size={14}
                  className={isActive ? appMeta.color : isMinimized ? 'text-slate-500' : 'text-slate-400'}
                />
              )}

              {/* Title */}
              <span className="truncate max-w-[120px] font-medium">{win.title}</span>

              {/* Status Indicator Dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-dev-cyan shadow-[0_0_6px_rgba(0,240,255,0.8)]'
                    : isMinimized
                    ? 'bg-slate-600'
                    : 'bg-slate-400'
                }`}
              />
            </motion.button>
          );
        })}
      </AnimatePresence>
    </nav>
  );
}
