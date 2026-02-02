import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { TRAPS } from '../data/trap-constants'
import { GemButton, GlassPane } from '../../../components'

const Calibration = ({ trapId, onConfirm, onReject }) => {
  const trap = TRAPS[trapId]
  const [answers, setAnswers] = useState({})

  const yesCount = Object.values(answers).filter(Boolean).length
  const isConfirmed = yesCount >= 2

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
          Calibration
        </div>
        <h2 className="text-2xl font-serif text-white">Confirm the pattern</h2>
        <p className="text-slate-400 text-sm">
          We need at least two strong signals to lock in {trap.name}.
        </p>
      </div>

      <GlassPane intensity={1} className="p-6 space-y-6">
        {trap.diagnostic.map((q, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 py-3 border-b border-white/10 last:border-0"
          >
            <p className="text-slate-200 text-sm">{q}</p>
            <div className="flex gap-2 shrink-0">
              <GemButton
                onClick={() => setAnswers((prev) => ({ ...prev, [idx]: true }))}
                ariaLabel={`Answer yes to question ${idx + 1}`}
                variant="ghost"
                className={`w-10 h-10 rounded-full text-xs px-0 py-0 ${answers[idx] === true ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/30'}`}
              >
                Y
              </GemButton>
              <GemButton
                onClick={() => setAnswers((prev) => ({ ...prev, [idx]: false }))}
                ariaLabel={`Answer no to question ${idx + 1}`}
                variant="ghost"
                className={`w-10 h-10 rounded-full text-xs px-0 py-0 ${answers[idx] === false ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/30'}`}
              >
                N
              </GemButton>
            </div>
          </div>
        ))}
      </GlassPane>

      <div className="flex justify-between items-center">
        <GemButton
          onClick={onReject}
          variant="ghost"
          className="px-3 py-2 text-xs"
          ariaLabel="Wrong symptoms"
        >
          Wrong symptoms
        </GemButton>
        {isConfirmed ? (
          <GemButton onClick={onConfirm} variant="amber" ariaLabel="Confirm diagnosis">
            Confirm Diagnosis <CheckCircle2 className="w-4 h-4" />
          </GemButton>
        ) : (
          <div className="text-slate-500 text-xs italic px-4">Answer 'Yes' to at least 2...</div>
        )}
      </div>
    </motion.div>
  )
}

export default Calibration
