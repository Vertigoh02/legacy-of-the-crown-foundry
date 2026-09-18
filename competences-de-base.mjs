/**
 * Liste des Compétences de base de Legacy of the Crown (Codex II).
 * Chaque personnage nouvellement créé reçoit automatiquement ces 27
 * Compétences avec une Valeur brute de 0, prêtes à être développées.
 *
 * "cle" est un identifiant technique stable utilisé par le système pour
 * retrouver une Compétence précise (par exemple pour calculer les PV à
 * partir de la Compétence Vitalité). Ne le modifiez pas si vous éditez
 * les libellés.
 */
export const COMPETENCES_DE_BASE = [
  // PHYSIQUE
  { cle: "athletisme", nom: "Athlétisme", caracteristique: "physique" },
  { cle: "corpsACorps", nom: "Corps-à-corps", caracteristique: "physique" },
  { cle: "force", nom: "Force", caracteristique: "physique" },
  { cle: "intimidation", nom: "Intimidation", caracteristique: "physique" },
  { cle: "pugilat", nom: "Pugilat", caracteristique: "physique" },

  // CONSTITUTION
  { cle: "metabolisme", nom: "Métabolisme", caracteristique: "constitution" },
  { cle: "resistance", nom: "Résistance", caracteristique: "constitution" },
  { cle: "vigueur", nom: "Vigueur", caracteristique: "constitution" },
  { cle: "vitalite", nom: "Vitalité", caracteristique: "constitution" },

  // AGILITÉ
  { cle: "acrobatie", nom: "Acrobatie", caracteristique: "agilite" },
  { cle: "dexterite", nom: "Dextérité", caracteristique: "agilite" },
  { cle: "equitation", nom: "Équitation", caracteristique: "agilite" },
  { cle: "esquive", nom: "Esquive", caracteristique: "agilite" },
  { cle: "furtivite", nom: "Furtivité", caracteristique: "agilite" },
  { cle: "initiative", nom: "Initiative", caracteristique: "agilite" },
  { cle: "tirLancer", nom: "Tir/Lancer", caracteristique: "agilite" },

  // INTELLIGENCE
  { cle: "artisanat", nom: "Artisanat", caracteristique: "intelligence" },
  { cle: "folklore", nom: "Folklore", caracteristique: "intelligence" },
  { cle: "lucidite", nom: "Lucidité", caracteristique: "intelligence" },
  { cle: "orientation", nom: "Orientation", caracteristique: "intelligence" },
  { cle: "perception", nom: "Perception", caracteristique: "intelligence" },

  // VOLONTÉ
  { cle: "forceMentale", nom: "Force mentale", caracteristique: "volonte" },
  { cle: "resilienceEsoterique", nom: "Résilience ésotérique", caracteristique: "volonte" },

  // CHARISME
  { cle: "commandement", nom: "Commandement", caracteristique: "charisme" },
  { cle: "eloquence", nom: "Éloquence", caracteristique: "charisme" },
  { cle: "seduction", nom: "Séduction", caracteristique: "charisme" },
  { cle: "tromperie", nom: "Tromperie", caracteristique: "charisme" }
];
