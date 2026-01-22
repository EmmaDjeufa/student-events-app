import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import './css/Registrations.css'

function Registrations() {
  const [users, setUsers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await apiRequest('/registrations/public')
        setUsers(data)
        setFiltered(data)
      } catch (err) {
        console.error('Erreur récupération des utilisateurs:', err)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  // 🔎 Filtrage alphabétique
  useEffect(() => {
    const f = users.filter(user =>
      user.user_name.toLowerCase().includes(search.toLowerCase()) ||
      user.user_email.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(f)
  }, [search, users])

  return (
    <div className="registrations-page">
      <h1>Liste des utilisateurs</h1>

      {!token && (
        <p className="notice">
          Pour rejoindre ces événements et la communauté, veuillez créer un compte ou vous connecter !
        </p>
      )}

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="registrations-search"
      />

      {loading ? (
        <p className="loading-text">Chargement des utilisateurs...</p>
      ) : (
        <div className="registrations-grid">
          {filtered.length === 0 && <p>Aucun utilisateur trouvé.</p>}
          {filtered.map(user => (
            <div key={user.id} className="registration-card">
              <p>
                <strong>Nom :</strong> {user.user_name}{' '}
                {user.user_role === 'admin' && (
                  <span className="admin-badge">ADMIN</span>
                )}
              </p>

              {token ? (
                <p>
                  <strong>Email :</strong>{' '}
                  <a href={`mailto:${user.user_email}`} className="email-link">
                    {user.user_email}
                  </a>
                </p>
              ) : (
                <p>
                  <strong>Email :</strong> Connectez-vous pour voir l’email
                </p>
              )}

              <p><strong>Rôle :</strong> {user.user_role}</p>

              <p>
                <strong>Événements :</strong>{' '}
                {user.events && user.events.length > 0
                  ? user.events.join(', ')
                  : 'Aucun'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Registrations
