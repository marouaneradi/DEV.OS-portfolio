import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  User,
  FolderGit2,
  Network,
  ScrollText,
  FlaskConical,
  Terminal,
  Send,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Bot,
  LayoutGrid,
  XSquare,
} from 'lucide-react';
import { useWindow } from '../../context/WindowContext';
import { profile } from '../../config/profile';

export default function CommandPalette({ isOpen, onClose, onTriggerMatrix }) {
  const { openWindow, resetAllWindows, closeAllWindows } = useWindow();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'action-reset-windows',
      name: 'Reset All Windows (Tidy Desktop)',
      category: 'Window Control',
      icon: LayoutGrid,
      action: () => resetAllWindows(),
    },
    {
      id: 'action-close-all',
      name: 'Close All Windows (Clean Desktop)',
      category: 'Window Control',
      icon: XSquare,
      action: () => closeAllWindows(),
    },
    {
      id: 'app-radi-ai',
      name: 'Ask RADI AI (Offline Assistant)',
      category: 'Application',
      icon: Bot,
      action: () => openWindow('radi-ai'),
    },
    {
      id: 'app-about',
      name: 'Open About Me',
      category: 'Application',
      icon: User,
      action: () => openWindow('about'),
    },
    {
      id: 'app-projects',
      name: 'Browse Projects',
      category: 'Application',
      icon: FolderGit2,
      action: () => openWindow('projects'),
    },
    {
      id: 'app-skills',
      name: 'Explore Tech Universe',
      category: 'Application',
      icon: Network,
      action: () => openWindow('skills'),
    },
    {
      id: 'app-journey',
      name: 'View System Audit Logs (Journey)',
      category: 'Application',
      icon: ScrollText,
      action: () => openWindow('journey'),
    },
    {
      id: 'app-lab',
      name: 'Launch Developer Lab',
      category: 'Application',
      icon: FlaskConical,
      action: () => openWindow('lab'),
    },
    {
      id: 'app-terminal',
      name: 'Open CLI Terminal',
      category: 'Application',
      icon: Terminal,
      action: () => openWindow('terminal'),
    },
    {
      id: 'app-contact',
      name: 'Message Dispatcher (Contact)',
      category: 'Application',
      icon: Send,
      action: () => openWindow('contact'),
    },
    {
      id: 'action-matrix',
      name: 'Trigger Matrix Rain Effect',
      category: 'Easter Egg',
      icon: Sparkles,
      action: () => {
        if (onTriggerMatrix) onTriggerMatrix();
      },
    },
    {
      id: 'ext-github',
      name: 'Visit GitHub Profile (@marouaneradi)',
      category: 'External',
      icon: Github,
      action: () => window.open(profile.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'ext-linkedin',
      name: 'Connect on LinkedIn (Marouane Radi)',
      category: 'External',
      icon: Linkedin,
      action: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer'),
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredActions.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-os bg-dev-surface/95 border border-white/10 shadow-2xl overflow-hidden font-sans"
      >
        {/* Search input bar */}
        <div className="p-3.5 border-b border-white/10 flex items-center gap-3 bg-dev-elevated/40">
          <Search size={16} className="text-dev-cyan" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search applications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-slate-500 font-mono"
          />
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredActions.length > 0 ? (
            filteredActions.map((item, index) => {
              const IconComp = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-dev-cyan/15 text-white border border-dev-cyan/30'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp
                      size={15}
                      className={isSelected ? 'text-dev-cyan' : 'text-slate-400'}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-slate-500 font-mono">
              No matching commands or applications found.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-3.5 py-2 border-t border-white/5 bg-black/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>DEV.OS COMMAND PALETTE</span>
          <span>NAVIGATE [↑↓] • SELECT [ENTER]</span>
        </div>
      </motion.div>
    </div>
  );
}
