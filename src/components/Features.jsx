import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Link as LinkIcon, Handshake, Truck } from 'lucide-react';

const featuresList = [
  {
    icon: ShieldCheck,
    title: "Qualité supérieure",
    desc: "Des produits conformes aux normes internationales."
  },
  {
    icon: LinkIcon,
    title: "Résistance maximale",
    desc: "Des matériaux testés pour des performances optimales."
  },
  {
    icon: Handshake,
    title: "Confiance durable",
    desc: "Un partenaire fiable pour des relations durables."
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    desc: "Livraison rapide sur tous vos chantiers."
  }
];

// Configuration des animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Features() {
  return (
    <section className="bg-industrial-blue text-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête avec animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center mb-12"
        >
          <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full">
            Pourquoi nous choisir ?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase mt-3">
            Notre engagement, votre satisfaction
          </h2>
        </motion.div>

        {/* Grille des engagements avec animation en cascade */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuresList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="p-3 bg-industrial-orange/10 rounded-full text-industrial-orange mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} />
                </div>
                <h3 className="font-bold text-sm uppercase mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}