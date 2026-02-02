import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  History, 
  Brain, 
  ChevronRight,
  Download,
  Trash2,
  X
} from 'lucide-react';
import { TRAPS, CONTEXTS, BOREDOM_BRANCHES, loadSessions, saveSession as storageSaveSession, clearSessions } from '../features/analyzer';
import { GemButton, GlassPane } from '../components'

const STEPS = [
  { id: 'start', label: 'Initialize', caption: 'Boot sequence' },
  { id: 'anchor', label: 'Signal', caption: 'Locate the task' },
  { id: 'symptom', label: 'Symptom Scan', caption: 'Pattern detection' },
  { id: 'calibrate', label: 'Calibrate', caption: 'Verify trap' },
  { id: 'diagnosis', label: 'Diagnosis', caption: 'Reveal archetype' },
  { id: 'intervention', label: 'Intervention', caption: 'Protocol steps' },
  { id: 'summary', label: 'Stabilize', caption: 'Anchor learning' },
  { id: 'dashboard', label: 'Log', caption: 'History + exports' },
];

const DecryptedText = ({ text, speed = 30, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};

// --- COMPONENTS ---

const ProgressBar = ({ current, total }) => {
  const percent = Math.min(100, (current / total) * 100);
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
      <div 
        className="h-full bg-gradient-to-r from-indigo-400 via-blue-500 to-emerald-400 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(79,70,229,0.4)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

const StepRail = ({ current }) => {
  const currentIndex = STEPS.findIndex(step => step.id === current);

  return (
    <GlassPane intensity={1} className="p-4 lg:p-6 space-y-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-200/80 flex items-center gap-2">
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
        <DecryptedText text="// Session Flow" speed={40} />
      </div>
      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const state = idx === currentIndex ? 'active' : idx < currentIndex ? 'done' : 'pending';
          return (
            <div key={step.id} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-mono ${
                state === 'active' ? 'border-indigo-400 bg-indigo-500/10 text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.4)]' :
                state === 'done' ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100' :
                'border-white/10 text-slate-500'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${state === 'active' ? 'text-white' : state === 'done' ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {step.label}
                </div>
                <div className="text-[11px] text-slate-500">{step.caption}</div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPane>
  );
};

// --- SCREENS ---

const StartScreen = ({ onStart }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-10">
    <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 items-center">
      <div className="space-y-6">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-indigo-300 flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
          <DecryptedText text="// Signal Uplink Ready" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-5xl font-light text-white leading-tight">The Analyzer</h1>
          <p className="text-slate-300 text-lg leading-relaxed font-light">
            Identify the trap. Apply the lever. <br className="hidden md:block" />Restore quality.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <GemButton onClick={onStart} variant="home" className="px-10 py-3" ariaLabel="Begin diagnosis">
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
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">Diagnostic Stack</div>
              <div className="text-lg text-white font-semibold">Signal &amp; Intervention</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Pattern Library", value: "8 Traps" },
              { label: "Protocol Steps", value: "Guided" },
              { label: "Data Storage", value: "Local Only" },
              { label: "Export", value: "JSON Ready" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.label}</div>
                <div className="text-sm text-white">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-indigo-200/80 font-mono">
            Designed to mirror the landing aesthetic—glass, glow, and motion.
          </div>
        </div>
      </GlassPane>
    </div>
  </motion.div>
);

const TaskAnchor = ({ data, onUpdate, onNext }) => (
  <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
    <div className="space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">The Signal</div>
      <h2 className="text-2xl font-serif text-white">Where is the friction located?</h2>
      <p className="text-slate-400 text-sm leading-relaxed">Name the work, tag the context, and tell us how sharp the drag feels.</p>
    </div>

    <GlassPane intensity={1} className="p-6 space-y-8">
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Task Name</label>
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
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Context</label>
        <div className="flex flex-wrap gap-2">
          {CONTEXTS.map(ctx => (
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
      <GemButton onClick={onNext} disabled={!data.taskName || !data.context} ariaLabel="Analyze signal">
        Analyze Signal <ArrowRight className="w-4 h-4" />
      </GemButton>
    </div>
  </motion.div>
);

const SymptomSelect = ({ onSelect }) => (
  <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
    <div className="space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">Symptom Scan</div>
      <h2 className="text-2xl font-serif text-white">Which statement feels most true?</h2>
      <p className="text-slate-400 text-sm">Choose the pattern that best mirrors the drag you’re feeling.</p>
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
          <GlassPane intensity={0} className="p-4 hover:border-white/20 hover:shadow-[0_10px_40px_rgba(99,102,241,0.15)] transition-all group-hover:translate-x-1 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${trap.color} bg-opacity-20 opacity-90 shrink-0 shadow-inner`}>
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
);

const Calibration = ({ trapId, onConfirm, onReject }) => {
  const trap = TRAPS[trapId];
  const [answers, setAnswers] = useState({});

  const yesCount = Object.values(answers).filter(Boolean).length;
  const isConfirmed = yesCount >= 2;

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">Calibration</div>
        <h2 className="text-2xl font-serif text-white">Confirm the pattern</h2>
        <p className="text-slate-400 text-sm">We need at least two strong signals to lock in {trap.name}.</p>
      </div>

      <GlassPane intensity={1} className="p-6 space-y-6">
        {trap.diagnostic.map((q, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 py-3 border-b border-white/10 last:border-0">
            <p className="text-slate-200 text-sm">{q}</p>
            <div className="flex gap-2 shrink-0">
              <GemButton
                onClick={() => setAnswers(prev => ({ ...prev, [idx]: true }))}
                ariaLabel={`Answer yes to question ${idx + 1}`}
                variant="ghost"
                className={`w-10 h-10 rounded-full text-xs px-0 py-0 ${answers[idx] === true ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/30'}`}
              >
                Y
              </GemButton>
              <GemButton
                onClick={() => setAnswers(prev => ({ ...prev, [idx]: false }))}
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
        <GemButton onClick={onReject} variant="ghost" className="px-3 py-2 text-xs" ariaLabel="Wrong symptoms">
          Wrong symptoms
        </GemButton>
        {isConfirmed ? (
           <GemButton onClick={onConfirm} variant="amber" ariaLabel="Confirm diagnosis">
             Confirm Diagnosis <CheckCircle2 className="w-4 h-4" />
           </GemButton>
        ) : (
          <div className="text-slate-500 text-xs italic px-4">
            Answer 'Yes' to at least 2...
          </div>
        )}
      </div>
    </motion.div>
  );
};

const DiagnosisReveal = ({ trapId, onNext }) => {
  const trap = TRAPS[trapId];
  
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700 relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${trap.color} opacity-10 blur-3xl`} />
      
      <GlassPane intensity={2} className="p-8 max-w-lg w-full relative overflow-hidden border-t border-white/20">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${trap.color}`} />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${trap.color} bg-opacity-30 shadow-lg ring-1 ring-white/20`}
          >
            {React.cloneElement(trap.icon, { className: "w-10 h-10 text-white" })}
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

      <GemButton onClick={onNext} variant="indigo" className="w-full max-w-xs" ariaLabel="Open intervention deck">
        Open Intervention Deck
      </GemButton>
    </div>
  );
};

const InterventionDeck = ({ trapId, onComplete }) => {
  const trap = TRAPS[trapId];
  const [playbook, setPlaybook] = useState(trap.playbook);
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [inputVal, setInputVal] = useState('');
  
  const currentAction = playbook[step];
  
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(currentAction.time);
    setIsActive(true);
  };

  const handleBranch = (branchKey) => {
    const newSteps = BOREDOM_BRANCHES[branchKey];
    // Replace the remaining steps with the branch steps
    setPlaybook([...playbook.slice(0, step + 1), ...newSteps]);
    setStep(s => s + 1);
  };

  const nextStep = () => {
    if (step < playbook.length - 1) {
      setStep(s => s + 1);
      setTimeLeft(null);
      setIsActive(false);
      setInputVal('');
    } else {
      onComplete();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-indigo-200/80">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Step {step + 1} of {playbook.length}
        </span>
        <span className="text-slate-400">{trap.name} Protocol</span>
      </div>
      
      <ProgressBar current={step + 1} total={playbook.length} />

      <GlassPane intensity={2} className="flex-1 p-6 flex flex-col justify-between animate-in slide-in-from-right-8 duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/10 pointer-events-none" />
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 mb-2">
            {currentAction.label}
          </div>
          
          <h3 className="text-2xl font-serif text-white leading-tight">
            {currentAction.prompt}
          </h3>

          {/* Interaction Zone */}
          <div className="mt-8">
            {currentAction.type === 'branch' ? (
              <div className="grid grid-cols-1 gap-4">
                {currentAction.options.map(opt => (
                  <GemButton key={opt.label} onClick={() => handleBranch(opt.branch)} variant="indigo" ariaLabel={`Branch: ${opt.label}`}>
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
                   <GemButton onClick={startTimer} variant="amber" className="w-full" ariaLabel="Start a timed exercise">
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
            <GemButton onClick={nextStep} variant="ghost" disabled={currentAction.type === 'timer' && timeLeft > 0} ariaLabel={step === playbook.length - 1 ? 'Finish session' : 'Next step'}>
              {step === playbook.length - 1 ? "Finish Session" : "Next Step"} <ChevronRight className="w-4 h-4" />
            </GemButton>
          </div>
        )}
      </GlassPane>
    </div>
  );
};

const Summary = ({ data, onSave }) => {
  const [outcome, setOutcome] = useState('partial');
  const [note, setNote] = useState('');

  const outcomes = [
    { id: 'back_on_track', label: 'Back on Track', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'partial', label: 'Partial Win', icon: <Activity className="w-4 h-4" /> },
    { id: 'still_stuck', label: 'Still Stuck', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">Stabilize</div>
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
          <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Reflection</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="One sentence on what you learned..."
            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>
      </GlassPane>

      <GemButton onClick={() => onSave({ result: outcome, note })} variant="amber" className="w-full" ariaLabel="Save session to log">
        Save to Log
      </GemButton>
    </div>
  );
};

const Dashboard = ({ onNewSession }) => {
  const [sessions, setSessions] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const saved = loadSessions();
    if (saved) setSessions(saved);
  }, []);

  const getTrapStats = () => {
    const stats = {};
    sessions.forEach(s => {
      if(s.trap) stats[s.trap] = (stats[s.trap] || 0) + 1;
    });
    return Object.entries(stats).sort((a,b) => b[1] - a[1]);
  };

  const exportData = () => {
    const exportData = {
      version: "1.0",
      exported_at: new Date().toISOString(),
      sessions: sessions
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "loki_analyzer_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const clearData = () => {
    clearSessions();
    setSessions([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">Weekly Patterns</div>
          <h1 className="text-xl font-serif text-white">Log &amp; Insights</h1>
        </div>
        <GemButton onClick={onNewSession} variant="indigo" className="py-2 px-4 text-xs" ariaLabel="Start a new scan">
          New Scan
        </GemButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassPane intensity={1} className="p-4">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-2">Total Scans</div>
          <div className="text-3xl font-mono text-white">{sessions.length}</div>
        </GlassPane>
        <GlassPane intensity={1} className="p-4">
          <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-2">Dominant Trap</div>
          <div className="text-lg font-medium text-indigo-300 leading-tight">
            {getTrapStats()[0]?.[0] ? TRAPS[getTrapStats()[0][0]].name : '-'}
          </div>
        </GlassPane>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">History</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {sessions.length === 0 ? (
            <div className="text-slate-500 text-center py-12 italic text-sm bg-white/5 rounded-lg border border-white/10">
              No data yet.<br/>The system is waiting for your signal.
            </div>
          ) : (
            sessions.slice().reverse().map(session => (
              <GlassPane key={session.id} intensity={0} className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${TRAPS[session.trap]?.color || 'bg-slate-500'}`} />
                  <div>
                    <div className="text-sm text-slate-200 font-medium font-serif">{session.taskName}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{new Date(session.timestamp).toLocaleDateString()} &middot; {session.trap ? TRAPS[session.trap].name : 'Unknown'}</div>
                  </div>
                </div>
                <div className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${
                  session.result === 'back_on_track' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                  session.result === 'partial' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                  'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}>
                  {session.result?.replace(/_/g, ' ')}
                </div>
              </GlassPane>
            ))
          )}
        </div>
      </div>

      {/* Data Agency Footer */}
      <div className="pt-8 border-t border-white/10">
        <h4 className="text-[10px] uppercase tracking-widest text-slate-600 mb-4">Data Agency (Local Only)</h4>
        <div className="flex gap-4">
          <GemButton onClick={exportData} variant="ghost" className="px-3 py-1 text-xs flex items-center gap-2" ariaLabel="Export JSON">
            <Download className="w-3 h-3" /> Export JSON
          </GemButton>

          {!showClearConfirm ? (
            <GemButton onClick={() => setShowClearConfirm(true)} variant="ghost" className="px-3 py-1 text-xs flex items-center gap-2 text-slate-400" ariaLabel="Clear history">
              <Trash2 className="w-3 h-3" /> Clear History
            </GemButton>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-400">Are you sure?</span>
              <GemButton onClick={clearData} variant="danger" className="px-3 py-1 text-xs" ariaLabel="Confirm clear history">Yes</GemButton>
              <GemButton onClick={() => setShowClearConfirm(false)} variant="ghost" className="px-2 py-1 text-xs" ariaLabel="Cancel clear"><X className="w-3 h-3"/></GemButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP SHELL ---

export default function AnalyzerApp() {
  const [view, setView] = useState('start'); // start, anchor, symptom, calibrate, diagnosis, intervention, summary, dashboard
  const [sessionData, setSessionData] = useState({
    id: null,
    taskName: '',
    context: '',
    friction: 50,
    trap: null,
    result: null,
    note: ''
  });

  const updateSession = (key, val) => setSessionData(prev => ({ ...prev, [key]: val }));

  const saveSession = (finalData) => {
    const completedSession = {
      ...sessionData,
      ...finalData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    storageSaveSession(completedSession);
    
    setView('dashboard');
    setSessionData({ id: null, taskName: '', context: '', friction: 50, trap: null, result: null, note: '' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.12), transparent 25%), radial-gradient(circle at 80% 0%, rgba(34,211,238,0.12), transparent 20%), radial-gradient(circle at 40% 70%, rgba(79,70,229,0.08), transparent 30%)' }} />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '140px 140px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <header className="flex items-center justify-between mb-10">
          <Link to="/" className="text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-2">
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
            <GemButton onClick={() => setView('dashboard')} variant="ghost" className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs" ariaLabel="Open log">
              <History className="w-4 h-4" /> Log
            </GemButton>
          </div>
        </header>

        <div className="grid lg:grid-cols-[320px,1fr] gap-6 lg:gap-10 items-start">
          <div className="space-y-4 lg:space-y-6">
            <StepRail current={view} />
            <GlassPane intensity={0} className="p-4 lg:p-5 border-dashed border-white/20">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-2">Guidance</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We matched the analyzer shell to the landing experience: glass, glow, and motion. Sessions never leave your browser; export or clear anytime.
              </p>
            </GlassPane>
          </div>

          <GlassPane intensity={2} className="p-6 lg:p-8 min-h-[70vh] relative overflow-hidden border border-white/20">
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
                    updateSession('trap', id);
                    setView('calibrate');
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
                <DiagnosisReveal 
                  trapId={sessionData.trap}
                  onNext={() => setView('intervention')}
                />
              )}

              {view === 'intervention' && (
                <InterventionDeck 
                  trapId={sessionData.trap}
                  onComplete={() => setView('summary')}
                />
              )}

              {view === 'summary' && (
                <Summary 
                  data={sessionData}
                  onSave={saveSession}
                />
              )}

              {view === 'dashboard' && (
                <Dashboard onNewSession={() => setView('anchor')} />
              )}
            </main>
          </GlassPane>
        </div>
      </div>
    </div>
  );
}
