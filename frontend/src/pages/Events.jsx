import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import EventCard from '../components/EventCard'

function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    apiRequest('/events').then(setEvents)
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="mb-2">{event.description}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
            <button className="btn-secondary mt-3" onClick={() => navigate(`/events/${event.id}`)}>Voir Détails</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Events
