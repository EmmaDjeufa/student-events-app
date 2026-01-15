// src/components/Navbar.jsx
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/api'
import '../pages/css/Navbar.css'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  const [userExists, setUserExists] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef(null)
  const burgerRef = useRef(null)

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

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    closeMenu()
    navigate('/')
  }

  const handleAddEventClick = () => {
    closeMenu()
    if (token) navigate('/add-event')
    else {
      alert("Vous devez vous connecter pour ajouter un événement.")
      navigate('/register')
    }
  }

  return (
    <>
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}

      <nav className="navbar">
        <Link to="/">Student Events</Link>

        {/* Burger */}
        <div
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          ref={burgerRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Menu */}
        <div ref={menuRef} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/events" onClick={closeMenu}>Événements</Link>
          <Link to="/registrations" onClick={closeMenu}>Inscrits</Link>

          {!token && (
            <>
              <Link to="/login" onClick={closeMenu}>Connexion</Link>
              {userExists && (
                <Link to="/register" onClick={closeMenu}>
                  S'inscrire
                </Link>
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
              {role === 'admin' && (
                <span className="text-yellow-500 font-bold">ADMIN</span>
              )}
            </>
          )}

          <button className="nav-btn" onClick={handleAddEventClick}>
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
