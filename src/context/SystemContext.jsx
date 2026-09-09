import { createContext, useContext, useState, useCallback } from 'react';

export const SystemContext = createContext(null);

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};

export const SystemProvider = ({ children }) => {
  const [booted, setBooted] = useState(false);

  const completeBoot = useCallback(() => {
    setBooted(true);
  }, []);

  const value = {
    booted,
    setBooted,
    completeBoot,
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
};

export default SystemContext;
