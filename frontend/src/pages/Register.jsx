//Register.jsx
import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import '../index.css'

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
      // Redirection vers login
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md animate-fadeIn">
        <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          {loading ? 'Chargement...' : "S'inscrire"}
        </button>
      </form>
    </div>
  )
}
