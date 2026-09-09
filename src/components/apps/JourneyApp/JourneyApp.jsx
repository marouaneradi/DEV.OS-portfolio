import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ScrollText,
  Calendar,
  Building2,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
} from 'lucide-react';
import { timeline } from '../../../config/timeline';

export default function JourneyApp() {
  const [filter, setFilter] = useState('ALL');

  const filteredLogs = timeline.filter((entry) => {
    if (filter === 'ALL') return true;
    return entry.type === filter;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'EDUCATION':
        return {
          icon: GraduationCap,
          color: 'text-dev-emerald border-dev-emerald/30 bg-dev-emerald/10',
        };
      case 'INTERNSHIP':
        return {
          icon: Briefcase,
          color: 'text-dev-cyan border-dev-cyan/30 bg-dev-cyan/10',
        };
      case 'PROJECT':
        return {
          icon: Layers,
          color: 'text-dev-amber border-dev-amber/30 bg-dev-amber/10',
        };
      case 'CERTIFICATION':
        return {
          icon: ShieldCheck,
          color: 'text-dev-violet border-dev-violet/30 bg-dev-violet/10',
        };
      default:
        return {
          icon: Terminal,
          color: 'text-slate-300 border-white/10 bg-white/5',
        };
    }
  };

  return (
    <div className="h-full flex flex-col bg-dev-surface/95 text-slate-100 select-text font-sans">
      {/* Top Telemetry Bar */}
      <div className="px-5 py-3 border-b border-white/5 bg-dev-elevated/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono">
          <ScrollText size={15} className="text-dev-amber" />
          <span className="font-semibold text-white">SYS_JOURNAL.LOG</span>
          <span className="text-slate-500 font-normal">
            // HISTORICAL AUDIT LOGS (2023–2026)
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1 text-[11px] font-mono overflow-x-auto">
          {['ALL', 'EDUCATION', 'INTERNSHIP', 'PROJECT', 'CERTIFICATION'].map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === type
                    ? 'bg-dev-amber/20 text-dev-amber border border-dev-amber/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Journal Feed */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
        <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8">
          {filteredLogs.map((log, index) => {
            const badge = getTypeBadge(log.type);
            const IconComponent = badge.icon;

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Node beacon on timeline line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-dev-surface border-2 border-dev-amber flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-dev-amber animate-pulse" />
                </div>

                {/* Entry Card */}
                <div className="p-5 rounded-os bg-dev-elevated/30 hover:bg-dev-elevated/60 border border-white/5 hover:border-dev-amber/40 transition-all duration-200 space-y-3">
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-dev-amber">
                        [{log.year}]
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        @{log.timestamp}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${badge.color}`}
                    >
                      <IconComponent size={11} />
                      <span>{log.type}</span>
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-dev-amber transition-colors">
                      {log.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Building2 size={12} className="text-dev-cyan" />
                      <span>{log.organization}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {log.description}
                  </p>

                  {/* Tags */}
                  {log.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
