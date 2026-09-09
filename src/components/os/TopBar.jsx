import React, { useState, useEffect } from 'react';
import { GitBranch, Wifi, Activity, Search, Sparkles } from 'lucide-react';

export default function TopBar({ onOpenCommandPalette, onTriggerMatrix }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-9 z-40 bg-dev-surface/85 backdrop-blur-md border-b border-white/5 px-4 flex items-center justify-between text-xs font-mono select-none">
      {/* Left: System Identification */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold tracking-wider text-white">
          <span className="w-2 h-2 rounded-full bg-dev-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)] animate-pulse" />
          <span>DEV.OS</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-normal">
            v1.0.4
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-[11px] border-l border-white/10 pl-3">
          <span>marouane@radi</span>
        </div>
      </div>

      {/* Center: Quick Command Palette Trigger */}
      <div className="flex items-center">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors text-[11px] cursor-pointer"
        >
          <Search size={11} className="text-dev-cyan" />
          <span className="hidden sm:inline">Command Palette</span>
          <kbd className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 border border-white/10 text-dev-cyan font-mono">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Telemetry, Matrix Mode, & Clock */}
      <div className="flex items-center gap-3 sm:gap-4 text-slate-400">
        {/* Matrix button */}
        <button
          onClick={onTriggerMatrix}
          title="Toggle Matrix Stream (Easter Egg)"
          className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-dev-cyan transition-colors"
        >
          <Sparkles size={12} />
        </button>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
          <GitBranch size={12} className="text-dev-cyan" />
          <span>main</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          <Wifi size={13} className="text-dev-emerald" />
          <span className="hidden sm:inline text-slate-400">ONLINE</span>
        </div>

        <div className="border-l border-white/10 pl-3 font-semibold tracking-wider text-slate-200">
          {currentTime || '00:00:00'}
        </div>
      </div>
    </header>
  );
}
