import { describe, it, expect } from 'vitest'
import { colors, spacing, typography, motion, borders, shadows, tw } from '../../src/ui/design-system/tokens.js'

describe('design tokens', () => {
  it('exports expected color tokens', () => {
    expect(colors.primary.base).toBe('#6366F1')
    expect(colors.neutral.background).toBe('#050505')
    expect(typeof colors.primary.surface).toBe('string')
  })

  it('exports expected spacing tokens', () => {
    expect(spacing.xs).toBe('0.25rem')
    expect(spacing.sm).toBe('0.5rem')
    expect(spacing.md).toBe('1rem')
    expect(spacing.lg).toBe('1.5rem')
    expect(spacing.xl).toBe('2rem')
    expect(spacing['2xl']).toBe('3rem')
  })

  it('exports typography and motion tokens', () => {
    expect(typeof typography.fontFamilies.mono).toBe('string')
    expect(typography.weights.bold).toBe(700)
    expect(motion.durations.normal).toBeGreaterThan(0)
    expect(typeof motion.easing.standard).toBe('string')
  })

  it('exports border and shadow tokens', () => {
    expect(borders.radius.full).toBe('9999px')
    expect(typeof shadows.glow).toBe('string')
  })

  it('exports Tailwind composition tokens', () => {
    expect(tw.gemButton.base).toContain('rounded-lg')
    expect(tw.gemButton.variants.indigo).toContain('from-indigo-600')
    expect(tw.glassPane.intensities[1]).toContain('backdrop-blur-xl')
  })
})

