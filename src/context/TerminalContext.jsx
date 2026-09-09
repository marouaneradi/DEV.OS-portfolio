import { createContext, useContext } from 'react';

export const TerminalContext = createContext(null);

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  return context;
};

export const TerminalProvider = ({ children }) => {
  return (
    <TerminalContext.Provider value={{}}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalContext;
