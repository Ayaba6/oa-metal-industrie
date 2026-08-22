import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/Apropos';
import Produits from './pages/Produits';
import Services from './pages/Services';
import Realisations from './pages/Realisations';
import Actualites from './pages/Actualites';
import Contact from './pages/Contact';
import Devis from './pages/Devis';

// Composant pour remonter en haut de page à chaque changement de route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop /> {/* <--- Ajouté ici pour forcer le retour en haut */}
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Home />} />
            
            {/* Autres pages du site */}
            <Route path="/apropos" element={<AboutPage />} />
            <Route path="/produits" element={<Produits />} />
            <Route path="/services" element={<Services />} />
            <Route path="/realisations" element={<Realisations />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devis" element={<Devis />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}