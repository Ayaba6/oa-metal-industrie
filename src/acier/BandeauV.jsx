import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { geometrieV } from '../premium/geometrieV';

// Bandeau plié en V : le texte arrive en haut à droite, descend jusqu'au pli
// au centre, puis remonte et sort en haut à gauche.
const ITEMS = [
  'Tôles bac & ondulées',
  'Fer à béton haute adhérence',
  'Tubes carrés',
  'Poutrelles IPN',
  'Fer attaché & pointes',
  'Livraison partout au Burkina',
];
const SEPARATEUR = '   ◆   ';
const UNITE = ITEMS.map((t) => t.toUpperCase()).join(SEPARATEUR) + SEPARATEUR;
const VITESSE = 70; // pixels par seconde

export default function BandeauV() {
  const boite = useRef(null);
  const mesure = useRef(null);
  const texte = useRef(null);
  const [w, setW] = useState(1440);
  const [seg, setSeg] = useState(1200);

  // Largeur réelle de l'écran
  useEffect(() => {
    const el = boite.current;
    if (!el) return;
    setW(el.getBoundingClientRect().width || 1440);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { mobile, D, T } = geometrieV(w); // profondeur du V et épaisseur du bandeau
  const fs = mobile ? 19 : 27; // taille du texte
  const marge = 70; // le bandeau dépasse des bords de l'écran
  const pente = D / (w / 2);
  const y0 = T / 2 + marge * pente + 6;
  const H = Math.ceil(y0 + D + T / 2 + 26);
  const recouvrement = Math.round(y0 + D); // le milieu du bandeau suit exactement le bord en V du hero
  const chemin = `M ${-marge} ${y0 - marge * pente} L ${w / 2} ${y0 + D} L ${w + marge} ${y0 - marge * pente}`;
  const longueur = 2 * Math.hypot(w / 2 + marge, D + marge * pente);
  const repetitions = Math.ceil(longueur / Math.max(seg, 200)) + 2;

  // Longueur d'une répétition du texte (après chargement des polices)
  useLayoutEffect(() => {
    const m = () => { if (mesure.current) setSeg(mesure.current.getComputedTextLength() || 1200); };
    m();
    document.fonts?.ready.then(m);
  }, [fs]);

  // Défilement : le texte recule le long du tracé (droite → pli → gauche)
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let decalage = 0;
    let avant = performance.now();
    const boucle = (t) => {
      decalage = (decalage + (VITESSE * (t - avant)) / 1000) % seg;
      avant = t;
      texte.current?.setAttribute('startOffset', String(-decalage));
      raf = requestAnimationFrame(boucle);
    };
    raf = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(raf);
  }, [seg]);

  return (
    <div
      ref={boite}
      className="relative z-10 w-full"
      style={{
        height: H,
        marginTop: -recouvrement,
      }}
      role="img"
      aria-label={ITEMS.join(', ')}
    >
      <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} className="absolute inset-0 block" aria-hidden="true" style={{ overflow: 'visible' }}>
        <defs>
          <path id="oa-bandeau-v" d={chemin} />
          <filter id="oa-bandeau-ombre" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <clipPath id="oa-bandeau-droite">
            <rect x={w / 2} y={-200} width={w} height={H + 400} />
          </clipPath>
          <linearGradient id="oa-bandeau-pli" gradientUnits="userSpaceOnUse" x1={w / 2 - 90} y1="0" x2={w / 2 + 90} y2="0">
            <stop offset="0" stopColor="#07122A" stopOpacity="0" />
            <stop offset="0.5" stopColor="#07122A" stopOpacity="0.32" />
            <stop offset="1" stopColor="#07122A" stopOpacity="0" />
          </linearGradient>
          <pattern id="oa-bandeau-stries" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <rect width="7" height="14" fill="#FFFFFF" fillOpacity="0.07" />
          </pattern>
        </defs>

        {/* Ombre portée */}
        <use href="#oa-bandeau-v" transform="translate(0 12)" fill="none" stroke="#07122A" strokeOpacity="0.4" strokeWidth={T} strokeLinejoin="miter" filter="url(#oa-bandeau-ombre)" />

        {/* Bande : face avant à gauche, revers (plus sombre) à droite du pli */}
        <use href="#oa-bandeau-v" fill="none" stroke="#FF6B00" strokeWidth={T} strokeLinejoin="miter" strokeMiterlimit="10" />
        <use href="#oa-bandeau-v" fill="none" stroke="#E25A00" strokeWidth={T} strokeLinejoin="miter" strokeMiterlimit="10" clipPath="url(#oa-bandeau-droite)" />
        <use href="#oa-bandeau-v" fill="none" stroke="url(#oa-bandeau-stries)" strokeWidth={T} strokeLinejoin="miter" strokeMiterlimit="10" />
        <use href="#oa-bandeau-v" fill="none" stroke="url(#oa-bandeau-pli)" strokeWidth={T} strokeLinejoin="miter" strokeMiterlimit="10" />

        {/* Texte qui suit le pli */}
        <text
          fill="#0B1B3D"
          fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize={fs}
          letterSpacing="0.04em"
          dominantBaseline="central"
          style={{ whiteSpace: 'pre' }}
        >
          <textPath ref={texte} href="#oa-bandeau-v" startOffset="0">
            {UNITE.repeat(repetitions)}
          </textPath>
        </text>

        {/* Texte invisible servant à mesurer une répétition */}
        <text
          ref={mesure}
          x="-9999"
          y="-9999"
          fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize={fs}
          letterSpacing="0.04em"
          style={{ whiteSpace: 'pre' }}
          visibility="hidden"
        >
          {UNITE}
        </text>
      </svg>
    </div>
  );
}
