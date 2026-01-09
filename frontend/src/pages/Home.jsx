import { useNavigate } from 'react-router-dom'
import '../index.css'


export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-yellow-300 to-green-300 p-4 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4 text-center">Bienvenue à l'univers étudiant !</h1>
      <p className="mb-6 text-lg text-center">Explorez les événements et rejoignez l'aventure 🚀</p>
      <button
        onClick={() => navigate('/events')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
      >
        Voir les événements
      </button>
    </div>
  )
}

