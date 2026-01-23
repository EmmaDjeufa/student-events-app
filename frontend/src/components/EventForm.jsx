// src/components/EventForm.jsx
import { useState } from 'react'
import { apiRequest } from '../api/api'
import '../pages/css/EventForm.css'

export default function EventForm({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('') // nouveau champ
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await apiRequest('/events', 'POST', {
        title,
        description,
        date,
        time,
        location, 
      })

      onSuccess()
    } catch (err) {
      console.error(err)
      setError('Erreur lors de la création de l’événement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h1>Ajouter un événement</h1>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Lieu"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Enregistrement...' : 'Créer'}
      </button>
    </form>
  )
}
