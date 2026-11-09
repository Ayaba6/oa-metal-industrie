import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CHIFFRES = [
  { v: '500+', l: 'Projets réalisés' },
  { v: '300+', l: 'Clients satisfaits' },
  { v: '10+', l: "Années d'expérience" },
  { v: '100%', l: 'Couverture nationale' },
];

const ATOUTS = [
  { t: 'Qualité garantie', d: 'Des produits conformes aux normes pour des ouvrages durables.' },
  { t: 'Prix compétitifs', d: 'Des tarifs attractifs pour des matériaux de première qualité.' },
  { t: 'Disponibilité', d: 'Un stock important pour répondre vite à vos besoins.' },
  { t: 'Conseil technique', d: 'Une équipe à votre écoute pour un accompagnement sur mesure.' },
];

export default function APropos() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <motion.figure
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative lg:col-span-6"
          >
            <img src="/images/images1.jpg" alt="Stock de produits OA Métal Industrie" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="absolute -bottom-6 right-6 bg-industrial-orange p-6 text-white shadow-xl">
              <span className="block font-display text-6xl font-extrabold leading-none">+10</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-widest">Ans d'expérience</span>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <p className="eyebrow">À propos</p>
            <h2 className="titre-section mt-4">Le métal qui inspire confiance</h2>
            <blockquote className="mt-6 border-l-4 border-industrial-orange pl-5 text-lg leading-relaxed text-gray-700">
              Spécialisés dans la fourniture de produits métalliques de haute qualité, nous accompagnons les professionnels et les
              particuliers dans la réalisation de leurs projets de construction et d'industrie.
            </blockquote>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {ATOUTS.map((a) => (
                <div key={a.t}>
                  <h3 className="font-display text-xl font-bold uppercase text-industrial-blue">{a.t}</h3>
                  <p className="mt-1 text-sm text-gray-600">{a.d}</p>
                </div>
              ))}
            </div>

            <Link to="/apropos" className="btn-orange mt-10">
              En savoir plus <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <dl className="mt-24 grid grid-cols-2 border-t border-gray-200 lg:grid-cols-4">
          {CHIFFRES.map((c) => (
            <div key={c.l} className="flex flex-col-reverse border-b border-gray-200 py-8 pr-6 lg:border-b-0">
              <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">{c.l}</dt>
              <dd className="font-display text-6xl font-extrabold text-industrial-blue">{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
