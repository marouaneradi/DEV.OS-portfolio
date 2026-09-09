import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '../../context/SystemContext';

const BOOT_LINES = [
  { text: 'INITIALIZING DEV.OS...', delay: 200, type: 'header' },
  { text: '> Loading developer profile...', delay: 700, type: 'log' },
  { text: '> Loading projects...', delay: 1200, type: 'log' },
  { text: '> Loading skills...', delay: 1700, type: 'log' },
  { text: '> Connecting repositories...', delay: 2200, type: 'log' },
  { text: '> System ready.', delay: 2700, type: 'ready' },
  { text: 'WELCOME, VISITOR.', delay: 3200, type: 'welcome' },
];

export default function BootScreen() {
  const { completeBoot } = useSystem();
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  // Progressive line reveal and progress simulation
  useEffect(() => {
    const timeouts = [];

    BOOT_LINES.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setProgress(Math.round(((index + 1) / BOOT_LINES.length) * 100));
      }, line.delay);
      timeouts.push(timeout);
    });

    // Auto complete boot after welcome line
    const finishTimeout = setTimeout(() => {
      completeBoot();
    }, 3900);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [completeBoot]);

  // Skip on any key press
  useEffect(() => {
    const handleKeyDown = () => {
      completeBoot();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeBoot]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.45, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 bg-dev-void text-slate-200 font-mono flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden"
    >
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-dev-cyan animate-pulse"></span>
          <span className="text-slate-400 font-semibold tracking-wider">DEV.OS // BOOT_SEQUENCE</span>
        </div>
        <button
          onClick={completeBoot}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-dev-cyan/10 border border-white/10 hover:border-dev-cyan/40 text-slate-400 hover:text-dev-cyan transition-all duration-200 cursor-pointer text-xs"
        >
          <span>SKIP</span>
          <span className="text-[10px] text-slate-500 group-hover:text-dev-cyan/80">[ESC / ANY KEY]</span>
        </button>
      </div>

      {/* Main Terminal Feed */}
      <div className="max-w-2xl w-full mx-auto my-auto space-y-3">
        <div className="space-y-2">
          {visibleLines.map((line, idx) => {
            const isLatest = idx === visibleLines.length - 1;
            const isWelcome = line.type === 'welcome';
            const isReady = line.type === 'ready';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-sm md:text-base tracking-wide flex items-center gap-2 ${
                  isWelcome
                    ? 'text-dev-cyan font-bold text-lg md:text-xl pt-3 tracking-widest'
                    : isReady
                    ? 'text-dev-emerald font-semibold'
                    : line.type === 'header'
                    ? 'text-white font-semibold'
                    : 'text-slate-400'
                }`}
              >
                <span>{line.text}</span>
                {isLatest && !isWelcome && (
                  <span className="inline-block w-2 h-4 bg-dev-cyan animate-[pulse_0.8s_ease-in-out_infinite]" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Progress Bar */}
        <div className="pt-6 space-y-1.5">
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span className="tracking-wider">SYSTEM INITIALIZATION</span>
            <span className="font-semibold text-dev-cyan">{progress}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-dev-blue via-dev-cyan to-dev-emerald"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom status / hint */}
      <div className="flex items-center justify-between text-xs text-slate-600 border-t border-white/5 pt-4">
        <span>DEV.OS v1.0.0</span>
        <span>PRESS ANY KEY TO SKIP</span>
      </div>
    </motion.div>
  );
}
