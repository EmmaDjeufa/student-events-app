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

  // 📅 Formatage de la date et de l'heure
  const formatDate = (date) => {
    if (!date) return ''

    const formattedDate = new Date(date)

    if (isNaN(formattedDate.getTime())) {
      return date
    }

    return formattedDate.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  if (error) {
    return <p className="error-text">{error}</p>
  }

  if (!event) {
    return <p className="loading-text">Chargement...</p>
  }

  const handleRegister = () => {
    if (!token) {
      alert("Vous devez être connecté pour vous inscrire.")
      navigate('/register')
      return
    }

    alert(
      `Pour vous inscrire, contactez par email l'organisateur : ${event.admin_email}`
    )
  }

  return (
    <main className="event-detail-page">

      {/* Retour */}
      <button
        className="back-button"
        onClick={() => navigate('/events')}
      >
        ← Retour aux événements
      </button>

      <section className="event-detail-container">

        {/* En-tête */}
        <header className="event-header">
          <span className="event-badge">ÉVÉNEMENT</span>

          <h1>{event.title}</h1>
        </header>

        {/* Informations principales */}
        <div className="event-info">

          <div className="info-item">
            <span className="info-icon">📅</span>
            <div>
              <span className="info-label">Date et heure</span>
              <strong>{formatDate(event.date)}</strong>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <span className="info-label">Lieu</span>
              <strong>
                {event.location || 'Non précisé'}
              </strong>
            </div>
          </div>

        </div>

        {/* Description */}
        <div className="event-content">
          <h2>À propos de l'événement</h2>

          <p className="event-description">
            {event.description || 'Aucune description disponible.'}
          </p>
        </div>

        {/* Contact */}
        <div className="contact-section">

          {token ? (
            <>
              <span className="contact-icon">✉️</span>

              <div>
                <span className="info-label">
                  Organisateur
                </span>

                <p className="admin-contact">
                  <a href={`mailto:${event.admin_email}`}>
                    {event.admin_email}
                  </a>
                </p>
              </div>
            </>
          ) : (
            <p className="admin-warning">
              🔒 Connectez-vous pour voir l'email de l'organisateur.
            </p>
          )}

        </div>

        {/* Action */}
        <div className="event-actions">
          <button
            className="btn-primary"
            onClick={handleRegister}
          >
            S'inscrire à l'événement
          </button>
        </div>

      </section>
    </main>
  )
}

export default EventDetail
