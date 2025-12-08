# Answers to Architectural Questions

Below are answers to the clarifying questions raised in `questionstoanswer.md`. These responses are based on Project Loki's current direction as a modular quality toolbox system.

---

## **1. Analyzer Duplication Answer**

**`/analyzer/src` is the authoritative working prototype.** `/src/analyzer/` is the integration target for the modular Loki OS.

### **Current Intent:**

- **`/analyzer/`** = Self-contained MVP sandbox and design reference
  - Contains the working React prototype
  - Used for rapid iteration and user testing
  - Includes wireframes, specs, and implementation

- **`/src/analyzer/`** = Future production integration point
  - Will contain the modular version integrated into Loki OS
  - Will use shared `/src/core/` and `/src/ui/` components
  - Currently empty folders as placeholders

### **Migration Plan:**

Once `/src/analyzer/` is populated with the integrated version:
1. Move `/analyzer/` to `/experiments/analyzer_mvp/` 
2. Tag the commit for historical reference
3. Update any references

This prevents drift while maintaining the prototype for reference.

---

## **2. Documentation Placement Answer**

**Keep the intentional split between conceptual and implementation docs.**

### **Current Structure (Approved):**

- **`/docs/`** = Philosophy, vision, and conceptual model
  - `GumptionTrapAnalyzer.md` = Foundational product spec
  - `FlagshipEntryPoint.md` = Product rationale
  - Read by stakeholders, designers, and strategists

- **`/analyzer/specs/`** = Implementation specifications for developers
  - `analyzer_wireframes_v1.1.md` = UI/UX design
  - `analyzer_components_v1.1.md` = Component specifications
  - Read by developers building the feature

### **Rationale:**

This separation serves different audiences and purposes:
- Conceptual docs rarely change
- Implementation specs evolve with code
- Clear for contributors to know where to look

---

## **3. Infrastructure Placement Answer**

**Keep both copies intentionally.**

### **Option 2 (Chosen): Maintain Duplication**

- **`/infrastructure/analyzer_schema_v3.sql`** = Canonical, evolving schema
  - Updated as V3 infrastructure develops
  - Single source of truth for deployment

- **`/analyzer/specs/data_model_v3_reference.sql`** = Frozen reference for local-first development
  - Matches the prototype's data structure
  - Developers working on V1/V2 reference this
  - Won't change until V3 migration

### **Rationale:**

V1/V2 are local-first with different constraints than V3 cloud. Having the reference copy prevents developers from accidentally using V3 assumptions in V1 code.

---

## **4. Source Code Architecture Answers**

### **A. Yes, Analyzer is the first "module" of Loki OS.**

**Current alignment is correct:**

- `/src/analyzer/*` = Module-specific logic (traps, interventions, UI)
- `/src/core/*` = Framework layer (shared models, API, hooks, utils)
- `/src/ui/*` = Design System V2 (components, theming)

### **B. Yes, future tools will follow the same module pattern.**

**Planned structure:**

```
src/
    analyzer/          # Module 1: Gumption Trap Analyzer
    attention-reset/   # Module 2: Future tool
    system-builder/    # Module 3: Future tool
    core/              # Shared framework
    ui/                # Design system
```

This creates a modular architecture where each tool is a feature module.

---

## **5. Tests Folder Answer**

**`tests/analyzer` should test `/src/analyzer` (production module).**

### **Recommendation:**

- `tests/analyzer/` → Test the integrated `/src/analyzer/` code
- Do not write tests for `/analyzer/src/` (prototype)
- Once migrated, `tests/analyzer/` will contain:
  - Unit tests for trap detection logic
  - Integration tests for full analyzer workflow
  - Component tests for analyzer UI

---

## **6. Meta Questions About Repo Philosophy**

### **A. `/packages` folder?**

**No, not yet.** The project will remain a single repository until it needs monorepo management. If Loki OS grows to multiple independent tools, consider `/packages/` then.

### **B. Standalone NPM package?**

**No.** The Analyzer will be part of the integrated Loki OS experience, not a standalone package. No need for separate publishing.

### **C. Prototype preservation?**

**Archive after integration.** Move `/analyzer/` to `/experiments/analyzer_mvp/` with a git tag. This preserves history while cleaning the active codebase.

---

## **7. Technical Consistency Answers**

### **A. Filename standardization:**

**Adopt kebab-case for consistency.**

- `trap-constants.js` (not `trap_constants.js`)
- `playbook-branching.js`
- `analyzer-app.jsx`

### **B. Component folder index.js:**

**Yes, add `index.js` to all component folders.**

Example:
```
src/ui/components/
    button/
        Button.jsx
        index.js  # exports { Button }
    index.js      # exports all components
```

### **C. Import alias convention:**

**Yes, adopt strict import aliases.**

Configure in build tool:
```javascript
// Instead of relative imports
import { useTrapDetection } from '../../../core/hooks/useTrapDetection'

// Use aliases
import { useTrapDetection } from '@core/hooks/useTrapDetection'
import { Button } from '@ui/components/Button'
import { detectTrap } from '@analyzer/logic/trapDetection'
```

This maintains clarity as the codebase grows.

---

## **8. Final Architectural Assessment**

**Fully agree with the green light assessment.** The repo is:

- ✅ Clean and scalable
- ✅ Modular and well-separated
- ✅ Onboarding-friendly
- ✅ Future-ready
- ✅ Consistent with best practices

### **Action Items Identified:**

1. **High Priority:** Migrate prototype to `/src/analyzer/` and archive `/analyzer/`
2. **Medium Priority:** Implement import aliases and filename standardization
3. **Low Priority:** Add index.js files to component folders

### **No Blockers for Public Repo**

The architecture supports the project's goals as a modular quality toolbox. The identified questions are clarifications, not issues.

---

*Answers provided by Project Loki development team. Last updated: December 8, 2025*