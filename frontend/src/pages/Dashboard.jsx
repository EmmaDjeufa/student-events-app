import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import EventForm from '../components/EventForm'
import EventCard from '../components/EventCard'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [editingEvent, setEditingEvent] = useState(null)

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
    <div className="p-6 space-y-6">
      <EventForm
        existingEvent={editingEvent}
        onSuccess={() => {
          setEditingEvent(null)
          loadEvents()
        }}
      />

      <h2 className="text-xl font-bold">Événements existants</h2>

      <div className="grid gap-4">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={setEditingEvent}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
