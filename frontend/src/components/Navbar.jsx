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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}

      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          StudEvents
        </Link>

        <div className={`burger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span />
          <span />
          <span />
          <span className="burger-label">Menu</span>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={closeMenu} aria-label="Fermer le menu">
            ✕
          </button>

          <Link to="/" onClick={closeMenu}>Accueil</Link>
          <Link to="/events" onClick={closeMenu} className="nav-highlight">Événements</Link>
          <Link to="/registrations" onClick={closeMenu}>Inscrits</Link>

          {!token && (
            <>
              <Link to="/login" onClick={closeMenu}>Connexion</Link>
              <Link to="/register" onClick={closeMenu}>S'inscrire</Link>
              <Link to="/admin-login" onClick={closeMenu} className="nav-admin">Admin</Link>
            </>
          )}

         {token && (
            <>
              <Link to="/profile" onClick={closeMenu}>Profil</Link>

              {role === 'admin' && (
                <>
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                  <span className="admin-badge">ADMIN</span>
                </>
              )}
            </>
          )}


          {token && role === 'admin' && (
            <Link to="/add-event" className="nav-cta" onClick={closeMenu}>
              + Ajouter un événement
            </Link>
          )}

          {token && (
            <button className="nav-logout" onClick={handleLogout}>
              Déconnexion
            </button>
          )}
        </div>
      </nav>
    </>
  )
}
