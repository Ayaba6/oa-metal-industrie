// =====================================================================
//  Photos haute définition de la page d'accueil (banque d'images Unsplash).
//  Licence Unsplash : utilisation commerciale gratuite, sans attribution
//  obligatoire. https://unsplash.com/license
//
//  Ce sont des photos d'illustration : elles ne montrent ni le dépôt ni
//  l'équipe d'OA Métal Industrie. Dès que le client fournit ses propres
//  photos HD, remplacez simplement l'adresse correspondante ci-dessous
//  (par ex. '/images/depot-hd.jpg').
// =====================================================================

const unsplash = (id, largeur = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${largeur}&q=80`;

export const PHOTOS = {
  // Fond du hero (fondu enchaîné)
  soudeurPoutres: unsplash('photo-1600965581129-eef8a214ec9d', 2000), // soudeur sur une charpente, lumière dorée
  charpenteOrange: unsplash('photo-1493476523860-a6de6ce1b0c3', 2000), // charpente métallique orange de nuit
  meulageEtincelles: unsplash('photo-1522322512347-a0e57fd1744c', 2000), // meulage d'un tube, gerbe d'étincelles
  ferBetonPile: unsplash('photo-1745909247906-123b53b70e06', 2000), // barres de fer à béton empilées

  // Produits
  ferBeton: unsplash('photo-1745909247906-123b53b70e06', 1200),
  toleBac: unsplash('photo-1628002881911-8bcdfbdf320e', 1200), // tôles bac orange sur ciel bleu
  toleOndulee: unsplash('photo-1568821692671-ea55f10b54ff', 1200), // tôles nervurées sous les nuages
  tubes: unsplash('photo-1763776091801-23dfe3f63bb0', 1200), // tubes carrés et ronds en stock
  ipn: unsplash('photo-1441796522229-b3a3cb3d58fd', 1200), // nœud de charpente en profilés
  soudureTubes: unsplash('photo-1714504904786-b6732390b206', 1200), // soudure sur tubes carrés

  // Chantiers et équipes
  chantierPoteaux: unsplash('photo-1654000749275-7b032f760975', 1600), // coffrages et armatures d'un immeuble
  equipeChantier: unsplash('photo-1548838670-cb67b43a6adb', 2000), // équipe en gilets orange et casques
};
