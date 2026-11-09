import React, { createContext, useContext, useState, useCallback } from 'react';
import { SITE } from '../data/site';

const DemandeContext = createContext(null);

export function DemandeProvider({ children }) {
  const [lignes, setLignes] = useState([]);
  const [ouvert, setOuvert] = useState(false);

  const ajouter = useCallback((ligne, ouvrirTiroir = true) => {
    setLignes((prev) => [...prev, { ...ligne, id: Date.now() + Math.random() }]);
    if (ouvrirTiroir) setOuvert(true);
  }, []);

  const retirer = useCallback((id) => {
    setLignes((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const vider = useCallback(() => setLignes([]), []);

  const lienWhatsApp = (lieu = '') => {
    const corps = lignes.map((l, i) => `${i + 1}. ${l.produit} — ${l.detail}`).join('\n');
    const texte =
      `Bonjour ${SITE.nom}, je souhaite un devis pour :\n${corps}` +
      (lieu ? `\n\nLieu du chantier : ${lieu}` : '');
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texte)}`;
  };

  return (
    <DemandeContext.Provider value={{ lignes, ajouter, retirer, vider, ouvert, setOuvert, lienWhatsApp }}>
      {children}
    </DemandeContext.Provider>
  );
}

export function useDemande() {
  return useContext(DemandeContext);
}
