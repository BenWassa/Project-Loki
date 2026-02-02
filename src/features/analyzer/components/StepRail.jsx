import React from 'react'
import STEPS from '../data/steps'
import DecryptedText from './DecryptedText'
import { GlassPane } from '../../../components'

const StepRail = ({ current }) => {
  const currentIndex = STEPS.findIndex((step) => step.id === current)

  return (
    <GlassPane intensity={1} className="p-4 lg:p-6 space-y-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-200/80 flex items-center gap-2">
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
        <DecryptedText text="// Session Flow" speed={40} />
      </div>
      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const state = idx === currentIndex ? 'active' : idx < currentIndex ? 'done' : 'pending'
          return (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-mono ${
                  state === 'active'
                    ? 'border-indigo-400 bg-indigo-500/10 text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : state === 'done'
                      ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100'
                      : 'border-white/10 text-slate-500'
                }`}
              >
                {idx + 1}
              </div>
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${state === 'active' ? 'text-white' : state === 'done' ? 'text-emerald-100' : 'text-slate-400'}`}
                >
                  {step.label}
                </div>
                <div className="text-[11px] text-slate-500">{step.caption}</div>
              </div>
            </div>
          )
        })}
      </div>
    </GlassPane>
  )
}

export default StepRail
