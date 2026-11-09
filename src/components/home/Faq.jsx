import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '../../data/site';

export default function Faq() {
  const [ouvert, setOuvert] = useState(0);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <p className="eyebrow">Vous nous demandez souvent</p>
          <h2 className="titre-section mt-4">Questions fréquentes</h2>
          <Link to="/contact" className="mt-8 inline-block font-semibold text-industrial-orange underline-offset-4 hover:underline">
            Une autre question ? Contactez-nous →
          </Link>
        </div>

        <div className="border-t border-gray-200 lg:col-span-8">
          {FAQ.map((item, i) => {
            const actif = ouvert === i;
            return (
              <div key={item.q} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOuvert(actif ? -1 : i)}
                  aria-expanded={actif}
                  className="flex w-full cursor-pointer items-center gap-6 py-6 text-left"
                >
                  <span className="font-display text-sm font-bold text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 font-display text-2xl font-bold uppercase text-industrial-blue">{item.q}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center transition ${actif ? 'bg-industrial-orange text-white' : 'border border-gray-300 text-industrial-blue'}`}>
                    {actif ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {actif && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-12 pr-14 leading-relaxed text-gray-600">{item.r}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
