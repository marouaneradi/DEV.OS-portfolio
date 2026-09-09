import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { useWindow } from '../../../context/WindowContext';
import { profile } from '../../../config/profile';
import { projects } from '../../../config/projects';

export default function TerminalApp({ onTriggerMatrix }) {
  const { openWindow } = useWindow();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'DEV.OS Command Line Interface [Version 1.0.4]',
    },
    {
      type: 'system',
      text: 'Type "help" to view available commands, or explore hidden commands.',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, { type: 'input', text: trimmed }];

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available DEV.OS commands:
  ai / radi   - Launch RADI AI offline assistant
  about       - Display developer summary & open about.sys
  projects    - List flagship software & open projects.app
  skills      - Inspect technologies & open skills.net
  journey     - Print chronological system history logs
  lab         - Launch interactive developer lab
  contact     - View direct contact details & links
  github      - Open official GitHub profile
  matrix      - Trigger digital Matrix rain mode
  whoami      - Print current session developer identity
  date        - Print current system date & time
  cat <file>  - Read virtual file (bio.txt, stack.txt, certs.txt)
  sudo        - Request superuser privileges
  clear       - Clear the terminal screen`,
        });
        break;

      case 'ai':
      case 'radi':
      case 'radi-ai':
        newHistory.push({
          type: 'output',
          text: `Launching RADI AI offline assistant...`,
        });
        openWindow('radi-ai');
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `[about.sys] ${profile.name} — ${profile.title}\n${profile.summary}\nLocation: ${profile.location}\nOpening About Me window...`,
        });
        openWindow('about');
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Flagship Projects:\n` +
            projects
              .map((p) => `  * ${p.name} [${p.stack.join(', ')}]`)
              .join('\n') +
            `\nOpening Projects application window...`,
        });
        openWindow('projects');
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Core Tech: React, Laravel, JavaScript, PHP, MySQL, MongoDB, Docker, Python, Git, Tailwind CSS.\nOpening Skills Universe...`,
        });
        openWindow('skills');
        break;

      case 'journey':
        newHistory.push({
          type: 'output',
          text: `Opening Developer Journey logs...`,
        });
        openWindow('journey');
        break;

      case 'lab':
        newHistory.push({
          type: 'output',
          text: `Opening Developer Lab (SQL / Regex / API playgrounds)...`,
        });
        openWindow('lab');
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${profile.email}\nPhone: ${profile.phone}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\nOpening Contact application...`,
        });
        openWindow('contact');
        break;

      case 'github':
        window.open(profile.github, '_blank', 'noopener,noreferrer');
        newHistory.push({
          type: 'output',
          text: `Navigating to ${profile.github}...`,
        });
        break;

      case 'matrix':
        if (onTriggerMatrix) {
          onTriggerMatrix();
        }
        newHistory.push({
          type: 'output',
          text: `[!] Matrix visual subsystem engaged. Press ESC or click anywhere to exit.`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${profile.name} (${profile.title}) @ Ouarzazate, Morocco`,
        });
        break;

      case 'date':
        newHistory.push({
          type: 'output',
          text: new Date().toString(),
        });
        break;

      case 'sudo':
        newHistory.push({
          type: 'output',
          text: `marouane is already in sudoers group. Access granted. You are root.`,
        });
        break;

      case 'cat':
        if (args[0] === 'bio.txt') {
          newHistory.push({ type: 'output', text: profile.summary });
        } else if (args[0] === 'certs.txt') {
          newHistory.push({
            type: 'output',
            text: profile.certifications.join('\n'),
          });
        } else if (args[0] === 'stack.txt') {
          newHistory.push({
            type: 'output',
            text: 'Laravel, React, JavaScript, PHP, MySQL, MongoDB, Docker, Python, Tailwind, Git',
          });
        } else {
          newHistory.push({
            type: 'output',
            text: `cat: ${args[0] || 'missing file'}: No such file. Try: cat bio.txt, cat certs.txt, cat stack.txt`,
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'output',
          text: `Command not found: "${command}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-black/90 p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-y-auto flex flex-col justify-between cursor-text select-text"
    >
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'system' && (
              <p className="text-slate-500">{item.text}</p>
            )}
            {item.type === 'input' && (
              <div className="flex items-center gap-2 text-dev-cyan">
                <span className="text-dev-emerald">marouane@dev-os:~$</span>
                <span>{item.text}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap pl-2 border-l border-white/10 font-mono">
                {item.text}
              </pre>
            )}
          </div>
        ))}

        {/* Input prompt line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-dev-emerald font-bold shrink-0">
            marouane@dev-os:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono"
          />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
