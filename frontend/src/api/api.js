const API_URL = 'https://friendly-doodle-grrq94qggrxcwqgg-5173.app.github.dev/login'

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

  return res.json()
}
