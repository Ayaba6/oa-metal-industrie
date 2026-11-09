import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import '../acier/acier.css';
import { EnTetePage, AppelAction } from '../acier/Pages';
import { CONTENEUR, EASE, EnTeteSection } from '../acier/Communs';
import { Chaine } from '../acier/Sections';
import { METIERS, SERVICES } from '../data/pages';

export default function Services() {
  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="Services"
        etiquette="Nos prestations"
        debut="Services"
        accent="sur mesure"
        texte="Plus qu'un fournisseur de métaux : votre partenaire logistique et technique pour la réussite et la sécurité de vos chantiers."
        image="/images/images1.jpg"
      />

      {/* Métiers */}
      <section className="py-20 lg:py-28">
        <div className={CONTENEUR}>
          <EnTeteSection etiquette="Nos métiers" debut="Du matériau" accent="à l'ouvrage" texte="Fourniture, transformation et pose : quatre métiers pour accompagner vos projets de bout en bout." />
          <div className="mt-14 grid gap-px bg-[#D9DCE1] sm:grid-cols-2 lg:grid-cols-4">
            {METIERS.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.titre}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                  className="group relative overflow-hidden bg-white p-8"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0 bg-[#0B1B3D] transition-all duration-500 ease-out group-hover:h-full" />
                  <span className="relative font-['Barlow_Condensed'] text-sm font-bold text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={34} className="relative mt-6 text-[#FF6B00] transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="relative mt-5 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase transition-colors group-hover:text-white">{m.titre}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-[#5F6878] transition-colors group-hover:text-white/70">{m.texte}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="ac-forge ac-cisaille-deux">
        <div className={CONTENEUR}>
          <EnTeteSection etiquette="Un accompagnement complet" debut="Nos services" accent="de A à Z" texte="L'ensemble des services mis en œuvre par OA Métal Industrie pour simplifier vos approvisionnements." clair />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.titre}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
                  whileHover={{ y: -6 }}
                  className="ac-chanfrein flex flex-col bg-white p-7 text-[#0B1B3D]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center bg-[#0B1B3D] text-[#FF6B00]"><Icon size={26} /></span>
                    <span className="font-['Barlow_Condensed'] text-5xl font-extrabold leading-none text-[#EEF0F3]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-6 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase">{s.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F6878]">{s.texte}</p>
                  <ul className="mt-5 space-y-2 border-t border-[#EEF0F3] pt-5">
                    {s.points.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-[#FF6B00] text-[#0B1B3D]"><Check size={11} strokeWidth={3} /></span>{t}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <Chaine />
      <AppelAction debut="Besoin d'un devis ou" accent="d'une intervention ?" texte="Notre équipe commerciale et logistique vous établit une proposition claire et rapide." />
    </div>
  );
}
