# Project Loki

Project Loki is a mission to help individuals reclaim agency in a world shaped by algorithms. By revealing the subtle forces that nudge behavior, it equips people to rise above digital determinism and become deliberate architects of their own lives.

## 🎯 The Vision

In a world increasingly dominated by digital nudges and algorithmic influence, personal agency is under siege. Project Loki is designed to reverse that dynamic—giving you the tools to understand the forces shaping your behavior and the leverage to break free from unintentional traps.

## 🔍 The Gumption Trap Analyzer

At the heart of Project Loki is the **Gumption Trap Analyzer**—an interactive diagnostic tool that helps you:

- **Identify** the trap holding you back
- **Understand** its root cause and manifestations
- **Apply** targeted reframes to restore clarity
- **Transform** frustration into purposeful action

### Key Traps Covered

The current Analyzer implements the following traps (as of this codebase):

- **Egotism** - Value rigidity and rejecting reality
- **Anxiety** - Paralysis by fear of low quality or outcomes
- **Boredom** - The task has lost its Quality signal and is under-challenging
- **Intermittent Failure** - Ghosts in the machine; flickering or inconsistent failures
- **Reassembly Failure** - Things are taken apart and the whole can't be put back together
 - **Impatience** - Pushing to finish before the system is ready
 - **Fog** - Unclear goals or lack of definition leading to poor direction

Each trap includes diagnostic questions, practical reframes, and a path forward.

Note: There is an `experiments/analyzer_mvp` folder with older prototype material. The active implementation is under `src/features/analyzer`. To avoid drift, update `src/features/analyzer` and move experimental artifacts to an archive subfolder when you're ready to retire them.

Repository housekeeping (recommended):

- Move any remaining prototype files from `experiments/analyzer_mvp` to `experiments/archive/` and add a short README that documents the prototype state and purpose.
-- Keep the `src/analyzer` directory as the single source of truth for the Analyzer app. Avoid editing files under `experiments/` except for archival or migration tasks.
-- If you plan to add any previously‑planned traps (Laziness or other new traps), add them to `src/analyzer/data/trap-constants.jsx` and unit tests under `tests/analyzer` to validate behavior.

For migration from local storage to a cloud backend (future work):

- Export format: sessions are stored as `loki_sessions_v1` in localStorage and exported via the Dashboard's Export JSON; maintain backwards compatibility by supporting import/imported versions.
- Document a migration path for any V3 schema (Postgres/Supabase) so old sessions can be mapped to new fields. Consider a staged import where users approve mapping.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
git clone https://github.com/BenWassa/Project-Loki.git
cd Project-Loki
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Testing

Run unit tests with Vitest:

```bash
npm run test
```

The tests include basic checks for trap definitions, playbook branching logic, and local storage utilities.

### Build for Production

```bash
npm run build
```

Output is generated in the `docs/` directory, ready for GitHub Pages deployment.

## 🌐 Deployment

This project is configured for **GitHub Pages** deployment:

1. Push your changes to the `main` branch
2. Go to repository **Settings > Pages**
3. Set source to "Deploy from a branch" → `main` → `/docs` folder
4. GitHub will automatically deploy your changes

The app is configured with the correct base path (`/Project-Loki/`) for GitHub Pages routing.

Continuous deployment:

- A GitHub Actions workflow (`.github/workflows/pages.yml`) is included that automatically builds the site and publishes the `docs/` folder to GitHub Pages whenever changes are pushed to the `main` branch.

## 📁 Project Structure

```
src/
├── analyzer/
│   ├── components/       # Reusable UI components
│   ├── data/            # Trap definitions and constants
│   ├── logic/           # Game branching and state logic
│   └── pages/           # Main analyzer application
├── ui/
│   ├── components/      # Shared design system components
│   └── design-system/   # Tailwind and styling utilities
└── main.jsx             # App entry point
```

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + PostCSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📖 Documentation

Additional context and design documentation:
- [Project Overview](docs/meta/ProjectOverview.md)
- [Design System](docs/product/2_DesignSystem.md)
- [Operating Model](docs/system/OperatingModel.md)
- [Quality Constitution](docs/foundations/QualityConstitution.md)

## 🤝 Contributing

This is an open mission. Contributions are welcome. Feel free to:
- Report issues
- Suggest improvements
- Contribute code or documentation

## 📝 License

Project Loki is open source. See repository for full details.

---

**Mission**: Help people reclaim agency. One trap at a time.

## 🎨 UI Components (Design System)

We recently introduced a small shared component set in `src/components` to keep the Analyzer and Home pages visually consistent and reusable across the app.

- `GemButton` — a variant-driven button component with subtle motion and multiple visual variants (recommended variants: `indigo`, `amber`, `ghost`, `danger`, `home`). Use `variant="ghost"` for small utility actions; use `variant="home"` for the primary landing CTA.

Example:

```jsx
import { GemButton } from './src/components'

<GemButton variant="home" onClick={() => navigate('/analyzer')}>Begin Diagnosis</GemButton>
<GemButton variant="ghost" className="text-xs px-3 py-1">Export JSON</GemButton>
```

- `GlassPane` — a reusable glassy container with intensity levels (0, 1, 2) to match the landing aesthetic (backdrop blur, border, subtle glow).

Example:

```jsx
import { GlassPane } from './src/components'

<GlassPane intensity={2} className="p-6">...content...</GlassPane>
```

These components keep visual language consistent while preserving the Home page's polish.
