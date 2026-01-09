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

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="font-bold text-xl hover:text-yellow-300 transition-colors">
        <Link to="/">Student Events</Link>
      </div>

      {/* Menu */}
      <div className="flex space-x-4 items-center">
        <Link
          to="/events"
          className="hover:text-yellow-300 transition-colors px-3 py-1 rounded-md"
        >
          Événements
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition-colors px-3 py-1 rounded-md"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="hover:text-yellow-300 transition-colors px-3 py-1 rounded-md"
            >
              S'inscrire
            </Link>
          </>
        )}

        {token && (
          <>
            <Link
              to="/dashboard"
              className="hover:text-yellow-300 transition-colors px-3 py-1 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/events/add"
              className="hover:text-yellow-300 transition-colors px-3 py-1 rounded-md"
            >
              Ajouter un événement
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition-colors px-3 py-1 rounded-md"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
