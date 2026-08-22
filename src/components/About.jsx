import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play, Building2, Users, Award, MapPin } from 'lucide-react';

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

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grille À Propos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Bloc Vidéo / Image usine avec animation latérale gauche */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" 
              alt="Usine OA Métal Industrie" 
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-industrial-blue/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-industrial-orange text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition">
                <Play size={28} className="translate-x-0.5" />
              </div>
            </div>
          </motion.div>

          {/* Textes explicatifs avec animation latérale droite */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full">
                À Propos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-industrial-blue uppercase mt-4">
                OA Métal Industrie
              </h2>
              <p className="text-industrial-orange font-bold text-lg mt-1">
                Le métal qui inspire confiance !
              </p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Spécialisés dans la fourniture de produits métalliques de haute qualité, nous accompagnons les professionnels et les particuliers dans la réalisation de leurs projets de construction et d'industrie.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                <span>Produits certifiés et conformes aux normes</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                <span>Équipe d'experts à votre service</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                <span>Accompagnement personnalisé</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button className="bg-industrial-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-lg uppercase transition shadow-md">
                En savoir plus
              </button>
              
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl flex items-center gap-4">
                <span className="text-3xl font-black text-industrial-orange">+10</span>
                <span className="text-xs font-bold text-gray-600 uppercase leading-tight">Ans d'expérience<br />à votre service</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Chiffres clés avec apparition en cascade */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="bg-gray-50 border border-gray-100 rounded-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange">
              <Building2 size={32} />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">500+</h4>
              <p className="text-xs font-bold text-gray-500 uppercase">Projets réalisés</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange">
              <Users size={32} />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">300+</h4>
              <p className="text-xs font-bold text-gray-500 uppercase">Clients satisfaits</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange">
              <Award size={32} />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">10+</h4>
              <p className="text-xs font-bold text-gray-500 uppercase">Années d'expérience</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange">
              <MapPin size={32} />
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">100%</h4>
              <p className="text-xs font-bold text-gray-500 uppercase">Couverture nationale</p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}