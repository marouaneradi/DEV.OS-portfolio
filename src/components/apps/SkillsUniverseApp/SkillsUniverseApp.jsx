import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  Cpu,
  Layers,
  Code2,
  Database,
  Wrench,
  CheckCircle2,
  FolderGit2,
  Sparkles,
  Search,
} from 'lucide-react';
import { skills } from '../../../config/skills';
import { projects } from '../../../config/projects';

export default function SkillsUniverseApp() {
  const [selectedSkillId, setSelectedSkillId] = useState('react');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedSkill = skills.find((s) => s.id === selectedSkillId) || skills[0];

  const categories = ['ALL', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = activeCategory === 'ALL' || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Projects associated with selected skill
  const associatedProjects = projects.filter((p) =>
    selectedSkill?.projects?.includes(p.id)
  );

  // Related skill objects
  const relatedSkillNodes = skills.filter((s) =>
    selectedSkill?.related?.includes(s.id)
  );

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Frontend':
        return 'text-dev-cyan border-dev-cyan/30 bg-dev-cyan/10';
      case 'Backend':
        return 'text-dev-emerald border-dev-emerald/30 bg-dev-emerald/10';
      case 'Database':
        return 'text-dev-amber border-dev-amber/30 bg-dev-amber/10';
      case 'Tools':
        return 'text-dev-violet border-dev-violet/30 bg-dev-violet/10';
      default:
        return 'text-slate-300 border-white/10 bg-white/5';
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-dev-surface/95 text-slate-100 select-text font-sans">
      {/* Left / Top: Node Grid & Category Cluster */}
      <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/5 overflow-hidden">
        {/* Controls Bar */}
        <div className="p-4 border-b border-white/5 bg-dev-elevated/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Network size={15} className="text-dev-violet" />
            <span className="font-semibold text-white">TECH UNIVERSE</span>
            <span className="text-slate-500 font-normal hidden sm:inline">
              // CONNECTED NODE GRAPH
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 sm:w-40 pl-7 pr-2.5 py-1 text-xs rounded bg-black/40 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-dev-cyan/50 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 py-2 border-b border-white/5 bg-dev-elevated/20 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-0.5 rounded transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-dev-violet/20 text-dev-violet border border-dev-violet/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Node Matrix Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              const colorClasses = getCategoryColor(skill.category);

              return (
                <motion.button
                  key={skill.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`p-3.5 rounded-os text-left transition-all duration-150 relative border flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-dev-elevated/90 border-dev-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] ring-1 ring-dev-cyan/40'
                      : 'bg-dev-elevated/30 hover:bg-dev-elevated/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white tracking-wide truncate">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${colorClasses}`}
                    >
                      {skill.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
                    <span>{skill.concepts.length} concepts</span>
                    <span className="text-slate-400">
                      {skill.projects.length} {skill.projects.length === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right / Bottom: Selected Node Telemetry Inspector */}
      <div className="w-full md:w-80 lg:w-96 bg-dev-elevated/30 flex flex-col shrink-0 overflow-y-auto p-5 space-y-6">
        {selectedSkill && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Node Header */}
              <div className="border-b border-white/5 pb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider bg-white/5 border-white/10 text-dev-cyan">
                    NODE // {selectedSkill.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-dev-emerald animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedSkill.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedSkill.description}
                </p>
              </div>

              {/* Mastered Concepts */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={13} className="text-dev-cyan" />
                  <span>// CORE CAPABILITIES & CONCEPTS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.concepts.map((concept, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Applied In Projects */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 size={13} className="text-dev-emerald" />
                  <span>// APPLIED IN REAL PROJECTS</span>
                </div>
                {associatedProjects.length > 0 ? (
                  <div className="space-y-2">
                    {associatedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded bg-white/5 border border-white/5 space-y-1"
                      >
                        <div className="text-xs font-semibold text-white">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {p.organization} ({p.period})
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-mono italic">
                    Utilized in general development workflows and toolchain.
                  </p>
                )}
              </div>

              {/* Connected / Related Nodes */}
              {relatedSkillNodes.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={13} className="text-dev-violet" />
                    <span>// CONNECTED GRAPH EDGES</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {relatedSkillNodes.map((related) => (
                      <button
                        key={related.id}
                        onClick={() => setSelectedSkillId(related.id)}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-dev-violet/10 hover:bg-dev-violet/20 border border-dev-violet/30 text-dev-violet transition-colors flex items-center gap-1"
                      >
                        <span>{related.name}</span>
                        <span>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
