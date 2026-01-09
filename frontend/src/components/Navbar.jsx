import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">Student Events</Link>
      </div>

      <div className="space-x-4">
        {!token && (
          <>
            <Link className="hover:underline" to="/login">Connexion</Link>
            <Link className="hover:underline" to="/register">S'inscrire</Link>
          </>
        )}

        {token && (
          <>
            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
            <Link className="hover:underline" to="/events/add">Ajouter un événement</Link>
            <button onClick={handleLogout} className="hover:underline">Déconnexion</button>
          </>
        )}
      </div>
    </nav>
  )
}
