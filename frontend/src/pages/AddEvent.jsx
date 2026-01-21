import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm'
import { apiRequest } from '../api/api'
import './css/AddEvent.css' // <-- import CSS

export default function AddEvent() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // Redirection si non connecté
  useEffect(() => {
    if (!token) {
      alert('Vous devez vous inscrire ou vous connecter pour ajouter un événement.')
      navigate('/register')
    }
  }, [token, navigate])

  return (
    <div className="add-event-page">
      <div className="add-event-container">
        <EventForm onSuccess={() => navigate('/dashboard')} />
      </div>
    </div>
  )
}
