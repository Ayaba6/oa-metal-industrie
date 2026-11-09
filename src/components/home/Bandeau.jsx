import React from 'react';

const ITEMS = [
  'Tôles bac & ondulées',
  'Fer à béton haute adhérence',
  'Tubes carrés',
  'Poutrelles IPN',
  'Fer attaché & pointes',
  'Livraison partout au Burkina',
  'Le métal qui inspire confiance',
];

// Bandeau orange défilant, comme sur Synergie Métal.
export default function Bandeau() {
  const liste = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden bg-industrial-orange py-4 text-white" aria-label={ITEMS.join(' · ')}>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {liste.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 font-display text-xl font-bold uppercase tracking-wide">
            {t}
            <span className="ml-12 inline-block h-2 w-2 rotate-45 bg-industrial-blue" />
          </span>
        ))}
      </div>
    </div>
  );
}
