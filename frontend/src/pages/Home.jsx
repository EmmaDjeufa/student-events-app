import { useNavigate } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      <div className="home-content">
        <h1>
          Bienvenue dans <span>l’univers étudiant</span>
        </h1>
        <p>
          Événements, rencontres et expériences uniques.
          <br />
          Vis ta vie étudiante à fond 🚀
        </p>

        <button className="home-btn" onClick={() => navigate("/events")}>
          Découvrir les événements
        </button>
      </div>

      {/* Personnage qui danse */}
      <div className="dancer">
        <svg viewBox="0 0 200 400" className="dancer-svg">
          {/* tête */}
          <circle cx="100" cy="50" r="25" className="head" />

          {/* corps */}
          <rect x="90" y="80" width="20" height="100" rx="10" className="body" />

          {/* bras */}
          <rect x="40" y="90" width="80" height="15" rx="8" className="arm arm-left" />
          <rect x="80" y="90" width="80" height="15" rx="8" className="arm arm-right" />

          {/* jambes */}
          <rect x="85" y="180" width="15" height="100" rx="8" className="leg leg-left" />
          <rect x="100" y="180" width="15" height="100" rx="8" className="leg leg-right" />
        </svg>
      </div>

      {/* décor */}
      <div className="glow"></div>
    </section>
  );
}
