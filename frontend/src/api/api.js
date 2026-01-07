const API_URL = 'http://localhost:5000/api'

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
