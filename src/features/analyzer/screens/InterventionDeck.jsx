import React, { useEffect, useState } from 'react'
import { Activity, ChevronRight } from 'lucide-react'
import { TRAPS } from '../data/trap-constants'
import { BOREDOM_BRANCHES } from '../logic/playbook-branching'
import ProgressBar from '../components/ProgressBar'
import { GemButton, GlassPane } from '../../../components'

const InterventionDeck = ({ trapId, onComplete }) => {
  const trap = TRAPS[trapId]
  const [playbook, setPlaybook] = useState(trap.playbook)
  const [step, setStep] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [inputVal, setInputVal] = useState('')

  const currentAction = playbook[step]

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const startTimer = () => {
    setTimeLeft(currentAction.time)
    setIsActive(true)
  }

  const handleBranch = (branchKey) => {
    const newSteps = BOREDOM_BRANCHES[branchKey]
    setPlaybook([...playbook.slice(0, step + 1), ...newSteps])
    setStep((s) => s + 1)
  }

  const nextStep = () => {
    if (step < playbook.length - 1) {
      setStep((s) => s + 1)
      setTimeLeft(null)
      setIsActive(false)
      setInputVal('')
    } else {
      onComplete()
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-indigo-200/80">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Step {step + 1} of{' '}
          {playbook.length}
        </span>
        <span className="text-slate-400">{trap.name} Protocol</span>
      </div>

      <ProgressBar current={step + 1} total={playbook.length} />

      <GlassPane
        intensity={2}
        className="flex-1 p-6 flex flex-col justify-between animate-in slide-in-from-right-8 duration-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/10 pointer-events-none" />
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 mb-2">
            {currentAction.label}
          </div>

          <h3 className="text-2xl font-serif text-white leading-tight">{currentAction.prompt}</h3>

          <div className="mt-8">
            {currentAction.type === 'branch' ? (
              <div className="grid grid-cols-1 gap-4">
                {currentAction.options.map((opt) => (
                  <GemButton
                    key={opt.label}
                    onClick={() => handleBranch(opt.branch)}
                    variant="indigo"
                    ariaLabel={`Branch: ${opt.label}`}
                  >
                    {opt.label}
                  </GemButton>
                ))}
              </div>
            ) : currentAction.type === 'write' || currentAction.type === 'log' ? (
              <textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-32 bg-white/5 rounded-lg border border-white/10 p-4 text-slate-200 focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm placeholder-slate-500"
              />
            ) : currentAction.type === 'timer' || currentAction.type === 'action' ? (
              <div className="flex flex-col items-center justify-center p-8 bg-black/10 rounded-xl border border-white/10">
                <div className="text-5xl font-mono text-slate-200 mb-6 font-light">
                  {timeLeft !== null ? formatTime(timeLeft) : formatTime(currentAction.time)}
                </div>
                {timeLeft === null ? (
                  <GemButton
                    onClick={startTimer}
                    variant="amber"
                    className="w-full"
                    ariaLabel="Start a timed exercise"
                  >
                    Start Timer
                  </GemButton>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm animate-pulse">
                    <Activity className="w-4 h-4" /> Running...
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {currentAction.type !== 'branch' && (
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <GemButton
              onClick={nextStep}
              variant="ghost"
              disabled={currentAction.type === 'timer' && timeLeft > 0}
              ariaLabel={step === playbook.length - 1 ? 'Finish session' : 'Next step'}
            >
              {step === playbook.length - 1 ? 'Finish Session' : 'Next Step'}{' '}
              <ChevronRight className="w-4 h-4" />
            </GemButton>
          </div>
        )}
      </GlassPane>
    </div>
  )
}

export default InterventionDeck
