import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, Copy, X } from 'lucide-react';
import { useWindow } from '../../context/WindowContext';
import { APPS_DATA } from './IconGrid';

export default function WindowFrame({ window: win, children }) {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindow();

  const dragControls = useDragControls();
  const frameRef = useRef(null);
  const isActive = activeWindowId === win.id;

  // Retrieve app metadata for icon & coloring
  const appMeta = APPS_DATA.find((a) => a.id === win.appId) || {};
  const IconComponent = appMeta.icon;

  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleResizeMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      focusWindow(win.id);
      setIsResizing(true);
      resizeStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        w: win.size.width,
        h: win.size.height,
      };
    },
    [focusWindow, win.id, win.size.width, win.size.height]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - resizeStartPos.current.x;
      const deltaY = e.clientY - resizeStartPos.current.y;

      const newWidth = Math.min(
        window.innerWidth - 20,
        Math.max(380, resizeStartPos.current.w + deltaX)
      );
      const newHeight = Math.min(
        window.innerHeight - 80,
        Math.max(260, resizeStartPos.current.h + deltaY)
      );

      updateWindowSize(win.id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, win.id, updateWindowSize]);

  // If minimized, do not render on canvas
  if (win.isMinimized) {
    return null;
  }

  // Calculate layout style depending on maximize state
  const windowStyle = win.isMaximized
    ? {
        position: 'fixed',
        top: '36px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 36px - 44px)', // Account for topbar and bottom taskbar
        zIndex: win.zIndex,
      }
    : {
        position: 'absolute',
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      drag={!win.isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const newX = Math.max(10, Math.min(window.innerWidth - 120, win.position.x + info.offset.x));
        const newY = Math.max(40, Math.min(window.innerHeight - 100, win.position.y + info.offset.y));
        updateWindowPosition(win.id, { x: newX, y: newY });
      }}
      onMouseDown={() => focusWindow(win.id)}
      style={windowStyle}
      className={`flex flex-col bg-dev-surface/95 backdrop-blur-xl border transition-colors duration-150 overflow-hidden select-none ${
        win.isMaximized ? 'rounded-none border-x-0' : 'rounded-os shadow-os-window'
      } ${
        isActive
          ? 'border-dev-cyan/50 shadow-os-active ring-1 ring-dev-cyan/20'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Window Title Bar */}
      <div
        onPointerDown={(e) => {
          if (!win.isMaximized) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={() => toggleMaximizeWindow(win.id)}
        className={`h-9 px-3.5 bg-dev-elevated/90 border-b border-white/5 flex items-center justify-between cursor-move text-xs font-mono select-none ${
          isActive ? 'text-slate-100' : 'text-slate-400'
        }`}
      >
        {/* Left: Window Icon & Title */}
        <div className="flex items-center gap-2 truncate pr-2">
          {IconComponent && (
            <IconComponent size={14} className={isActive ? appMeta.color : 'text-slate-500'} />
          )}
          <span className="font-semibold text-slate-200 truncate">{win.title}</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline truncate font-normal">
            — {win.filename}
          </span>
        </div>

        {/* Right: Window Controls */}
        <div
          className="flex items-center gap-1.5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Minimize */}
          <button
            onClick={() => minimizeWindow(win.id)}
            title="Minimize"
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Minus size={12} />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => toggleMaximizeWindow(win.id)}
            title={win.isMaximized ? 'Restore' : 'Maximize'}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {win.isMaximized ? <Copy size={11} /> : <Square size={11} />}
          </button>

          {/* Close */}
          <button
            onClick={() => closeWindow(win.id)}
            title="Close"
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-dev-rose hover:bg-dev-rose/20 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto bg-dev-surface/50 text-slate-200">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right) */}
      {!win.isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20 flex items-end justify-end p-0.5"
          title="Resize window"
        >
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="text-slate-500">
            <path d="M6 6L6 2L2 6L6 6Z" fill="currentColor" fillOpacity="0.4" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
