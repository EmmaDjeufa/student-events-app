export const API_URL = 'https://friendly-doodle-grrq94qggrxcwqgg-5000.app.github.dev/api'

export async function apiRequest(path, method = 'GET', body) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // important pour cookies/session
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
