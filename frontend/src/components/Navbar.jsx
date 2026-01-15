// src/components/Navbar.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setIsMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {isMenuOpen && (
        <div
          className="nav-overlay"
          onClick={closeMenu}
        />
      )}

      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          Student Events
        </Link>

        <div
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/events" onClick={closeMenu}>Événements</Link>
          <Link to="/registrations" onClick={closeMenu}>Inscrits</Link>

          {!token && (
            <>
              <Link to="/login" onClick={closeMenu}>Connexion</Link>
              {userExists && (
                <Link to="/register" onClick={closeMenu}>S'inscrire</Link>
              )}
              <Link to="/admin-login" className="nav-btn secondary" onClick={closeMenu}>
                Admin
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/profile" onClick={closeMenu}>Profil</Link>
              <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
              {role === 'admin' && <span className="admin-badge">ADMIN</span>}
            </>
          )}

          <Link to="/add-event" className="nav-btn" onClick={closeMenu}>
            Ajouter un événement
          </Link>

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
