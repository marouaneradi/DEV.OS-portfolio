import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, Copy, X, ArrowLeft } from 'lucide-react';
import { useWindow } from '../../context/WindowContext';
import { APPS_DATA } from './IconGrid';

export default function WindowFrame({ window: win, children }) {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    resetWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindow();

  const dragControls = useDragControls();
  const frameRef = useRef(null);
  const isActive = activeWindowId === win.id;

  // Track viewport size for mobile responsiveness
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Retrieve app metadata for icon & coloring
  const appMeta = APPS_DATA.find((a) => a.id === win.appId) || {};
  const IconComponent = appMeta.icon;

  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleResizeMouseDown = useCallback(
    (e) => {
      if (isMobile) return;
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
    [focusWindow, win.id, win.size.width, win.size.height, isMobile]
  );

  useEffect(() => {
    if (!isResizing || isMobile) return;

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
  }, [isResizing, isMobile, win.id, updateWindowSize]);

  // If minimized, do not render on canvas
  if (win.isMinimized) {
    return null;
  }

  // Calculate layout style depending on mobile / maximize state
  let windowStyle;
  if (isMobile) {
    windowStyle = {
      position: 'fixed',
      top: '36px',
      left: 0,
      right: 0,
      width: '100%',
      height: 'calc(100dvh - 36px)',
      zIndex: win.zIndex,
    };
  } else if (win.isMaximized) {
    windowStyle = {
      position: 'fixed',
      top: '36px',
      left: 0,
      width: '100vw',
      height: 'calc(100vh - 36px - 44px)', // Account for topbar and bottom taskbar
      zIndex: win.zIndex,
    };
  } else {
    windowStyle = {
      position: 'absolute',
      left: `${win.position.x}px`,
      top: `${win.position.y}px`,
      width: `${win.size.width}px`,
      height: `${win.size.height}px`,
      zIndex: win.zIndex,
    };
  }

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, scale: isMobile ? 1 : 0.94, y: isMobile ? 20 : 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: isMobile ? 1 : 0.94, y: isMobile ? 20 : 10 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      drag={!win.isMaximized && !isMobile}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={{
        top: 38,
        left: 10,
        right: Math.max(10, window.innerWidth - 180),
        bottom: Math.max(38, window.innerHeight - 60),
      }}
      onDragEnd={(_, info) => {
        if (isMobile) return;
        const minX = 10;
        const maxX = Math.max(minX, window.innerWidth - 180);
        const minY = 38;
        const maxY = Math.max(minY, window.innerHeight - 60);

        const newX = Math.max(minX, Math.min(maxX, win.position.x + info.offset.x));
        const newY = Math.max(minY, Math.min(maxY, win.position.y + info.offset.y));
        updateWindowPosition(win.id, { x: newX, y: newY });
      }}
      onMouseDown={() => focusWindow(win.id)}
      style={windowStyle}
      className={`flex flex-col bg-dev-surface/95 backdrop-blur-xl border transition-colors duration-150 select-none ${
        isMobile
          ? 'rounded-none border-x-0 border-b-0 shadow-none'
          : win.isMaximized
          ? 'rounded-none border-x-0'
          : 'rounded-os shadow-os-window'
      } ${
        isActive
          ? 'border-dev-cyan/50 shadow-os-active ring-1 ring-dev-cyan/20'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Window Title Bar */}
      <div
        onPointerDown={(e) => {
          if (!win.isMaximized && !isMobile) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={() => {
          if (!isMobile) resetWindow(win.id);
        }}
        title={isMobile ? undefined : "Drag to move • Double-click to reset position"}
        className={`h-10 md:h-9 px-3.5 bg-dev-elevated/95 border-b border-white/5 flex items-center justify-between text-xs font-mono select-none flex-shrink-0 ${
          !isMobile && !win.isMaximized ? 'cursor-move' : 'cursor-default'
        } ${isActive ? 'text-slate-100' : 'text-slate-400'}`}
      >
        {/* Left: Window Icon & Title / Back button on mobile */}
        <div className="flex items-center gap-2 truncate pr-2">
          {isMobile && (
            <button
              onClick={() => closeWindow(win.id)}
              className="flex items-center gap-1 text-[11px] px-2 py-1 -ml-1 rounded bg-white/5 hover:bg-white/10 text-dev-cyan font-mono border border-dev-cyan/30 mr-1"
              title="Return to Desktop"
            >
              <ArrowLeft size={13} />
              <span>Desktop</span>
            </button>
          )}
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
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {/* Minimize (Desktop only) */}
          {!isMobile && (
            <button
              onClick={() => minimizeWindow(win.id)}
              title="Minimize"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Minus size={12} />
            </button>
          )}

          {/* Maximize / Restore (Desktop only) */}
          {!isMobile && (
            <button
              onClick={() => toggleMaximizeWindow(win.id)}
              title={win.isMaximized ? 'Restore' : 'Maximize'}
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {win.isMaximized ? <Copy size={11} /> : <Square size={11} />}
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => closeWindow(win.id)}
            title="Close"
            className="w-7 h-7 md:w-6 md:h-6 rounded flex items-center justify-center text-slate-400 hover:text-dev-rose hover:bg-dev-rose/20 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-dev-surface/50 text-slate-200 overscroll-contain pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right, Desktop only) */}
      {!win.isMaximized && !isMobile && (
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
