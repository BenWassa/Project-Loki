# **Project Loki — Architectural Decisions (Authoritative Answers)**

These answers represent the canonical architectural direction for Project Loki as of this phase.

---

## **1. Analyzer Folder Migration**

**Decision:**
`/analyzer/` will be migrated into `/src/analyzer/` as the production module.

**Implication:**

* `/analyzer/` becomes an archived prototype.
* All future work occurs under `/src/analyzer/`.
* Prevents duplication and drift.

---

## **2. Documentation Structure**

**Decision:**
Maintain a **permanent split** between:

* **Conceptual docs** (`/docs/…`)
* **Implementation specs** (`/src/analyzer/specs/…` or module-specific specs)

**Implication:**

* Clear separation of audiences (architects vs developers).
* Consistent structure for all future Loki modules.

---

## **3. Infrastructure Schema Location**

**Decision:**
Use **one canonical location** for deployable schemas:
`/infrastructure/analyzer_schema_v3.sql`

**Implication:**

* Remove or archive `data_model_v3_reference.sql` from `/analyzer/specs`.
* All schema evolution is centralized.
* Avoids dual maintenance.

---

## **4. Module Architecture for Loki OS**

**Decision:**
**Undecided. Needs further exploration.**

Temporary stance:

* The Analyzer is the first module under `/src/analyzer/`,
* Future tools *may* follow the same pattern, but the final architecture will be determined after Analyzer integration.

**Implication:**

* Keep module folder structure flexible for now.
* Decisions deferred until first full integration milestone.

---

## **5. Test Coverage Strategy**

**Decision:**
Test **only production modules**, not prototypes.

**Implication:**

* `tests/analyzer/` will target `/src/analyzer/`
* `/analyzer/` will never be tested
* Keeps test suite clean and cost efficient.

---

## **6. Monorepo Packages Folder**

**Decision:**
**No decision yet.** Concept not needed at this stage.

Temporary stance:

* Loki will remain a single app until future scale determines need for package boundaries.

**Implication:**

* Do not create `/packages/` now.
* Revisit only when Loki OS has multiple exportable subsystems.

---

## **7. NPM Package Strategy**

**Decision:**
Analyzer will **not** be an NPM package.

**Implication:**

* Only integrated into Loki OS
* No expectations for external consumption
* Can use app-specific patterns without constraint

---

## **8. Prototype Preservation Strategy**

**Decision:**
Archive `/analyzer/` after migration to `/src/analyzer/`.

**Implication:**

* Move prototype to `/experiments/analyzer_mvp/`
* Tag commit for historical reference
* Prevents stale code from drifting next to production

---

# **Final Output for Agents**

Below is a collapsed version formatted for AI dev agents inside your repo:

```
ARCHITECTURAL DECISIONS — PROJECT LOKI

1. Analyzer Migration:
   -> Move /analyzer/ to /src/analyzer/.
   -> Archive prototype afterward.

2. Documentation Split:
   -> Keep permanent separation between conceptual docs (/docs) and implementation specs (/src/analyzer/specs or module specs).

3. Infrastructure Schema:
   -> Use ONE canonical schema location: /infrastructure/.
   -> Remove duplicate schema references from module folders.

4. Module Architecture:
   -> Analyzer is first module; future module pattern undecided.
   -> Keep structure flexible until integration milestone.

5. Tests:
   -> Only test code under /src/analyzer/.
   -> Do not test /analyzer/ prototype.

6. Monorepo Packages:
   -> No packages/ folder. Decision deferred to future scale.

7. Publication:
   -> Analyzer is NOT an NPM package.
   -> Only internal to Loki OS.

8. Prototype Archive:
   -> After migration, move /analyzer/ to /experiments/analyzer_mvp/.
   -> Tag commit for reference.

END OF DECISIONS.
```

---