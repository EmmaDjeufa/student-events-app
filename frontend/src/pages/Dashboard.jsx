// Dashboard.jsx
import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import EventCard from '../components/EventCard'
import { useNavigate } from 'react-router-dom'
import '../pages/css/Dashboard.css'

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  async function loadEvents() {
    const data = await apiRequest('/events')
    setEvents(data)
    setFiltered(data)
  }

  useEffect(() => {
    loadEvents()
  }, [])

  // Filtrage alphabétique
  useEffect(() => {
    const f = events.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(f)
  }, [search, events])

  async function handleDelete(id) {
    if (!confirm('Supprimer cet événement ?')) return
    await apiRequest(`/events/${id}`, 'DELETE')
    loadEvents()
  }

  return (
    <div className="dashboard">
      <h1>Événements existants</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="dashboard-search"
      />

      <button className="add-event-btn" onClick={() => navigate('/add-event')}>
        + Ajouter un événement
      </button>

      <div className="events-list">
        {filtered.length === 0 && <p className="no-events">Aucun événement trouvé.</p>}

        {filtered.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
