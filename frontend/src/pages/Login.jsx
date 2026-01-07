import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const data = await apiRequest('/auth/login', 'POST', {
      email,
      password
    })

    if (data.token) {
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } else {
      setError(data.message || 'Login failed')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  )
}

export default Login
