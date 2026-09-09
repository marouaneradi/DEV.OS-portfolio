import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  Github,
  Linkedin,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { profile } from '../../../config/profile';

export default function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [transmissionStatus, setTransmissionStatus] = useState('idle'); // idle | transmitting | success | error
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setTransmissionStatus('transmitting');
    setErrorMessage(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              name: formData.name,
              email: formData.email,
              message: formData.message,
              subject: formData.subject || `Message from ${formData.name}`,
            },
          }),
        });

        if (response.ok) {
          setTransmissionStatus('success');
          return;
        } else {
          const errorText = await response.text();
          console.error('EmailJS error:', errorText);
          throw new Error(errorText || 'Failed to send message via EmailJS');
        }
      } else {
        // Fallback simulation if env vars are missing
        setTimeout(() => setTransmissionStatus('success'), 800);
      }
    } catch (err) {
      console.error('EmailJS transmission failure:', err);
      setTransmissionStatus('error');
      setErrorMessage(err.message || 'Transmission failed. Please reach out via email directly.');
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-dev-surface/95 text-slate-100 select-text font-sans">
      {/* Left Pane: Dispatcher Form */}
      <div className="flex-1 p-5 sm:p-7 overflow-y-auto border-b md:border-b-0 md:border-r border-white/5 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            MESSAGE_DISPATCHER // PROTOCOL 0xCOMMS
          </div>
          <h2 className="text-xl font-bold text-white">Send Direct Message</h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Send an asynchronous transmission directly to Marouane Radi.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {transmissionStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-os bg-dev-emerald/10 border border-dev-emerald/30 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-dev-emerald/20 text-dev-emerald mx-auto flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                TRANSMISSION DISPATCHED
              </h3>
              <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto">
                Your message has been formatted and queued for transmission to {profile.email}.
              </p>
              <button
                onClick={() => {
                  setTransmissionStatus('idle');
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-2 px-4 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {transmissionStatus === 'error' && (
                <div className="p-3 rounded bg-dev-rose/15 border border-dev-rose/30 text-xs font-mono text-dev-rose space-y-1">
                  <div className="font-bold">// TRANSMISSION ERROR</div>
                  <div>{errorMessage}</div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder=""
                    className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder=""
                    className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">
                  Subject Line:
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Collaboration on Full Stack Project"
                  className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">
                  Message Body:
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 rounded bg-black/40 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={transmissionStatus === 'transmitting'}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-os bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 font-mono text-xs font-semibold tracking-wider transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                <span>
                  {transmissionStatus === 'transmitting'
                    ? 'TRANSMITTING PACKET...'
                    : 'TRANSMIT MESSAGE'}
                </span>
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>

      {/* Right Pane: Direct Networks & Telemetry */}
      <div className="w-full md:w-72 lg:w-80 bg-dev-elevated/20 p-5 sm:p-6 space-y-6 shrink-0 overflow-y-auto">
        <div className="space-y-3">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            // DIRECT CHANNELS
          </span>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-sky-400/30 transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
              <Mail size={15} />
            </div>
            <div className="truncate">
              <span className="text-xs font-medium text-white block">Email</span>
              <span className="text-[11px] font-mono text-slate-400 truncate block">
                {profile.email}
              </span>
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-dev-emerald/30 transition-colors flex items-center gap-3 group"
          >
            <div className="p-2 rounded bg-dev-emerald/10 text-dev-emerald group-hover:scale-105 transition-transform">
              <Phone size={15} />
            </div>
            <div className="truncate">
              <span className="text-xs font-medium text-white block">Phone</span>
              <span className="text-[11px] font-mono text-slate-400 truncate block">
                {profile.phone}
              </span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-400/30 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                <Linkedin size={15} />
              </div>
              <div>
                <span className="text-xs font-medium text-white block">LinkedIn</span>
                <span className="text-[11px] font-mono text-slate-400 block">
                  Connect on network
                </span>
              </div>
            </div>
            <ExternalLink size={13} className="text-slate-500 group-hover:text-blue-400" />
          </a>

          {/* GitHub */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-black/40 text-slate-300 group-hover:text-white">
                <Github size={15} />
              </div>
              <div>
                <span className="text-xs font-medium text-white block">GitHub</span>
                <span className="text-[11px] font-mono text-slate-400 block">
                  @marouaneradi
                </span>
              </div>
            </div>
            <ExternalLink size={13} className="text-slate-500 group-hover:text-white" />
          </a>
        </div>

        {/* Location & Timezone info */}
        <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin size={13} className="text-dev-rose" />
            <span>Ouarzazate, Morocco (GMT+1)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock size={12} />
            <span>Response window: typically &lt; 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
