import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/api'
import './css/EventDetail.css'

function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    apiRequest(`/events/${id}`)
      .then(data => setEvent(data))
      .catch(err => {
        console.error(err)
        setError("Impossible de charger l'événement.")
      })
  }, [id])

  if (error) return <p className="error-text">{error}</p>
  if (!event) return <p>Chargement...</p>

  const handleRegister = () => {
    if (!token) {
      alert("Vous devez être connecté pour vous inscrire.")
      navigate('/login')
      return
    }

    alert(`Pour vous inscrire, contactez par email l'organisateur : ${event.admin_email}`)
  }

  return (
    <div className="event-detail-container">
      <h1>{event.title}</h1>

      <p className="event-date">{event.date}</p>

      {/* Nouveau : afficher le lieu */}
      <p className="event-location">
        <strong>Lieu :</strong> {event.location || "Non précisé"}
      </p>

      <p className="event-description">{event.description}</p>
      <p className="event-date-time">
          {event.date} {event.time && `à ${event.time}`}
      </p>

      {token ? (
        <p className="admin-contact">
          Contacter l'organisateur :{" "}
          <a href={`mailto:${event.admin_email}`}>
            {event.admin_email}
          </a>
        </p>
      ) : (
        <p className="admin-warning">
          🔒 Connectez-vous pour voir l'email de l'organisateur.
        </p>
      )}

      <button className="btn-primary" onClick={handleRegister}>
        S'inscrire
      </button>
    </div>
  )
}

export default EventDetail
