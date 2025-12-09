# Analyzer Module (Loki OS)

This folder contains the production-level Analyzer subsystem.

Module contract (Operating Model):

- Signal → Extracted from user input (task + context + friction)
- Diagnosis → Heuristic or calibrated decision on which trap is present
- Lever → Playbook or actions to apply
- Redesign → Systemic change suggestions to reduce friction
- Stabilize → Monitoring and follow-up checks

Public API: `AnalyzerModel` (from `operatingModel.js`)

Functions:
- `signal({taskName, context, friction})` → returns normalized signal object
- `diagnosis(signal, explicitSelection?)` → returns {trapId, confidence}
- `lever(trapId)` → returns playbook steps for trap
- `redesign(playbook, modifications)` → returns a design plan
- `stabilize(trapId)` → returns a monitoring plan

Integration:
- `src/analyzer/pages/analyzer-app.jsx` uses the module to build a resilient flow and keep the UI a thin layer.
