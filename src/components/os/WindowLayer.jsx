import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindow } from '../../context/WindowContext';
import WindowFrame from './WindowFrame';
import AboutApp from '../apps/AboutApp/AboutApp';
import ProjectsApp from '../apps/ProjectsApp/ProjectsApp';
import SkillsUniverseApp from '../apps/SkillsUniverseApp/SkillsUniverseApp';
import JourneyApp from '../apps/JourneyApp/JourneyApp';
import LabApp from '../apps/LabApp/LabApp';
import TerminalApp from '../apps/TerminalApp/TerminalApp';
import ContactApp from '../apps/ContactApp/ContactApp';
import RadiAIApp from '../apps/RadiAIApp/RadiAIApp';

function renderAppContent(win, onTriggerMatrix) {
  switch (win.appId) {
    case 'about':
      return <AboutApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'skills':
      return <SkillsUniverseApp />;
    case 'journey':
      return <JourneyApp />;
    case 'lab':
      return <LabApp />;
    case 'terminal':
      return <TerminalApp onTriggerMatrix={onTriggerMatrix} />;
    case 'contact':
      return <ContactApp />;
    case 'radi-ai':
      return <RadiAIApp />;
    default:
      return (
        <div className="h-full min-h-[220px] p-6 flex flex-col items-center justify-center text-center font-mono space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dev-cyan text-sm font-bold">
            {win.appId.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {win.title}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Application mounted inside DEV.OS window engine.
            </p>
          </div>
          <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-slate-400">
            {win.filename}
          </div>
        </div>
      );
  }
}

export default function WindowLayer({ onTriggerMatrix }) {
  const { openWindows } = useWindow();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {openWindows.map((win) => (
          <div key={win.id} className="pointer-events-auto">
            <WindowFrame window={win}>
              {renderAppContent(win, onTriggerMatrix)}
            </WindowFrame>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
