// src/pages/AdminLogin.jsx
import { useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function AdminLogin() {
  const [name, setName] = useState('')         // nom de l'admin
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
      // Vérification du code admin
      if (adminCode !== 'CYtech2026OK') {
        setError('Code administrateur incorrect')
        setLoading(false)
        return
      }

      // Vérifier si l'admin existe déjà
      const check = await apiRequest(`/auth/check-user?email=${email}`)
      if (!check.exists) {
        // Créer le compte admin si non existant
       await apiRequest('/auth/register', 'POST', {
            name,
            email,
            password,
            role: 'admin',
            adminCode: 'CYtech2026OK'
        })

      }

      // Login admin
      const res = await apiRequest('/auth/login', 'POST', { email, password })
      
      // Stocker le token et le rôle admin
      localStorage.setItem('token', res.token)
      localStorage.setItem('role', 'admin')

      navigate('/dashboard') // redirection
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md animate-fadeIn space-y-3">
        <h1 className="text-2xl font-bold mb-4 text-center">Connexion Administrateur</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Code administrateur"
          value={adminCode}
          onChange={e => setAdminCode(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
