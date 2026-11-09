import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import './premium/premium.css';
import EnTete from './premium/EnTete';
import BarreHaute from './premium/BarreHaute';
import './acier/acier.css';
import { PiedDePage } from './acier/Sections';
import { Progression } from './premium/Dynamique';
import { DemandeProvider } from './context/Demande';
import { Tiroir } from './acier/Interface';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/Apropos';
import Produits from './pages/Produits';
import Services from './pages/Services';
import Realisations from './pages/Realisations';
import Actualites from './pages/Actualites';
import Contact from './pages/Contact';
import Devis from './pages/Devis';

// Remonte en haut de page à chaque changement de route (sauf ancre #devis)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <Router>
      <MotionConfig reducedMotion="user">
        <DemandeProvider>
          <ScrollToTop />
          <div className="pm flex min-h-screen flex-col">
            <Progression />
            <BarreHaute />
            <EnTete />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apropos" element={<AboutPage />} />
                <Route path="/produits" element={<Produits />} />
                <Route path="/services" element={<Services />} />
                <Route path="/realisations" element={<Realisations />} />
                <Route path="/actualites" element={<Actualites />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/devis" element={<Devis />} />
                {/* L'ancienne adresse de la proposition 2 renvoie vers l'accueil fusionné */}
                <Route path="/premium" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <PiedDePage />
            <Tiroir />
          </div>
        </DemandeProvider>
      </MotionConfig>
    </Router>
  );
}
