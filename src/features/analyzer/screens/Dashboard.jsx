import React, { useEffect, useState } from 'react'
import { Download, Trash2, X } from 'lucide-react'
import { TRAPS } from '../data/trap-constants'
import { clearSessions, loadSessions } from '../utils'
import { GemButton, GlassPane } from '../../../components'

const Dashboard = ({ onNewSession }) => {
  const [sessions, setSessions] = useState([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    const saved = loadSessions()
    if (saved) setSessions(saved)
  }, [])

  const getTrapStats = () => {
    const stats = {}
    sessions.forEach((s) => {
      if (s.trap) stats[s.trap] = (stats[s.trap] || 0) + 1
    })
    return Object.entries(stats).sort((a, b) => b[1] - a[1])
  }

  const exportData = () => {
    const exportData = {
      version: '1.0',
      exported_at: new Date().toISOString(),
      sessions: sessions
    }
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'loki_analyzer_data.json')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const clearData = () => {
    clearSessions()
    setSessions([])
    setShowClearConfirm(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
            Weekly Patterns
          </div>
          <h1 className="text-xl font-serif text-white">Log &amp; Insights</h1>
        </div>
        <GemButton
          onClick={onNewSession}
          variant="indigo"
          className="py-2 px-4 text-xs"
          ariaLabel="Start a new scan"
        >
          New Scan
        </GemButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassPane intensity={1} className="p-4">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-2">
            Total Scans
          </div>
          <div className="text-3xl font-mono text-white">{sessions.length}</div>
        </GlassPane>
        <GlassPane intensity={1} className="p-4">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-2">
            Dominant Trap
          </div>
          <div className="text-lg font-medium text-indigo-300 leading-tight">
            {getTrapStats()[0]?.[0] ? TRAPS[getTrapStats()[0][0]].name : '-'}
          </div>
        </GlassPane>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          History
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {sessions.length === 0 ? (
            <div className="text-slate-500 text-center py-12 italic text-sm bg-white/5 rounded-lg border border-white/10">
              No data yet.
              <br />
              The system is waiting for your signal.
            </div>
          ) : (
            sessions
              .slice()
              .reverse()
              .map((session) => (
                <GlassPane
                  key={session.id}
                  intensity={0}
                  className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${TRAPS[session.trap]?.color || 'bg-slate-500'}`}
                    />
                    <div>
                      <div className="text-sm text-slate-200 font-medium font-serif">
                        {session.taskName}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        {new Date(session.timestamp).toLocaleDateString()} &middot;{' '}
                        {session.trap ? TRAPS[session.trap].name : 'Unknown'}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${
                      session.result === 'back_on_track'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : session.result === 'partial'
                          ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}
                  >
                    {session.result?.replace(/_/g, ' ')}
                  </div>
                </GlassPane>
              ))
          )}
        </div>
      </div>

      <div className="pt-8 border-t border-white/10">
        <h4 className="text-[10px] uppercase tracking-widest text-slate-600 mb-4">
          Data Agency (Local Only)
        </h4>
        <div className="flex gap-4">
          <GemButton
            onClick={exportData}
            variant="ghost"
            className="px-3 py-1 text-xs flex items-center gap-2"
            ariaLabel="Export JSON"
          >
            <Download className="w-3 h-3" /> Export JSON
          </GemButton>

          {!showClearConfirm ? (
            <GemButton
              onClick={() => setShowClearConfirm(true)}
              variant="ghost"
              className="px-3 py-1 text-xs flex items-center gap-2 text-slate-400"
              ariaLabel="Clear history"
            >
              <Trash2 className="w-3 h-3" /> Clear History
            </GemButton>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-400">Are you sure?</span>
              <GemButton
                onClick={clearData}
                variant="danger"
                className="px-3 py-1 text-xs"
                ariaLabel="Confirm clear history"
              >
                Yes
              </GemButton>
              <GemButton
                onClick={() => setShowClearConfirm(false)}
                variant="ghost"
                className="px-2 py-1 text-xs"
                ariaLabel="Cancel clear"
              >
                <X className="w-3 h-3" />
              </GemButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
