# **PROJECT LOKI — DESIGN SYSTEM V2**

*A Constitutional, Production-Grade UI Specification*

---

# 0. PURPOSE

This document defines the official UI design system for Project Loki.
It translates the philosophy, operating model, and transformation arc into concrete design rules.

Every element in this system must:

* Preserve agency
* Reduce friction
* Clarify the next lever
* Avoid shame framing
* Support slow, deliberate focus
* Embody care and craftsmanship


It replaces Design System V1 and governs all interfaces in the Loki ecosystem, beginning with the Gumption Trap Analyzer.

---

# 1. DESIGN IDENTITY

## 1.1 Core metaphors

These metaphors shape the *visual logic*, not the branding:

* **Lens** — clarity emerging from blur
* **Pane** — a controlled diagnostic surface
* **Depth Field** — the complex, emotional background
* **Gem** — intentionality and agency
* **Calibration** — smooth transitions, no sudden behavior

They mirror the foundational sequence:

**Signal → Diagnosis → Lever → Redesign → Stabilize → Iterate**


## 1.2 Visual qualities

* Calming
* Precise
* Layered
* High-clarity surfaces
* Gentle gradients (emotional fog)
* No harsh whites or solid blocks unless intentional
* Emphasis through depth, not color saturation
* Slow, smooth motion

This visual philosophy must reflect the emotional journey from chaos to clarity.


---

# 2. COLOR SYSTEM V2

Color expresses **meaning**, not decoration.

## 2.1 Material tokens (mandatory)

These define the three permitted pane densities:

**Glass-0 — Zoning Surface**

```
bg-white/10 backdrop-blur-sm border-white/20
```

**Glass-1 — Primary Interaction Pane**

```
bg-white/40 backdrop-blur-md border-white/40 shadow-xl
```

**Glass-2 — Active / Modal Pane**

```
bg-white/70 backdrop-blur-xl border-white/50 shadow-2xl
```

Usage:

* Glass-1 is the Analyzer’s default
* Glass-2 only for modals or focus states
* Glass-0 for subtle grouping or secondary containers

## 2.2 Neutral palette

* Ink — `#1A1A1A` (soft black)
* Carbon — `#4A4A4A`
* Fog — `#F3F4F6`
* Stone — `#E5E7EB`

Neutral colors control the rhythm of calmness.

## 2.3 Semantic palette

### Primary accents

* **Quality Indigo / Deep Sapphire**
  gradient: `from-indigo-500 to-blue-600`
* **Gumption Amber / Topaz**
  gradient: `from-amber-400 to-orange-500`

Guidance:
Use Indigo for system identity.
Use Amber for *Analyzer action triggers*.

### Trap colors (“Prisms”)

Used as accents only — borders, icons, glows.

* Anxiety → Amethyst
* Boredom → Slate
* Egotism → Crimson
* Intermittent → Emerald
* Reassembly → Cyan


---

# 3. TYPOGRAPHY SYSTEM

The typography structure must mirror the three layers of Loki:

1. **Philosophy voice (Worldview)** — Serif
2. **Interface voice (Systems)** — Sans
3. **Data voice (Diagnostics)** — Monospace

## 3.1 Families

* Serif: **Lora**, **Playfair Display**
* Sans: **Inter**, **Satoshi**
* Mono: **JetBrains Mono**

## 3.2 Adjustments for glass

* Tighten sans serif tracking: `-0.02em`
* Increase serif line-height for readability on blurred surfaces
* Italics allowed sparingly to emphasize conceptual distinctions

---

# 4. LAYOUT & SPACING

## 4.1 Global layout

* Single column, centered
* Max-width: 640–720px for Analyzer
* Generous vertical space
* Backgrounds must remain soft and atmospheric

## 4.2 Spacing scale (8px base)

| Token | Value |
| ----- | ----- |
| xs    | 4px   |
| sm    | 8px   |
| md    | 16px  |
| lg    | 24px  |
| xl    | 32px  |
| 2xl   | 48px  |
| 3xl   | 64px  |

Layout should feel **uncluttered and breathable**, reducing cognitive friction.


---

# 5. COMPONENT SYSTEM

## 5.1 Pane (Card Replacement)

Every pane must include:

* glass background
* blur
* soft inner glow
* thin white border
* deep shadow for depth

This is the core building block of Loki.

## 5.2 Buttons (“Gems”)

Buttons must feel:

* precise
* intentional
* crafted
* slightly extruded

Variants:

* **Indigo Gem** → primary system actions
* **Amber Gem** → Analyzer-specific “run lever” actions

Hover: slight rise + brightness increase
Active: small compression (scale 0.97)

## 5.3 Inputs

Inputs should feel **recessed into** the pane:

```
bg-black/5 border border-slate-200
focus:ring-2 focus:ring-indigo-400/50
focus:bg-white/80
```

## 5.4 Icons

Use **Lucide** or a similarly lightweight system.
Icons represent **concepts**, not decoration.

---

# 6. MOTION SYSTEM

Motion expresses calibration and lens adjustment.

Rules:

* Duration: 300–500ms
* Easing: `cubic-bezier(0.25, 1, 0.5, 1)`
* No bounce, elastic, overshoot
* Transitions must be directional (slight vertical or opacity shifts)

Motion must never feel frenetic.
It must feel **engineered**.

---

# 7. ANALYZER EXTENSIONS

These components apply the design system to the flagship tool.
All are derived from the Analyzer spec.


## 7.1 ProgressHeader

Minimal, with subtle translucency.
Displays:

* title
* progress meter
* exit

## 7.2 BigInputPane

Glass pane containing the Step 1 task anchor input.

## 7.3 SymptomSelector

Each symptom card is:

* a Glass-1 pane
* trap-color accent
* icon
* label + micro description
* selection check

## 7.4 TrapCheckPanel

Yes/no toggles rendered on Glass-1 surfaces with subtle trap-specific accents.

## 7.5 PlaybookStepper

Each step rendered on a Glass-1 pane with:

* instruction
* small explanatory text
* interactive element (timer, input, checkbox)
* next button (Gem)

## 7.6 GumptionTimer

Soft translucent timer interface with mono type.

## 7.7 SessionSummary

Final pane prompting:

* outcome tag
* reflection input
* gem-button save

---

# 8. ACCESSIBILITY

Mandatory:

* 16px minimum text
* high contrast text on glass
* keyboard navigability
* color used as accent, never as sole meaning
* no motion that implies urgency

---

# 9. EXTENSIBILITY RULES

Any new element must declare:

1. Its position in the Operating Model
2. Its support of the User Arc
3. Its compliance with the Quality Constitution

If any element cannot satisfy all three, it is rejected.