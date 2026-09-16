import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import './css/Events.css'

function Events() {
  const [events, setEvents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    apiRequest('/events')
      .then(data => {
        setEvents(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError("Impossible de charger les événements.")
        setLoading(false)
      })
  }, [])

  // 🔎 Filtrage par titre
  useEffect(() => {
    const f = events.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(f)
  }, [search, events])

  // 📅 Formatage de la date et de l'heure
  const formatDate = (date) => {
    if (!date) return ''

    return new Date(date).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(' à ', ' à ')
  }


  return (
    <div className="events-container">
      <h1 className="events-title">Envie de participer aux activités de l'école?</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && (
        <p className="loading-text">
          Chargement des événements...
        </p>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="events-grid">
          {filtered.length === 0 && (
            <p>Aucun événement trouvé.</p>
          )}

          {filtered.map(event => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>

              {/* 📅 Date + heure au format français */}
              <p className="event-date">
                {formatDate(event.date)}
              </p>

              <button
                className="btn-secondary"
                onClick={() => navigate(`/events/${event.id}`)}
              >
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

