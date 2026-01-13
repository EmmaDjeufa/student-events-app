// src/components/Navbar.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/api'
import '../pages/css/Navbar.css'
import '../index.css'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') // 'admin' ou undefined
  const navigate = useNavigate()
  const [userExists, setUserExists] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // état du menu dépliant

  useEffect(() => {
    async function checkUser() {
      if (!token) return
      try {
        const res = await apiRequest('/auth/me', 'GET', null, token)
        if (!res) setUserExists(false)
      } catch (err) {
        setUserExists(false)
      }
    }
    checkUser()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  const handleAddEventClick = () => {
    if (token) {
      navigate('/add-event')
    } else {
      alert("Vous devez vous inscrire ou vous connecter pour ajouter un événement.")
      navigate('/register')
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Student Events</Link>
      </div>

      {/* Bouton burger pour menu mobile */}
      <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/events" onClick={() => setIsMenuOpen(false)}>Événements</Link>
        <Link to="/registrations" onClick={() => setIsMenuOpen(false)}>Inscrits</Link>

        {!token && (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
            {userExists && <Link to="/register" onClick={() => setIsMenuOpen(false)}>S'inscrire</Link>}
            <Link
              to="/admin-login"
              className="nav-btn secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            {role === 'admin' && (
              <span className="text-yellow-500 font-bold ml-2">ADMIN</span>
            )}
          </>
        )}

        <button
          onClick={() => { handleAddEventClick(); setIsMenuOpen(false); }}
          className="nav-btn"
        >
          Ajouter un événement
        </button>

        {token && (
          <button
            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
            className="nav-btn logout"
          >
            Déconnexion
          </button>
        )}
      </div>

    </nav>
  )
}
