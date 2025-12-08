import React from 'react';
import { 
  Brain, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  History, 
  CloudFog, 
  Layers, 
  Zap
} from 'lucide-react';

export const TRAPS = {
  egotism: {
    id: 'egotism',
    name: 'Egotism',
    color: 'from-rose-500 to-red-600',
    icon: <Brain className="w-6 h-6 text-rose-200" />,
    description: "Value rigidity. You are rejecting reality because it doesn't match your model.",
    reframe: "The world isn't wrong; your map is outdated. Humility is the only way to get your vision back.",
    symptoms: [
      "I am annoyed because the world is wrong.",
      "They are idiots / The instructions are stupid.",
      "I shouldn't have to deal with this."
    ],
    diagnostic: [
      "Have you read the manual/docs in full?",
      "Are you looking for who to blame rather than what is true?",
      "Do you feel embarrassed to admit you might be missing something?"
    ],
    playbook: [
      { type: 'write', time: 180, label: 'Reality Snapshot', prompt: 'List only observable facts. No blame language. What is actually in front of you?' },
      { type: 'action', time: 420, label: 'The Manual Ritual', prompt: 'Find the source of truth (docs, email, message). Read it assuming YOU are wrong.' },
      { type: 'write', time: 300, label: 'One Correction', prompt: 'What is the smallest thing you can test to prove yourself wrong?' },
      { type: 'log', time: 60, label: 'Close Loop', prompt: 'What did reality tell you when you stopped defending yourself?' }
    ]
  },
  anxiety: {
    id: 'anxiety',
    name: 'Anxiety',
    color: 'from-violet-500 to-purple-600',
    icon: <Activity className="w-6 h-6 text-violet-200" />,
    description: "Fear of low quality. You are paralyzed because you care too much about the outcome.",
    reframe: "You are trying to finish before you start. Trade fear for structure.",
    symptoms: [
      "Keyed up and nervous about getting it wrong.",
      "Racing thoughts, tight chest.",
      "Staring at the task then looking away."
    ],
    diagnostic: [
      "Are you imagining a catastrophic failure if this isn't perfect?",
      "Are you trying to plan the whole thing in your head at once?",
      "Is the task undefined or too big?"
    ],
    playbook: [
      { type: 'write', time: 120, label: 'Name the Fear', prompt: 'What specific bad thing happens if you start?' },
      { type: 'write', time: 300, label: 'Shrink the Task', prompt: 'Break the first step into 3 micro-steps. Pick one.' },
      { type: 'action', time: 600, label: 'Dry Run', prompt: 'Do Step 1 in a sandbox (draft, scratchpad). No consequences.' },
      { type: 'timer', time: 180, label: 'Timebox', prompt: 'Work for just 3 minutes. The only goal is to touch the task.' }
    ]
  },
  boredom: {
    id: 'boredom',
    name: 'Boredom',
    color: 'from-slate-500 to-gray-600',
    icon: <CloudFog className="w-6 h-6 text-slate-200" />,
    description: "The task has lost its Quality signal. You are either tired or under-challenged.",
    reframe: "Boredom is the opposite of Quality. You must either rest or gamify.",
    symptoms: [
      "Feeling flat and vaguely repulsed.",
      "Reaching for phone / distraction.",
      "Going through the motions."
    ],
    diagnostic: [
      "Did you sleep poorly last night?",
      "Is the task too easy for your skill level?",
      "Have you been doing this for >2 hours without a break?"
    ],
    playbook: [
      { type: 'branch', label: 'Diagnostic Fork', prompt: 'Are you physically tired or just bored?', options: [
          { label: 'Actually Tired', branch: 'tired' },
          { label: 'Under-Challenged', branch: 'bored' }
        ]
      }
      // Branches are handled dynamically in the component below
    ]
  },
  intermittent: {
    id: 'intermittent',
    name: 'Intermittent Failure',
    color: 'from-emerald-500 to-teal-600',
    icon: <Zap className="w-6 h-6 text-emerald-200" />,
    description: "The ghost in the machine. Reality is flickering, causing rage.",
    reframe: "Stop trying to fix it. Start trying to trap it. You are a hunter now.",
    symptoms: [
      "Reality keeps 'flickering' on me.",
      "The problem comes and goes.",
      "Every time I try to observe, it behaves."
    ],
    diagnostic: [
      "Does it happen 100% of the time?",
      "Do you feel angry because 'it was just working'?",
      "Are you randomly trying things to make it stop?"
    ],
    playbook: [
      { type: 'write', time: 300, label: 'Fault Log', prompt: 'Create a log: Time, Context, Symptom. Do not fix.' },
      { type: 'action', time: 300, label: 'Observation Mode', prompt: 'Decide to only watch for the next 3 occurrences. Remove pressure to solve.' },
      { type: 'action', time: 600, label: 'Instrument', prompt: 'Add logging, screenshots, or recording tools.' },
      { type: 'write', time: 60, label: 'Schedule', prompt: 'When will you review the data? Set a time.' }
    ]
  },
  reassembly: {
    id: 'reassembly',
    name: 'Reassembly Failure',
    color: 'from-cyan-500 to-blue-600',
    icon: <Layers className="w-6 h-6 text-cyan-200" />,
    description: "Humpty Dumpty syndrome. You took it apart and lost the structure.",
    reframe: "You are lost in the parts. You need to rebuild the whole in your mind first.",
    symptoms: [
      "I pulled it apart and can't put it back.",
      "Lots of open loops / scattered pieces.",
      "Panic about the mess."
    ],
    diagnostic: [
      "Do you remember exactly how it looked before you started?",
      "Are there physical/digital pieces scattered everywhere?",
      "Did you underestimate the complexity?"
    ],
    playbook: [
      { type: 'action', time: 300, label: 'Clear Space', prompt: 'Clear a single work zone. Move the mess to the edges.' },
      { type: 'action', time: 900, label: 'Group Components', prompt: 'Sort pieces into related piles. Do not assemble yet.' },
      { type: 'action', time: 600, label: 'Visual Logic', prompt: 'Find a diagram or sketch the "Done" state.' },
      { type: 'write', time: 300, label: 'Checkpoint', prompt: 'Define "Good Enough" state 1. Build only to there.' }
    ]
  }
};

export const CONTEXTS = [
  'Work', 'Relationships', 'Learning', 'Maintenance', 'Creative', 'Health'
];