import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { APPS_DATA } from '../components/os/IconGrid';

export const WindowContext = createContext(null);

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
};

// Initial z-index counter base
let nextZIndex = 100;

export const WindowProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  // Focus a window and bring it to the top of the stack
  const focusWindow = useCallback((id) => {
    setActiveWindowId(id);
    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          nextZIndex += 1;
          return { ...win, zIndex: nextZIndex, isMinimized: false };
        }
        return win;
      })
    );
  }, []);

  // Open window (or restore/focus if already open)
  const openWindow = useCallback(
    (appId) => {
      const existing = openWindows.find((w) => w.appId === appId);
      if (existing) {
        focusWindow(existing.id);
        return;
      }

      const appMeta = APPS_DATA.find((a) => a.id === appId) || {
        id: appId,
        name: appId,
        filename: `${appId}.app`,
      };

      nextZIndex += 1;
      const windowId = `win-${appId}-${Date.now()}`;

      // Calculate cascaded default position within viewport
      const offsetIndex = openWindows.length % 6;
      const defaultWidth = Math.min(800, window.innerWidth - 60);
      const defaultHeight = Math.min(520, window.innerHeight - 120);

      // Centered with slight cascade
      const baseX = Math.max(20, Math.round((window.innerWidth - defaultWidth) / 2));
      const baseY = Math.max(50, Math.round((window.innerHeight - defaultHeight) / 2 - 20));

      const newWindow = {
        id: windowId,
        appId: appMeta.id,
        title: appMeta.name,
        filename: appMeta.filename,
        isMinimized: false,
        isMaximized: false,
        position: {
          x: Math.min(baseX + offsetIndex * 24, window.innerWidth - defaultWidth - 20),
          y: Math.min(baseY + offsetIndex * 24, window.innerHeight - defaultHeight - 40),
        },
        size: {
          width: defaultWidth,
          height: defaultHeight,
        },
        zIndex: nextZIndex,
      };

      setOpenWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(windowId);
    },
    [openWindows, focusWindow]
  );

  // Close a window
  const closeWindow = useCallback(
    (id) => {
      setOpenWindows((prev) => {
        const filtered = prev.filter((w) => w.id !== id);
        if (activeWindowId === id) {
          // Focus the top remaining non-minimized window
          const visibleWindows = filtered.filter((w) => !w.isMinimized);
          if (visibleWindows.length > 0) {
            const topWindow = visibleWindows.reduce((highest, current) =>
              current.zIndex > highest.zIndex ? current : highest
            );
            setActiveWindowId(topWindow.id);
          } else {
            setActiveWindowId(null);
          }
        }
        return filtered;
      });
    },
    [activeWindowId]
  );

  // Minimize window
  const minimizeWindow = useCallback(
    (id) => {
      setOpenWindows((prev) =>
        prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
      );
      if (activeWindowId === id) {
        // Switch focus to next top visible window
        const visibleWindows = openWindows.filter((w) => w.id !== id && !w.isMinimized);
        if (visibleWindows.length > 0) {
          const topWindow = visibleWindows.reduce((highest, current) =>
            current.zIndex > highest.zIndex ? current : highest
          );
          setActiveWindowId(topWindow.id);
        } else {
          setActiveWindowId(null);
        }
      }
    },
    [activeWindowId, openWindows]
  );

  // Restore minimized window
  const restoreWindow = useCallback(
    (id) => {
      focusWindow(id);
    },
    [focusWindow]
  );

  // Toggle maximize
  const toggleMaximizeWindow = useCallback((id) => {
    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return { ...win, isMaximized: !win.isMaximized };
        }
        return win;
      })
    );
  }, []);

  // Update window position after drag
  const updateWindowPosition = useCallback((id, position) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, position } : win))
    );
  }, []);

  // Update window size after resize
  const updateWindowSize = useCallback((id, size) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, size } : win))
    );
  }, []);

  const value = useMemo(
    () => ({
      openWindows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMaximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      openWindows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMaximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
};

export default WindowContext;
