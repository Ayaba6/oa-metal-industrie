import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, Search, Clock } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const articles = [
  {
    id: 1,
    title: "Arrivage massif de fers à béton haute résistance à l'entrepôt de Bassinko",
    category: "Logistique & Stocks",
    date: "15 Août 2026",
    readTime: "3 min de lecture",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
    excerpt: "OA Métal Industrie renforce ses stocks avec un nouvel arrivage direct d'usine de fers à béton certifiés et profilés métalliques pour répondre à la forte demande des chantiers à Ouagadougou.",
    author: "Service Logistique"
  },
  {
    id: 2,
    title: "Comment bien choisir ses tôles (ondulées et bac) pour la saison des pluies ?",
    category: "Conseils Chantiers",
    date: "02 Août 2026",
    readTime: "5 min de lecture",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Étanchéité, épaisseur, résistance à la corrosion : découvrez tous nos conseils d'experts pour sélectionner les meilleures tôles adaptées au climat du Burkina Faso.",
    author: "Équipe Technique"
  },
  {
    id: 3,
    title: "Extension de notre flotte de livraison express sur tous vos chantiers",
    category: "Entreprise",
    date: "20 Juillet 2026",
    readTime: "2 min de lecture",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Pour vous garantir des délais toujours plus courts, OA Métal Industrie déploie de nouveaux camions grue pour acheminer vos matériaux en toute sécurité.",
    author: "Direction Commerciale"
  },
  {
    id: 4,
    title: "Normes et sécurité dans le bâtiment : l'engagement qualité OA Métal",
    category: "Qualité & Normes",
    date: "10 Juillet 2026",
    readTime: "4 min de lecture",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f19f2?auto=format&fit=crop&w=1000&q=80",
    excerpt: "La durabilité d'une construction repose sur la fiabilité de ses matériaux. Zoom sur nos protocoles rigoureux de test et de contrôle de conformité.",
    author: "Contrôle Qualité"
  }
];

export default function Actualites() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Tous", "Logistique & Stocks", "Conseils Chantiers", "Entreprise", "Qualité & Normes"];

  // Filtrage des articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80" 
            alt="Actualités OA Métal" 
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
            Restez informés
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Actualités & Conseils
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Suivez les dernières actualités de notre usine, nos nouveaux arrivages de fers et matériaux, ainsi que nos conseils d'experts pour réussir vos projets de construction.
          </motion.p>
        </div>
      </section>

      {/* Section principale : Filtres, Recherche et Grille d'articles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-8 border-b border-gray-200">
          
          {/* Boutons de catégories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-industrial-orange text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
            />
          </div>

        </div>

        {/* Grille des articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image de l'article */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-industrial-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {article.category}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-industrial-orange" /> {article.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-industrial-orange" /> {article.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-industrial-blue uppercase group-hover:text-industrial-orange transition leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Bas de la carte */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 flex items-center justify-between border-t border-gray-200/60 mt-4">
                  <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 pt-4">
                    <User size={14} className="text-industrial-orange" /> Par {article.author}
                  </span>
                  <a 
                    href="#lire-article" 
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-industrial-orange hover:text-orange-700 transition pt-4"
                  >
                    <span>Lire la suite</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <p className="text-gray-500 text-base font-medium">Aucun article ne correspond à votre recherche.</p>
            <button 
              onClick={() => { setSelectedCategory("Tous"); setSearchQuery(""); }}
              className="bg-industrial-orange text-white text-xs font-bold uppercase px-6 py-3 rounded-xl transition hover:bg-orange-600"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </section>

    </div>
  );
}