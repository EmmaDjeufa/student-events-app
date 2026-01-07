import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-4">
      <Link to="/events" className="hover:underline">Events</Link>
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/login" className="hover:underline ml-auto">Login</Link>
    </nav>
  )
}

export default Navbar
