import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Dashboard from './pages/Dashboard'
import Registrations from './pages/Registrations'
import AddEvent from './pages/AddEvent'
import EditEvent from './pages/EditEvent'
import Profile from './pages/Profile'
import AdminLogin from './pages/AdminLogin'
import './App.css'

/* Route protégée */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

/* Route auth-only (login/register) */
function AuthRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/dashboard" replace /> : children
}

function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) return <Navigate to="/login" replace />
  if (role !== 'admin') return <Navigate to="/" replace />

  return children
}

function App() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Auth */}
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-event"
            element={
              <AdminRoute>
                <AddEvent />
              </AdminRoute>
            }
          />
          <Route
            path="/events/edit/:id"
            element={
              <AdminRoute>
                <EditEvent />
              </AdminRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
