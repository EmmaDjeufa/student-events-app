import { useState, useEffect } from 'react'
import { apiRequest } from '../api/api'

function EventForm({ existingEvent, onSuccess }) {
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
        await apiRequest('/events', 'POST', {
          title,
          description,
          date,
        })
      }

      onSuccess()
      setTitle('')
      setDescription('')
      setDate('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-xl font-bold">
        {isEdit ? 'Modifier l’événement' : 'Ajouter un événement'}
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label htmlFor="title" className="block font-medium">
          Titre
        </label>
        <input
          id="title"
          type="text"
          required
          className="border p-2 w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          required
          className="border p-2 w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="date" className="block font-medium">
          Date
        </label>
        <input
          id="date"
          type="date"
          required
          className="border p-2 w-full"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isEdit ? 'Enregistrer' : 'Créer'}
      </button>
    </form>
  )
}

export default EventForm
