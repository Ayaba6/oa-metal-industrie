import React from 'react';
import { MotionConfig } from 'framer-motion';
import '../premium/premium.css';
import EnTete from '../premium/EnTete';
import { Hero, Clients, Gamme, Engagement, Methode, Devis, Questions, PiedDePage } from '../premium/Sections';
import { Intro, Progression, Bandeau, Calculateur, Galerie, BoutonFlottant } from '../premium/Dynamique';

// Proposition 2 — version haut de gamme de la page d'accueil.
// Visible à l'adresse /premium (la proposition 1 reste sur /).
export default function AccueilPremium() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="pm">
      <Intro />
      <Progression />
      <EnTete />
      <main>
        <Hero />
        <Bandeau />
        <Clients />
        <Gamme />
        <Calculateur />
        <Engagement />
        <Galerie />
        <Methode />
        <Devis />
        <Questions />
      </main>
      <PiedDePage />
      <BoutonFlottant />
    </div>
    </MotionConfig>
  );
}
