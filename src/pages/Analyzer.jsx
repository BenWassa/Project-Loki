import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { History } from 'lucide-react'
import DecryptedText from '../features/analyzer/components/DecryptedText'
import StepRail from '../features/analyzer/components/StepRail'
import Calibration from '../features/analyzer/screens/Calibration'
import Dashboard from '../features/analyzer/screens/Dashboard'
import DiagnosisReveal from '../features/analyzer/screens/DiagnosisReveal'
import InterventionDeck from '../features/analyzer/screens/InterventionDeck'
import StartScreen from '../features/analyzer/screens/StartScreen'
import Summary from '../features/analyzer/screens/Summary'
import SymptomSelect from '../features/analyzer/screens/SymptomSelect'
import TaskAnchor from '../features/analyzer/screens/TaskAnchor'
import { saveSession as storageSaveSession } from '../features/analyzer/utils'
import { GemButton, GlassPane } from '../components'

export default function AnalyzerApp() {
  const [view, setView] = useState('start')
  const [sessionData, setSessionData] = useState({
    id: null,
    taskName: '',
    context: '',
    friction: 50,
    trap: null,
    result: null,
    note: ''
  })

  const updateSession = (key, val) => setSessionData((prev) => ({ ...prev, [key]: val }))

  const saveSession = (finalData) => {
    const completedSession = {
      ...sessionData,
      ...finalData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    storageSaveSession(completedSession)

    setView('dashboard')
    setSessionData({
      id: null,
      taskName: '',
      context: '',
      friction: 50,
      trap: null,
      result: null,
      note: ''
    })
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.12), transparent 25%), radial-gradient(circle at 80% 0%, rgba(34,211,238,0.12), transparent 20%), radial-gradient(circle at 40% 70%, rgba(79,70,229,0.08), transparent 30%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '140px 140px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <header className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2"
          >
            <span className="text-indigo-400">←</span> Return Home
          </Link>
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-200/80">
            <DecryptedText text="Loki OS // Analyzer v1.0" />
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Local Only
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <GemButton
              onClick={() => setView('dashboard')}
              variant="ghost"
              className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs"
              ariaLabel="Open log"
            >
              <History className="w-4 h-4" /> Log
            </GemButton>
          </div>
        </header>

        <div className="grid lg:grid-cols-[320px,1fr] gap-6 lg:gap-10 items-start">
          <div className="space-y-4 lg:space-y-6">
            <StepRail current={view} />
            <GlassPane intensity={0} className="p-4 lg:p-5 border-dashed border-white/20">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-2">
                Guidance
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We matched the analyzer shell to the landing experience: glass, glow, and motion.
                Sessions never leave your browser; export or clear anytime.
              </p>
            </GlassPane>
          </div>

          <GlassPane
            intensity={2}
            className="p-5 sm:p-6 lg:p-8 min-h-[70vh] relative overflow-hidden border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-indigo-500/10 pointer-events-none" />
            <main className="relative">
              {view === 'start' && <StartScreen onStart={() => setView('anchor')} />}

              {view === 'anchor' && (
                <TaskAnchor
                  data={sessionData}
                  onUpdate={updateSession}
                  onNext={() => setView('symptom')}
                />
              )}

              {view === 'symptom' && (
                <SymptomSelect
                  onSelect={(id) => {
                    updateSession('trap', id)
                    setView('calibrate')
                  }}
                />
              )}

              {view === 'calibrate' && (
                <Calibration
                  trapId={sessionData.trap}
                  onConfirm={() => setView('diagnosis')}
                  onReject={() => setView('symptom')}
                />
              )}

              {view === 'diagnosis' && (
                <DiagnosisReveal trapId={sessionData.trap} onNext={() => setView('intervention')} />
              )}

              {view === 'intervention' && (
                <InterventionDeck trapId={sessionData.trap} onComplete={() => setView('summary')} />
              )}

              {view === 'summary' && <Summary data={sessionData} onSave={saveSession} />}

              {view === 'dashboard' && <Dashboard onNewSession={() => setView('anchor')} />}
            </main>
          </GlassPane>
        </div>
      </div>
    </div>
  )
}
