import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../App.css';

const MotionNavLink = motion.create(NavLink);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'RECHERCHE', path: '/recherche' },
    { label: 'MODE', path: '/mode' },
    { label: 'LIFESTYLE', path: '/lifestyle' },
    { label: 'CULTURE', path: '/culture' },
    { label: 'ABOUT', path: '/about' },
    { label: 'GALERIE', path: '/galerie' },
    { label: 'BLOG', path: '/blog' },
    { label: 'CONTACT', path: '/contact' },
    { label: 'BOUTIQUES', path: '/boutiques' },
  ];


  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-top">
        <div className="header-left">
          <button
            type="button"
            className="hamburger"
            aria-label="Ouvrir le menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
        <div className="header-center">
          <h1 className="logo">HAUTE COUTURE</h1>
        </div>
        <div className="header-right">
          <Link to="/abonnement" className="cta">ABONNEMENT</Link>
          <span className="separator">|</span>
          <Link to="/connexion" className="cta">SE CONNECTER</Link>
          <span className="separator">|</span>
          <Link to="/deconnexion" className="cta">SE DÉCONNECTER</Link>

        </div>
      </div>

      {/* Desktop Nav Bar */}
      <nav className="header-nav">
        <div className="nav-container">
        {navItems.map((item, index) => {
          return (
            <MotionNavLink
              key={item.path}
              to={item.path}
              className="nav-link"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {item.label}
            </MotionNavLink>
          );
        })}
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="mobile-menu-content">
            {navItems.map((item, index) => {
              return (
                <MotionNavLink
                  key={item.path}
                  to={item.path}
                  className="mobile-nav-link"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </MotionNavLink>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
