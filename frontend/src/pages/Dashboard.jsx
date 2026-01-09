import './css/Dashboard.css'
import { useNavigate } from 'react-router-dom'
import '../index.css'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-container" style={{textAlign: 'center', padding: '2rem'}}>
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur ton Dashboard 🎓</h1>
      <p className="mb-6">Ici, tu peux ajouter tes événements et explorer ceux de la communauté.</p>
      <div className="dashboard-buttons" style={{display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap'}}>
        <button className="btn btn-primary" onClick={() => navigate('/events/add')}>
          Ajouter un événement
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/events')}>
          Voir tous les événements
        </button>
      </div>
    </div>
  )
}

export default Dashboard
