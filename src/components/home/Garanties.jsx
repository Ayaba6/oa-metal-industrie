import React from 'react';
import { ShieldCheck, Ruler, Truck, Headset } from 'lucide-react';

const GARANTIES = [
  { icon: ShieldCheck, titre: 'Qualité', valeur: 'Conforme', desc: 'Des produits contrôlés et conformes aux normes de construction.' },
  { icon: Ruler, titre: 'Découpe', valeur: 'Sur mesure', desc: 'Tôles et barres préparées aux longueurs de votre chantier.' },
  { icon: Truck, titre: 'Livraison', valeur: 'Partout', desc: 'Chargé chez nous, livré sur votre chantier au Burkina Faso.' },
  { icon: Headset, titre: 'Conseil', valeur: 'Technique', desc: 'Une équipe pour vous aider à chiffrer vos quantités.' },
];

export default function Garanties() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {GARANTIES.map(({ icon: Icon, titre, valeur, desc }) => (
          <div key={titre} className="group flex gap-4 px-6 py-8 transition hover:bg-industrial-light lg:px-8">
            <Icon size={26} className="mt-1 shrink-0 text-industrial-orange" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{titre}</p>
              <p className="font-display text-2xl font-bold uppercase text-industrial-blue">{valeur}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
