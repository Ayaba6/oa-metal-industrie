import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// =====================================================================
//  « Du dépôt à votre chantier » : une histoire racontée au défilement.
//  1. Au dépôt, le camion-grue OA charge une botte de fer à béton.
//  2. Vue du dessus : le camion traverse le Burkina.
//  3. Sur le chantier, l'ouvrage se monte.
//  Tout est dessiné en SVG (viewBox 1200 × 800) et piloté par la
//  progression du défilement dans la section.
// =====================================================================

const NUIT = '#0B1B3D';
const NUIT2 = '#13264F';
const ORANGE = '#FF6B00';
const ACIER = '#8F96A3';
const SOL = 640;

const borne = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const etape = (p, a, b) => borne((p - a) / (b - a));
const doux = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
function interp(t, ts, vs) {
  if (t <= ts[0]) return vs[0];
  for (let i = 0; i < ts.length - 1; i++) {
    if (t <= ts[i + 1]) return vs[i] + (vs[i + 1] - vs[i]) * doux((t - ts[i]) / (ts[i + 1] - ts[i]));
  }
  return vs[vs.length - 1];
}

// ---------------------------------------------------------------------
// Éléments dessinés
// ---------------------------------------------------------------------
function BotteFer({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-100" y="-14" width="200" height="28" rx="3" fill="#9C6B4E" />
      {[-9, -4, 1, 6, 11].map((yy) => <line key={yy} x1="-98" x2="98" y1={yy} y2={yy} stroke="#6E4A35" strokeWidth="1.6" />)}
      {[-70, 0, 70].map((xx) => <rect key={xx} x={xx - 4} y="-15" width="8" height="30" fill={NUIT} />)}
      {[-8, 0, 8].map((yy) => <circle key={yy} cx="-100" cy={yy} r="3.2" fill="#C08A68" stroke="#6E4A35" strokeWidth="1" />)}
    </g>
  );
}

function PileToles({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 7, 14, 21].map((d, i) => (
        <g key={d}>
          <rect x="0" y={-d - 7} width="135" height="7" fill={i % 2 ? '#E25A00' : ORANGE} />
          <path d={`M0 ${-d - 4} ${Array.from({ length: 9 }, (_, k) => `l7.5 -2.5 l7.5 2.5`).join(' ')}`} stroke="#B54800" strokeWidth="1" fill="none" />
        </g>
      ))}
    </g>
  );
}

// Camion-grue vu de côté, origine = arrière du plateau, roues au sol
function Camion({ tx, chargeFer, grue }) {
  return (
    <g transform={`translate(${tx} 0)`}>
      {/* ombre */}
      <ellipse cx="255" cy={SOL + 2} rx="270" ry="7" fill="#0B1B3D" opacity="0.12" />
      {/* châssis et plateau */}
      <rect x="0" y="600" width="510" height="12" fill={NUIT} />
      <rect x="0" y="588" width="360" height="12" fill="#3B4658" />
      {[0, 118, 236, 352].map((x) => <rect key={x} x={x} y="560" width="6" height="28" fill="#5F6878" />)}
      {/* chargement */}
      <PileToles x={208} y={588} />
      {chargeFer && <BotteFer x={100} y={574} />}
      {/* grue */}
      <rect x="340" y="520" width="32" height="80" fill={NUIT} />
      <rect x="336" y="514" width="40" height="10" fill={ORANGE} />
      {grue}
      {/* cabine */}
      <path d="M380 600 V530 L448 518 H486 L512 560 V600 Z" fill={NUIT} />
      <path d="M456 526 H482 L500 558 H456 Z" fill="#9FB3D6" opacity="0.85" />
      <rect x="380" y="574" width="132" height="8" fill={ORANGE} />
      <text x="392" y="568" fill="#fff" fontSize="15" fontWeight="800" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="1">OA MÉTAL</text>
      <rect x="506" y="586" width="10" height="6" fill="#FFB400" />
      {/* roues */}
      {[60, 112, 458].map((x) => (
        <g key={x}>
          <circle cx={x} cy="620" r="20" fill="#1A1A1D" />
          <circle cx={x} cy="620" r="8" fill={ACIER} />
        </g>
      ))}
    </g>
  );
}

// Flèche de grue télescopique entre le pivot P et la pointe T
function Fleche({ P, T, H, attache }) {
  const dx = T.x - P.x;
  const dy = T.y - P.y;
  const L = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <g>
      <g transform={`translate(${P.x} ${P.y}) rotate(${angle})`}>
        <rect x="-12" y="-10" width={Math.min(L, 210) + 12} height="20" rx="3" fill={NUIT} />
        <rect x="0" y="-3" width={Math.min(L, 210) - 10} height="4" fill={ORANGE} />
        <rect x="150" y="-7" width={Math.max(L - 150, 10)} height="14" rx="2" fill={NUIT2} />
        <circle cx={L} cy="0" r="7" fill={ORANGE} />
        <circle cx="0" cy="0" r="9" fill={ORANGE} />
      </g>
      <line x1={T.x} y1={T.y} x2={H.x} y2={H.y} stroke="#1A1A1D" strokeWidth="2" />
      <rect x={H.x - 7} y={H.y - 6} width="14" height="12" rx="2" fill={ORANGE} />
      {attache && (
        <g stroke="#1A1A1D" strokeWidth="1.6">
          <line x1={H.x} y1={H.y} x2={H.x - 60} y2={H.y + 30} />
          <line x1={H.x} y1={H.y} x2={H.x + 60} y2={H.y + 30} />
        </g>
      )}
    </g>
  );
}

function Hangar() {
  return (
    <g>
      <path d="M10 640 V390 L245 300 L480 390 V640 Z" fill="#E6E9EE" stroke="#C9CFD8" strokeWidth="3" />
      {Array.from({ length: 23 }, (_, i) => {
        const x = 20 + i * 20;
        const haut = x < 245 ? 390 - (x - 10) * (90 / 235) : 300 + (x - 245) * (90 / 235);
        return <line key={i} x1={x} x2={x} y1={haut + 4} y2="640" stroke="#D9DCE1" strokeWidth="2" />;
      })}
      <rect x="150" y="330" width="190" height="34" fill={NUIT} />
      <text x="245" y="354" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="2">DÉPÔT OA MÉTAL</text>
    </g>
  );
}

function Batiment({ q }) {
  // q : progression du chantier (0 → 1)
  const h1 = 210 * etape(q, 0.1, 0.4);
  const dalle1 = etape(q, 0.38, 0.5);
  const h2 = 170 * etape(q, 0.5, 0.75);
  const toit = etape(q, 0.75, 0.95);
  const xs = [610, 780, 950, 1100];
  return (
    <g>
      {/* grue à tour */}
      <g stroke={NUIT} strokeWidth="3" fill="none" opacity="0.85">
        <rect x="1150" y="120" width="16" height="520" />
        {Array.from({ length: 26 }, (_, i) => <line key={i} x1="1150" y1={120 + i * 20} x2="1166" y2={140 + i * 20} />)}
        <line x1="780" y1="120" x2="1260" y2="120" />
        <line x1="780" y1="132" x2="1260" y2="132" />
        <line x1="1158" y1="60" x2="800" y2="120" />
        <line x1="1158" y1="60" x2="1250" y2="120" />
        <line x1="1158" y1="60" x2="1158" y2="120" />
      </g>
      <rect x="1220" y="132" width="34" height="26" fill={NUIT} />
      <line x1="880" y1="132" x2="880" y2={240 - toit * 30} stroke="#1A1A1D" strokeWidth="2" />
      {/* fondation */}
      <rect x="590" y="624" width="540" height="16" fill={ACIER} opacity={etape(q, 0, 0.1)} />
      {/* poteaux niveau 1 */}
      {xs.map((x) => <rect key={x} x={x - 7} y={624 - h1} width="14" height={h1} fill={ORANGE} />)}
      {xs.map((x) => h1 > 0 && <g key={`c${x}`}>{[0, 1, 2, 3, 4].map((k) => <line key={k} x1={x - 7} x2={x + 7} y1={624 - (k + 1) * h1 / 6} y2={624 - (k + 1) * h1 / 6} stroke="#B54800" strokeWidth="2" />)}</g>)}
      {/* dalle */}
      <rect x="590" y="400" width={540 * dalle1} height="16" fill="#5F6878" />
      {/* poteaux niveau 2 */}
      {xs.map((x) => <rect key={`n2${x}`} x={x - 7} y={400 - h2} width="14" height={h2} fill={ORANGE} />)}
      {/* toiture en tôles */}
      <g opacity={toit} transform={`translate(0 ${(1 - toit) * -60})`}>
        <rect x="580" y="212" width="560" height="18" fill={ORANGE} />
        <path d={`M580 212 ${Array.from({ length: 28 }, () => 'l10 -6 l10 6').join(' ')}`} fill={ORANGE} stroke="#B54800" strokeWidth="1.5" />
      </g>
    </g>
  );
}

// Route vue du dessus
const ROUTE = 'M -60 640 C 160 640 220 470 400 470 S 640 250 800 290 S 980 540 1140 430 S 1240 250 1290 230';
const ETAPES_ROUTE = [
  { f: 0.06, nom: 'Ouagadougou', sous: 'Dépôt de Bassinko' },
  { f: 0.47, nom: 'Koudougou' },
  { f: 0.86, nom: 'Bobo-Dioulasso' },
];

function CamionDessus({ x, y, angle }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect x="-62" y="-15" width="128" height="34" rx="6" fill="#000" opacity="0.25" transform="translate(4 5)" />
      <rect x="-62" y="-16" width="90" height="32" rx="3" fill="#D9DCE1" />
      {[-10, -4, 2, 8].map((yy) => <line key={yy} x1="-56" x2="-6" y1={yy} y2={yy} stroke="#9C6B4E" strokeWidth="3" />)}
      <rect x="0" y="-13" width="24" height="26" fill={ORANGE} />
      <rect x="32" y="-16" width="34" height="32" rx="5" fill={NUIT} stroke={ORANGE} strokeWidth="2" />
      <rect x="54" y="-12" width="8" height="24" rx="2" fill="#9FB3D6" />
    </g>
  );
}

// ---------------------------------------------------------------------
// Scène « À l'atelier » : la bobine se déroule dans la profileuse,
// la cisaille coupe chaque tôle à la longueur, les tôles s'empilent.
// q : progression de la scène (0 → 1), 3 tôles coupées.
// ---------------------------------------------------------------------
const NB_TOLES = 3;
const LONGUEUR_MAX = 320; // en unités du dessin = 4,50 m
const Y_TOLE = 533;

function ProfilTole({ x, y, l, couleur = ORANGE }) {
  return (
    <g>
      <rect x={x} y={y} width={l} height="10" fill={couleur} />
      <rect x={x} y={y} width={l} height="3" fill="#FFB27A" />
      <line x1={x} x2={x + l} y1={y + 10} y2={y + 10} stroke="#B54800" strokeWidth="1.5" />
    </g>
  );
}

function Decoupe({ q, mobile }) {
  const c = Math.min(NB_TOLES - 1, Math.floor(q * NB_TOLES));
  const f = q >= 1 ? 1 : q * NB_TOLES - c;
  const fini = q >= 1;
  const L = fini ? 0 : LONGUEUR_MAX * etape(f, 0, 0.62);
  const lame = fini ? 0 : interp(f, [0, 0.64, 0.7, 0.78, 1], [0, 0, 1, 0, 0]);
  const coupe = f >= 0.7;
  const glisse = doux(etape(f, 0.78, 0.97));
  const empilees = fini ? NB_TOLES : c + (f >= 0.97 ? 1 : 0);
  const rotation = q * 1400;
  const rayon = 78 - q * 18;
  const metres = ((coupe ? LONGUEUR_MAX : L) / LONGUEUR_MAX) * 4.5;
  const etincelles = f > 0.69 && f < 0.8;

  return (
    <g>
      {/* atelier : poteaux et fermes de charpente en arrière-plan */}
      <g stroke="#D9DCE1" strokeWidth="6" fill="none">
        {[60, 420, 780, 1140].map((x) => <line key={x} x1={x} x2={x} y1="210" y2={SOL} />)}
        <path d="M-20 230 L600 120 L1220 230" />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 40 + i * 100;
          const y = x < 600 ? 230 - ((x + 20) / 620) * 110 : 120 + ((x - 600) / 620) * 110;
          return <line key={i} x1={x} x2={x + 50} y1={y} y2="230" strokeWidth="3" />;
        })}
        <line x1="-20" x2="1220" y1="230" y2="230" />
      </g>

      {/* bobine sur son dérouleur */}
      <g>
        <path d="M95 640 L150 470 L205 640" fill="none" stroke={NUIT} strokeWidth="12" />
        <circle cx="150" cy="470" r={rayon} fill={ORANGE} />
        <g transform={`rotate(${rotation} 150 470)`} stroke="#B54800" strokeWidth="2" fill="none">
          {[0.35, 0.55, 0.75, 0.92].map((k) => <circle key={k} cx="150" cy="470" r={rayon * k} strokeDasharray="30 8" />)}
          <line x1="150" y1="470" x2={150 + rayon} y2="470" stroke="#FFB27A" strokeWidth="3" />
        </g>
        <circle cx="150" cy="470" r="20" fill={NUIT} />
        <circle cx="150" cy="470" r="7" fill={ACIER} />
      </g>
      {/* bande qui part de la bobine vers la profileuse */}
      <path d={`M150 ${470 + rayon} Q 210 ${Y_TOLE + 6} 260 ${Y_TOLE + 5}`} stroke={ORANGE} strokeWidth="9" fill="none" />

      {/* profileuse */}
      <g>
        <rect x="250" y="548" width="450" height="62" fill={NUIT} />
        <rect x="250" y="548" width="450" height="8" fill={ORANGE} />
        {[290, 470, 660].map((x) => <rect key={x} x={x - 8} y="610" width="16" height="30" fill={NUIT2} />)}
        <ProfilTole x={255} y={Y_TOLE} l={450} />
        {Array.from({ length: 10 }, (_, i) => {
          const x = 280 + i * 44;
          return (
            <g key={i}>
              <rect x={x - 3} y="505" width="6" height="22" fill="#3B4658" />
              <circle cx={x} cy="522" r="11" fill="#3B4658" />
              <line x1={x} y1="522" x2={x + 10 * Math.cos(((rotation * 3 + i * 40) * Math.PI) / 180)} y2={522 + 10 * Math.sin(((rotation * 3 + i * 40) * Math.PI) / 180)} stroke={ACIER} strokeWidth="2.5" />
            </g>
          );
        })}
        <rect x="262" y="492" width="426" height="14" fill={NUIT2} />
        <text x="475" y="590" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="3">PROFILEUSE OA MÉTAL</text>
      </g>

      {/* écran de contrôle, suspendu à la charpente (au-dessus de la pile sur téléphone) */}
      <g transform={mobile ? 'translate(420 0)' : undefined}>
        <line x1="470" y1="230" x2="470" y2="350" stroke={NUIT} strokeWidth="4" />
        <line x1="590" y1="230" x2="590" y2="350" stroke={NUIT} strokeWidth="4" />
        <rect x="400" y="350" width="260" height="104" rx="4" fill={NUIT} />
        <rect x="408" y="358" width="244" height="88" rx="2" fill="#07122A" />
        <text x="420" y="382" fill={ACIER} fontSize="13" fontWeight="700" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="2">LONGUEUR COMMANDÉE</text>
        <text x="420" y="428" fill={ORANGE} fontSize="40" fontWeight="800" fontFamily="'Barlow Condensed', sans-serif" style={{ fontVariantNumeric: 'tabular-nums' }}>{metres.toFixed(2).replace('.', ',')} M</text>
        <text x="640" y="428" textAnchor="end" fill="#fff" fontSize="18" fontWeight="800" fontFamily="'Barlow Condensed', sans-serif">TÔLE {Math.min(NB_TOLES, c + 1)}/{NB_TOLES}</text>
        <circle cx="638" cy="376" r="6" fill={coupe && !fini ? '#FFB400' : '#2BD576'} />
      </g>

      {/* cisaille */}
      <g>
        <rect x="702" y="455" width="12" height="185" fill={NUIT} />
        <rect x="744" y="455" width="12" height="185" fill={NUIT} />
        <rect x="696" y="445" width="66" height="22" fill={NUIT} />
        <rect x="712" y={474 + lame * 26} width="34" height="50" fill={ACIER} />
        <path d={`M712 ${524 + lame * 26} L746 ${516 + lame * 26} V${524 + lame * 26} Z`} fill="#D9DCE1" />
        <rect x="712" y={466} width="34" height={8 + lame * 26} fill="#3B4658" />
        <rect x="700" y="545" width="60" height="12" fill={NUIT2} />
        {etincelles && (
          <g stroke="#FFB400" strokeWidth="2.5" strokeLinecap="round">
            {[[-40, -26], [-34, -10], [-26, 8], [36, -30], [44, -8], [30, 12], [6, -40]].map(([dx, dy], i) => (
              <line key={i} x1={729 + dx * 0.25} y1={538 + dy * 0.25} x2={729 + dx} y2={538 + dy} opacity={0.6 + (i % 3) * 0.2} />
            ))}
          </g>
        )}
      </g>

      {/* table de sortie et palette */}
      <rect x="756" y="545" width="104" height="10" fill={NUIT} />
      <rect x="800" y="555" width="10" height="85" fill={NUIT2} />
      <rect x="870" y="622" width="320" height="18" fill="#9C6B4E" />
      {[880, 1020, 1170].map((x) => <rect key={x} x={x} y="612" width="12" height="10" fill="#6E4A35" />)}

      {/* tôles déjà coupées, empilées */}
      {Array.from({ length: empilees }, (_, i) => (
        <ProfilTole key={i} x={862} y={612 - (i + 1) * 11} l={LONGUEUR_MAX} />
      ))}

      {/* tôle en cours : sort de la machine, puis glisse sur la pile une fois coupée */}
      {!fini && !coupe && L > 0 && <ProfilTole x={746} y={Y_TOLE} l={L} />}
      {!fini && coupe && f < 0.97 && (
        <ProfilTole
          x={746 + glisse * (862 - 746)}
          y={Y_TOLE + glisse * (612 - (c + 1) * 11 - Y_TOLE)}
          l={LONGUEUR_MAX}
        />
      )}
      {/* cote de la longueur */}
      {!fini && !coupe && L > 30 && (
        <g>
          <line x1="746" x2={746 + L} y1="510" y2="510" stroke={ORANGE} strokeWidth="1.5" />
          <line x1="746" x2="746" y1="502" y2="518" stroke={ORANGE} strokeWidth="1.5" />
          <line x1={746 + L} x2={746 + L} y1="502" y2="518" stroke={ORANGE} strokeWidth="1.5" />
        </g>
      )}
    </g>
  );
}

// ---------------------------------------------------------------------
const TEXTES = [
  { num: '01', sur: "À l'atelier", titre: 'On coupe à vos mesures.', texte: 'Vos tôles sont profilées puis coupées à la longueur de votre toiture, prêtes à poser.' },
  { num: '02', sur: 'Au dépôt', titre: 'On prépare, on charge.', texte: 'Fer à béton, tôles, tubes : votre commande est préparée et chargée à notre dépôt de Bassinko.' },
  { num: '03', sur: 'Sur la route', titre: 'On livre partout au Burkina.', texte: "Nos camions acheminent vos matériaux jusqu'à votre chantier, dans les délais convenus." },
  { num: '04', sur: 'Sur votre chantier', titre: 'Votre ouvrage prend forme.', texte: "Du ferraillage à la toiture, l'acier OA Métal au cœur de vos projets." },
];

export default function Trajet() {
  const ref = useRef(null);
  const chemin = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [brut, setBrut] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setBrut(v));
  // Les premiers 22 % du défilement sont pour la découpe, le reste pour le trajet.
  const PART_DECOUPE = 0.22;
  const enDecoupe = brut < PART_DECOUPE;
  const qDecoupe = etape(brut, 0.02, PART_DECOUPE - 0.03);
  const p = etape(brut, PART_DECOUPE, 1);

  // Points de la route, mesurés une fois
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const el = chemin.current;
    if (!el) return;
    const L = el.getTotalLength();
    setPoints(Array.from({ length: 201 }, (_, i) => { const pt = el.getPointAtLength((i / 200) * L); return [pt.x, pt.y]; }));
  }, []);

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const m = () => setMobile(window.innerWidth < 768);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);

  // --- Scène 1 : chargement au dépôt ---
  const sA = etape(p, 0.03, 0.26);
  const ts = [0, 0.2, 0.32, 0.45, 0.7, 0.82, 0.92, 1];
  const Tx = interp(sA, ts, [700, 260, 260, 260, 660, 660, 700, 700]);
  const corde = interp(sA, ts, [60, 60, 106, 40, 40, 70, 40, 40]);
  const attache = sA >= 0.32 && sA < 0.84;
  const charge = sA >= 0.82;
  const depart = doux(etape(p, 0.27, 0.36));
  const txA = 560 + depart * 820;

  // --- Scène 2 : la route ---
  const voile = p < 0.4 ? interp(etape(p, 0.32, 0.4), [0, 1], [1100, 0]) : interp(etape(p, 0.7, 0.77), [0, 1], [0, -1100]);
  const qRoute = etape(p, 0.41, 0.69);
  const idx = Math.min(points.length - 2, Math.floor(qRoute * 200));
  const pt = points[idx] || [0, 0];
  const pt2 = points[idx + 1] || [1, 0];
  const angleCamion = (Math.atan2(pt2[1] - pt[1], pt2[0] - pt[0]) * 180) / Math.PI;

  // --- Scène 3 : le chantier ---
  const arrivee = doux(etape(p, 0.75, 0.84));
  const txC = -560 + arrivee * 600;
  const qChantier = etape(p, 0.8, 0.98);

  const scene = p < 0.37 ? 0 : p < 0.72 ? 1 : 2;
  const sombre = !enDecoupe && scene === 1;
  const etapeTexte = enDecoupe ? 0 : scene + 1;
  const T = scene === 0 ? { x: Tx + (txA - 560), y: 420 } : { x: txC + 140, y: 420 };
  const tx = scene === 0 ? txA : txC;
  const P = { x: tx + 356, y: 515 };
  const H = { x: T.x, y: T.y + (scene === 0 ? corde : 40) };

  // Caméra : sur téléphone, on cadre une fenêtre de 640 × 800 qui suit l'action
  const LARGEUR = mobile ? 640 : 1200;
  let cible = 600;
  if (scene === 0) cible = sA < 1 ? H.x : txA + 255;
  if (scene === 1) cible = pt[0];
  if (scene === 2) cible = (txC + 255) * (1 - qChantier) + 860 * qChantier;
  if (enDecoupe) cible = interp(qDecoupe, [0, 0.1, 0.28, 1], [330, 330, 850, 850]);
  const vbX = mobile ? Math.min(600, Math.max(-40, cible - LARGEUR / 2)) : 0;

  return (
    <section ref={ref} id="trajet" className="relative" style={{ height: mobile ? '560vh' : '660vh' }} aria-label="De l'atelier à votre chantier">
      <div className={`sticky top-0 h-[100svh] overflow-hidden transition-colors duration-500 ${sombre ? 'bg-[#0B1B3D]' : 'bg-[#F3F4F6]'}`}>
        {/* Scène dessinée */}
        <svg
          viewBox={mobile ? `${vbX} 190 ${LARGEUR} 520` : `0 0 1200 800`}
          preserveAspectRatio={mobile ? 'xMidYMid meet' : 'xMidYMid slice'}
          className={mobile ? 'absolute inset-x-0 bottom-36 top-[40%] h-auto w-full' : 'absolute inset-0 h-full w-full'}
          role="img"
          aria-label="Les tôles sont profilées et coupées à la longueur à l'atelier, puis un camion-grue OA Métal charge du fer à béton au dépôt, traverse le Burkina Faso et livre un chantier où un bâtiment se construit."
        >
          <defs>
            <clipPath id="tr-cadre">
              <rect x={vbX} y={mobile ? 190 : 0} width={LARGEUR} height={mobile ? 520 : 800} />
            </clipPath>
            <pattern id="tr-grille" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 H0 V40" fill="none" stroke="#0B1B3D" strokeOpacity="0.05" strokeWidth="1" />
            </pattern>
            <pattern id="tr-stries" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <rect width="8" height="16" fill="#fff" fillOpacity="0.035" />
            </pattern>
          </defs>

          <g clipPath="url(#tr-cadre)">
          {/* Fond clair commun aux scènes 1 et 3 */}
          <rect x="-400" y="-200" width="2000" height="1200" fill="#F3F4F6" />
          <rect x="-400" y="-200" width="2000" height="1200" fill="url(#tr-grille)" />
          <rect x="-400" y={SOL} width="2000" height="400" fill="#E3E6EB" />
          <line x1="-400" x2="1600" y1={SOL} y2={SOL} stroke="#C9CFD8" strokeWidth="3" />

          {/* Scène 0 : découpe des tôles à l'atelier */}
          {enDecoupe && <Decoupe q={qDecoupe} mobile={mobile} />}

          {/* Scène 1 : dépôt */}
          {!enDecoupe && scene === 0 && (
            <g>
              <Hangar />
              <BotteFer x={260} y={626} />
              <BotteFer x={260} y={598} />
              {sA < 0.32 && <BotteFer x={260} y={570} />}
              <Camion
                tx={txA}
                chargeFer={charge}
                grue={null}
              />
              <Fleche P={P} T={T} H={H} attache={attache} />
              {attache && <BotteFer x={H.x} y={H.y + 44} />}
            </g>
          )}

          {/* Scène 3 : chantier */}
          {scene === 2 && (
            <g>
              <Batiment q={qChantier} />
              <Camion tx={txC} chargeFer grue={null} />
              <Fleche P={P} T={T} H={H} attache={false} />
            </g>
          )}

          {/* Scène 2 : la route, vue du dessus, sur un voile bleu nuit qui monte */}
          <g transform={`translate(0 ${voile})`}>
            <rect x="-400" y="-100" width="2000" height="1000" fill={NUIT} />
            <rect x="-400" y="-100" width="2000" height="1000" fill="url(#tr-stries)" />
            {/* végétation */}
            {Array.from({ length: 46 }, (_, i) => {
              const x = (i * 263) % 1240 - 20;
              const y = (i * 151) % 780 + 10;
              return <circle key={i} cx={x} cy={y} r={6 + (i % 4) * 3} fill={NUIT2} />;
            })}
            <path d={ROUTE} fill="none" stroke="#2E4A85" strokeWidth="64" strokeLinecap="round" />
            <path ref={chemin} d={ROUTE} fill="none" stroke="#18306A" strokeWidth="52" strokeLinecap="round" />
            <path d={ROUTE} fill="none" stroke={ORANGE} strokeOpacity="0.35" strokeWidth="52" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - qRoute} />
            <path d={ROUTE} fill="none" stroke="#FFB400" strokeWidth="3" strokeDasharray="18 16" />
            {points.length > 0 && ETAPES_ROUTE.map((e, k) => {
              const [x, y] = points[Math.round(e.f * 200)];
              const ancre = k === 0 ? 'start' : k === ETAPES_ROUTE.length - 1 ? 'end' : 'middle';
              const dxTexte = k === 0 ? -14 : k === ETAPES_ROUTE.length - 1 ? 14 : 0;
              const atteint = qRoute >= e.f - 0.02;
              return (
                <g key={e.nom} transform={`translate(${x} ${y - 62})`}>
                  <line x1="0" y1="20" x2="0" y2="46" stroke={atteint ? ORANGE : '#5F6878'} strokeWidth="3" />
                  <circle cx="0" cy="12" r="12" fill={atteint ? ORANGE : NUIT2} stroke={atteint ? '#FFB400' : '#5F6878'} strokeWidth="3" />
                  <text x={dxTexte} y="-8" textAnchor={ancre} fill="#fff" fontSize="22" fontWeight="800" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="1">{e.nom.toUpperCase()}</text>
                  {e.sous && <text x={dxTexte} y="-32" textAnchor={ancre} fill="#FFB400" fontSize="15" fontWeight="700" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="1">{e.sous.toUpperCase()}</text>}
                </g>
              );
            })}
            {points.length > 0 && <CamionDessus x={pt[0]} y={pt[1]} angle={angleCamion} />}
          </g>
          </g>
        </svg>

        {/* Textes de la scène en cours */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className="mx-auto max-w-[1240px] px-5 pt-24 sm:px-8 lg:pt-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={etapeTexte}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md"
              >
                <span className="ac-etiquette">{TEXTES[etapeTexte].num} · {TEXTES[etapeTexte].sur}</span>
                <h2 className={`ac-titre-m mt-4 ${sombre ? 'text-white' : 'text-[#0B1B3D]'}`}>{TEXTES[etapeTexte].titre}</h2>
                <p className={`mt-3 text-sm leading-relaxed sm:text-base ${sombre ? 'text-white/75' : 'text-[#5F6878]'}`}>{TEXTES[etapeTexte].texte}</p>
                {etapeTexte === 3 && p > 0.9 && (
                  <a href="#devis" className="ac-btn pm-brillance pointer-events-auto mt-6">Demander un devis <ArrowRight size={18} /></a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progression */}
        <div className="absolute bottom-24 left-1/2 z-10 flex w-[min(90vw,520px)] -translate-x-1/2 items-center gap-3">
          {TEXTES.map((t, i) => {
            const bornes = [0, PART_DECOUPE, PART_DECOUPE + 0.37 * (1 - PART_DECOUPE), PART_DECOUPE + 0.72 * (1 - PART_DECOUPE), 1];
            const remplissage = etape(brut, bornes[i], bornes[i + 1]);
            return (
              <div key={t.num} className="flex-1">
                <div className={`h-[3px] ${sombre ? 'bg-white/15' : 'bg-[#0B1B3D]/10'}`}>
                  <div className="h-full bg-[#FF6B00]" style={{ width: `${remplissage * 100}%` }} />
                </div>
                <p className={`ac-cond mt-2 text-[11px] font-bold ${etapeTexte === i ? 'text-[#FF6B00]' : sombre ? 'text-white/50' : 'text-[#8F96A3]'}`}>{t.num}<span className={etapeTexte === i ? '' : 'hidden sm:inline'}> {t.sur}</span></p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
