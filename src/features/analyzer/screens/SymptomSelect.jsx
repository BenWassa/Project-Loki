import React from 'react'
import { motion } from 'framer-motion'
import { TRAPS } from '../data/trap-constants'
import { GemButton, GlassPane } from '../../../components'

const SymptomSelect = ({ onSelect }) => (
  <motion.div
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.45 }}
    className="space-y-6"
  >
    <div className="space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
        Symptom Scan
      </div>
      <h2 className="text-2xl font-serif text-white">Which statement feels most true?</h2>
      <p className="text-slate-400 text-sm">
        Choose the pattern that best mirrors the drag you’re feeling.
      </p>
    </div>

    <div className="grid gap-3">
      {Object.values(TRAPS).map((trap) => (
        <GemButton
          key={trap.id}
          onClick={() => onSelect(trap.id)}
          variant="ghost"
          ariaLabel={`Select trap ${trap.name}`}
          className="group text-left p-0 w-full"
        >
          <GlassPane
            intensity={0}
            className="p-4 hover:border-white/20 hover:shadow-[0_10px_40px_rgba(99,102,241,0.15)] transition-all group-hover:translate-x-1 bg-gradient-to-br from-white/5 to-transparent"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${trap.color} bg-opacity-20 opacity-90 shrink-0 shadow-inner`}
              >
                {trap.icon}
              </div>
              <div>
                <h3 className="text-slate-100 font-medium">{trap.name}</h3>
                <p className="text-slate-400 text-sm mt-1 leading-snug">{trap.symptoms[0]}</p>
              </div>
            </div>
          </GlassPane>
        </GemButton>
      ))}
    </div>
  </motion.div>
)

export default SymptomSelect
