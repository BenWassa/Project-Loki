import React, { useState } from 'react'
import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react'
import { GemButton, GlassPane } from '../../../components'

const Summary = ({ data, onSave }) => {
  const [outcome, setOutcome] = useState('partial')
  const [note, setNote] = useState('')

  const outcomes = [
    { id: 'back_on_track', label: 'Back on Track', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'partial', label: 'Partial Win', icon: <Activity className="w-4 h-4" /> },
    { id: 'still_stuck', label: 'Still Stuck', icon: <AlertCircle className="w-4 h-4" /> }
  ]

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
          Stabilize
        </div>
        <h2 className="text-2xl font-serif text-white">Anchor the win.</h2>
        <p className="text-slate-400">How did it go?</p>
      </div>

      <GlassPane intensity={1} className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-2">
          {outcomes.map((o) => (
            <GemButton
              key={o.id}
              onClick={() => setOutcome(o.id)}
              variant={outcome === o.id ? 'indigo' : 'ghost'}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg text-xs ${outcome === o.id ? '' : 'text-slate-400'}`}
              ariaLabel={`Select outcome ${o.label}`}
            >
              <div className="mb-1">{o.icon}</div>
              <div className="text-xs font-medium">{o.label}</div>
            </GemButton>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Reflection
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="One sentence on what you learned..."
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>
      </GlassPane>

      <GemButton
        onClick={() => onSave({ result: outcome, note })}
        variant="amber"
        className="w-full"
        ariaLabel="Save session to log"
      >
        Save to Log
      </GemButton>
    </div>
  )
}

export default Summary
