const API_URL = 'https://friendly-doodle-grrq94qggrxcwqgg-5000.app.github.dev/api'

export async function apiRequest(path, method = 'GET', body = null) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : null
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Erreur réseau')
  }

  return res.json()
}
