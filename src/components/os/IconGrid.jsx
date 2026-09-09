import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  FolderGit2,
  Network,
  ScrollText,
  FlaskConical,
  Terminal as TerminalIcon,
  Send,
  Bot,
} from 'lucide-react';
import { useWindow } from '../../context/WindowContext';

export const APPS_DATA = [
  {
    id: 'about',
    name: 'About Me',
    filename: 'about.sys',
    icon: User,
    color: 'text-dev-cyan',
    bgColor: 'bg-dev-cyan/10',
    borderColor: 'group-hover:border-dev-cyan/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]',
  },
  {
    id: 'projects',
    name: 'Projects',
    filename: 'projects.app',
    icon: FolderGit2,
    color: 'text-dev-emerald',
    bgColor: 'bg-dev-emerald/10',
    borderColor: 'group-hover:border-dev-emerald/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
  },
  {
    id: 'skills',
    name: 'Skills Universe',
    filename: 'skills.net',
    icon: Network,
    color: 'text-dev-violet',
    bgColor: 'bg-dev-violet/10',
    borderColor: 'group-hover:border-dev-violet/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]',
  },
  {
    id: 'journey',
    name: 'Developer Journey',
    filename: 'journey.log',
    icon: ScrollText,
    color: 'text-dev-amber',
    bgColor: 'bg-dev-amber/10',
    borderColor: 'group-hover:border-dev-amber/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]',
  },
  {
    id: 'lab',
    name: 'Lab',
    filename: 'lab.exp',
    icon: FlaskConical,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'group-hover:border-pink-400/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(244,114,182,0.25)]',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    filename: 'terminal.sh',
    icon: TerminalIcon,
    color: 'text-dev-cyan',
    bgColor: 'bg-dev-cyan/10',
    borderColor: 'group-hover:border-dev-cyan/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]',
  },
  {
    id: 'contact',
    name: 'Contact',
    filename: 'contact.msg',
    icon: Send,
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    borderColor: 'group-hover:border-sky-400/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]',
  },
  {
    id: 'radi-ai',
    name: 'RADI AI',
    filename: 'radi.ai',
    icon: Bot,
    color: 'text-teal-300',
    bgColor: 'bg-teal-400/10',
    borderColor: 'group-hover:border-teal-400/50',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(45,212,191,0.25)]',
  },
];

export default function IconGrid({ onAppClick }) {
  const { openWindow } = useWindow();

  const handleClick = (app) => {
    openWindow(app.id);
    if (onAppClick) {
      onAppClick(app);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-5 p-4 max-w-6xl w-full mx-auto">
      {APPS_DATA.map((app, index) => {
        const IconComponent = app.icon;

        return (
          <motion.button
            key={app.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleClick(app)}
            className={`group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-os bg-dev-surface/40 hover:bg-dev-surface/80 border border-white/5 ${app.borderColor} ${app.glowColor} backdrop-blur-sm transition-all duration-200 cursor-pointer text-center outline-none focus-visible:ring-2 focus-visible:ring-dev-cyan`}
          >
            {/* Icon Tile */}
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg ${app.bgColor} flex items-center justify-center mb-2 sm:mb-2.5 transition-transform duration-200 group-hover:scale-110`}
            >
              <IconComponent size={22} className={app.color} />
            </div>

            {/* Application Name */}
            <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors duration-150 tracking-wide truncate max-w-full">
              {app.name}
            </span>

            {/* Technical Sub-label */}
            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors duration-150 mt-0.5">
              {app.filename}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
