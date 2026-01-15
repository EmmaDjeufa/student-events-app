// src/components/Navbar.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/api'
import '../pages/css/Navbar.css'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  const [userExists, setUserExists] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    async function checkUser() {
      if (!token) return
      try {
        const res = await apiRequest('/auth/me', 'GET', null, token)
        if (!res) setUserExists(false)
      } catch {
        setUserExists(false)
      }
    }
    checkUser()
  }, [token])

  const goTo = (path) => {
    setIsMenuOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    goTo('/')
  }

  return (
    <>
      {isMenuOpen && (
        <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      <nav className="navbar">
        <span className="logo" onClick={() => goTo('/')}>
          Student Events
        </span>

        <div
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={() => goTo('/events')}>Événements</button>
          <button onClick={() => goTo('/registrations')}>Inscrits</button>

          {!token && (
            <>
              <button onClick={() => goTo('/login')}>Connexion</button>
              {userExists && (
                <button onClick={() => goTo('/register')}>S'inscrire</button>
              )}
              <button className="nav-btn secondary" onClick={() => goTo('/admin-login')}>
                Admin
              </button>
            </>
          )}

          {token && (
            <>
              <button onClick={() => goTo('/profile')}>Profil</button>
              <button onClick={() => goTo('/dashboard')}>Dashboard</button>
              {role === 'admin' && <span className="admin-badge">ADMIN</span>}
            </>
          )}

          <button className="nav-btn" onClick={() => goTo('/add-event')}>
            Ajouter un événement
          </button>

          {token && (
            <button className="nav-btn logout" onClick={handleLogout}>
              Déconnexion
            </button>
          )}
        </div>
      </nav>
    </>
  )
}
