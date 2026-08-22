import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Filter, Layers, CheckCircle } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Tous les produits' },
  { id: 'fers', label: 'Fers à béton' },
  { id: 'toles', label: 'Tôles & Couvertures' },
  { id: 'profiles', label: 'Profilés métalliques' },
  { id: 'accessoires', label: 'Accessoires & Fixations' },
];

const productsList = [
  {
    id: 1,
    title: "Fer à béton Haute Adhérence (HA)",
    category: "fers",
    description: "Fers de construction de haute résistance (Fe E500) disponibles du diamètre 8mm au 32mm. Conformes aux normes internationales de sécurité.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    specs: ["Diamètres : 8mm à 32mm", "Norme ISO & Certifié", "Haute résistance sismique"],
    badge: "Populaire"
  },
  {
    id: 2,
    title: "Tôles Ondulées & Bac Aluminium",
    category: "toles",
    description: "Tôles galvanisées et bacs alu robustes pour toitures industrielles et résidentielles. Excellente résistance à la corrosion.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    specs: ["Épaisseurs variées", "Traitement anti-corrosion", "Pose facile"],
    badge: "Résistant"
  },
  {
    id: 3,
    title: "Profilés Métalliques (IPE, HEB, UPN)",
    category: "profiles",
    description: "Poutrelles et profilés en acier de premier choix pour charpentes métalliques, structures de bâtiments et ouvrages d'art.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    specs: ["Acier S275 / S355", "Longueurs standard 6m / 12m", "Coupe sur mesure possible"],
    badge: "Industriel"
  },
  {
    id: 4,
    title: "Tubes Ronds & Rectangulaires",
    category: "profiles",
    description: "Tubes soudés en acier noir ou galvanisé pour la serrurerie, les portails, les échafaudages et les structures porteuses.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    specs: ["Diverses sections", "Finition propre", "Haute soudabilité"],
    badge: "Polyvalent"
  },
  {
    id: 5,
    title: "Fils de ligature & Pointes",
    category: "accessoires",
    description: "Consommables essentiels pour chantiers : fils de fer recuit pour attache de fers à béton et pointes de toutes dimensions.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    specs: ["Rouleaux haute flexibilité", "Conditionnement pro", "Résistance à la rupture"],
    badge: "Essentiel"
  },
  {
    id: 6,
    title: "Grilles Soudées & Treillis SOUDÉ",
    category: "fers",
    description: "Panneaux de treillis soudés pour le renforcement des dalles, dallages et fondations en béton armé.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    specs: ["Mailles standard", "Fils haute résistance", "Gain de temps sur chantier"],
    badge: "Certifié"
  }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? productsList 
    : productsList.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80" 
            alt="Produits OA Métal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue via-industrial-blue/90 to-industrial-blue/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full inline-block"
          >
            Catalogue Officiel
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Nos Produits & Matériaux
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Découvrez notre gamme complète de fers à béton, tôles et profilés métalliques de qualité supérieure pour tous vos chantiers de construction.
          </motion.p>
        </div>
      </section>

      {/* Section catalogue et filtres */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Boutons de filtre */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-industrial-orange text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des produits */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-industrial-orange/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image du produit avec badge */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-industrial-blue text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-industrial-blue uppercase group-hover:text-industrial-orange transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Caractéristiques */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle size={14} className="text-industrial-orange flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton d'action */}
                  <div className="pt-4">
                    <a 
                      href="#contact" 
                      className="w-full bg-gray-50 hover:bg-industrial-orange text-industrial-blue hover:text-white border border-gray-200 hover:border-industrial-orange font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <span>Demander un devis</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* Bannière d'appel à l'action bas de page */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-industrial-blue uppercase">
            Vous avez un besoin spécifique ou une commande sur mesure ?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Notre équipe technique est à votre écoute pour étudier vos plans et vous fournir une cotation rapide adaptée à votre chantier.
          </p>
          <a 
            href="#contact" 
            className="inline-flex bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition shadow-lg"
          >
            Contactez notre service commercial
          </a>
        </div>
      </section>

    </div>
  );
}