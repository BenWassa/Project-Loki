import { TRAPS, CONTEXTS } from './data/trap-constants.jsx';

// Lightweight Analyzer operating model module
// Contract: Signal -> Diagnosis -> Lever -> Redesign -> Stabilize

const defaultModel = {
  // Signal extraction from freeform task input
  signal: ({ taskName, context, friction }) => {
    const normalized = {
      taskName: (taskName || '').trim(),
      context: context || 'Work',
      friction: Number(friction || 0),
      inferred: {},
      timestamp: Date.now()
    };

    // Quick inferences
    normalized.inferred.priority = normalized.friction > 70 ? 'high' : normalized.friction > 40 ? 'medium' : 'low';
    normalized.inferred.contextValid = CONTEXTS.includes(normalized.context);
    return normalized;
  },

  // Diagnosis: lightweight heuristic to suggest likely trap id
  diagnosis: (signal, explicitSelection) => {
    if (explicitSelection) return { trapId: explicitSelection, confidence: 1 };

    // Heuristics: word-based matching or friction heuristic
    const name = (signal.taskName || '').toLowerCase();
    let candidates = [];

    Object.values(TRAPS).forEach((t) => {
      const keywords = [t.name, ...t.symptoms, ...(t.diagnostic || [])].join(' ').toLowerCase();
      if (keywords.includes(name) || (name && t.name.toLowerCase().includes(name))) {
        candidates.push({ trapId: t.id, score: 2 });
      }
    });

    // friction-based fallback
    if (candidates.length === 0) {
      if (signal.friction > 75) candidates.push({ trapId: 'impatience', score: 1 });
      else if (signal.friction < 20) candidates.push({ trapId: 'boredom', score: 0.8 });
      else candidates.push({ trapId: 'fog', score: 0.6 });
    }

    // sort by score and return highest
    const sorted = candidates.sort((a, b) => b.score - a.score);
    return { trapId: sorted[0].trapId, confidence: sorted[0].score };
  },

  // Lever: returns playbook for trap
  lever: (trapId) => {
    const trap = TRAPS[trapId];
    return trap ? trap.playbook : [];
  },

  // Redesign: placeholder interface that returns a minimal plan to 'redesign' the system
  redesign: (playbook, modifications = {}) => {
    return {
      original: playbook,
      modifications,
      plan: playbook.map((step, i) => ({ ...step, index: i }))
    };
  },

  // Stabilize: returns monitoring suggestions
  stabilize: (trapId) => {
    return {
      trapId,
      checks: [
        { label: 'Review after 48h', check: 'has produced progress' },
        { label: 'Run result checklist', check: 'did result match the goal' }
      ]
    };
  }
};

export default defaultModel;
