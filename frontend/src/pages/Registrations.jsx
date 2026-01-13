import { useEffect, useState } from 'react'
import './css/Registrations.css'

function Registrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const res = await fetch('/api/registrations/public') // proxy Vite
        const data = await res.json()
        setRegistrations(data)
      } catch (err) {
        console.error('Erreur récupération des inscrits:', err)
      } finally {
        setLoading(false)
      }
    }
    loadRegistrations()
  }, [])

  return (
    <div className="registrations-page">
      <h1>Liste des inscrits</h1>

      {!token && (
        <p className="notice">
          Pour rejoindre ces événements et la communauté, veuillez créer un compte ou vous connecter !
        </p>
      )}

      {loading ? (
        <p>Chargement des inscrits...</p>
      ) : (
        <div className="registrations-grid">
          {registrations.map(reg => (
            <div key={reg.id} className="registration-card">
              <p><strong>Nom :</strong> {reg.user_name}</p>
              <p><strong>Email :</strong> {reg.user_email}</p>
              <p><strong>Rôle :</strong> {reg.user_role}</p>
              <p><strong>Événement :</strong> {reg.event_title}</p>
              <p className="registration-date">
                Inscrit le : {new Date(reg.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Registrations

