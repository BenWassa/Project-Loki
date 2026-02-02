import { describe, it, expect, beforeEach } from 'vitest';
import { loadSessions, saveSession, clearSessions, SESSIONS_KEY } from '../../../src/features/analyzer/utils/storage.js';

beforeEach(() => {
  localStorage.clear();
});

describe('storage utils', () => {
  it('loadSessions returns empty array when no data', () => {
    expect(loadSessions()).toEqual([]);
  });

  it('saveSession persists session', () => {
    const s1 = { id: 1, taskName: 'test' };
    saveSession(s1);
    const raw = JSON.parse(localStorage.getItem(SESSIONS_KEY));
    expect(raw.length).toBe(1);
    expect(raw[0].taskName).toBe('test');
  });

  it('clearSessions removes data', () => {
    saveSession({ id: 1 });
    clearSessions();
    expect(loadSessions()).toEqual([]);
  });
});
