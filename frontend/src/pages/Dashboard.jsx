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

      <div className="events-list">
        {events.map(event => (
          // On utilise EventCard ici pour chaque événement
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete} // bouton supprimer
          />
        ))}
      </div>
    </div>
  )
}
