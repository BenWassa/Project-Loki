# Project Loki - Architecture Refactoring Sprints

## Overview

This document outlines the phased refactoring plan to clean up Project Loki's file and folder architecture. The current structure has scattered components, duplicate files, and inconsistent organization that creates maintenance overhead.

## Sprint 1: Clean Up Duplicates & Fix Imports ✅ COMPLETED

**Goal**: Remove duplicate analyzer files and establish consistent import paths.

**Tasks:**
- [x] Delete `src/analyzer/pages/analyzer-app.jsx` (old 650-line file)
- [x] Update `src/analyzer/components/index.js` to export from `AnalyzerApp.jsx` instead of `analyzer-app.jsx`
- [x] Verify `src/analyzer/index.js` imports from correct file
- [x] Run tests to ensure no broken imports
- [x] Update any documentation references to old file

**Acceptance Criteria:**
- [x] No duplicate analyzer page files exist
- [x] All imports resolve correctly
- [x] Tests pass
- [x] App builds and runs without errors

**Estimated Time:** 30 minutes
**Actual Time:** 45 minutes (included fixing corrupted code and test setup)

---

## Sprint 2: Consolidate Shared Components ✅ COMPLETED

**Goal**: Move shared UI components to a top-level components directory for better reusability.

**Tasks:**
- [x] Create `src/components/` directory
- [x] Move `src/ui/components/GemButton.jsx` to `src/components/GemButton.jsx`
- [x] Move `src/ui/components/GlassPane.jsx` to `src/components/GlassPane.jsx`
- [x] Create `src/components/index.js` with exports:
  ```javascript
  export { default as GemButton } from './GemButton'
  export { default as GlassPane } from './GlassPane'
  ```
- [x] Update imports in `AnalyzerApp.jsx`:
  ```jsx
  // Change from:
  import GemButton from '../../ui/components/GemButton'
  import GlassPane from '../../ui/components/GlassPane'
  // To:
  import { GemButton, GlassPane } from '../../components'
  ```
- [x] Update imports in `src/pages/home.jsx` (if any) - *No changes needed*
- [x] Update test imports in `tests/analyzer/gembutton.test.jsx` - *No changes needed*
- [x] Remove empty `src/ui/components/` directory
- [x] Update `src/ui/design-system/index.js` if needed - *No changes needed*
- [x] Update README.md documentation references

**Acceptance Criteria:**
- [x] Shared components are in `src/components/`
- [x] All imports updated and working
- [x] Tests pass
- [x] No broken references to old paths

**Estimated Time:** 45 minutes
**Actual Time:** 30 minutes

---

## Sprint 3: Restructure Analyzer into Features

**Goal**: Move analyzer-specific code into a features-based architecture for better organization and scalability.

**Tasks:**
- [ ] Create `src/features/analyzer/` directory structure:
  ```
  src/features/analyzer/
  ├── components/     # Future analyzer-specific components
  ├── data/          # trap-constants.jsx, contexts.jsx
  ├── logic/         # playbook-branching.js
  ├── utils/         # storage.js
  ├── operatingModel.js
  └── index.js       # Feature exports
  ```
- [ ] Move `src/analyzer/data/trap-constants.jsx` to `src/features/analyzer/data/trap-constants.jsx`
- [ ] Move `src/analyzer/logic/playbook-branching.js` to `src/features/analyzer/logic/playbook-branching.js`
- [ ] Move `src/analyzer/utils/storage.js` to `src/features/analyzer/utils/storage.js`
- [ ] Move `src/analyzer/operatingModel.js` to `src/features/analyzer/operatingModel.js`
- [ ] Create `src/features/analyzer/utils/index.js`:
  ```javascript
  export { loadSessions, saveSession, clearSessions } from './storage'
  ```
- [ ] Create `src/features/analyzer/index.js`:
  ```javascript
  export { default as AnalyzerApp } from '../../pages/Analyzer'
  export { AnalyzerModel } from './operatingModel'
  export { TRAPS, CONTEXTS } from './data/trap-constants'
  export { BOREDOM_BRANCHES } from './logic/playbook-branching'
  export * from './utils'
  ```
- [ ] Move `src/analyzer/pages/AnalyzerApp.jsx` to `src/pages/Analyzer.jsx`
- [ ] Update imports in `src/pages/Analyzer.jsx`:
  ```jsx
  // Change from:
  import { TRAPS, CONTEXTS } from '../data/trap-constants.jsx'
  import { BOREDOM_BRANCHES } from '../logic/playbook-branching.js'
  import { loadSessions, saveSession as storageSaveSession, clearSessions } from '../utils/storage.js'
  // To:
  import { TRAPS, CONTEXTS, BOREDOM_BRANCHES, loadSessions, saveSession as storageSaveSession, clearSessions } from '../features/analyzer'
  ```
- [ ] Update `src/main.jsx` import:
  ```jsx
  // Change from:
  import AnalyzerApp from './analyzer'
  // To:
  import AnalyzerApp from './pages/Analyzer'
  ```
- [ ] Move tests to match structure:
  - Move `tests/analyzer/trap-constants.test.jsx` to `tests/features/analyzer/trap-constants.test.jsx`
  - Move `tests/analyzer/playbook-branching.test.js` to `tests/features/analyzer/playbook-branching.test.js`
  - Move `tests/analyzer/storage.test.js` to `tests/features/analyzer/storage.test.js`
  - Move `tests/analyzer/gembutton.test.jsx` to `tests/components/gembutton.test.jsx`
- [ ] Update test import paths accordingly
- [ ] Remove old `src/analyzer/` directory
- [ ] Update any documentation references

**Acceptance Criteria:**
- Analyzer code is organized under `src/features/analyzer/`
- All imports updated and working
- Tests reorganized and passing
- App builds and runs without errors
- Clean git history (no broken commits)

**Estimated Time:** 90 minutes

---

## Sprint 4: Archive Legacy Code

**Goal**: Clean up experimental and legacy code that's no longer needed.

**Tasks:**
- [ ] Move `experiments/analyzer_mvp/` to `experiments/archive/analyzer_mvp/`
- [ ] Update `experiments/archive/analyzer_mvp/README.md` with archival note
- [ ] Verify no active imports reference archived code
- [ ] Update project README to reflect new structure
- [ ] Run full test suite
- [ ] Test production build

**Acceptance Criteria:**
- Legacy code archived appropriately
- No active references to archived code
- All tests pass
- Production build works
- Documentation updated

**Estimated Time:** 30 minutes

---

## Final Structure

After all sprints, the project will have this clean structure:

```
src/
├── components/           # Shared UI components
│   ├── index.js
│   ├── GemButton.jsx
│   └── GlassPane.jsx
├── pages/               # Route pages
│   ├── Home.jsx
│   └── Analyzer.jsx
├── features/            # Feature modules
│   └── analyzer/
│       ├── components/
│       ├── data/
│       │   ├── trap-constants.jsx
│       │   └── contexts.jsx
│       ├── logic/
│       │   └── playbook-branching.js
│       ├── utils/
│       │   ├── storage.js
│       │   └── index.js
│       ├── operatingModel.js
│       └── index.js
├── index.css
└── main.jsx

tests/
├── setup.js
├── features/
│   └── analyzer/
│       ├── trap-constants.test.jsx
│       ├── playbook-branching.test.js
│       └── storage.test.js
└── components/
    └── gembutton.test.jsx
```

## Benefits

- **Clear separation** of shared vs. feature-specific code
- **Scalable architecture** for adding new features
- **Consistent imports** and file organization
- **Easier maintenance** and onboarding
- **Future-proof** structure for growth

## Risk Mitigation

- Each sprint is small and focused
- Tests run after each change
- Git commits after each sprint
- Easy rollback if issues arise
- Documentation updated incrementally