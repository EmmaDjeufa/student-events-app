const BASE_URL = import.meta.env.VITE_BACKEND_URL || ''

export async function apiRequest(path, method = 'GET', body) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    throw new Error(await res.text())
  }

  return res.json()
}
