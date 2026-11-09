import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATALOGUE } from '../../data/site';

export default function Catalogue() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Notre gamme</p>
            <h2 className="titre-section mt-4">Six familles de produits</h2>
          </div>
          <p className="max-w-md text-gray-600 lg:justify-self-end">
            Pour le gros œuvre, la couverture et la construction métallique : tout le métal de votre chantier au même endroit.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOGUE.map((p, i) => (
            <motion.div
              key={p.titre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                to="/produits"
                className="group relative flex h-full flex-col border-b border-r border-gray-200 p-6 transition hover:bg-industrial-blue"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm font-bold text-gray-400 group-hover:text-industrial-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight size={20} className="text-gray-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-industrial-orange" />
                </div>
                <div className="my-6 aspect-[16/10] overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.titre} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <h3 className="font-display text-3xl font-bold uppercase text-industrial-blue transition group-hover:text-white">{p.titre}</h3>
                <p className="mt-1 text-sm text-gray-500 transition group-hover:text-white/70">{p.detail}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
