import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Dashboard from './pages/Dashboard'
import Registrations from './pages/Registrations'
import './App.css'
import AddEvent from './pages/AddEvent'
import EditEvent from './pages/EditEvent'
import Profile from './pages/Profile'
import AdminLogin from './pages/AdminLogin'



/* Route protégée : accessible uniquement si token existant */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

/* Route Auth : accessible uniquement si pas connecté */
function AuthRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/dashboard" /> : children
}

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Routes d'authentification */}
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

          {/* Pages publiques */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/registrations" element={<Registrations />} />

          {/* Pages protégées */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route
            path="/events/add"
            element={<ProtectedRoute><div>Formulaire Ajouter Événement</div></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={
              localStorage.getItem('token') ? <Profile /> : <Navigate to="/login" />
            }
          />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/events/edit/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
    </>
  )
}

export default App
