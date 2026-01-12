// src/components/EventForm.jsx
import { useState, useEffect } from 'react'
import { apiRequest } from '../api/api'

function EventForm({ existingEvent, onSuccess }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
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
    setLoading(true)

    try {
      if (isEdit) {
        await apiRequest(`/events/${existingEvent.id}`, 'PUT', { title, description, date })
      } else {
        await apiRequest('/events', 'POST', { title, description, date })
      }
      onSuccess()
    } catch (err) {
      setError(err.message || 'Erreur lors de l’opération')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isEdit ? "Modifier l'événement" : "Ajouter un événement"}
      </h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-semibold mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-bold transition-transform transform hover:-translate-y-0.5 hover:scale-105 shadow-md"
        >
          {loading ? 'Chargement...' : isEdit ? 'Enregistrer' : 'Créer'}
        </button>
      </form>
    </div>
  )
}

export default EventForm
