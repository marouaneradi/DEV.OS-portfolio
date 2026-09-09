import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import IconGrid from './IconGrid';
import WindowLayer from './WindowLayer';
import Taskbar from './Taskbar';
import CommandPalette from '../easter-eggs/CommandPalette';
import MatrixRain from '../easter-eggs/MatrixRain';

export default function Desktop() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  // Global keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-dev-base text-slate-100 overflow-hidden flex flex-col select-none">
      {/* Subtle Technical Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dev-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Status Bar */}
      <TopBar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onTriggerMatrix={() => setIsMatrixOpen(true)}
      />

      {/* Desktop Main Workspace & Background Identity */}
      <main className="relative z-10 flex-1 pt-12 pb-16 px-4 flex flex-col justify-between items-center overflow-y-auto">
        {/* Subtle Typographic Backdrop / Identity */}
        <div className="text-center my-auto flex flex-col items-center justify-center pointer-events-none select-none py-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dev-cyan font-mono text-[11px] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-dev-cyan animate-pulse" />
            DEV.OS // WORKSPACE
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 font-sans leading-none">
            MAROUANE RADI
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-slate-400 uppercase">
            FULL STACK WEB DEVELOPER
          </p>
        </div>

        {/* Application Icons Grid */}
        <div className="w-full">
          <IconGrid />
        </div>
      </main>

      {/* Floating Active Windows Layer */}
      <WindowLayer onTriggerMatrix={() => setIsMatrixOpen(true)} />

      {/* Bottom Taskbar / Open Windows Switcher */}
      <Taskbar />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onTriggerMatrix={() => {
          setIsCommandPaletteOpen(false);
          setIsMatrixOpen(true);
        }}
      />

      {/* Matrix Stream Easter Egg Overlay */}
      <AnimatePresence>
        {isMatrixOpen && <MatrixRain onClose={() => setIsMatrixOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
