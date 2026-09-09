/**
 * DEV.OS Design Tokens
 * Direction: Dark, Minimal, Futuristic, Technical, Premium
 */

export const theme = {
  colors: {
    bg: {
      void: '#05070B',        // Deepest viewport canvas
      base: '#0A0D14',        // OS desktop backdrop
      surface: '#111622',     // Window body / panel background
      elevated: '#171F30',    // Titlebars, menus, active items
      overlay: 'rgba(10, 13, 20, 0.85)', // Modal / glass overlay
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.07)',
      default: 'rgba(255, 255, 255, 0.12)',
      highlight: 'rgba(255, 255, 255, 0.22)',
      accent: 'rgba(0, 240, 255, 0.45)',
    },
    text: {
      primary: '#F1F5F9',     // Slate 100
      secondary: '#94A3B8',   // Slate 400
      muted: '#475569',       // Slate 600
      accent: '#00F0FF',      // Electric Cyan
    },
    accent: {
      cyan: '#00F0FF',        // Primary DEV.OS signature
      emerald: '#10B981',     // System online / success
      amber: '#F59E0B',       // Warning / build flags
      rose: '#EF4444',        // Error / close button
      violet: '#8B5CF6',      // Neural / Lab experiments
      blue: '#3B82F6',        // Info / links
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    scale: {
      xs: '0.75rem',    // 12px - System metadata & badges
      sm: '0.875rem',   // 14px - Body text & UI labels
      base: '1rem',      // 16px - Standard reading text
      lg: '1.125rem',   // 18px - Card / section subheaders
      xl: '1.25rem',    // 20px - App window titles
      '2xl': '1.5rem',  // 24px - Prominent headings
      '3xl': '2rem',    // 32px - Hero / typographic display
      '4xl': '2.5rem',  // 40px - Name display
    },
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '10px',         // Standard window corner
    xl: '14px',
    full: '9999px',
  },
  shadows: {
    window: '0 20px 50px -10px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
    windowActive: '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 240, 255, 0.25)',
    glowCyan: '0 0 25px rgba(0, 240, 255, 0.2)',
  },
};

export default theme;
