// Dashboard.jsx
import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import EventCard from '../components/EventCard'
import '../pages/css/Dashboard.css'

export default function Dashboard() {
  const [events, setEvents] = useState([])

  async function loadEvents() {
    const data = await apiRequest('/events')
    setEvents(data)
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Supprimer cet événement ?')) return
    await apiRequest(`/events/${id}`, 'DELETE')
    loadEvents()
  }

  return (
    <div className="dashboard">
      <h1>Événements existants</h1>

      <button className="add-event-btn" onClick={() => navigate('/add-event')}>
        + Ajouter un événement
      </button>

      <div className="events-list">
        {events.map(event => (
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
