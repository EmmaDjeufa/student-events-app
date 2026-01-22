import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import './css/Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password })
      
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        navigate('/events')
      }

    } catch (err) {
      setError('Une erreur est survenue. Réessayez.')
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form animate-fadeIn">
        <h1>Connexion</h1>
        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Connexion</button>
      </form>
    </div>
  )
}

export default Login
