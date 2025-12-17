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
    expect(pane.className).toContain(tw.glassPane.intensities[2])
  })

  it('falls back to intensity=1 when intensity is invalid', () => {
    const { container } = render(<GlassPane intensity={99}>Content</GlassPane>)
    const pane = container.firstChild
    expect(pane.className).toContain(tw.glassPane.intensities[1])
  })
})

