import { Link, useNavigate } from 'react-router-dom'
import '../pages/css/Navbar.css'
import '../index.css'
export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleAddEventClick = () => {
    if (token) {
      navigate('/add-event')
    } else {
      alert('Vous devez vous inscrire ou vous connecter pour ajouter un événement.')
      navigate('/register')
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Student Events</Link>
      </div>

      <div className="nav-links">
        <Link to="/events">Événements</Link>
        <Link to="/registrations">Inscrits</Link>

        {!token ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">S'inscrire</Link>
          </>
        ) : (
          <Link to="/dashboard">Dashboard</Link>
        )}

        <button onClick={handleAddEventClick}>
          Ajouter un événement
        </button>

        {token && (
          <button onClick={handleLogout} className="logout">
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  )
}
