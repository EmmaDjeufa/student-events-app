import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import './css/Registrations.css'

function Registrations() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await apiRequest('/registrations/public')
        setUsers(data)
      } catch (err) {
        console.error('Erreur récupération des utilisateurs:', err)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  return (
    <div className="registrations-page">
      <h1>Liste des utilisateurs</h1>

      {!token && (
        <p className="notice">
          Pour rejoindre ces événements et la communauté, veuillez créer un compte ou vous connecter !
        </p>
      )}

      {loading ? (
        <p className="loading-text">Chargement des utilisateurs...</p>
      ) : (
        <div className="registrations-grid">
          {users.length === 0 && <p>Aucun utilisateur pour le moment.</p>}
          {users.map(user => (
            <div key={user.id} className="registration-card">
              <p>
                <strong>Nom :</strong> {user.user_name}{' '}
                {user.user_role === 'admin' && (
                  <span className="admin-badge">ADMIN</span>
                )}
              </p>

              <p><strong>Email :</strong> {user.user_email}</p>
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
