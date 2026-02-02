import React from 'react'
import { motion } from 'framer-motion'
import { Play, Brain } from 'lucide-react'
import DecryptedText from '../components/DecryptedText'
import { GemButton, GlassPane } from '../../../components'

const StartScreen = ({ onStart }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="space-y-10"
  >
    <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 items-center">
      <div className="space-y-6">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-300 flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
          <DecryptedText text="// Signal Uplink Ready" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-5xl font-light text-white leading-tight">The Analyzer</h1>
          <p className="text-slate-300 text-lg leading-relaxed font-light">
            Identify the trap. Apply the lever. <br className="hidden md:block" />
            Restore quality.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <GemButton
            onClick={onStart}
            variant="home"
            className="px-10 py-3"
            ariaLabel="Begin diagnosis"
          >
            <Play className="w-4 h-4" /> Begin Diagnosis
          </GemButton>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">
            ~2 minutes to calibrate
          </div>
        </div>
      </div>

      <GlassPane intensity={2} className="p-6 relative overflow-hidden border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 blur-3xl" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-white/10 border border-white/20">
              <Brain className="w-6 h-6 text-indigo-200" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                Diagnostic Stack
              </div>
              <div className="text-lg text-white font-semibold">Signal &amp; Intervention</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Pattern Library', value: '8 Traps' },
              { label: 'Protocol Steps', value: 'Guided' },
              { label: 'Data Storage', value: 'Local Only' },
              { label: 'Export', value: 'JSON Ready' }
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </div>
                <div className="text-sm text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassPane>
    </div>
  </motion.div>
)

export default StartScreen
