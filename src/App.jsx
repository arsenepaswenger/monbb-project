import { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import CartSync from "./context/CartSupabaseSync";

// Import du Header pour qu'il soit global
import Header from "./components/Header"; 

import ScrollToSection from "./components/ScrollToSection";

const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const BoutiquesMap = lazy(() => import("./pages/BoutiquesMap"));
const Connexion = lazy(() => import("./pages/Connexion"));
const Culture = lazy(() => import("./pages/Culture"));
const Deconnexion = lazy(() => import("./pages/Deconnexion"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Gate = lazy(() => import("./pages/Gate"));
const Home = lazy(() => import("./pages/home"));
const Lifestyle = lazy(() => import("./pages/Lifestyle"));
const Mode = lazy(() => import("./pages/Mode"));
const Panier = lazy(() => import("./pages/Panier"));
const Recherche = lazy(() => import("./pages/Recherche"));

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/connexion" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartSync />
        <BrowserRouter>
          {/* ✅ Le Header est placé ici pour apparaître sur TOUTES les pages */}
          <Header /> 

          <main className="main-content">
            <Suspense fallback={<div style={{ padding: 24 }}>Chargement...</div>}>
              <Routes>
                {/* 🔐 Page d'entrée (Porte) */}
                <Route path="/" element={<Gate />} />

                {/* Pages principales */}
                <Route path="/home" element={<Home />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="/recherche" element={<Recherche />} />
                <Route path="/mode" element={<Mode />} />
                <Route path="/lifestyle" element={<Lifestyle />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/boutiques" element={<BoutiquesMap />} />

                {/* Ancres de défilement */}
                <Route path="/about" element={<ScrollToSection sectionId="about" />} />
                <Route path="/blog" element={<ScrollToSection sectionId="blog" />} />
                <Route path="/contact" element={<ScrollToSection sectionId="contact" />} />

                <Route path="/abonnement" element={<div>Page Abonnement</div>} />

                <Route path="/connexion" element={<Connexion />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/deconnexion" element={<Deconnexion />} />
                <Route
                  path="/panier"
                  element={(
                    <ProtectedRoute>
                      <Panier />
                    </ProtectedRoute>
                  )}
                />

                {/* 404 */}
                <Route path="*" element={<div>404 - Page non trouvée</div>} />
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
