// EventCard.jsx
import { useNavigate } from 'react-router-dom'
import '../pages/css/EventCard.css'

function EventCard({ event, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>

      <div className="event-card-actions">
        {/* Bouton Modifier : redirige vers EditEvent */}
        <button
          onClick={() => navigate(`/events/edit/${event.id}`)}
          className="btn-secondary"
        >
          Modifier
        </button>

        {/* Bouton Supprimer */}
        {onDelete && (
          <button
            onClick={() => onDelete(event.id)}
            className="btn-delete"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

export default EventCard
