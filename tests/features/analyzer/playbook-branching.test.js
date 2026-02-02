import { describe, it, expect } from 'vitest';
import { BOREDOM_BRANCHES } from '../../../src/features/analyzer/logic/playbook-branching.js';

describe('BOREDOM_BRANCHES', () => {
  it('has expected branches', () => {
    expect(BOREDOM_BRANCHES).toHaveProperty('tired');
    expect(BOREDOM_BRANCHES).toHaveProperty('bored');
  });

  it('each branch is an array of steps', () => {
    Object.values(BOREDOM_BRANCHES).forEach(arr => {
      expect(Array.isArray(arr)).toBeTruthy();
      expect(arr.length).toBeGreaterThan(0);
      arr.forEach(step => {
        expect(step).toHaveProperty('type');
        expect(step).toHaveProperty('label');
      });
    });
  });
});
