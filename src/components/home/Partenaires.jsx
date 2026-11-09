import React from 'react';

// Remplacez les noms par les logos de vos clients quand vous les aurez (ex. /images/clients/ecobat.png).
const CLIENTS = ['Ecobat Construction', 'BTP Burkina', 'Sogea Satom', 'FM Burkina Faso', 'ZAD Industries'];

export default function Partenaires() {
  const liste = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-gray-200 bg-industrial-light py-14">
      <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-2 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="eyebrow">Ils nous font confiance</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase text-industrial-blue">Des clients satisfaits</h2>
        </div>
        <p className="text-sm text-gray-500">La satisfaction de nos clients est notre plus belle réussite.</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-industrial-light to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-industrial-light to-transparent" />
        <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {liste.map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= CLIENTS.length}
              className="flex h-24 w-60 shrink-0 items-center justify-center border border-gray-200 bg-white px-6 text-center font-display text-xl font-bold uppercase tracking-wide text-industrial-blue"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
