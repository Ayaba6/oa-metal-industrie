import { PHOTOS } from './photos';

// =====================================================================
//  OA Métal Industrie — toutes les infos du site au même endroit.
//  Modifiez ce fichier pour changer téléphones, produits, couleurs…
// =====================================================================

export const SITE = {
  nom: 'OA Métal Industrie',
  slogan: 'Le métal qui inspire confiance',
  telephones: [
    { label: 'Service commercial', affiche: '+226 50 81 46 46', lien: '+22650814646' },
    { label: 'Ligne mobile', affiche: '+226 79 09 55 52', lien: '+22679095552' },
  ],
  // Numéro WhatsApp au format international, sans + ni espaces
  whatsapp: '22679095552',
  email: 'contact@oametalindustrie.com',
  adresse: ['Bassinko - Station OTAM', 'Ouagadougou - Burkina Faso'],
  horaires: ['Lun – Ven : 7h30 – 18h00', 'Samedi : 8h00 – 13h00'],
  // ⚠ Remplacez les '#' par les vraies adresses de vos pages
  reseaux: [
    { nom: 'Facebook', url: '#' },
    { nom: 'Instagram', url: '#' },
    { nom: 'TikTok', url: '#' },
    { nom: 'LinkedIn', url: '#' },
  ],
};

export const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/apropos', label: 'À propos' },
  { to: '/produits', label: 'Produits' },
  { to: '/services', label: 'Services' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/contact', label: 'Contact' },
];

// Les six familles du catalogue (grille "Notre gamme")
export const CATALOGUE = [
  { titre: 'Tôle ondulée', detail: 'Toitures et bardages', image: PHOTOS.toleOndulee },
  { titre: 'Tôle bac', detail: 'Profil rigide, plusieurs coloris', image: PHOTOS.toleBac },
  { titre: 'Fer à béton', detail: 'Haute adhérence, barres de 12 m', image: PHOTOS.ferBeton },
  { titre: 'Tube carré', detail: 'Charpente légère, portails, grilles', image: PHOTOS.tubes },
  { titre: 'IPN', detail: 'Poutrelles pour structures', image: PHOTOS.ipn },
  { titre: 'Fer attaché', detail: 'Ligatures et assemblages', image: '/images/fer-attache.jpg' },
];

// ---- Produits phares interactifs ------------------------------------
// ⚠ Vérifiez ces listes : diamètres, coloris, épaisseurs et sections
//   doivent correspondre à ce que vous avez réellement en stock.

export const FER = {
  diametres: [6, 8, 10, 12, 14, 16],
  longueur: 12, // mètres
  image: PHOTOS.ferBeton,
};

export const TOLES = {
  couleurs: [
    { nom: 'Bleu', hex: '#1F4E9C' },
    { nom: 'Rouge', hex: '#A3271F' },
    { nom: 'Vert', hex: '#2F7D4A' },
    { nom: 'Marron', hex: '#6B3E26' },
    { nom: 'Gris alu', hex: '#B8BEC6' },
  ],
  types: ['Tôle bac', 'Tôle ondulée'],
  finitions: ['Prélaquée', 'Galvanisée', 'Aluzinc'], // ⚠ à vérifier
  epaisseurs: ['30/100', '35/100', '40/100', '45/100'],
  image: PHOTOS.toleBac,
};

export const TUBES = {
  sections: ['20×20', '30×30', '40×40', '40×60', '40×80'],
  epaisseurs: [1.0, 1.2, 1.5, 2.0],
  longueur: 6, // mètres
  image: PHOTOS.tubes,
};

export const FAQ = [
  {
    q: 'Où se trouve OA Métal Industrie ?',
    r: `Nous sommes à Bassinko, près de la Station OTAM, à Ouagadougou. Vous pouvez nous appeler au ${SITE.telephones[0].affiche} ou au ${SITE.telephones[1].affiche}, ou écrire à ${SITE.email}.`,
  },
  {
    q: 'Quels produits proposez-vous ?',
    r: 'Tôles ondulées, tôles bac, fer à béton, tubes carrés, poutrelles IPN, fer attaché et pointes : tout le métal du gros œuvre, de la couverture et de la construction métallique.',
  },
  {
    q: 'Comment obtenir un devis ?',
    r: 'Ajoutez vos produits à votre demande sur ce site puis envoyez-la sur WhatsApp, remplissez le formulaire de devis, ou appelez notre service commercial avec vos quantités.',
  },
  {
    q: 'Livrez-vous sur les chantiers ?',
    r: 'Oui, nous livrons sur vos chantiers partout au Burkina Faso. Le délai et le coût dépendent du lieu et du volume : précisez-les dans votre demande.',
  },
];

// Familles du catalogue avec un repère (petite étiquette en bas de carte)
export const REPERES = ['Couverture', 'Couverture', 'Gros œuvre', 'Charpente légère', 'Structure', 'Ferraillage'];
