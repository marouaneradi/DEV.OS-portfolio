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

  // Focus a window and bring it to the top of the stack (ensuring it is safely in bounds)
  const focusWindow = useCallback((id) => {
    setActiveWindowId(id);
    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          nextZIndex += 1;
          const minX = 10;
          const maxX = Math.max(minX, window.innerWidth - 180);
          const minY = 38;
          const maxY = Math.max(minY, window.innerHeight - 60);

          const isOutOfBounds =
            win.position.x < minX ||
            win.position.x > maxX ||
            win.position.y < minY ||
            win.position.y > maxY;

          const safePos = isOutOfBounds
            ? {
                x: Math.max(minX, Math.min(maxX, win.position.x)),
                y: Math.max(minY, Math.min(maxY, win.position.y)),
              }
            : win.position;

          return { ...win, zIndex: nextZIndex, isMinimized: false, position: safePos };
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

  // Close all open windows
  const closeAllWindows = useCallback(() => {
    setOpenWindows([]);
    setActiveWindowId(null);
  }, []);

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

  // Reset a specific window's position and size to default center
  const resetWindow = useCallback(
    (id) => {
      setOpenWindows((prev) => {
        const idx = prev.findIndex((w) => w.id === id);
        if (idx === -1) return prev;

        const defaultWidth = Math.min(800, window.innerWidth - 60);
        const defaultHeight = Math.min(520, window.innerHeight - 120);
        const baseX = Math.max(20, Math.round((window.innerWidth - defaultWidth) / 2));
        const baseY = Math.max(50, Math.round((window.innerHeight - defaultHeight) / 2 - 20));
        const offsetIndex = idx % 6;

        const newX = Math.min(baseX + offsetIndex * 24, Math.max(20, window.innerWidth - defaultWidth - 20));
        const newY = Math.min(baseY + offsetIndex * 24, Math.max(40, window.innerHeight - defaultHeight - 40));

        nextZIndex += 1;

        return prev.map((win) => {
          if (win.id === id) {
            return {
              ...win,
              isMinimized: false,
              isMaximized: false,
              zIndex: nextZIndex,
              size: { width: defaultWidth, height: defaultHeight },
              position: { x: newX, y: newY },
            };
          }
          return win;
        });
      });
      setActiveWindowId(id);
    },
    []
  );

  // Reset/re-cascade all open windows into a clean arrangement
  const resetAllWindows = useCallback(() => {
    setOpenWindows((prev) => {
      if (prev.length === 0) return prev;

      const defaultWidth = Math.min(800, window.innerWidth - 60);
      const defaultHeight = Math.min(520, window.innerHeight - 120);
      const baseX = Math.max(20, Math.round((window.innerWidth - defaultWidth) / 2));
      const baseY = Math.max(50, Math.round((window.innerHeight - defaultHeight) / 2 - 20));

      return prev.map((win, idx) => {
        const offsetIndex = idx % 6;
        const newX = Math.min(baseX + offsetIndex * 24, Math.max(20, window.innerWidth - defaultWidth - 20));
        const newY = Math.min(baseY + offsetIndex * 24, Math.max(40, window.innerHeight - defaultHeight - 40));

        return {
          ...win,
          isMinimized: false,
          isMaximized: false,
          size: { width: defaultWidth, height: defaultHeight },
          position: { x: newX, y: newY },
        };
      });
    });
  }, []);

  // Restore minimized window (ensuring it is safely visible on-screen)
  const restoreWindow = useCallback(
    (id) => {
      setOpenWindows((prev) => {
        nextZIndex += 1;
        return prev.map((win) => {
          if (win.id === id) {
            // Check if coordinates are off-screen
            const minX = 10;
            const maxX = Math.max(minX, window.innerWidth - 180);
            const minY = 40;
            const maxY = Math.max(minY, window.innerHeight - 80);

            const isOutOfBounds =
              win.position.x < minX ||
              win.position.x > maxX ||
              win.position.y < minY ||
              win.position.y > maxY;

            let finalPos = win.position;
            if (isOutOfBounds) {
              const defaultWidth = win.size.width || 720;
              const defaultHeight = win.size.height || 480;
              finalPos = {
                x: Math.max(minX, Math.min(maxX, Math.round((window.innerWidth - defaultWidth) / 2))),
                y: Math.max(minY, Math.min(maxY, Math.round((window.innerHeight - defaultHeight) / 2))),
              };
            }

            return {
              ...win,
              isMinimized: false,
              zIndex: nextZIndex,
              position: finalPos,
            };
          }
          return win;
        });
      });
      setActiveWindowId(id);
    },
    []
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
      closeAllWindows,
      minimizeWindow,
      restoreWindow,
      resetWindow,
      resetAllWindows,
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
      closeAllWindows,
      minimizeWindow,
      restoreWindow,
      resetWindow,
      resetAllWindows,
      toggleMaximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
};

export default WindowContext;
