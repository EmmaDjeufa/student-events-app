import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-hero">
        <h1>Bienvenue sur Student Events</h1>
        <p>Découvrez et participez aux événements étudiants près de chez vous !</p>
        <button
            className="btn-primary"
            onClick={() => navigate('/events')}
        >
            Voir les événements
        </button>
        </div>

  )
}
