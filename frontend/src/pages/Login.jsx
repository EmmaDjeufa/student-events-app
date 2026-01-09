import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import '../index.css'

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
          navigate('/events/add')  // redirige vers ajout d'évènement
        }

            } catch (err) {
      setError('Une erreur est survenue. Réessayez.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="title">Connexion</h1>
      {error && <p className="text-red">{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="btn btn-primary">Connexion</button>
    </form>
  )
}

export default Login
