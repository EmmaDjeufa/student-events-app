// src/pages/AdminLogin.jsx
import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminCode, setAdminCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (adminCode !== 'CYtech2026OK') {
        setError('Code administrateur incorrect')
        setLoading(false)
        return
      }

      const check = await apiRequest(`/auth/check-user?email=${email}`)
      if (!check.exists) {
        await apiRequest('/auth/register', 'POST', {
          name,
          email,
          password,
          role: 'admin',
          adminCode: 'CYtech2026OK'
        })
      }

      const res = await apiRequest('/auth/login', 'POST', { email, password })
      localStorage.setItem('token', res.token)
      localStorage.setItem('role', 'admin')

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Connexion Administrateur</h1>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Code administrateur"
          value={adminCode}
          onChange={e => setAdminCode(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
