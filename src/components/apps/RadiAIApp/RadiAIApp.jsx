import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Send,
  Sparkles,
  HelpCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { processUserQuery } from './intentEngine';

const INITIAL_MESSAGES = [
  {
    id: 'msg-welcome',
    sender: 'ai',
    text: `Greetings! I am RADI AI, an offline assistant running locally inside DEV.OS.
I can answer your questions about Marouane's projects, technical stack, ISTA education, or contact details.

Click one of the suggestions below or type your inquiry.`,
    timestamp: 'SYSTEM ONLINE',
  },
];

const SUGGESTIONS = [
  "What's his strongest project?",
  'What technologies does he use?',
  'Where did he study?',
  'What certifications does he hold?',
  'How can I contact him?',
];

export default function RadiAIApp() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Natural responsive simulated processing delay (350ms)
    setTimeout(() => {
      const replyText = processUserQuery(query);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-dev-surface/95 text-slate-100 select-text font-sans">
      {/* Top Telemetry Header */}
      <div className="px-4 py-2.5 border-b border-white/5 bg-dev-elevated/40 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="p-1 rounded bg-teal-400/10 text-teal-300">
            <Bot size={15} />
          </div>
          <span className="font-semibold text-white">RADI AI</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-400/10 border border-teal-400/30 text-teal-300 font-mono">
            OFFLINE ENGINE v1.0
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-dev-emerald animate-pulse" />
          <span className="hidden sm:inline">ZERO EXTERNAL CALLS</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2.5 max-w-2xl ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                  isUser
                    ? 'bg-dev-cyan/20 border border-dev-cyan/40 text-dev-cyan'
                    : 'bg-teal-400/10 border border-teal-400/30 text-teal-300'
                }`}
              >
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 rounded-os text-xs leading-relaxed space-y-1.5 ${
                  isUser
                    ? 'bg-dev-cyan/15 border border-dev-cyan/30 text-white rounded-tr-none'
                    : 'bg-dev-elevated/40 border border-white/10 text-slate-200 rounded-tl-none font-sans'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className="text-[10px] font-mono text-slate-500 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 mr-auto"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-400/10 border border-teal-400/30 text-teal-300 flex items-center justify-center">
              <Bot size={14} />
            </div>
            <div className="p-3 rounded-os bg-dev-elevated/40 border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-bounce [animation-delay:0.3s]" />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Query Chips */}
      <div className="px-4 py-2 border-t border-white/5 bg-dev-elevated/20 overflow-x-auto flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap mr-1">
          Suggestions:
        </span>
        {SUGGESTIONS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 hover:bg-teal-400/10 hover:border-teal-400/30 border border-white/5 text-slate-300 hover:text-teal-300 transition-colors whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div className="p-3 border-t border-white/10 bg-dev-elevated/40 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask RADI AI about projects, stack, education, or contact..."
            className="flex-1 px-3.5 py-2.5 rounded bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="flex items-center justify-center p-2.5 rounded bg-teal-400/20 hover:bg-teal-400/30 border border-teal-400/40 text-teal-300 transition-colors disabled:opacity-40 cursor-pointer"
            title="Send inquiry"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
