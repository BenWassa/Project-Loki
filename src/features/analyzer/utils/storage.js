export const SESSIONS_KEY = 'loki_sessions_v1'

export function loadSessions() {
  const data = localStorage.getItem(SESSIONS_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch (e) {
    console.error('Failed to parse sessions data', e)
    return []
  }
}

export function saveSession(session) {
  const current = loadSessions()
  const combined = [...current, session]
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(combined))
}

export function clearSessions() {
  localStorage.removeItem(SESSIONS_KEY)
}
