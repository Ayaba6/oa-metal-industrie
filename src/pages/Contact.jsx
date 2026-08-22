import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demande de devis',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi du formulaire
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80" 
            alt="Contact OA Métal" 
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
            Restons en contact
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Contactez OA Métal Industrie
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Une question sur nos fers à béton, besoin d'un devis pour votre chantier ou envie de devenir partenaire ? Notre équipe vous répond rapidement.
          </motion.p>
        </div>
      </section>

      {/* Section principale : Coordonnées & Formulaire */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Bloc Coordonnées (à gauche) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full inline-block">
                Informations pratiques
              </span>
              <h2 className="text-3xl font-black text-industrial-blue uppercase">
                Nos Coordonnées
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Rendez-nous visite dans nos locaux ou contactez nos services commerciaux par téléphone ou e-mail.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-industrial-blue uppercase">Adresse principale</h4>
                  <p className="text-gray-600 text-xs mt-1">Bassinko - Station OTAM<br />Ouagadougou - BURKINA FASO</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-industrial-blue uppercase">Téléphone / WhatsApp</h4>
                  <p className="text-gray-600 text-xs mt-1">+226 70 71 76 87<br />+226 77 83 51 13</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-industrial-blue uppercase">E-mail</h4>
                  <p className="text-gray-600 text-xs mt-1">contact@oametalindustrie.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="p-3 bg-white shadow-sm rounded-xl text-industrial-orange flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-industrial-blue uppercase">Heures d'ouverture</h4>
                  <p className="text-gray-600 text-xs mt-1">Lundi - Vendredi : 07h30 - 18h00<br />Samedi : 08h00 - 13h00</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Formulaire de Contact (à droite) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm"
          >
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-black text-industrial-blue uppercase">Message bien reçu !</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Merci pour votre demande. Notre service commercial va l'analyser et vous contactera dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-industrial-orange text-white font-bold text-xs uppercase px-6 py-3 rounded-xl tracking-wider transition hover:bg-orange-600"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-industrial-blue uppercase">Demande de devis ou message</h3>
                  <p className="text-gray-600 text-xs">Remplissez le formulaire ci-dessous pour nous faire part de vos besoins.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">Votre Nom / Entreprise *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Entreprise BTP Faso"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">Téléphone *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ex: +226 70 71 76 87"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">E-mail *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@exemple.com"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">Objet de la demande</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    >
                      <option value="Demande de devis">Demande de devis</option>
                      <option value="Commande fers à béton">Commande fers à béton</option>
                      <option value="Livraison chantier">Livraison chantier</option>
                      <option value="Autre question">Autre question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase">Votre Message / Détails des matériaux *</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Précisez les diamètres, quantités ou services souhaités..."
                    className="w-full bg-white border border-gray-300 rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
                >
                  <span>Envoyer ma demande</span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

    </div>
  );
}