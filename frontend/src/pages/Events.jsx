import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import './css/Events.css'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError(null)

    apiRequest('/events')
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError("Impossible de charger les événements.")
        setLoading(false)
      })
  }, [])

  return (
    <div className="events-container">
      <h1 className="events-title">Événements</h1>

      {loading && <p className="loading-text">Chargement des événements...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="events-grid">
          {events.length === 0 && <p>Aucun événement disponible.</p>}
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p className="event-date">{event.date}</p>
              <button className="btn-secondary" onClick={() => navigate(`/events/${event.id}`)}>
                Voir Détails
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events
