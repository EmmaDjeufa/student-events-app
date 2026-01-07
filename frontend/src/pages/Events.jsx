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

      <div className="grid gap-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  )
}

export default Events
