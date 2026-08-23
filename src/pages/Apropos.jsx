import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Eye, Award, Users, Building2, MapPin } from 'lucide-react';

// Importez vos images depuis le dossier src/assets ici :
import banniereImage from '../assets/ban.jpg';
import equipeImage from '../assets/apropos.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function About() {
  return (
    <div className="bg-white">
      
      {/* En-tête / Bannière de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <img 
            src={banniereImage} 
            alt="Usine OA Métal Industrie" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-industrial-blue/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/20 px-3 py-1 rounded-full inline-block backdrop-blur-sm"
          >
            Qui sommes-nous ?
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight drop-shadow-md"
          >
            À Propos d'OA Métal Industrie
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto drop-shadow"
          >
            Leader dans la fourniture de matériaux métalliques de construction au Burkina Faso, alliant robustesse, qualité et service irréprochable.
          </motion.p>
        </div>
      </section>

      {/* Section Histoire & Présentation */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={equipeImage} 
                  alt="Équipe OA Métal" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-industrial-orange text-white p-6 rounded-2xl shadow-xl hidden sm:flex flex-col items-center justify-center">
                <span className="text-4xl font-black">+10</span>
                <span className="text-xs uppercase font-bold tracking-wider">Ans d'expertise</span>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <h2 className="text-3xl font-black text-industrial-blue uppercase">
                  Le métal qui inspire confiance !
                </h2>
                <p className="text-industrial-orange font-bold text-lg mt-1">
                  Notre engagement pour la construction durable
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Fondée avec la vision de transformer le secteur de la métallurgie et de la construction, <strong className="text-industrial-blue">OA Métal Industrie</strong> s'impose aujourd'hui comme un partenaire incontournable pour les professionnels du BTP, les industriels et les particuliers exigeants.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                Nous mettons un point d'honneur à fournir des produits conformes aux normes internationales les plus strictes : fers à béton haute résistance, tôles profilées et accessoires métalliques durables.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                  <span>Matériaux 100% certifiés</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                  <span>Logistique et livraison rapide</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                  <span>Support technique personnalisé</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle className="text-industrial-orange flex-shrink-0" size={20} />
                  <span>Tarifs compétitifs</span>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* Section Vision & Mission avec effet au survol */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Carte Mission */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-industrial-orange hover:shadow-xl transition-all duration-300 group space-y-4"
            >
              <div className="w-12 h-12 bg-industrial-orange/10 rounded-xl flex items-center justify-center text-industrial-orange group-hover:bg-industrial-orange group-hover:text-white transition-colors duration-300">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-black text-industrial-blue group-hover:text-industrial-orange transition-colors duration-300 uppercase">
                Notre Mission
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fournir des solutions métallurgiques innovantes, fiables et accessibles qui garantissent la sécurité et la pérennité de chaque projet de construction de nos clients à travers tout le pays.
              </p>
            </motion.div>

            {/* Carte Vision */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-industrial-orange hover:shadow-xl transition-all duration-300 group space-y-4"
            >
              <div className="w-12 h-12 bg-industrial-orange/10 rounded-xl flex items-center justify-center text-industrial-orange group-hover:bg-industrial-orange group-hover:text-white transition-colors duration-300">
                <Eye size={28} />
              </div>
              <h3 className="text-xl font-black text-industrial-blue group-hover:text-industrial-orange transition-colors duration-300 uppercase">
                Notre Vision
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Devenir la référence absolue de l'industrie métallurgique en Afrique de l'Ouest, reconnue pour son intégrité, sa capacité d'innovation et la qualité supérieure de ses produits.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full">
              En chiffres
            </span>
            <h2 className="text-3xl font-black text-industrial-blue uppercase mt-3">
              OA Métal en un coup d'œil
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={fadeIn} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange"><Building2 size={28} /></div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">500+</h4>
                <p className="text-xs font-bold text-gray-500 uppercase">Projets</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange"><Users size={28} /></div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">300+</h4>
                <p className="text-xs font-bold text-gray-500 uppercase">Clients</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange"><Award size={28} /></div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">10+</h4>
                <p className="text-xs font-bold text-gray-500 uppercase">Années</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange"><MapPin size={28} /></div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-industrial-blue">100%</h4>
                <p className="text-xs font-bold text-gray-500 uppercase">National</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}