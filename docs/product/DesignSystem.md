# Project Loki Design System

This design system exists to keep Project Loki visually coherent across the landing page and the Analyzer, while still allowing bespoke interactions (magnetic buttons, spotlight cards, decrypted text).

The core concept is **tokens first**:
- Tokens define colour, spacing, typography, motion, borders, and shadows.
- Components (e.g. `GemButton`, `GlassPane`) consume tokens so style changes are centralised.

---

## Where Things Live

- Tokens: `src/ui/design-system/tokens.js`
- Exports: `src/ui/design-system/index.js`
- Components: `src/ui/components/`

---

## Token Reference

Import tokens from:

```js
import { colors, spacing, typography, motion, borders, shadows, tw } from '@/ui/design-system'
```

### Colors (`colors`)

- `colors.primary`
  - `base`, `emphasis`, `highlight`
  - `surface`, `surfaceSoft`, `border`
- `colors.secondary`
  - `base`, `emphasis`, `highlight`, `surface`
- `colors.neutral`
  - `background`, `panel`, `border`, `borderStrong`
  - `text`, `textMuted`, `inverse`
- `colors.semantic`
  - `success`, `danger`, `info`, `warning`
- `colors.glass`
  - `overlay`, `overlayStrong`

### Spacing (`spacing`)

All values are `rem` strings to enable consistent spacing in inline styles.

| Token | Value |
|---|---|
| `spacing.xs` | `0.25rem` |
| `spacing.sm` | `0.5rem` |
| `spacing.md` | `1rem` |
| `spacing.lg` | `1.5rem` |
| `spacing.xl` | `2rem` |
| `spacing.2xl` | `3rem` |

### Typography (`typography`)

- `typography.fontFamilies.sans`, `.serif`, `.mono`
- `typography.sizes.sm`, `.base`, `.lg`, `.xl`, `.2xl`
- `typography.weights.light`, `.normal`, `.medium`, `.bold`
- `typography.letterSpacing.tight`, `.wide`
- `typography.lineHeights.snug`, `.relaxed`

### Motion (`motion`)

- `motion.durations`: `instant`, `fast`, `normal`, `slow` (milliseconds)
- `motion.easing`: `standard`, `snappy` (CSS cubic-bezier strings)
- `motion.springs`: `hover`, `press` (Framer Motion spring configs)

### Borders (`borders`)

- `borders.radius`: `sm`, `md`, `lg`, `full`
- `borders.width`: `thin`, `thick`

### Shadows (`shadows`)

- `shadows.subtle`, `shadows.medium`, `shadows.strong`, `shadows.glow`

### Tailwind Composition Tokens (`tw`)

`tw` is a small set of **Tailwind classname tokens** used to keep shared components stable while still centralising the class composition. This is especially useful when consumers rely on Tailwind overrides via `className` (e.g. `p-0`, `rounded-full`).

---

## Components

### `GemButton`

**File:** `src/ui/components/GemButton.jsx`

**Props**
- `variant`: `'indigo' | 'amber' | 'ghost' | 'danger' | 'home'` (default: `'indigo'`)
- `disabled`: boolean
- `ariaLabel`: string (recommended when button content is not plain text)
- `className`: Tailwind overrides / sizing
- `onClick`: handler

**Do**
- Use `variant="home"` for primary CTAs that should feel “bright” against dark backgrounds.
- Use `variant="ghost"` for secondary actions, filters, and utility controls.
- Pass sizing via `className` for compact buttons (e.g. `w-10 h-10 p-0 rounded-full`).

**Don’t**
- Don’t re-implement the same gradients/shadows inline; add/adjust a token in `tokens.js` and reuse it.
- Don’t remove `ariaLabel` for icon-only buttons.

**Example**

```jsx
<GemButton variant="ghost" ariaLabel="Open settings" className="w-10 h-10 p-0 rounded-full">
  ⚙️
</GemButton>
```

### `GlassPane`

**File:** `src/ui/components/GlassPane.jsx`

**Props**
- `intensity`: `0 | 1 | 2` (default: `1`)
- `className`: padding/layout classes live here (component does not hardcode padding)

**Do**
- Use `intensity={1}` for most cards/rails.
- Use `intensity={2}` for hero cards that need extra separation/weight.

**Don’t**
- Don’t bake padding into `GlassPane`; consumers should set spacing so the component stays flexible.

**Example**

```jsx
<GlassPane intensity={1} className="p-6 space-y-4">
  <h2 className="text-white">Panel Title</h2>
  <p className="text-slate-400">Panel content…</p>
</GlassPane>
```

---

## Theming and Extension

When extending the system:
1. Add new tokens in `src/ui/design-system/tokens.js`.
2. Prefer using tokens in components rather than scattering one-off classnames.
3. If a component must remain Tailwind-overridable via `className`, put the composed classnames under `tw.*` and reference them from the component.

---

## Contributing Checklist

- Tokens are named consistently and grouped by category.
- Components use tokens (or `tw` tokens) instead of duplicating style logic.
- Add/update tests in `tests/ui/` for new token groups or variants.

