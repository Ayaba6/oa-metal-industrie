import React from 'react';
import { motion } from 'framer-motion';

const ETAPES = [
  { titre: 'Votre demande', desc: 'Envoyez vos quantités, vos longueurs de tôles ou votre liste de ferraillage par WhatsApp, téléphone ou formulaire.' },
  { titre: 'Devis rapide', desc: 'Notre service commercial vérifie le stock et vous rappelle avec un prix clair.' },
  { titre: 'Préparation', desc: 'Les produits sont préparés, coupés à vos longueurs si besoin, et contrôlés avant chargement.' },
  { titre: 'Livraison', desc: 'Chargement dans notre dépôt de Bassinko et livraison sur votre chantier, partout au Burkina.' },
];

export default function Processus() {
  return (
    <section className="relative overflow-hidden bg-industrial-blue py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow">De la demande au chantier</p>
          <h2 className="titre-section mt-4 !text-white">Une chaîne maîtrisée de bout en bout</h2>
          <p className="mt-4 text-white/70">Chaque étape se passe chez nous, sous le regard de nos équipes.</p>
        </div>

        <ol className="grid gap-px bg-industrial-line sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <motion.li
              key={e.titre}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-industrial-blue p-8"
            >
              <span className="font-display text-6xl font-extrabold text-industrial-orange">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase">{e.titre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{e.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
