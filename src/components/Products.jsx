import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const productsList = [
  { title: "TÔLE ONDULÉE", desc: "Robuste & durable. Idéale pour vos toitures et bardages.", image: "/images/tole-ondulee.jpg", badge: "Certifié Normes" },
  { title: "TÔLE BAC", desc: "Haute qualité. Profilée pour une meilleure résistance.", image: "/images/tole-bac.jpg", badge: "Garantie Pro" },
  { title: "FER À BÉTON", desc: "Solide & résistant. Conforme aux normes de construction.", image: "/images/fer-beton.jpg", badge: "Haute Résistance" },
  { title: "TUBE CARRÉ", desc: "Solide & esthétique. Parfait pour structures métalliques.", image: "/images/tube-carre.jpg", badge: "Industriel" },
  { title: "IPN", desc: "Robustesse garantie. Pour tous types de structures.", image: "/images/ipn.jpg", badge: "Structurel" },
  { title: "FER ATTACHÉ", desc: "Solide & fiable. Indispensable pour vos assemblages.", image: "/images/fer-attache.jpg", badge: "Essentiel" }
];

// Configuration des animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Produits() {
  return (
    <section id="produits" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête avec animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full">
            Nos Produits
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-industrial-blue uppercase mt-4">
            Une large gamme de produits métalliques
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            Des matériaux robustes et durables pour tous vos besoins de construction et d'industrie.
          </p>
        </motion.div>

        {/* Grille des produits avec animation en cascade */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {productsList.map((product, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden bg-gray-200 relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  <span className="absolute top-3 right-3 bg-industrial-blue/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                    {product.badge}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-extrabold text-industrial-blue text-lg tracking-wide group-hover:text-industrial-orange transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link 
                  to="/devis" 
                  className="inline-flex items-center gap-2 text-industrial-orange font-bold text-xs uppercase tracking-wide group-hover:translate-x-1 transition-transform"
                >
                  Commander / Devis <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bouton Voir tous les produits avec apparition */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          className="text-center mt-14"
        >
          <Link 
            to="/devis" 
            className="inline-block bg-industrial-blue hover:bg-blue-950 text-white font-bold text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
          >
            Demander un devis personnalisé
          </Link>
        </motion.div>

      </div>
    </section>
  );
}