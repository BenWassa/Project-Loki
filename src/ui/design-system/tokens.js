// Centralised design tokens for Project Loki
// These values mirror the current visual language in Analyzer and the landing page.

export const colors = {
  primary: {
    base: '#6366F1', // indigo-500
    emphasis: '#4338CA', // indigo-700
    highlight: '#A5B4FC', // indigo-200
    on: '#F8FAFC', // text on primary surfaces
    surface: 'rgba(99, 102, 241, 0.12)',
    border: 'rgba(99, 102, 241, 0.5)',
    surfaceSoft: 'rgba(99, 102, 241, 0.06)',
  },
  secondary: {
    base: '#F59E0B', // amber-500
    emphasis: '#D97706', // amber-600
    highlight: '#FCD34D', // amber-300
    on: '#0B1220',
    surface: 'rgba(245, 158, 11, 0.12)',
  },
  neutral: {
    background: '#050505',
    panel: 'rgba(15, 23, 42, 0.6)', // slate glass
    panelSolid: '#0B1220',
    border: 'rgba(255, 255, 255, 0.1)',
    borderStrong: 'rgba(255, 255, 255, 0.18)',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    inverse: '#FFFFFF',
  },
  semantic: {
    success: '#10B981',
    danger: '#F43F5E',
    info: '#06B6D4',
    warning: '#F59E0B',
  },
  glass: {
    overlay: 'rgba(148, 163, 184, 0.06)',
    overlayStrong: 'rgba(51, 65, 85, 0.85)',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const typography = {
  fontFamilies: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    serif: '"Playfair Display", "Times New Roman", serif',
    mono: '"Space Mono", "IBM Plex Mono", "SFMono-Regular", monospace',
  },
  sizes: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  letterSpacing: {
    tight: '-0.01em',
    wide: '0.2em',
  },
  lineHeights: {
    snug: 1.3,
    relaxed: 1.5,
  },
};

export const motion = {
  durations: {
    instant: 120,
    fast: 180,
    normal: 240,
    slow: 320,
  },
  easing: {
    standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
    snappy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  springs: {
    hover: { type: 'spring', stiffness: 240, damping: 16, mass: 0.8 },
    press: { type: 'spring', stiffness: 260, damping: 20, mass: 0.9 },
  },
};

export const borders = {
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    full: '9999px',
  },
  width: {
    thin: '1px',
    thick: '2px',
  },
};

export const shadows = {
  subtle: '0 10px 40px rgba(0, 0, 0, 0.25)',
  medium: '0 15px 45px rgba(15, 23, 42, 0.4)',
  strong: '0 25px 60px rgba(0, 0, 0, 0.55)',
  glow: '0 0 30px rgba(99, 102, 241, 0.5)',
};

// Tailwind composition helpers (tokens -> classnames).
// These keep component APIs stable while centralising the values being composed.
export const tw = {
  gemButton: {
    base: 'relative px-6 py-3 rounded-lg font-mono text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2',
    enabled: 'hover:-translate-y-0.5 active:translate-y-0',
    disabled: 'opacity-50 cursor-not-allowed grayscale',
    variants: {
      indigo:
        'bg-gradient-to-br from-indigo-600 to-blue-700 hover:brightness-110 shadow-lg shadow-indigo-500/20 text-white',
      amber:
        'bg-gradient-to-br from-amber-500 to-orange-600 hover:brightness-105 shadow-lg shadow-amber-500/20 text-white',
      ghost: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300',
      danger: 'from-red-900/50 to-red-800/50 border border-red-500/30 text-red-200 hover:bg-red-900/70',
      home: 'bg-white text-black border border-white/5 hover:bg-indigo-50 shadow-sm',
    },
  },
  glassPane: {
    base: 'rounded-xl border',
    intensities: {
      0: 'bg-slate-900/40 border-white/10',
      1: 'bg-slate-800/60 backdrop-blur-xl border-white/10 shadow-2xl',
      2: 'bg-slate-800/90 backdrop-blur-2xl border-white/20 shadow-xl ring-1 ring-white/10',
    },
  },
};

export const tokens = {
  colors,
  spacing,
  typography,
  motion,
  borders,
  shadows,
  tw,
};

export default tokens;
