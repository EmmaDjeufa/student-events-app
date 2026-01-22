import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import heroImage from "../assets/party-illustration.jpg"; // image inspirée vecteezy

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      {/* Contenu principal */}
      <div className="home-inner">

        {/* Texte */}
        <div className="home-content">
          <h1>
            L’univers étudiant <span>en mouvement</span>
          </h1>

          <p className="home-subtitle">
            Découvrez, créez et participez aux meilleurs événements étudiants de notre groupe de classe.
          </p>

          <div className="home-actions">
            <button className="home-btn primary" onClick={() => navigate("/events")}>
              Explorer les événements
            </button>

            <button className="home-btn secondary" onClick={() => navigate("/add-event")}>
              Créer un événement
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="home-visual">
          <img
            src={heroImage}
            alt="Étudiants en fête"
            className="hero-image"
          />
        </div>
      </div>

      {/* Décors */}
      <span className="orb orb1"></span>
      <span className="orb orb2"></span>
      <span className="orb orb3"></span>
      <div className="glow"></div>
    </section>
  );
}
