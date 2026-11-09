import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const FONDS = ['/images/images.jpg', '/images/tole-ondulee.jpg', '/images/tube-carre.jpg', '/images/fer-beton.jpg'];

const CHIFFRES = [
  { valeur: '6', label: 'Familles de produits' },
  { valeur: '+10', label: "Ans d'expérience" },
  { valeur: '100%', label: 'Couverture nationale' },
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % FONDS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-industrial-ink text-white">
      {/* Photos de fond en fondu */}
      <AnimatePresence>
        <motion.img
          key={FONDS[i]}
          src={FONDS[i]}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-industrial-ink via-industrial-ink/90 to-industrial-ink/40" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
          >
            <span className="bg-industrial-orange px-2 py-1 text-white">Fourniture métallique</span>
            <span>Ouagadougou · Burkina Faso</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
          >
            La force du métal,
            <br />
            <span className="text-industrial-orange">au service</span> de vos projets.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Le fournisseur burkinabè qui couvre vos toits et arme vos fondations :
            <strong className="text-white"> tôles bac et ondulées</strong>,
            <strong className="text-white"> fer à béton</strong>,
            <strong className="text-white"> tubes et IPN</strong>, livrés sur votre chantier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/devis" className="btn-orange">
              Demander un devis <ArrowRight size={18} />
            </Link>
            <a href="#produits" className="btn-contour text-white hover:bg-white hover:text-industrial-blue">
              Voir les produits <ArrowDown size={18} />
            </a>
          </motion.div>

          {/* Chiffres clés */}
          <dl className="mt-14 grid max-w-lg grid-cols-3 border-t border-white/15 pt-6">
            {CHIFFRES.map((c) => (
              <div key={c.label} className="flex flex-col-reverse pr-4">
                <dt className="mt-1 text-[11px] font-semibold uppercase leading-tight tracking-wider text-white/55">{c.label}</dt>
                <dd className="font-display text-4xl font-bold text-white sm:text-5xl">{c.valeur}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage photo à droite */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <figure className="relative ml-auto h-[420px] w-[85%] overflow-hidden">
            <img src="/images/tole-bac.jpg" alt="Tôles bac en stock" className="h-full w-full object-cover" />
            <figcaption className="absolute bottom-0 left-0 bg-industrial-blue px-4 py-3 text-xs">
              <span className="block font-bold uppercase tracking-wider text-industrial-orange">Couverture</span>
              Tôles bac en plusieurs coloris
            </figcaption>
          </figure>
          <figure className="absolute -bottom-10 left-0 h-48 w-56 overflow-hidden border-4 border-industrial-ink">
            <img src="/images/fer-beton.jpg" alt="Fer à béton" className="h-full w-full object-cover" />
            <figcaption className="absolute bottom-0 left-0 bg-industrial-orange px-3 py-2 text-[11px] font-bold uppercase tracking-wider">
              Fer à béton
            </figcaption>
          </figure>
        </motion.div>
      </div>

      {/* Indicateurs du diaporama */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-8 sm:px-6 lg:px-8">
        {FONDS.map((f, n) => (
          <button
            key={f}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Image ${n + 1}`}
            className={`h-1 cursor-pointer transition-all ${n === i ? 'w-10 bg-industrial-orange' : 'w-5 bg-white/30'}`}
          />
        ))}
        <span className="ml-2 font-display text-sm text-white/50">
          0{i + 1} / 0{FONDS.length}
        </span>
      </div>
    </section>
  );
}
