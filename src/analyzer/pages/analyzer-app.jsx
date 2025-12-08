import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  History, 
  Brain, 
  CloudFog, 
  Layers, 
  Zap,
  ChevronRight,
  Download,
  Trash2,
  X
} from 'lucide-react';
import { TRAPS, CONTEXTS } from '../data/trap-constants.js';
import { BOREDOM_BRANCHES } from '../logic/playbook-branching.js';

// --- COMPONENTS ---

const GlassPane = ({ children, className = "", intensity = 1 }) => {
  const intensities = {
    0: "bg-slate-900/40 border-white/5",
    1: "bg-slate-800/60 backdrop-blur-xl border-white/10 shadow-2xl",
    2: "bg-slate-800/90 backdrop-blur-2xl border-white/20 shadow-xl ring-1 ring-white/10"
  };
  
  return (
    <div className={`rounded-xl border ${intensities[intensity]} ${className}`}>
      {children}
    </div>
  );
};

const GemButton = ({ children, onClick, variant = 'indigo', className = "", disabled = false, ariaLabel }) => {
  const variants = {
    indigo: "from-indigo-600 to-blue-700 hover:brightness-110 shadow-indigo-500/20 text-white",
    amber: "from-amber-500 to-orange-600 hover:brightness-110 shadow-amber-500/20 text-white",
    ghost: "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300",
    danger: "from-red-900/50 to-red-800/50 border border-red-500/30 text-red-200 hover:bg-red-900/70"
  };

  return (
    <button 
      onClick={disabled ? null : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        relative px-6 py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-200
        bg-gradient-to-br shadow-lg flex items-center justify-center gap-2
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-0.5 active:translate-y-0'}
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </button>
  );
};

const ProgressBar = ({ current, total }) => {
  const percent = Math.min(100, (current / total) * 100);
  return (
    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

// --- SCREENS ---

const StartScreen = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-8 animate-in fade-in duration-700">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-600/20 flex items-center justify-center border border-white/10 mb-4 animate-pulse">
      <Brain className="w-10 h-10 text-indigo-300" />
    </div>
    <div className="space-y-3 max-w-md">
      <h1 className="text-4xl font-serif text-slate-100 tracking-tight">The Analyzer</h1>
      <p className="text-slate-400 text-lg leading-relaxed">
        Identify the Trap. Apply the Lever.<br/>Restore Quality.
      </p>
    </div>
    <GemButton onClick={onStart} variant="amber" className="w-48 text-base">
      <Play className="w-4 h-4" /> Begin Diagnosis
    </GemButton>
  </div>
);

const TaskAnchor = ({ data, onUpdate, onNext }) => (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
    <div className="space-y-1">
      <h2 className="text-xl font-medium text-slate-200">The Signal</h2>
      <p className="text-slate-400 text-sm">Where is the friction located?</p>
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
          className="w-full bg-transparent border-b border-slate-600 py-2 text-2xl font-serif text-white placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Context</label>
        <div className="flex flex-wrap gap-2">
          {CONTEXTS.map(ctx => (
            <button
              key={ctx}
              onClick={() => onUpdate('context', ctx)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                data.context === ctx 
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200' 
                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              {ctx}
            </button>
          ))}
        </div>
      </div>

       <div className="space-y-3">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold flex justify-between">
          <span>Friction Level</span>
          <span className="text-indigo-300">{data.friction || 50}%</span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={data.friction || 50}
          onChange={(e) => onUpdate('friction', e.target.value)}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 uppercase">
          <span>Annoying</span>
          <span>Painful</span>
          <span>Impossible</span>
        </div>
      </div>
    </GlassPane>

    <div className="flex justify-end">
      <GemButton onClick={onNext} disabled={!data.taskName || !data.context}>
        Analyze Signal <ArrowRight className="w-4 h-4" />
      </GemButton>
    </div>
  </div>
);

const SymptomSelect = ({ onSelect }) => (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
    <div className="space-y-1">
      <h2 className="text-xl font-medium text-slate-200">Symptom Scan</h2>
      <p className="text-slate-400 text-sm">Which statement feels most true right now?</p>
    </div>

    <div className="grid gap-3">
      {Object.values(TRAPS).map((trap) => (
        <button
          key={trap.id}
          onClick={() => onSelect(trap.id)}
          className="group text-left"
        >
          <GlassPane intensity={0} className="p-4 hover:bg-white/5 transition-all group-hover:border-white/20 group-hover:translate-x-1">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${trap.color} bg-opacity-10 opacity-80 shrink-0`}>
                {trap.icon}
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">{trap.name}</h3>
                <p className="text-slate-400 text-sm mt-1 leading-snug">{trap.symptoms[0]}</p>
              </div>
            </div>
          </GlassPane>
        </button>
      ))}
    </div>
  </div>
);

const Calibration = ({ trapId, onConfirm, onReject }) => {
  const trap = TRAPS[trapId];
  const [answers, setAnswers] = useState({});

  const yesCount = Object.values(answers).filter(Boolean).length;
  const isConfirmed = yesCount >= 2;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-xl font-medium text-slate-200">Calibration</h2>
        <p className="text-slate-400 text-sm">Let's verify {trap.name}.</p>
      </div>

      <GlassPane intensity={1} className="p-6 space-y-6">
        {trap.diagnostic.map((q, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
            <p className="text-slate-300 text-sm">{q}</p>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setAnswers({...answers, [idx]: true})}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  answers[idx] === true 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >Y</button>
              <button 
                onClick={() => setAnswers({...answers, [idx]: false})}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  answers[idx] === false 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >N</button>
            </div>
          </div>
        ))}
      </GlassPane>

      <div className="flex justify-between items-center">
        <button onClick={onReject} className="text-slate-500 hover:text-slate-300 text-xs px-4">
          Wrong symptoms
        </button>
        {isConfirmed ? (
           <GemButton onClick={onConfirm} variant="amber">
             Confirm Diagnosis <CheckCircle2 className="w-4 h-4" />
           </GemButton>
        ) : (
          <div className="text-slate-500 text-xs italic px-4">
            Answer 'Yes' to at least 2...
          </div>
        )}
      </div>
    </div>
  );
};

const DiagnosisReveal = ({ trapId, onNext }) => {
  const trap = TRAPS[trapId];
  
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700">
      <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${trap.color} blur-3xl opacity-20 absolute`} />
      
      <GlassPane intensity={2} className="p-8 max-w-sm relative overflow-hidden border-t border-white/20">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${trap.color}`} />
        
        <div className="flex flex-col items-center gap-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${trap.color} bg-opacity-20 shadow-lg ring-1 ring-white/20`}>
            {React.cloneElement(trap.icon, { className: "w-10 h-10 text-white" })}
          </div>
          
          <div>
            <h2 className="text-2xl font-serif text-white mb-3">{trap.name} Detected</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-serif">
              {trap.description}
            </p>
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <p className="text-indigo-200 italic font-serif text-lg">"{trap.reframe}"</p>
            </div>
          </div>
        </div>
      </GlassPane>

      <GemButton onClick={onNext} variant="indigo" className="w-full max-w-xs">
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
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-slate-500">
        <span>Step {step + 1} of {playbook.length}</span>
        <span>{trap.name} Protocol</span>
      </div>
      
      <ProgressBar current={step + 1} total={playbook.length} />

      <GlassPane intensity={2} className="flex-1 p-6 flex flex-col justify-between animate-in slide-in-from-right-8 duration-500">
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
                  <GemButton key={opt.label} onClick={() => handleBranch(opt.branch)} variant="indigo">
                    {opt.label}
                  </GemButton>
                ))}
              </div>
            ) : currentAction.type === 'write' || currentAction.type === 'log' ? (
              <textarea 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-32 bg-black/20 rounded-lg border border-white/10 p-4 text-slate-300 focus:border-indigo-500 focus:outline-none resize-none font-mono text-sm"
              />
            ) : currentAction.type === 'timer' || currentAction.type === 'action' ? (
              <div className="flex flex-col items-center justify-center p-8 bg-black/10 rounded-xl border border-white/5">
                 <div className="text-5xl font-mono text-slate-200 mb-6 font-light">
                   {timeLeft !== null ? formatTime(timeLeft) : formatTime(currentAction.time)}
                 </div>
                 {timeLeft === null ? (
                   <GemButton onClick={startTimer} variant="amber" className="w-full">
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
            <GemButton onClick={nextStep} variant="ghost" disabled={currentAction.type === 'timer' && timeLeft > 0}>
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
        <h2 className="text-2xl font-serif text-white">Stabilize</h2>
        <p className="text-slate-400">Anchor the win. How did it go?</p>
      </div>

      <GlassPane intensity={1} className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-2">
          {outcomes.map(o => (
            <button
              key={o.id}
              onClick={() => setOutcome(o.id)}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                outcome === o.id 
                  ? 'bg-indigo-500/20 border-indigo-500 text-white' 
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {o.icon}
              <span className="text-xs font-medium">{o.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Reflection</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="One sentence on what you learned..."
            className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </GlassPane>

      <GemButton onClick={() => onSave({ result: outcome, note })} variant="amber" className="w-full">
        Save to Log
      </GemButton>
    </div>
  );
};

const Dashboard = ({ onNewSession }) => {
  const [sessions, setSessions] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('loki_sessions_v1');
    if (saved) setSessions(JSON.parse(saved));
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
    localStorage.removeItem('loki_sessions_v1');
    setSessions([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-serif text-slate-200">Weekly Patterns</h1>
        <GemButton onClick={onNewSession} variant="indigo" className="py-2 px-4 text-xs">
          New Scan
        </GemButton>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            <div className="text-slate-500 text-center py-12 italic text-sm bg-white/5 rounded-lg border border-white/5">
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
      <div className="pt-8 border-t border-white/5">
        <h4 className="text-[10px] uppercase tracking-widest text-slate-600 mb-4">Data Agency (Local Only)</h4>
        <div className="flex gap-4">
          <button onClick={exportData} className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors">
            <Download className="w-3 h-3" /> Export JSON
          </button>
          
          {!showClearConfirm ? (
            <button onClick={() => setShowClearConfirm(true)} className="flex items-center gap-2 text-xs text-slate-400 hover:text-rose-400 transition-colors">
              <Trash2 className="w-3 h-3" /> Clear History
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-400">Are you sure?</span>
              <button onClick={clearData} className="text-xs font-bold text-rose-400 underline">Yes</button>
              <button onClick={() => setShowClearConfirm(false)} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3"/></button>
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
    
    const existing = JSON.parse(localStorage.getItem('loki_sessions_v1') || '[]');
    localStorage.setItem('loki_sessions_v1', JSON.stringify([...existing, completedSession]));
    
    setView('dashboard');
    setSessionData({ id: null, taskName: '', context: '', friction: 50, trap: null, result: null, note: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col p-4">
        
        {/* Header (except on start) */}
        {view !== 'start' && (
          <header className="flex items-center justify-between py-4 mb-4 border-b border-white/5">
             <button onClick={() => setView('dashboard')} className="text-slate-400 hover:text-white transition-colors">
               <History className="w-5 h-5" />
             </button>
             <div className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">Loki OS // Analyzer v1.0</div>
             <div className="w-5" /> {/* Spacer */}
          </header>
        )}

        {/* View Router */}
        <main className="flex-1 flex flex-col justify-center pb-8">
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
      </div>
    </div>
  );
}