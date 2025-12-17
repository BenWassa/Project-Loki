import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GemButton from '../../src/ui/components/GemButton.jsx'
import { tw } from '../../src/ui/design-system/tokens.js'

describe('GemButton token composition', () => {
  it('applies indigo variant classes by default', () => {
    render(<GemButton>Click</GemButton>)
    const button = screen.getByRole('button', { name: 'Click' })
    expect(button.className).toContain('bg-gradient-to-br')
    expect(button.className).toContain('from-indigo-600')
    expect(button.className).toContain('to-blue-700')
  })

  it('applies amber variant classes', () => {
    render(<GemButton variant="amber">Amber</GemButton>)
    const button = screen.getByRole('button', { name: 'Amber' })
    expect(button.className).toContain('bg-gradient-to-br')
    expect(button.className).toContain('from-amber-500')
    expect(button.className).toContain('to-orange-600')
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
    expect(button.className).toContain('from-indigo-600')
  })

  it('allows className overrides to win over base and variant', () => {
    render(
      <GemButton
        variant="ghost"
        ariaLabel="Yes button"
        className="w-10 h-10 rounded-full text-xs px-0 py-0 bg-emerald-500/20 border-emerald-500 text-emerald-400"
      >
        Y
      </GemButton>
    )

    const button = screen.getByLabelText('Yes button')
    expect(button.className).toContain('rounded-full')
    expect(button.className).toContain('text-xs')
    expect(button.className).toContain('bg-emerald-500/20')
    expect(button.className).toContain('border-emerald-500')
    expect(button.className).toContain('text-emerald-400')

    expect(button.className).not.toContain('rounded-lg')
    expect(button.className).not.toContain('text-sm')
    expect(button.className).not.toContain('bg-white/5')
    expect(button.className).not.toContain('border-white/10')
  })
})
