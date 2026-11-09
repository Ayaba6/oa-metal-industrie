import React from 'react';

// Dessins techniques des sections (coupes) de quelques produits.
// Les cotes sont des exemples : d'autres dimensions sont disponibles.

const BLANC = '#E9EDF3';
const ORANGE = '#FF6B00';
const AXE = 'rgba(233,237,243,0.28)';

function rectArrondi(x, y, w, h, r) {
  return `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}

// Ligne de cote avec flèches et texte
function Cote({ x1, y1, x2, y2, texte, tx, ty, ancre = 'middle' }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth="1" markerStart="url(#pm-fleche)" markerEnd="url(#pm-fleche)" />
      <text x={tx} y={ty} fill={ORANGE} textAnchor={ancre}>{texte}</text>
    </g>
  );
}

function Rappel({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeOpacity="0.55" strokeWidth="0.75" />;
}

function Axes({ cx, cy, l, h }) {
  return (
    <g stroke={AXE} strokeWidth="1" strokeDasharray="14 4 2 4">
      <line x1={cx - l} y1={cy} x2={cx + l} y2={cy} />
      <line x1={cx} y1={cy - h} x2={cx} y2={cy + h} />
    </g>
  );
}

const DESSINS = {
  ipn: () => (
    <>
      <Axes cx={220} cy={180} l={85} h={128} />
      <path
        className="pm-trace"
        pathLength="1"
        d="M165 70 H275 V81 L225 90 V270 L275 279 V290 H165 V279 L215 270 V90 L165 81 Z"
        fill="url(#pm-hachure)"
        stroke={BLANC}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <g className="pm-cotes">
        <Rappel x1={282} y1={70} x2={338} y2={70} />
        <Rappel x1={282} y1={290} x2={338} y2={290} />
        <Cote x1={330} y1={70} x2={330} y2={290} texte="h 100" tx={342} ty={184} ancre="start" />
        <Rappel x1={165} y1={296} x2={165} y2={330} />
        <Rappel x1={275} y1={296} x2={275} y2={330} />
        <Cote x1={165} y1={322} x2={275} y2={322} texte="b 50" tx={220} ty={345} />
        <line x1={225} y1={150} x2={262} y2={128} stroke={ORANGE} strokeWidth="0.75" />
        <text x={266} y={126} fill={ORANGE}>âme 4,5</text>
      </g>
    </>
  ),
  tube: () => (
    <>
      <Axes cx={220} cy={180} l={112} h={112} />
      <path
        className="pm-trace"
        pathLength="1"
        fillRule="evenodd"
        d={`${rectArrondi(130, 90, 180, 180, 13)} ${rectArrondi(137, 97, 166, 166, 6)}`}
        fill="url(#pm-hachure)"
        stroke={BLANC}
        strokeWidth="1.6"
      />
      <g className="pm-cotes">
        <Rappel x1={316} y1={90} x2={358} y2={90} />
        <Rappel x1={316} y1={270} x2={358} y2={270} />
        <Cote x1={350} y1={90} x2={350} y2={270} texte="40" tx={362} ty={184} ancre="start" />
        <Rappel x1={130} y1={276} x2={130} y2={318} />
        <Rappel x1={310} y1={276} x2={310} y2={318} />
        <Cote x1={130} y1={310} x2={310} y2={310} texte="40" tx={220} ty={333} />
        <line x1={306} y1={124} x2={350} y2={64} stroke={ORANGE} strokeWidth="0.75" />
        <text x={354} y={62} fill={ORANGE}>ép. 1,5</text>
      </g>
    </>
  ),
  fer: () => (
    <>
      <Axes cx={220} cy={140} l={100} h={96} />
      <path
        className="pm-trace"
        pathLength="1"
        d="M140 140 A80 80 0 1 0 300 140 A80 80 0 1 0 140 140 Z M140 133 H131 V147 H140 M300 133 H309 V147 H300"
        fill="url(#pm-hachure)"
        stroke={BLANC}
        strokeWidth="1.6"
      />
      {/* Élévation de la barre avec ses verrous */}
      <path
        className="pm-trace"
        pathLength="1"
        d={`M50 262 H390 M50 286 H390 ${Array.from({ length: 21 }, (_, i) => `M${56 + i * 16} 262 L${66 + i * 16} 286`).join(' ')}`}
        fill="none"
        stroke={BLANC}
        strokeWidth="1.2"
      />
      <g className="pm-cotes">
        <Rappel x1={140} y1={134} x2={140} y2={34} />
        <Rappel x1={300} y1={134} x2={300} y2={34} />
        <Cote x1={140} y1={42} x2={300} y2={42} texte="Ø 10" tx={220} ty={32} />
        <text x={50} y={316} fill={ORANGE}>Verrous haute adhérence</text>
      </g>
    </>
  ),
  tole: () => (
    <>
      <path
        className="pm-trace"
        pathLength="1"
        d="M40 200 H64 L84 140 H116 L136 200 H164 L184 140 H216 L236 200 H264 L284 140 H316 L336 200 H364 L384 140 H416 L436 200 H444"
        fill="none"
        stroke={BLANC}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g className="pm-cotes">
        <Rappel x1={84} y1={134} x2={84} y2={96} />
        <Rappel x1={184} y1={134} x2={184} y2={96} />
        <Cote x1={84} y1={104} x2={184} y2={104} texte="pas d'onde" tx={134} ty={94} />
        <Rappel x1={40} y1={210} x2={40} y2={290} />
        <Rappel x1={444} y1={210} x2={444} y2={290} />
        <Cote x1={40} y1={280} x2={444} y2={280} texte="Largeur de la tôle" tx={242} ty={304} />
        <text x={40} y={334} fill={ORANGE}>Longueur : selon votre commande</text>
      </g>
    </>
  ),
};

export const PROFILS = [
  { id: 'ipn', nom: 'IPN 100', masse: '8,34 kg/m', usage: 'Poutres, linteaux, charpente' },
  { id: 'tube', nom: 'Tube carré 40 × 40', masse: '1,81 kg/m', usage: 'Portails, grilles, charpente légère' },
  { id: 'fer', nom: 'Fer à béton HA 10', masse: '0,617 kg/m', usage: 'Poteaux, poutres, semelles' },
  { id: 'tole', nom: 'Tôle bac', masse: 'Selon épaisseur', usage: 'Toitures et bardages' },
];

export default function Profil({ id }) {
  const Dessin = DESSINS[id];
  const p = PROFILS.find((x) => x.id === id);
  return (
    <svg
      key={id}
      viewBox="0 0 480 360"
      className="pm-planche block h-auto w-full"
      role="img"
      aria-label={`Coupe technique : ${p.nom}, masse théorique ${p.masse}`}
    >
      <defs>
        <pattern id="pm-hachure" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(233,237,243,0.38)" strokeWidth="1.2" />
        </pattern>
        <marker id="pm-fleche" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 2 L10 5 L0 8 Z" fill={ORANGE} />
        </marker>
      </defs>
      <Dessin />
    </svg>
  );
}
