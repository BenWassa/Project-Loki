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

- **Egotism** - Value rigidity and rejecting reality
- **Impatience** - The rush to see results prematurely
- **Laziness** - Physical and intellectual sloth
- **Fear** - Anxiety that paralyzes progress
- **Boredom** - The trap of insufficient challenge
- **Fog** - Misunderstanding what you're actually trying to do

Each trap includes diagnostic questions, practical reframes, and a path forward.

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
