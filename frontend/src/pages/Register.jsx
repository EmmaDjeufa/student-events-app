//Register.jsx
import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import '../pages/css/Auth.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Vérifier si l'utilisateur existe déjà
      const check = await apiRequest(`/auth/check-user?email=${email}`)
      if (check.exists) {
        setError('Utilisateur déjà enregistré, vous pouvez vous connecter')
        setLoading(false)
        return
      }

      // Enregistrement
      await apiRequest('/auth/register', 'POST', { name, email, password })
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form animate-fadeIn">
        <h1>Inscription</h1>
        {error && <p className="auth-error">{error}</p>}

        <input
          type="text"
          placeholder="Nom"
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

        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  )
}
