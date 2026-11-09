import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { FER, TOLES, TUBES } from '../data/site';
import { ConfigFer, ConfigToles, ConfigTubes } from './Mesure';
import { CONTENEUR, EASE, EnTeteSection, TitreAcier } from './Communs';
import Profil from '../premium/Profil';

const nf = (n, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------------------------------------------------------------------
// Vitrine « Nos produits phares » : 3 onglets-photos, un grand visuel
// immersif à gauche et le configurateur dans une carte à droite.
// ---------------------------------------------------------------------
const PHARES = [
  {
    id: 'fer', num: '01', nom: 'Fer à béton', accent: 'haute adhérence', court: `Ø${FER.diametres[0]} à ${FER.diametres[FER.diametres.length - 1]} · barres de ${FER.longueur} m`,
    texte: 'Acier de construction à verrous pour vos poteaux, poutres, semelles et dalles. Robuste, ductile et durable.',
    image: FER.image, profil: 'fer',
    chiffres: [{ v: String(FER.diametres.length), l: 'diamètres' }, { v: `${FER.longueur} m`, l: 'par barre' }, { v: 'HA', l: 'haute adhérence' }],
    liste: [`Diamètres ${FER.diametres[0]} à ${FER.diametres[FER.diametres.length - 1]} mm`, 'Livraison groupée avec tôles et tubes'],
    commander: 'Commander ce diamètre', Config: ConfigFer,
  },
  {
    id: 'toles', num: '02', nom: 'Tôles bac', accent: '& ondulées', court: `${TOLES.couleurs.length} coloris · longueur à la commande`,
    texte: 'Pour des toitures solides et durables. Choisissez la couleur, la finition et l’épaisseur, puis vos longueurs.',
    image: TOLES.image, profil: 'tole',
    chiffres: [{ v: String(TOLES.couleurs.length), l: 'coloris' }, { v: String(TOLES.finitions.length), l: 'finitions' }, { v: String(TOLES.epaisseurs.length), l: 'épaisseurs' }],
    liste: [`Épaisseurs ${TOLES.epaisseurs[0]} à ${TOLES.epaisseurs[TOLES.epaisseurs.length - 1]}`, 'Faîtières et accessoires sur demande'],
    commander: 'Configurer mes tôles', Config: ConfigToles,
  },
  {
    id: 'tubes', num: '03', nom: 'Tubes', accent: 'métalliques', court: `${TUBES.sections.length} sections · barres de ${TUBES.longueur} m`,
    texte: 'Tubes carrés et rectangulaires pour la charpente légère, les portails, les grilles et le mobilier métallique.',
    image: TUBES.image, profil: 'tube',
    chiffres: [{ v: String(TUBES.sections.length), l: 'sections' }, { v: String(TUBES.epaisseurs.length), l: 'épaisseurs' }, { v: `${TUBES.longueur} m`, l: 'par barre' }],
    liste: [`Du ${TUBES.sections[0]} au ${TUBES.sections[TUBES.sections.length - 1]} mm`, 'Livraison groupée avec fer et tôles'],
    commander: 'Demander le tarif tubes', Config: ConfigTubes,
  },
];

function Onglet({ p, actif, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={actif}
      onClick={onClick}
      className="group relative h-24 overflow-hidden text-left sm:h-32"
    >
      <img
        src={p.image}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${actif ? 'scale-105 opacity-60' : 'opacity-25 grayscale group-hover:opacity-40 group-hover:grayscale-0'}`}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#07122A] via-[#07122A]/60 to-transparent" />
      <span className={`absolute inset-0 ring-1 ring-inset transition-colors ${actif ? 'ring-[#FF6B00]' : 'ring-white/10'}`} />
      <span className="relative flex h-full flex-col justify-end p-3 sm:p-5">
        <span className={`font-['Barlow_Condensed'] text-sm font-bold transition-colors ${actif ? 'text-[#FF6B00]' : 'text-white/50'}`}>{p.num}</span>
        <span className="font-['Barlow_Condensed'] text-lg font-extrabold uppercase leading-none text-white sm:text-3xl">{p.nom}</span>
        <span className="mt-1 hidden text-xs text-white/60 md:block">{p.court}</span>
      </span>
      {actif && <motion.span layoutId="phare-actif" className="absolute inset-x-0 bottom-0 h-1 bg-[#FF6B00]" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
    </button>
  );
}

export default function ProduitsPhares() {
  const [actif, setActif] = useState(0);
  const p = PHARES[actif];
  const { Config } = p;

  return (
    <section id="produits" className="ac-forge relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      {/* nom du produit en filigrane géant */}
      <AnimatePresence mode="wait">
        <motion.span
          key={p.id}
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-10 select-none whitespace-nowrap font-['Barlow_Condensed'] text-[22vw] font-extrabold uppercase leading-none text-white/[0.035]"
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {p.nom}
        </motion.span>
      </AnimatePresence>

      <div className={`${CONTENEUR} relative`}>
        <EnTeteSection
          etiquette="Trois piliers, un seul fournisseur"
          debut="Nos produits"
          accent="phares"
          texte="Choisissez un produit, puis un diamètre, une teinte ou une section : la fiche calcule vos poids et l'ajoute à votre demande."
          lien={{ to: '/produits', label: 'Tout le catalogue' }}
          clair
        />

        {/* Onglets */}
        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3" role="tablist" aria-label="Produits phares">
          {PHARES.map((x, i) => <Onglet key={x.id} p={x} actif={actif === i} onClick={() => setActif(i)} />)}
        </div>

        {/* Panneau du produit */}
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            role="tabpanel"
            className="mt-3 grid gap-3 lg:grid-cols-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Visuel immersif */}
            <motion.div
              className="ac-chanfrein relative min-h-[460px] overflow-hidden bg-[#07122A] lg:col-span-7 lg:min-h-[680px]"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <motion.img
                src={p.image}
                alt={`${p.nom} ${p.accent}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: EASE }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#07122A] via-[#07122A]/55 to-[#07122A]/10" />

              {/* plan technique */}
              <motion.div
                className="pm-quadrillage absolute right-4 top-4 hidden w-56 border border-white/15 p-2 sm:block lg:w-64"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Profil id={p.profil} />
                <p className="ac-cond mt-1 px-1 text-[10px] font-bold text-white/60">Coupe technique</p>
              </motion.div>

              {/* chiffres clés */}
              <div className="absolute left-4 top-4 flex gap-2 sm:left-6 sm:top-6">
                {p.chiffres.map((c, i) => (
                  <motion.div
                    key={c.l}
                    className="bg-[#07122A]/70 px-3 py-2 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
                  >
                    <p className="font-['Barlow_Condensed'] text-2xl font-extrabold leading-none text-[#FF6B00] sm:text-3xl">{c.v}</p>
                    <p className="ac-cond mt-1 text-[10px] font-bold text-white/70">{c.l}</p>
                  </motion.div>
                ))}
              </div>

              {/* texte */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <motion.p
                  className="font-['Barlow_Condensed'] text-6xl font-extrabold leading-none text-transparent sm:text-8xl"
                  style={{ WebkitTextStroke: '1.5px rgba(255,107,0,.9)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                >
                  {p.num}
                </motion.p>
                <TitreAcier as="h3" debut={p.nom} accent={p.accent} clair className="ac-titre mt-2 !text-[clamp(2.2rem,3.8vw,3.6rem)]" />
                <motion.p className="mt-3 max-w-lg leading-relaxed text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  {p.texte}
                </motion.p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {p.liste.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-white/85">
                      <span className="flex h-4 w-4 items-center justify-center bg-[#FF6B00] text-[#0B1B3D]"><Check size={11} strokeWidth={3} /></span>{t}
                    </li>
                  ))}
                </ul>
                <Link to="/produits" className="ac-lien mt-6 text-white">Fiche produit <ArrowUpRight size={16} /></Link>
              </div>
            </motion.div>

            {/* Configurateur */}
            <motion.div
              className="ac-chanfrein pm-quadrillage flex flex-col p-5 text-white ring-1 ring-white/10 sm:p-7 lg:col-span-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
            >
              <div className="flex items-center justify-between border-b-2 border-[#FF6B00] pb-3">
                <p className="ac-cond text-sm font-bold">Atelier de mesure</p>
                <p className="font-['Barlow_Condensed'] text-sm font-bold text-white/45">{p.num} / 0{PHARES.length}</p>
              </div>
              <div className="mt-6 flex-1 space-y-6"><Config /></div>
              <a href="#devis" className="ac-btn pm-brillance mt-4 w-full">{p.commander} <ArrowRight size={18} /></a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation précédent / suivant */}
        <div className="mt-6 flex items-center justify-between">
          <p className="ac-cond text-xs font-bold text-white/50">Fer, tôles et tubes : livraison groupée possible</p>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setActif((actif + d + PHARES.length) % PHARES.length)}
                aria-label={d < 0 ? 'Produit précédent' : 'Produit suivant'}
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-[#0B1B3D]"
              >
                <ArrowRight size={18} className={d < 0 ? 'rotate-180' : ''} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
