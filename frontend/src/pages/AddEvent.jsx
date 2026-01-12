// src/pages/AddEvent.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm'
import { apiRequest } from '../api/api'

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
    <div className="p-6 max-w-md mx-auto">
      <EventForm onSuccess={() => navigate('/dashboard')} />
    </div>
  )
}
