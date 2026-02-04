//Registrations.jsx
import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import './css/Registrations.css'

function Registrations() {
  const [users, setUsers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') // rôle de l'utilisateur connecté

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await apiRequest('/registrations/public')
        console.log('USERS FROM API:', data)   // 👈 IMPORTANT
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
      <p className="demo-text">
        Le backend est hébergé sur Render (PostgreSQL). Service arrêté ? — voici une démo vidéo du projet en fonctionnement :  
        <a 
          href="https://youtu.be/wAm77QudYA8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="youtube-link"
        >
          Voir la vidéo YouTube 🎬
        </a>
      </p>
      {!token && (
        <p className="notice">
          Connectez-vous pour voir les informations complètes des utilisateurs !
        </p>
      )}

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
              <img
                src={user.avatar && user.avatar.startsWith('http') ? user.avatar : '/default-avatar.png'}
                alt={user.user_name}
                className="registration-avatar"
              />

              <p><strong>Nom :</strong> {user.user_name}</p>

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

              {role === 'admin' && (
                <>
                  <p><strong>Rôle :</strong> {user.user_role.toUpperCase()}</p>
                  <p>
                    <strong>Événements :</strong>{' '}
                    {user.events && user.events.length > 0
                      ? user.events.join(', ')
                      : 'Aucun'}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Registrations
