import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  ShieldCheck,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Languages,
  CheckCircle2,
} from 'lucide-react';
import { profile } from '../../../config/profile';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AboutApp() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full overflow-y-auto p-5 sm:p-7 space-y-7 text-slate-200 select-text font-sans"
    >
      {/* 1. Identity & Typographic Header */}
      <motion.div
        variants={itemVariants}
        className="p-5 rounded-os bg-dev-elevated/40 border border-white/5 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-dev-cyan uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-dev-cyan" />
              SYSTEM_RECORD // ID: 0xMR-DEV
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm font-mono text-dev-cyan mt-0.5">
              {profile.title}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-md self-start sm:self-center">
            <MapPin size={13} className="text-dev-rose" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Summary text */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            // PROFILE SUMMARY
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {profile.summary}
          </p>
        </div>

        {/* Languages tags */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2">
            <Languages size={13} className="text-dev-violet" />
            <span>Languages:</span>
          </div>
          {profile.languages.map((lang) => (
            <span
              key={lang}
              className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
            >
              {lang}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 2. Education Section */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
          <GraduationCap size={14} className="text-dev-emerald" />
          <span>// EDUCATION & ACADEMIC PATH</span>
        </div>

        <div className="p-4 rounded-os bg-dev-elevated/30 border border-white/5 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-dev-emerald/10 border border-dev-emerald/20 text-dev-emerald shrink-0 mt-0.5">
            <GraduationCap size={18} />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-white">
                {profile.education}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dev-emerald/10 border border-dev-emerald/30 text-dev-emerald font-medium">
                ACCREDITED DIPLOMA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Institut Spécialisé de Technologie Appliquée (ISTA) Ouarzazate • Promotion 2024–2026
            </p>
          </div>
        </div>

        <div className="p-4 rounded-os bg-dev-elevated/30 border border-white/5 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-dev-cyan/10 border border-dev-cyan/20 text-dev-cyan shrink-0 mt-0.5">
            <GraduationCap size={18} />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-white">
                Baccalauréat Sciences Physiques (option Français)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dev-cyan/10 border border-dev-cyan/30 text-dev-cyan font-medium">
                BACCALAURÉAT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Lycée Abou El Kacem — Skoura, Ouarzazate • Promotion 2023
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Certifications Section */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-dev-cyan" />
            <span>// CERTIFICATIONS & ACCREDITATIONS</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {profile.certifications.length} VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {profile.certifications.map((cert, index) => (
            <div
              key={index}
              className="group p-3 rounded-lg bg-dev-elevated/20 hover:bg-dev-elevated/40 border border-white/5 hover:border-dev-cyan/30 transition-all duration-150 flex items-center gap-3"
            >
              <div className="p-1.5 rounded-md bg-dev-cyan/10 text-dev-cyan group-hover:scale-110 transition-transform duration-150 shrink-0">
                <CheckCircle2 size={15} />
              </div>
              <div className="truncate">
                <p className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                  {cert}
                </p>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                  Verified Technical Certification
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Direct Contact & Transmission Links */}
      <motion.div variants={itemVariants} className="space-y-3 pt-1">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          // DIRECT TRANSMISSION & NETWORKS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* GitHub */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-os bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dev-cyan/40 transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-black/40 text-slate-300 group-hover:text-white">
                <Github size={16} />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">
                  GitHub Profile
                </span>
                <span className="text-[11px] font-mono text-slate-400 truncate block max-w-[180px]">
                  github.com/marouaneradi
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-slate-500 group-hover:text-dev-cyan transition-colors" />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-os bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dev-cyan/40 transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                <Linkedin size={16} />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">
                  LinkedIn Network
                </span>
                <span className="text-[11px] font-mono text-slate-400 truncate block max-w-[180px]">
                  marouane-radi
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-slate-500 group-hover:text-dev-cyan transition-colors" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 p-3 rounded-os bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dev-cyan/40 transition-all duration-150 group"
          >
            <div className="p-2 rounded bg-dev-cyan/10 text-dev-cyan group-hover:scale-105 transition-transform">
              <Mail size={16} />
            </div>
            <div className="truncate">
              <span className="text-xs font-semibold text-white block">
                Electronic Mail
              </span>
              <span className="text-[11px] font-mono text-slate-400 truncate block">
                {profile.email}
              </span>
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-3 p-3 rounded-os bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dev-cyan/40 transition-all duration-150 group"
          >
            <div className="p-2 rounded bg-dev-emerald/10 text-dev-emerald group-hover:scale-105 transition-transform">
              <Phone size={16} />
            </div>
            <div className="truncate">
              <span className="text-xs font-semibold text-white block">
                Direct Line
              </span>
              <span className="text-[11px] font-mono text-slate-400 truncate block">
                {profile.phone}
              </span>
            </div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
