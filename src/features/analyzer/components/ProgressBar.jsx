import React from 'react'

const ProgressBar = ({ current, total }) => {
  const percent = Math.min(100, (current / total) * 100)
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
      <div
        className="h-full bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(79,70,229,0.4)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar
