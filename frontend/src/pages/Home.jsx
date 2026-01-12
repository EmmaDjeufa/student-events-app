import { useNavigate } from 'react-router-dom'
import '../pages/css/Home.css'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-hero">
      <h1>Bienvenue à l'univers étudiant !</h1>
      <p>Explorez les événements et rejoignez l'aventure 🚀</p>
      <button className="btn-primary" onClick={() => navigate('/events')}>
        Voir les événements
      </button>

      {/* Quelques ballons décoratifs */}
      <div className="balloon" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="balloon" style={{ left: '40%', animationDelay: '1s' }}></div>
      <div className="balloon" style={{ left: '70%', animationDelay: '2s' }}></div>
    </div>
  )
}
