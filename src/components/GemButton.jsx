import React from 'react'
import { motion } from 'framer-motion'

const GemButton = ({ children, onClick, variant = 'indigo', className = '', disabled = false, ariaLabel }) => {
  const variants = {
    indigo: 'bg-gradient-to-br from-indigo-600 to-blue-700 hover:brightness-110 shadow-lg shadow-indigo-500/20 text-white',
    amber: 'bg-gradient-to-br from-amber-500 to-orange-600 hover:brightness-105 shadow-lg shadow-amber-500/20 text-white',
    ghost: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300',
    danger: 'from-red-900/50 to-red-800/50 border border-red-500/30 text-red-200 hover:bg-red-900/70',
    home: 'bg-white text-black border border-white/5 hover:bg-indigo-50 shadow-sm'
  }

  const computedLabel = ariaLabel || (typeof children === 'string' ? children : undefined)

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ y: disabled ? 0 : -2 }}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      aria-label={computedLabel}
      className={`relative px-6 py-3 rounded-lg font-mono text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-0.5 active:translate-y-0'} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default GemButton
