import React from 'react';
import { describe, it, expect } from 'vitest';
import { TRAPS } from '../../src/analyzer/data/trap-constants.jsx';

describe('TRAPS constants', () => {
  it('should export an object with traps', () => {
    expect(typeof TRAPS).toBe('object');
    const keys = Object.keys(TRAPS);
    expect(keys.length).toBeGreaterThanOrEqual(1);
  });

  it('each trap should have required fields', () => {
    Object.values(TRAPS).forEach(trap => {
      expect(trap).toHaveProperty('id');
      expect(trap).toHaveProperty('name');
      expect(trap).toHaveProperty('description');
      expect(Array.isArray(trap.playbook)).toBeTruthy();
    });
  });

  it('includes implemented traps: impatience and fog', () => {
    expect(TRAPS).toHaveProperty('impatience');
    expect(TRAPS).toHaveProperty('fog');
  });
});
