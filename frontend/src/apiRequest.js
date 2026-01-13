export async function apiRequest(path, method = 'GET', body) {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.getItem('token') && { Authorization: 'Bearer ' + localStorage.getItem('token') }),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return await res.json()
}
