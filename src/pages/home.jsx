import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue
} from 'framer-motion'
import { MousePointer2, Activity, Zap, Layers, Terminal } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/* UTILITIES                                 */
/* -------------------------------------------------------------------------- */

// --- 1. Decrypted Text Effect (Cyberpunk text reveal) ---
const DecryptedText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      if (iteration >= text.length) clearInterval(interval)
      iteration += 1 / 3
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{displayText}</span>
}

// --- 2. Spotlight Card (Mouse tracking gradient) ---
const SpotlightCard = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group relative border border-white/10 bg-white/5 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// --- 3. Magnetic Button ---
const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  const { x, y } = position
  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENTS                             */
/* -------------------------------------------------------------------------- */

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Initial fake loader
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center font-mono text-xs text-indigo-500">
        <div className="space-y-2 text-center">
          <Activity className="w-6 h-6 mx-auto animate-pulse mb-4" />
          <DecryptedText text="INITIALIZING SYSTEM..." className="tracking-widest" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
      {/* --- Background Nebulas (Framer Motion) --- */}
      {/* <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-950/15 blur-[100px]" 
        />
      </div> */}

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-xs font-mono tracking-[0.2em] text-white/70 flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          PROJECT LOKI // V1.0
        </div>
        <div className="text-xs font-mono tracking-[0.2em] text-white/50 hidden md:block">
          <DecryptedText text="SYS.STATUS: WAITING" />
        </div>
      </nav>

      {/* --- Section 1: Hero --- */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl w-full relative"
        >
          {/* Decorative Borders */}
          <div className="absolute -top-8 -left-8 w-16 h-16 border-t border-l border-white/10" />
          <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b border-r border-white/10" />

          <div className="mb-8">
            <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase block mb-2">
              <DecryptedText text="// SYS.DIAGNOSTIC: ENTRY" />
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-light leading-tight text-slate-100 mb-10 tracking-tight">
            The fatigue you feel is not a personal flaw.
            <span className="block mt-4 text-slate-400 text-xl md:text-2xl">
              It is the friction of a complex human system running in a world designed to fragment
              it.
            </span>
          </h1>

          <div className="p-4 border-l-2 border-indigo-500/50 bg-white/5 backdrop-blur-sm mb-12">
            <p className="font-mono text-sm text-indigo-200">Your operating model is misaligned.</p>
          </div>

          <div className="flex gap-4">
            <MagneticButton
              onClick={() => navigate('/analyzer')}
              className="px-8 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors"
            >
              [ Begin Diagnosis ]
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* --- Section 2: Noise & Signal (Spotlight Cards) --- */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-20 z-10 relative">
        <div className="w-full max-w-4xl grid grid-cols-1 gap-8 mb-20">
          <SpotlightCard className="p-8 md:p-12 rounded-xl backdrop-blur-md">
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase block mb-4">
              // ENV.ANALYSIS: SATURATION
            </span>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              You move through a world dense with signals. Life’s true signal gets drowned out by
              noise—notifications impersonating social worth, lightning deals timed to attention
              cycles, and bottomless digital reels.
            </p>
          </SpotlightCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpotlightCard className="p-8 md:p-10 rounded-xl backdrop-blur-md">
              <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase block mb-4">
                // NEURO.STATUS: EXPLOITED
              </span>
              <p className="text-base text-slate-400 font-light leading-relaxed">
                Your neurochemistry isn’t hacked; it’s exploited. Dopamine fires on demand. Novelty
                arrives instantly. Motivation dulls. Focus fractures.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-8 md:p-10 rounded-xl backdrop-blur-md border-l-4 border-l-indigo-500">
              <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase block mb-4">
                // SYS.CONCLUSION: OBSERVATION
              </span>
              <p className="text-lg text-white font-medium leading-relaxed">
                None of this is failure. It is the predictable fatigue of a human system running in
                conditions it was never built for.
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* The Imperative Pivot */}
        <div className="w-full max-w-2xl flex flex-col items-center mt-32 md:mt-48 mb-20">
          {/* Animated Connecting Rule */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="w-px bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent mb-12"
          />

          <div className="text-center space-y-6">
            {['Name the Noise.', 'Distill the Signal.', 'Reclaim your Agency.'].map((text, i) => (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4, duration: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight"
              >
                {text}
              </motion.h2>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: The Schematic (Animated SVG) --- */}
      <section className="min-h-screen w-full flex items-center justify-center px-4 py-20 z-10 bg-black/40">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Animated SVG Diagram */}
          <div className="order-2 lg:order-1 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-sm">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full opacity-90">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Central Beam */}
                <motion.path
                  d="M100 20 L100 180"
                  stroke="url(#grad1)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />

                {/* Tension Lines */}
                {[
                  { x1: 40, y1: 140, x2: 100, y2: 100 },
                  { x1: 160, y1: 140, x2: 100, y2: 100 },
                  { x1: 40, y1: 60, x2: 100, y2: 100 },
                  { x1: 160, y1: 60, x2: 100, y2: 100 }
                ].map((line, i) => (
                  <motion.path
                    key={i}
                    d={`M${line.x1} ${line.y1} L${line.x2} ${line.y2}`}
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                  />
                ))}

                {/* Base */}
                <motion.path
                  d="M40 140 L160 140 L100 180 Z"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                  fill="white"
                  fillOpacity="0.02"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                />

                {/* Nodes */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="3"
                  fill="white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1 }}
                />
              </svg>
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/30">
                FIG 1.2: STRUCTURAL INTEGRITY
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[10px] font-mono text-white/30">
                Every system has load, fulcrum, and base. Change the load and the experience
                changes.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase block mb-2">
                <DecryptedText text="// SYS.REFRAME: GEOMETRY" />
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Systems Beat Willpower.
            </h2>
            <div className="space-y-6 text-slate-300 font-light leading-relaxed border-l border-white/10 pl-6">
              <p>We don’t push harder. We redesign the load.</p>
              <p>
                When a bridge collapses, we do not blame the steel for being lazy; we redesign the
                load. Your life is a structure. If it is buckling under the weight of modern noise,
                the solution is not to push harder.
              </p>
              <p className="text-indigo-200 font-medium">It is to reinforce the beam.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Methodology Grid --- */}
      <section className="w-full py-20 relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase block mb-2">
              // TOOL.METHODOLOGY: LENS
            </span>
            <h2 className="text-2xl font-light text-white">A Tool is a Lens.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: MousePointer2,
                text: 'Conventional tools try to push your behavior. Ours exists only to reveal it.'
              },
              {
                icon: Layers,
                text: 'A good tool detects the pattern, locates the friction, and offers a precise lever to lift the weight.'
              },
              { icon: Zap, text: 'It does not demand discipline. It restores gumption.' },
              {
                icon: Terminal,
                text: 'This is the first step toward the craft of living.',
                highlight: true
              }
            ].map((item, i) => (
              <SpotlightCard
                key={i}
                className={`p-8 min-h-[160px] flex flex-col justify-between rounded-lg ${item.highlight ? 'bg-white/10' : ''}`}
              >
                <div className="text-indigo-400 mb-2">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <p
                  className={`text-sm leading-relaxed ${item.highlight ? 'text-white font-medium' : 'text-slate-400'}`}
                >
                  {item.text}
                </p>
              </SpotlightCard>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-mono text-slate-400">
              Tools modify the system, not the person.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 5: CTA --- */}
      <section
        id="diagnosis"
        className="h-[80vh] w-full flex flex-col justify-center items-center px-4 relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050505] to-transparent pointer-events-none" />

        <div className="relative z-20 text-center max-w-2xl">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 64 }}
            className="w-px bg-gradient-to-b from-transparent to-white/40 mx-auto mb-8"
          />

          <h2 className="text-3xl md:text-5xl font-light text-white mb-10 tracking-wide">
            Your first systemic win <br />
            begins with clarity.
          </h2>

          <MagneticButton
            className="group relative px-10 py-4 bg-transparent border border-white/10 text-white font-mono text-sm uppercase tracking-[0.2em] overflow-hidden transition-colors hover:border-white/60"
            onClick={() => navigate('/analyzer')}
          >
            <span className="relative z-10">[ Begin Diagnosis ]</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </MagneticButton>

          <p className="mt-8 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            Takes about two minutes.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
