import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowLeft,
  Calendar,
  Building2,
  Code2,
  AlertCircle,
  FileCode,
  Image as ImageIcon,
} from 'lucide-react';
import { projects } from '../../../config/projects';

export default function ProjectsApp() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'FLAGSHIP') return p.isFlagship;
    if (filter === 'FULLSTACK') return p.category === 'Full Stack';
    if (filter === 'FRONTEND') return p.category === 'Frontend';
    if (filter === 'PYTHON') return p.category.includes('Python');
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-dev-surface/95 text-slate-100 select-text font-sans">
      {/* Top Header / Sub-bar */}
      <div className="px-5 py-3 border-b border-white/5 bg-dev-elevated/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          {selectedProject ? (
            <button
              onClick={() => setSelectedProjectId(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-dev-cyan text-xs font-mono transition-colors"
            >
              <ArrowLeft size={13} />
              <span>PROJECTS_INDEX</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FolderGit2 size={14} className="text-dev-emerald" />
              <span className="font-semibold text-white">REPOSITORIES & SYSTEMS</span>
              <span className="text-slate-500">({projects.length} Total)</span>
            </div>
          )}
        </div>

        {/* Filter Chips (Only visible when no specific project is focused) */}
        {!selectedProject && (
          <div className="flex items-center gap-1 text-[11px] font-mono overflow-x-auto">
            {['ALL', 'FLAGSHIP', 'FULLSTACK', 'FRONTEND', 'PYTHON'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === cat
                    ? 'bg-dev-cyan/15 text-dev-cyan border border-dev-cyan/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            /* Deep Architectural Details View */
            <motion.div
              key="project-details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Header Card */}
              <div className="p-5 rounded-os bg-dev-elevated/40 border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-dev-emerald uppercase tracking-wider mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-dev-emerald" />
                      {selectedProject.isFlagship ? 'FLAGSHIP ARCHITECTURE' : 'SUPPORTING REPOSITORY'}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {selectedProject.name}
                      </h2>
                      {selectedProject.productName && (
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-dev-cyan/15 border border-dev-cyan/40 text-dev-cyan font-bold tracking-wide">
                          Product: {selectedProject.productName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-3">
                      {selectedProject.organization && (
                        <span className="flex items-center gap-1">
                          <Building2 size={12} className="text-dev-cyan" />
                          {selectedProject.organization}
                        </span>
                      )}
                      {selectedProject.period && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-dev-amber" />
                          {selectedProject.period}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-colors"
                      >
                        <Github size={13} />
                        <span>Source Code</span>
                        <ExternalLink size={11} className="text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Screenshots Gallery (if available) */}
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-dev-cyan uppercase tracking-wider">
                      <ImageIcon size={13} />
                      <span>// SYSTEM SCREENSHOT PREVIEW</span>
                    </div>
                    <div className="space-y-3">
                      {selectedProject.screenshots.map((screen, idx) => (
                        <div
                          key={idx}
                          className="rounded-os border border-white/15 overflow-hidden bg-black/60 shadow-2xl group relative"
                        >
                          <img
                            src={screen.url}
                            alt={screen.caption || selectedProject.name}
                            className="w-full h-auto object-cover max-h-[440px] transition-transform duration-300 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                          {screen.caption && (
                            <div className="p-3 bg-dev-elevated/90 border-t border-white/10 text-xs text-slate-300 font-sans flex items-center justify-between gap-2">
                              <span>{screen.caption}</span>
                              <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                Verified Capture
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedProject.tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs font-mono text-slate-500 mr-1">Stack:</span>
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-dev-cyan/10 border border-dev-cyan/20 text-dev-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-os bg-dev-elevated/20 border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-dev-rose">
                    <AlertCircle size={14} />
                    <span className="font-semibold">// PROBLEM STATEMENT</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-os bg-dev-elevated/20 border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-dev-emerald">
                    <CheckCircle2 size={14} />
                    <span className="font-semibold">// ENGINEERED SOLUTION</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Breakdown */}
              {selectedProject.architecture && (
                <div className="p-4 rounded-os bg-dev-elevated/20 border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-dev-cyan">
                    <Layers size={14} />
                    <span className="font-semibold">// SYSTEM ARCHITECTURE</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-black/30 p-3 rounded border border-white/5">
                    {selectedProject.architecture}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {selectedProject.features && (
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    // KEY CAPABILITIES & SYSTEM MODULES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 size={14} className="text-dev-emerald shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Learnings */}
              {(selectedProject.challenges || selectedProject.learnings) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {selectedProject.challenges && (
                    <div className="p-3.5 rounded-os bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[11px] font-mono text-dev-amber block">
                        // TECHNICAL CHALLENGES
                      </span>
                      <p className="text-xs text-slate-400">
                        {selectedProject.challenges}
                      </p>
                    </div>
                  )}
                  {selectedProject.learnings && (
                    <div className="p-3.5 rounded-os bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[11px] font-mono text-dev-cyan block">
                        // KEY TAKEAWAYS & MASTERY
                      </span>
                      <p className="text-xs text-slate-400">
                        {selectedProject.learnings}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* Projects Grid / Catalog View */
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className="group p-5 rounded-os bg-dev-elevated/30 hover:bg-dev-elevated/60 border border-white/5 hover:border-dev-cyan/40 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FolderGit2
                          size={16}
                          className={project.isFlagship ? 'text-dev-emerald' : 'text-dev-cyan'}
                        />
                        <span className="text-xs font-mono text-slate-400">
                          {project.organization || 'Personal Project'}
                        </span>
                      </div>
                      {project.isFlagship && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dev-emerald/10 border border-dev-emerald/30 text-dev-emerald font-semibold">
                          FLAGSHIP
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-dev-cyan transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((stk) => (
                        <span
                          key={stk}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                        >
                          {stk}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-500">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-dev-cyan group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Inspect</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
