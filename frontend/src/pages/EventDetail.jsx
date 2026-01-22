import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/api'
import './css/EventDetail.css'

function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    apiRequest(`/events/${id}`)
      .then(data => setEvent(data))
      .catch(err => {
        console.error(err)
        setError("Impossible de charger l'événement.")
      })
  }, [id])

  if (error) return <p className="error-text">{error}</p>
  if (!event) return <p>Chargement...</p>

  const handleRegister = () => {
    if (!token) {
      alert("Vous devez être connecté pour vous inscrire.")
      navigate('/login')
      return
    }

    // Ici on n'inscrit PAS directement
    alert(`Pour vous inscrire, contactez l'admin : ${event.admin_email}`)
  }

  return (
    <div className="event-detail-container">
      <h1>{event.title}</h1>

      <p className="event-date">{event.date}</p>

      {/* ✅ Description visible UNIQUEMENT ici */}
      <p className="event-description">{event.description}</p>

      <button className="btn-primary" onClick={handleRegister}>
        S'inscrire
      </button>
    </div>
  )
}

export default EventDetail
