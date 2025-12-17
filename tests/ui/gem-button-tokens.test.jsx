import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GemButton from '../../src/ui/components/GemButton.jsx'
import { tw } from '../../src/ui/design-system/tokens.js'

describe('GemButton token composition', () => {
  it('applies indigo variant classes by default', () => {
    render(<GemButton>Click</GemButton>)
    const button = screen.getByRole('button', { name: 'Click' })
    expect(button.className).toContain(tw.gemButton.variants.indigo)
  })

  it('applies amber variant classes', () => {
    render(<GemButton variant="amber">Amber</GemButton>)
    const button = screen.getByRole('button', { name: 'Amber' })
    expect(button.className).toContain(tw.gemButton.variants.amber)
  })

  it('applies disabled classes when disabled', () => {
    render(
      <GemButton disabled ariaLabel="Disabled button">
        Disabled
      </GemButton>
    )
    const button = screen.getByLabelText('Disabled button')
    expect(button.className).toContain(tw.gemButton.disabled)
  })

  it('falls back to indigo when variant is unknown', () => {
    render(<GemButton variant="unknown">Fallback</GemButton>)
    const button = screen.getByRole('button', { name: 'Fallback' })
    expect(button.className).toContain(tw.gemButton.variants.indigo)
  })
})

