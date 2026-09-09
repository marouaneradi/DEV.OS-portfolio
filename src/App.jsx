import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { SystemProvider, useSystem } from './context/SystemContext';
import { WindowProvider } from './context/WindowContext';
import BootScreen from './components/boot/BootScreen';
import Desktop from './components/os/Desktop';

function AppContent() {
  const { booted } = useSystem();

  return (
    <div className="min-h-screen bg-dev-base text-slate-100 font-sans relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootScreen key="boot-screen" />
        ) : (
          <WindowProvider key="window-provider">
            <Desktop key="dev-os-desktop" />
          </WindowProvider>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SystemProvider>
      <AppContent />
    </SystemProvider>
  );
}
