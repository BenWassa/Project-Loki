import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CONTEXTS } from '../data/trap-constants'
import { GemButton, GlassPane } from '../../../components'

const TaskAnchor = ({ data, onUpdate, onNext }) => (
  <motion.div
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.45 }}
    className="space-y-6"
  >
    <div className="space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
        The Signal
      </div>
      <h2 className="text-2xl font-serif text-white">Where is the friction located?</h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        Name the work, tag the context, and tell us how sharp the drag feels.
      </p>
    </div>

    <GlassPane intensity={1} className="p-6 space-y-8">
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Task Name
        </label>
        <input
          autoFocus
          type="text"
          value={data.taskName}
          onChange={(e) => onUpdate('taskName', e.target.value)}
          placeholder="e.g. Q3 Report Writing"
          className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-xl font-serif text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Context
        </label>
        <div className="flex flex-wrap gap-2">
          {CONTEXTS.map((ctx) => (
            <GemButton
              key={ctx}
              onClick={() => onUpdate('context', ctx)}
              ariaLabel={`Select context ${ctx}`}
              variant={data.context === ctx ? 'indigo' : 'ghost'}
              className={`px-3 py-1.5 text-xs rounded-full font-medium ${data.context === ctx ? 'shadow-[0_0_20px_rgba(99,102,241,0.4)]' : ''}`}
            >
              {ctx}
            </GemButton>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold flex justify-between">
          <span>Friction Level</span>
          <span className="text-indigo-200 font-mono">{data.friction || 50}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={data.friction || 50}
          onChange={(e) => onUpdate('friction', e.target.value)}
          aria-label="Friction level"
          className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 uppercase">
          <span>Annoying</span>
          <span>Painful</span>
          <span>Impossible</span>
        </div>
      </div>
    </GlassPane>

    <div className="flex justify-end">
      <GemButton
        onClick={onNext}
        disabled={!data.taskName || !data.context}
        ariaLabel="Analyze signal"
      >
        Analyze Signal <ArrowRight className="w-4 h-4" />
      </GemButton>
    </div>
  </motion.div>
)

export default TaskAnchor
