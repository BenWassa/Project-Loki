import React from 'react'

const GlassPane = ({ children, className = '', intensity = 1 }) => {
  const intensities = {
    0: 'bg-slate-900/40 border-white/10',
    1: 'bg-slate-800/60 backdrop-blur-xl border-white/10 shadow-2xl',
    2: 'bg-slate-800/90 backdrop-blur-2xl border-white/20 shadow-xl ring-1 ring-white/10'
  }

  return (
    <div className={`rounded-xl border ${intensities[intensity]} ${className}`}>{children}</div>
  )
}

export default GlassPane
