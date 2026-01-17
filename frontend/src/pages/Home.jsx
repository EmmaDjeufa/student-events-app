import { useNavigate } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      {/* Contenu texte */}
      <div className="home-content">
        <h1>
          L’univers étudiant <span>en mouvement</span>
        </h1>

        <button className="home-btn" onClick={() => navigate("/events")}>
          Explorer les événements
        </button>
      </div>

      {/* Robot danseur */}
      <div className="dancer">
        <svg viewBox="0 0 200 400" className="dancer-svg">
          <circle cx="100" cy="50" r="25" className="head" />
          <rect x="90" y="80" width="20" height="100" rx="10" />
          <rect x="40" y="90" width="80" height="15" rx="8" className="arm arm-left" />
          <rect x="80" y="90" width="80" height="15" rx="8" className="arm arm-right" />
          <rect x="85" y="180" width="15" height="100" rx="8" className="leg leg-left" />
          <rect x="100" y="180" width="15" height="100" rx="8" className="leg leg-right" />
        </svg>
      </div>

      {/* Orbes décoratives */}
      <span className="orb orb1"></span>
      <span className="orb orb2"></span>
      <span className="orb orb3"></span>

      {/* Glow arrière-plan */}
      <div className="glow"></div>
    </section>
  );
}
