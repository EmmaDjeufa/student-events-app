import { useState, useEffect } from "react";
import { apiRequest } from "../api/api"; // pour récupérer les admins
import "./css/Home.css";
import heroImage from "../assets/party-illustration.jpg";
import { Link, useNavigate } from "react-router-dom"

export default function Home() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const goToEvents = () => {
    navigate("/events");
  };

  // Récupération des admins
  useEffect(() => {
    async function loadAdmins() {
      try {
        const users = await apiRequest("/registrations/public");
        const adminList = users.filter(user => user.user_role === "admin");
        setAdmins(adminList);
      } catch (err) {
        console.error("Erreur récupération des admins:", err);
      }
    }
    loadAdmins();
  }, []);

  return (
    <section className="home">
      <div className="home-inner">
        <div className="home-content">
          <h1>
            L’univers étudiant <span>en mouvement</span>
          </h1>

          <p className="home-subtitle">
            Découvrez, créez et participez aux meilleurs événements étudiants de notre groupe de classe.
          </p>

          <div className="home-actions">
            

             <button className="home-btn primary" onClick={goToEvents}>
              Explorer les événements
            </button>

            <button
              className="home-btn secondary"
              onClick={() => setShowAdminModal(true)}
            >
              Créer un événement
            </button>
          </div>
        </div>

        <div className="home-visual">
          <img
            src={heroImage}
            alt="Étudiants en fête"
            className="hero-image framed"
          />
        </div>
      </div>

      {/* Décors */}
      <span className="orb orb1"></span>
      <span className="orb orb2"></span>
      <span className="orb orb3"></span>
      <div className="glow"></div>

      {/* Modal contact admins */}
      {showAdminModal && (
        <div className="modal-backdrop" onClick={() => setShowAdminModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Contactez un administrateur</h2>
            <p>Pour créer un événement, veuillez contacter par email l'un des admins :</p>
            <ul>
              {admins.map(admin => (
                <li key={admin.id}>
                  {admin.user_name} - <a href={`mailto:${admin.user_email}`}>{admin.user_email}</a>
                </li>
              ))}
            </ul>
            <button className="home-btn primary" onClick={() => setShowAdminModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
