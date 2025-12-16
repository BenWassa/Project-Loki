# Sprint 1 – Design System Expansion

This document outlines the tasks for Sprint 1 of the Project Loki roadmap. The goal of this sprint is to build a foundational design system and begin integrating it into the existing codebase without sacrificing the distinctive interactivity of the landing page.

## Objectives

1. **Tokenise Styles**: Define colour, spacing, typography and motion tokens that capture Project Loki's visual language. The tokens should live under `src/ui/design-system/tokens.js` (or a similar file) and export named variables (e.g. `colors.primary`, `spacing.xs`).

2. **Refactor Core Components**: Update the existing `GemButton` and `GlassPane` components to consume these tokens instead of hard‑coded Tailwind classes. Ensure the API remains the same (`variant` and `intensity` props) so that existing usages continue to work.

3. **Home Page Integration**: Select one section of the home page (e.g. the call‑to‑action section) and refactor its layout to use the new tokens. Wrap the bespoke components (magnetic button, spotlight card) in a wrapper that injects design tokens for colours and spacing, but keep their original animations and behaviours.

4. **Documentation**: Draft a comprehensive markdown document at `docs/product/DesignSystem.md` describing the purpose of the design system, listing available tokens, and providing examples of how to use the shared components. Include "do" and "don't" guidelines for each component.

5. **Unit Tests**: Write unit tests for the tokens and the updated components under `tests/ui`. Tests should verify that tokens export expected values and that components apply the correct classes for each variant.

---

## Deliverables

- ✅ `src/ui/design-system/tokens.js` (or equivalent) with defined colour, spacing, typography and motion variables.
- ✅ Updated `GemButton.jsx` and `GlassPane.jsx` consuming these tokens.
- ✅ Refactored section of `src/pages/home.jsx` using the design system tokens.
- ✅ `docs/product/DesignSystem.md` with usage guidelines and examples.
- ✅ New unit tests under `tests/ui/`.

---

## Task Breakdown

### Task 1.1: Create Design Tokens File

**File**: `src/ui/design-system/tokens.js`

**Scope**: Define and export tokens for:
- **Colors**: primary (indigo), secondary (amber), neutral (slate), semantic (emerald, rose, cyan)
- **Spacing**: xs (0.25rem), sm (0.5rem), md (1rem), lg (1.5rem), xl (2rem), 2xl (3rem)
- **Typography**: font families (serif, sans, mono), sizes (sm, base, lg, xl, 2xl), weights (light, normal, medium, bold)
- **Motion**: transition durations, easing functions, animation presets
- **Borders**: radius (sm, md, lg, full), widths (1px, 2px)
- **Shadows**: subtle, medium, strong, glow

**Acceptance Criteria**:
- File exists and exports at least 5 colour tokens, 6 spacing tokens, and motion/typography tokens.
- All tokens match the current visual language used in `AnalyzerApp.jsx` and `home.jsx`.
- Tests verify token values and types.

---

### Task 1.2: Refactor GemButton and GlassPane

**Files**: `src/ui/components/GemButton.jsx`, `src/ui/components/GlassPane.jsx`

**Scope**: 
- Import tokens from `src/ui/design-system/tokens.js`.
- Replace hard‑coded Tailwind classes with token references (e.g., `from-indigo-600` becomes `tokens.colors.primary.dark`).
- Ensure `variant` and `intensity` props continue to work as before.
- Update component logic to compose classes dynamically from tokens.

**Acceptance Criteria**:
- Components still export the same API and accept the same props.
- All existing usages in the codebase continue to work without changes.
- Unit tests pass and verify correct class generation for each variant/intensity.

---

### Task 1.3: Home Page Token Integration (Pilot)

**File**: `src/pages/home.jsx`

**Scope**: Select the hero section (e.g. the "Begin Diagnosis" CTA area) and refactor it to:
- Use tokens for colours (text, background, borders).
- Use tokens for spacing (padding, margins, gaps).
- Preserve the existing `MagneticButton`, `DecryptedText`, and `SpotlightCard` interactions.
- Wrap the section in a token‑aware context or layout component if needed.

**Acceptance Criteria**:
- Hero section visually unchanged after refactor.
- Tokens are used for all colour and spacing declarations in the refactored section.
- Interactive elements (magnetic button, animated text) work exactly as before.
- No regression in animations or user interactions.

---

### Task 1.4: Design System Documentation

**File**: `docs/product/DesignSystem.md`

**Scope**: Create a comprehensive guide covering:
- **Purpose**: Why the design system exists and how it helps maintainability.
- **Token Reference**: Organized table of all tokens (colours, spacing, typography, motion).
- **Component Usage**: Examples and "do/don't" guidelines for `GemButton`, `GlassPane`, and other shared components.
- **Theming**: How to extend tokens or add a new variant.
- **Contributing**: How to add new tokens or update existing ones.

**Acceptance Criteria**:
- Document is at least 2–3 pages and covers all major token categories.
- Includes code examples (snippets showing token usage).
- Includes visual examples or links to Figma/design tool (if applicable).
- Document is clear and accessible to both designers and developers.

---

### Task 1.5: Unit Tests for Design System

**Folder**: `tests/ui/`

**Files**: `tests/ui/tokens.test.js`, `tests/ui/gem-button-tokens.test.jsx`, `tests/ui/glass-pane-tokens.test.jsx` (or combined)

**Scope**:
- Test that tokens export expected values (colours, spacing, etc.).
- Test that `GemButton` with each variant applies the correct Tailwind classes (composed from tokens).
- Test that `GlassPane` with each intensity applies the correct classes.
- Test edge cases (missing variant, invalid intensity).

**Acceptance Criteria**:
- At least 10 tests covering tokens, GemButton and GlassPane.
- All tests pass.
- Test coverage is > 80% for the design system files.

---

## Notes

### Preserve Interactivity
The custom components used on the landing page (e.g. magnetic buttons, spotlight cards) should not lose their unique interactions. Only replace the underlying colour and spacing definitions with design tokens, and wrap them in design system components where possible.

### Incremental Integration
This sprint does not require refactoring the entire site. Focus on building the token infrastructure and demonstrating its use on a small part of the home page.

### Team Collaboration
Coordinate with designers to ensure that tokens reflect the intended visual language. Collect feedback after the refactor to guide future integration work.

---

## Definition of Done

A task is considered done when:
1. Code is written and reviewed (if applicable).
2. All tests pass (unit tests for code, visual tests for UI changes).
3. Documentation is updated (code comments, README updates, or new docs as needed).
4. Changes are committed and merged into `main` (or a feature branch ready for merge).
5. No regressions are observed in the dev environment or production build.

---

## Success Criteria (End of Sprint)

By the end of Sprint 1, Project Loki will have:
- ✅ A reusable design system foundation with well-defined tokens.
- ✅ Updated core components (`GemButton`, `GlassPane`) consuming tokens.
- ✅ A pilot refactor of a home page section using the new design system.
- ✅ Comprehensive documentation guiding future design system usage.
- ✅ Solid test coverage for new and updated code.

This work sets the stage for broader adoption of the design system in later sprints and ensures that future contributors have a clear, maintainable foundation to build upon.

---

*Sprint 1 Plan created: 2025-12-16*

*Status: Ready to begin implementation*

