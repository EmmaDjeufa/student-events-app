import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import { useNavigate } from 'react-router-dom'
import './css/Events.css'

function Events() {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    apiRequest('/events').then(setEvents)
  }, [])

  return (
    <div className="events-container">
      <h1 className="events-title">Événements</h1>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p className="event-date">{event.date}</p>
            <button className="btn-secondary" onClick={() => navigate(`/events/${event.id}`)}>Voir Détails</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events

