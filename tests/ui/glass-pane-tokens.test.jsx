import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlassPane from '../../src/ui/components/GlassPane.jsx'
import { tw } from '../../src/ui/design-system/tokens.js'

describe('GlassPane token composition', () => {
  it('applies intensity=1 by default', () => {
    const { container } = render(<GlassPane>Content</GlassPane>)
    const pane = container.firstChild
    expect(pane.className).toContain(tw.glassPane.intensities[1])
  })

  it('applies intensity=2 classes', () => {
    const { container } = render(<GlassPane intensity={2}>Content</GlassPane>)
    const pane = container.firstChild
    expect(pane.className).toContain('bg-slate-800/90')
    expect(pane.className).toContain('backdrop-blur-2xl')
    expect(pane.className).toContain('border-white/20')
    expect(pane.className).toContain('ring-1')
    expect(pane.className).toContain('ring-white/10')
  })

  it('falls back to intensity=1 when intensity is invalid', () => {
    const { container } = render(<GlassPane intensity={99}>Content</GlassPane>)
    const pane = container.firstChild
    expect(pane.className).toContain(tw.glassPane.intensities[1])
  })
})
