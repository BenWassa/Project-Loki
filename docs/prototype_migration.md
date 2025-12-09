# Prototype Migration Guide

This document outlines recommended steps to archive the prototype and consolidate the `src/analyzer` implementation as the single source of truth.

1. Validate that `src/analyzer` covers all features necessary for current users and that all critical flows are migrated from the prototype.
2. Copy or move design artifacts and any reusable prototype code to `experiments/archive/analyzer_mvp` with a README describing the state and any outstanding work.
3. Remove duplicate or unused files in `src/analyzer` (e.g., duplicate `AnalyzerApp.jsx` / `analyzer-app.jsx`) if they are no longer necessary. Prefer `analyzer-app.jsx` (lowercase) for import consistency with `src/main.jsx`.
4. Add unit and integration tests for the components moved from the prototype and verify that `vitest` passes locally.
5. Update the `README.md` and docs to reflect the updated repo structure and any API changes.
6. If you want to preserve the prototype history, consider creating a dedicated branch `prototype/archive` or a separate archive folder in the `experiments` directory.

Short checklist:

- [ ] Copy or archive `experiments/analyzer_mvp` to `experiments/archive/` or `experiments/archive/analyzer_mvp`.
- [ ] Remove duplicate `AnalyzerApp.jsx` or merge changes into the canonical file.
- [ ] Update imports to consistent file names (kebab-case or camelCase) within `src/analyzer`.
- [ ] Add tests for any migrated code.

If you'd like, I can create a PR to move the duplicate files to `experiments/archive/` or rename the canonical file and update imports. Let me know which action you prefer.
