import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";// Correction : framer-motion est devenu motion/react sur les versions récentes, ou garde ton import actuel si ça marche
import { useNavigate } from "react-router-dom";

import "./Connexion.css";

import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

function Connexion() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Création du compte dans Firebase (toujours utile pour la base de données)
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(result.user, { displayName: name });

    // 2. APPEL DE TON SERVEUR SMTP (Le point clé pour le prof)
    // On envoie les infos au serveur qui tourne sur le port 3001
await fetch('http://127.0.0.1:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        to: email, 
        name: name 
      }),
    });

    console.log("Mail SMTP envoyé avec succès !");
    
    // 3. Redirection vers Home
    navigate("/home", { replace: true });

  } catch (err) {
    alert("Erreur : " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="connexion-page">
      <div className="overlay"></div>

      <motion.div
        className="connexion-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="connexion-title">{isLogin ? "Connexion" : "Inscription"}</h1>

        {infoMessage && (
          <p style={{ color: "#4BB543", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
            {infoMessage}
          </p>
        )}

        <div className="connexion-tabs">
          <button
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Connexion
          </button>
          <button
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="connexion-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />

          <motion.button
            type="submit"
            className="connexion-btn"
            whileHover={{ scale: 1.02 }}
            disabled={loading}
          >
            {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire (via SMTP)"}
          </motion.button>
        </form>

        {error && <p style={{ color: "#ff4d4d", marginTop: "15px", textAlign: "center" }}>{error}</p>}
      </motion.div>
    </div>
  );
}

export default Connexion;