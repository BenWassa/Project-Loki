import React from 'react'
import { motion } from 'framer-motion'
import { TRAPS } from '../data/trap-constants'
import { GemButton, GlassPane } from '../../../components'

const DiagnosisReveal = ({ trapId, onNext }) => {
  const trap = TRAPS[trapId]

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700 relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${trap.color} opacity-10 blur-3xl`} />

      <GlassPane
        intensity={2}
        className="p-8 max-w-lg w-full relative overflow-hidden border-t border-white/20"
      >
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${trap.color}`} />

        <div className="flex flex-col items-center gap-6 relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${trap.color} bg-opacity-30 shadow-lg ring-1 ring-white/20`}
          >
            {React.cloneElement(trap.icon, { className: 'w-10 h-10 text-white' })}
          </motion.div>

          <div>
            <h2 className="text-3xl font-serif text-white mb-3">{trap.name} Detected</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-serif">
              {trap.description}
            </p>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-indigo-200 italic font-serif text-lg">"{trap.reframe}"</p>
            </div>
          </div>
        </div>
      </GlassPane>

      <GemButton
        onClick={onNext}
        variant="indigo"
        className="w-full max-w-xs"
        ariaLabel="Open intervention deck"
      >
        Open Intervention Deck
      </GemButton>
    </div>
  )
}

export default DiagnosisReveal
