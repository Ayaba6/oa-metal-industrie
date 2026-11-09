import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Check } from 'lucide-react';
import '../acier/acier.css';
import imageApropos from '../assets/apropos.jpg';
import imageBanniere from '../assets/ban.jpg';
import { EnTetePage, AppelAction, Chiffres } from '../acier/Pages';
import { CONTENEUR, EASE, Etiquette, TitreAcier, Apparait } from '../acier/Communs';
import { Equipe } from '../acier/Sections';

export default function APropos() {
  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="À propos"
        etiquette="Qui sommes-nous ?"
        debut="À propos"
        accent="d'OA Métal"
        texte="Fournisseur de matériaux métalliques de construction au Burkina Faso, alliant robustesse, qualité et service."
        image={imageBanniere}
      />

      {/* Histoire */}
      <section className="py-24 lg:py-32">
        <div className={`${CONTENEUR} grid gap-14 lg:grid-cols-12 lg:items-center`}>
          <motion.figure
            className="relative lg:col-span-5"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <div className="ac-chanfrein aspect-[4/5] overflow-hidden">
              <img src={imageApropos} alt="Stock de profilés métalliques" className="h-full w-full object-cover" />
            </div>
            <figcaption className="ac-chanfrein absolute -bottom-8 -right-4 bg-[#FF6B00] p-6 text-[#0B1B3D] sm:-right-8">
              <span className="block font-['Barlow_Condensed'] text-6xl font-extrabold leading-none">10+</span>
              <span className="ac-cond mt-1 block text-xs font-bold">Ans d'expertise</span>
            </figcaption>
          </motion.figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <Etiquette>Le métal qui inspire confiance</Etiquette>
            <TitreAcier debut="Notre engagement pour la" accent="construction durable" className="ac-titre-m mt-5" />
            <Apparait delai={0.15}>
              <p className="mt-6 leading-relaxed text-[#5F6878]">
                Fondée avec la vision de transformer le secteur de la métallurgie et de la construction, <strong className="text-[#0B1B3D]">OA Métal Industrie</strong> s'impose comme un partenaire de référence pour les professionnels du BTP, les industriels et les particuliers exigeants.
              </p>
              <p className="mt-4 leading-relaxed text-[#5F6878]">
                Nous mettons un point d'honneur à fournir des produits conformes aux normes : fers à béton haute résistance, tôles profilées et accessoires métalliques durables.
              </p>
            </Apparait>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Matériaux certifiés', 'Logistique et livraison rapide', 'Support technique personnalisé', 'Tarifs compétitifs'].map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
                  className="flex items-center gap-3 bg-white p-4 text-sm font-semibold"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#FF6B00] text-[#0B1B3D]"><Check size={14} strokeWidth={3} /></span>
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="pb-24">
        <div className={`${CONTENEUR} grid gap-6 lg:grid-cols-2`}>
          {[
            { icon: Target, titre: 'Notre mission', texte: 'Fournir des solutions métallurgiques fiables et accessibles qui garantissent la sécurité et la pérennité de chaque projet de construction de nos clients, à travers tout le pays.', sombre: true },
            { icon: Eye, titre: 'Notre vision', texte: "Devenir la référence de l'industrie métallurgique en Afrique de l'Ouest, reconnue pour son intégrité, sa capacité d'innovation et la qualité de ses produits.", sombre: false },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                whileHover={{ y: -6 }}
                className={`ac-chanfrein relative overflow-hidden p-8 sm:p-12 ${c.sombre ? 'ac-forge' : 'bg-white'}`}
              >
                <span aria-hidden="true" className={`absolute -right-4 -top-8 font-['Barlow_Condensed'] text-[10rem] font-extrabold leading-none ${c.sombre ? 'text-white/[0.05]' : 'text-[#EEF0F3]'}`}>0{i + 1}</span>
                <span className="relative flex h-14 w-14 items-center justify-center bg-[#FF6B00] text-[#0B1B3D]"><Icon size={26} /></span>
                <h2 className={`relative mt-6 font-['Barlow_Condensed'] text-4xl font-extrabold uppercase ${c.sombre ? 'text-white' : ''}`}>{c.titre}</h2>
                <p className={`relative mt-4 max-w-lg leading-relaxed ${c.sombre ? 'text-white/75' : 'text-[#5F6878]'}`}>{c.texte}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Chiffres */}
      <section className="pb-8">
        <div className={CONTENEUR}>
          <div className="mb-10 text-center">
            <Etiquette>En chiffres</Etiquette>
            <TitreAcier debut="OA Métal en un" accent="coup d'œil" className="ac-titre-m mt-5" />
          </div>
          <Chiffres />
        </div>
      </section>

      <Equipe />
      <AppelAction />
    </div>
  );
}
