import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CONTENEUR = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8';
export const EASE = [0.16, 1, 0.3, 1];

// Titre en deux temps : "NOS PRODUITS" + "PHARES" en orange.
// Chaque mot monte depuis un masque quand le titre arrive à l'écran.
export function TitreAcier({ debut, accent, fin = '', className = 'ac-titre', as = 'h2', clair = false }) {
  const Balise = motion[as];
  const morceaux = [
    ...debut.split(' ').map((m) => ({ m, a: false })),
    ...(accent ? accent.split(' ').map((m) => ({ m, a: true })) : []),
    ...(fin ? fin.split(' ').map((m) => ({ m, a: false })) : []),
  ];
  const texte = [debut, accent, fin].filter(Boolean).join(' ');
  return (
    <Balise
      className={`${className} ${clair ? 'text-white' : ''}`}
      aria-label={texte}
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ cache: {}, visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {morceaux.map(({ m, a }, i) => (
        <span key={i} aria-hidden="true" className="-mt-[0.12em] inline-block overflow-hidden pb-[0.04em] pt-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${a ? 'ac-accent' : ''}`}
            variants={{ cache: { y: '110%', skewY: 6 }, visible: { y: 0, skewY: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {m}
          </motion.span>
          {i < morceaux.length - 1 && ' '}
        </span>
      ))}
    </Balise>
  );
}

export function Etiquette({ children, className = '' }) {
  return (
    <motion.span
      className={`ac-etiquette ${className}`}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

// En-tête de section sur deux colonnes : étiquette + titre à gauche, texte + lien à droite.
export function EnTeteSection({ etiquette, debut, accent, texte, lien, clair = false }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        {etiquette && <Etiquette>{etiquette}</Etiquette>}
        <TitreAcier debut={debut} accent={accent} clair={clair} className="ac-titre mt-4" />
      </div>
      {(texte || lien) && (
        <motion.div
          className="lg:col-span-4 lg:col-start-9"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          {texte && <p className={`leading-relaxed ${clair ? 'text-white/75' : 'text-[#5F6878]'}`}>{texte}</p>}
          {lien && (
            <Link to={lien.to} className={`ac-lien mt-4 ${clair ? 'text-white' : 'text-[#0B1B3D]'}`}>
              {lien.label} <ArrowRight size={16} />
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Apparition simple au défilement
export function Apparait({ children, className = '', delai = 0, y = 30 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delai, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
