// src/components/EventForm.jsx
import { useState, useEffect } from 'react'
import { apiRequest } from '../api/api'
import '../pages/css/EventForm.css'

export default function EventForm({ existingEvent, onSuccess }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)
  const isEdit = !!existingEvent

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title)
      setDescription(existingEvent.description)
      setDate(existingEvent.date?.slice(0, 10))
    }
  }, [existingEvent])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        await apiRequest(`/events/${existingEvent.id}`, 'PUT', {
          title,
          description,
          date,
        })
      } else {
        await apiRequest('/events', 'POST', { title, description, date })
      }
      onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="event-form-container">
      <h2>{isEdit ? 'Modifier l’événement' : 'Ajouter un événement'}</h2>
      {error && <p className="event-form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />

        <button type="submit">{isEdit ? 'Enregistrer' : 'Créer'}</button>
      </form>
    </div>
  )
}
