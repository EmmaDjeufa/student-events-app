import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiRequest } from '../api/api'
import './css/EventDetail.css'

function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await apiRequest(`/events/${id}`)
        setEvent(data)
      } catch (err) {
        console.error('Erreur récupération événement :', err)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (!event) return <p>Événement introuvable.</p>

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date : {event.date}</p>
      <button>Inscription</button>
    </div>
  )
}

export default EventDetail
