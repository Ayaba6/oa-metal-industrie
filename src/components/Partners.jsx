import React from 'react';
import { motion } from 'framer-motion';

const partnersList = [
  { name: "ECOBAT", sub: "Construction", color: "text-industrial-blue" },
  { name: "BTP", sub: "Burkina", color: "text-green-700" },
  { name: "SOGEA SATOM", sub: "", color: "text-blue-900" },
  { name: "FM", sub: "Burkina Faso", color: "text-gray-800" },
  { name: "ZAD", sub: "Industries", color: "text-gray-900", highlight: "text-industrial-orange" }
];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Partners() {
  // On duplique les partenaires pour créer la boucle infinie sans saut
  const duplicatedPartners = [...partnersList, ...partnersList, ...partnersList];

  return (
    <section className="pt-12 pb-4 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête avec animation au scroll */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-8"
        >
          <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full">
            Ils nous font confiance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-industrial-blue uppercase mt-3">
            Des clients satisfaits
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            La satisfaction de nos clients est notre plus belle réussite.
          </p>
        </motion.div>

      </div>

      {/* Conteneur défilant en boucle */}
      <div className="relative w-full overflow-hidden flex mask-gradient">
        {/* Effet de fondu sur les côtés */}
        <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-6 animate-infinite-scroll py-2 w-max">
          {duplicatedPartners.map((partner, index) => (
            <div 
              key={index} 
              className="w-56 h-24 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center p-4 font-black tracking-wider uppercase text-sm shadow-sm hover:border-industrial-orange hover:shadow-md transition-all duration-300 shrink-0"
            >
              <span className={`flex items-center gap-1 ${partner.color}`}>
                {partner.name}
              </span>
              {partner.sub && (
                <span className={`text-[10px] font-light mt-1 ${partner.highlight || 'text-gray-400'}`}>
                  {partner.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Style CSS pour l'animation de défilement continu */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.333% - 12px));
          }
        }
        .animate-infinite-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}