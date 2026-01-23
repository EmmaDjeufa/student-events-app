// EditEvent.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../api/api'
import '../index.css'
import './css/EditEvent.css' // fichier CSS dédié pour la page

export default function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await apiRequest(`/events/${id}`)
        setTitle(data.title)
        setDescription(data.description)
        setDate(data.date)
        setTime(data.time || '')
        setLocation(data.location || '')
      } catch (err) {
        setError('Impossible de récupérer l’événement.')
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [id])

    async function handleDelete(id) {
      if (!confirm('Supprimer cet événement ?')) return
      try {
        await apiRequest(`/events/${id}`, 'DELETE')
        loadEvents()
      } catch (err) {
        alert('Erreur lors de la suppression : ' + err.message)
      }
   }


  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await apiRequest(`/events/${id}`, 'PUT', {
      title,
      description,
      date,
      time,
      location,
    })
    alert('Événement modifié avec succès.')
    navigate('/dashboard')
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la modification : ' + err.message)
  }
}



  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="edit-event-container">
      <h1 className="edit-event-title">Modifier l'événement</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-event-form">
        <label>Titre</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="edit-event-input"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="edit-event-textarea"
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="edit-event-input"
          required
        />
        <label>Heure</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="edit-event-input"
          required
        />

        <label>Lieu</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="edit-event-input"
          required
        />


        <button type="submit" className="edit-event-btn">
          Modifier
        </button>
      </form>
    </div>
  )
}
