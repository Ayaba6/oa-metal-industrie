import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------
// Titre : chaque mot monte depuis un masque quand le titre entre à l'écran
// ---------------------------------------------------------------------
export function Titre({ children, as = 'h2', className = 'pm-h2', delai = 0 }) {
  const Balise = motion[as];
  const mots = String(children).split(' ');
  return (
    <Balise
      className={className}
      aria-label={String(children)}
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ cache: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delai } } }}
    >
      {mots.map((m, i) => (
        <span key={i} aria-hidden="true" className="-mt-[0.15em] inline-block overflow-hidden pb-[0.1em] pt-[0.15em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ cache: { y: '110%', rotate: 4 }, visible: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {m}
          </motion.span>
          {i < mots.length - 1 && ' '}
        </span>
      ))}
    </Balise>
  );
}

// ---------------------------------------------------------------------
// Texte qui s'allume mot après mot, au rythme du défilement
// ---------------------------------------------------------------------
function Mot({ children, progression, debut, fin }) {
  const opacite = useTransform(progression, [debut, fin], [0.14, 1]);
  return (
    <motion.span style={{ opacity: opacite }} className="transition-none">
      {children}
    </motion.span>
  );
}

export function TexteScroll({ texte, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const mots = texte.split(' ');
  return (
    <p ref={ref} className={className} aria-label={texte}>
      {mots.map((m, i) => (
        <React.Fragment key={i}>
          <Mot progression={scrollYProgress} debut={i / mots.length} fin={(i + 1) / mots.length}>
            {m}
          </Mot>
          {i < mots.length - 1 && ' '}
        </React.Fragment>
      ))}
    </p>
  );
}

// ---------------------------------------------------------------------
// Bandes de texte géant qui glissent en sens inverse au défilement
// ---------------------------------------------------------------------
export function TexteGeant({ lignes }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-35%', '0%']);
  const xs = [x1, x2];

  return (
    <section ref={ref} className="overflow-hidden bg-white py-16 lg:py-24" aria-label={lignes.join('. ')}>
      {lignes.map((l, i) => (
        <motion.div
          key={l}
          style={{ x: xs[i % 2] }}
          aria-hidden="true"
          className="flex whitespace-nowrap font-display text-[18vw] font-extrabold uppercase leading-[0.86] tracking-tight lg:text-[13vw]"
        >
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className={`pr-[4vw] ${(i + k) % 2 === 0 ? 'text-[#0B1B3D]' : 'pm-contour'}`}
            >
              {l}
            </span>
          ))}
        </motion.div>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------
// Slogan du pied de page : les lettres montent une à une
// ---------------------------------------------------------------------
export function SloganLettres({ texte, className = '' }) {
  return (
    <motion.p
      className={className}
      aria-label={texte}
      initial="cache"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ cache: {}, visible: { transition: { staggerChildren: 0.025 } } }}
    >
      {texte.split(' ').map((mot, i, arr) => (
        <span key={i} aria-hidden="true" className="-mt-[0.2em] inline-block overflow-hidden whitespace-nowrap pt-[0.2em] align-bottom">
          {mot.split('').map((c, j) => (
            <motion.span
              key={j}
              className="inline-block"
              variants={{ cache: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {c}
            </motion.span>
          ))}
          {i < arr.length - 1 && ' '}
        </span>
      ))}
    </motion.p>
  );
}
