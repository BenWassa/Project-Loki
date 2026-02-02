import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AnalyzerApp from '../../src/analyzer/pages/AnalyzerApp.jsx';

// Small smoke test: ensure the GemButton is accessible via aria labels in the main app

describe('Accessibility checks', () => {
  it('Start screen: Begin Diagnosis button includes aria-label', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <AnalyzerApp />
      </MemoryRouter>
    );
    const button = getByLabelText(/Begin diagnosis/i);
    expect(button).toBeTruthy();
  });
});
