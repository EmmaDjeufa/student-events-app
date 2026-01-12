export async function apiRequest(path, method = 'GET', body) {
  const token = localStorage.getItem('token')

  const res = await fetch(`/api${path}`, {
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
