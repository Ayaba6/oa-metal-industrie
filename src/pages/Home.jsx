import React from 'react';
import '../acier/acier.css';
import { Hero } from '../premium/Sections';
import { Intro } from '../premium/Dynamique';
import ProduitsPhares from '../acier/ProduitsPhares';
import { Engagements, Gamme, Controle, Chaine, GalerieHorizontale, Equipe, Questions, Devis } from '../acier/Sections';
import { Dock } from '../acier/Interface';
import Bandeau from '../acier/BandeauV';

// Page d'accueil : le hero (dessins techniques + étincelles) est conservé,
// les sections suivantes reprennent la structure de synergiemetal.com
// avec le contenu et les couleurs d'OA Métal Industrie.
export default function Home() {
  return (
    <>
      <Intro />
      <div className="bg-[#F3F4F6]">
        <Hero />
      </div>
      <div className="ac bg-[#F3F4F6]">
        <Bandeau />
        <Engagements />
        <ProduitsPhares />
        <Gamme />
        <Controle />
        <Chaine />
        <GalerieHorizontale />
        <Equipe />
        <Questions />
        <Devis />
      </div>
      <Dock />
    </>
  );
}
