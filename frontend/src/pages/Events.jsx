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

  // 🔎 Filtrage alphabétique
  useEffect(() => {
    const f = events.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(f)
  }, [search, events])

  return (
    <div className="events-container">    
      <h1 className="events-title">Événements</h1>
     

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      {loading && <p className="loading-text">Chargement des événements...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="events-grid">
          {filtered.length === 0 && <p>Aucun événement trouvé.</p>}

          {filtered.map(event => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>

              {/* ❌ On ne montre PLUS la description ici */}
              <p className="event-date">{event.date}</p>

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
