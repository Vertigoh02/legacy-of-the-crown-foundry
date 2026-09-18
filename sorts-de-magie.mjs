/**
 * Liste des Sorts de Cartomancien (Codex IX : Maîtriser la Magie,
 * p.212-219), classés par Sphère puis par Niveau de puissance. Les
 * descriptions sont des résumés mécaniques reformulés (pas une citation du
 * livre) : pour l'ambiance et le texte exact, référez-vous au Codex IX.
 *
 * Quelques Sorts dont le livre imprime la description à cheval sur deux
 * colonnes ont été rattachés au Niveau de puissance le plus cohérent avec
 * leur nom (mineur/petit → 1, majeur/grand → 2 ou 3, thaumaturgique/divin →
 * 3 ou 4) : si un doute subsiste sur le Niveau exact d'un Sort, vérifiez-le
 * dans le livre.
 */
export const SORTS_PAR_SPHERE = {
  coeur: {
    nom: "Cœur : Sphère de Rémission",
    niveaux: {
      1: [
        "Récupération mineure — la cible regagne des PV égaux à la valeur de la carte tirée.",
        "Renforcement ésotérique mineur — Bonus de +10 aux Tests liés à la CONSTITUTION de la cible pendant 1D10+2 Manches.",
        "Lumière analeptique — guérit la cible du Statut Malade."
      ],
      2: [
        "Récupération majeure — la cible regagne des PV égaux à la valeur de la carte + 2.",
        "Blindage ésotérique — +2 Points de protection à l'armure de la cible pendant 1D10+3 Manches.",
        "Dérouillage — supprime tous les Points de Contamination de la cible."
      ],
      3: [
        "Récupération miraculeuse — la cible regagne 12 PV.",
        "Renforcement ésotérique majeur — Bonus de +20 aux Tests liés à la CONSTITUTION pendant 1D10+3 Manches.",
        "Renforcement ésotérique thaumaturgique — Bonus de +30 aux Tests liés à la CONSTITUTION pendant 1D10+5 Manches."
      ],
      4: [
        "Récupération divine — la cible regagne tous ses PV et gagne 1 PV max. supplémentaire pendant 1D4 heures."
      ],
      valet: ["1 Sort de Niveau de puissance 3 au choix."],
      as: [
        "1 Sort de la Sphère de Rémission au choix.",
        "Renaissance divine — ramène un mort de moins de 24h à la vie, Stress à 0, PV au max, guéri de toute Maladie/Folie, mais Folie Fracture de l'âme immédiate."
      ]
    }
  },

  trefle: {
    nom: "Trèfle : Sphère d'Union",
    elements: ["Feu", "Eau", "Terre", "Glace", "Foudre", "Vent"],
    combinaisons: [
      "Eau puis Foudre (dans cet ordre) — double les Dégâts du Sort de Foudre.",
      "Eau puis Glace (dans cet ordre) — Malus de -20 aux Tests liés au PHYSIQUE et à l'AGILITÉ de la cible.",
      "Feu puis Vent (dans cet ordre) — double les Dégâts causés par la Propriété Incendiaire."
    ],
    niveaux: {
      1: [
        "Toucher ardent (Feu) — la main du lanceur (ou une arme) gagne la Propriété Incendiaire pour un nombre de Manches égal à la valeur de la carte (1 fois/jour si sur une arme).",
        "Main des profondeurs (Eau) — un tentacule aquatique offre 1 Demi-action supplémentaire/Manche et une Attaque de Pugilat (7+FF), dure un nombre de Manches égal à la valeur de la carte.",
        "Osmose terrestre (Terre) — le lanceur se change en rocher immobile et indétectable (sauf perception magique), RP 4, dure un nombre de Manches égal à la valeur de la carte.",
        "Éclat de givre (Glace) — projectile de glace, 7 Dégâts, esquivable normalement.",
        "Toucher foudroyant (Foudre) — main électrifiée pendant un nombre de Manches égal à la valeur de la carte ; au contact à mains nues, Test de Vigueur ou Statut Paralysé 1 Manche.",
        "Souffle véloce (Vent) — Bonus de +10 aux Tests d'AGILITÉ, re-jet d'Esquive en cas d'échec, priorité des ennemis réduite envers le lanceur ; dure un nombre de Manches égal à la valeur de la carte."
      ],
      2: [
        "Orbe infernal (Feu) — 10 Dégâts, Propriété Incendiaire, annule les effets Glace à 5m ; esquivable (Complexe).",
        "Larmes divines (Eau) — pluie 20m/5 Manches ; Sorts de Foudre +2 Dégâts ; Bonus de +10 à tous les Tests des alliés sous la pluie.",
        "Choc sismique (Terre) — tremblement à 5m ; Test d'Athlétisme ou Esquive sous peine de Statut À terre.",
        "Blizzard (Glace) — Malus de -10 aux Tests liés au PHYSIQUE/AGILITÉ à 5m pendant 1 Manche ; inesquivable.",
        "Tonnerre divin (Foudre) — 7 Dégâts (10 si armure métallique) ; Test de Vigueur (Complexe) ou Statut Paralysé 2 Manches ; inesquivable.",
        "Affûtage (Vent) — enchante un petit objet en arme improvisée (5+FF Dégâts, Léger) pendant 1D6+5 Manches."
      ],
      3: [
        "Embrasement (Feu) — jusqu'à 3 cibles en vue prennent feu automatiquement.",
        "Déluge divin (Eau) — pluie 30m/5 Manches ; Sorts de Foudre +5 Dégâts ; alliés +10/ennemis -10 à tous leurs Tests ; armes à feu et explosives inutilisables sous la pluie.",
        "Étreinte terrestre (Terre) — racines infligent le Statut Paralysé, libération par Test de Force (Difficile) 1×/Manche ; inesquivable.",
        "Boucliers de givre (Glace) — réduit les Dégâts subis de 4, détruits seulement par un Sort de Feu Niveau 3+ ; dure 1D10 Manches.",
        "Célérité fulgurante (Foudre) — +1 Action/Tour, Bonus de +20 aux Tests d'Athlétisme, dure 1D10+1 Manches.",
        "Élévation céleste (Vent) — vol jusqu'à 5m, invulnérable aux Attaques de Corps-à-corps/Pugilat venant du sol, dure 1D10 Manches."
      ],
      4: [
        "Feu — Souffle ardent (mains = Incinérateur, corps gagne la Propriété Incendiaire, 1D10+5 Manches) + Invocation majeure d'un Élémentaire de Feu (1D10+5 Manches).",
        "Eau — Frappe torrentielle (16 Dégâts à 3 cibles, esquivable Complexe) + Invocation majeure d'un Élémentaire d'Eau (1D10+5 Manches).",
        "Terre — Corps de pierre (+4 FF/RP, Propriété Ignifugé, ne peut saisir d'objet, -10 aux Tests d'AGILITÉ, 1D10+3 Manches) + Invocation majeure d'un Élémentaire de Terre (1D10+5 Manches).",
        "Glace — Tranche hivernale (arme à une main 9+FF, Malus cumulatif -10 AGI par touche jusqu'à Statut Paralysé à -30, dure 1D10+2 Manches) + Invocation majeure d'un Élémentaire de Glace (1D10+5 Manches).",
        "Foudre — Transformation en Avatar du Tonnerre (1D10+5 Manches) + Invocation majeure d'un Élémentaire de Foudre (1D10+5 Manches).",
        "Vent — Vents d'Union (dévie automatiquement tous les tirs ennemis à 30m, alliés +10 Tir/Lancer, jusqu'à 6 Manches, lanceur immobilisé et vulnérable) + Invocation démoniaque d'un Aigle rouillé (1D10+5 Manches)."
      ],
      valet: ["1 Sort de Niveau de puissance 1, 2 ou 3 au choix."],
      as: [
        "Éruption éclectique — 25 Dégâts à tout ce qui se trouve à 30m ; le lanceur subit lui-même 8 Dégâts sauf Réussite à un Test de Résilience ésotérique (Difficile).",
        "Invocation originelle — invoque un Avatar au choix pendant 1D10+5 Manches."
      ]
    }
  },

  carreau: {
    nom: "Carreau : Sphère de Projection",
    niveaux: {
      1: [
        "Projection mineure — projette un petit objet sur une cible, 6 Dégâts, esquivable normalement.",
        "Petite altération — modifie la taille/le poids d'une cible (soi inclus) pendant 1D4+2 Manches (résistible via Résilience ésotérique) : Taille augmentée (+1 Dégât CaC/Pugilat, +10 Force, -10 Furtivité) ou Taille réduite (-1 Dégât, +10 Furtivité)."
      ],
      2: [
        "Projection majeure — projette un objet de grande taille, 10 Dégâts, esquivable (Complexe).",
        "Grande altération — comme Petite altération mais plus marquée, 1D4+2 Manches (résistible Complexe) : Taille augmentée (+3 Dégâts, +20 Force, -20 Furtivité, +1 Point de protection, ennemis +10 en Attaque) ou Taille réduite (-5 Dégâts, +30 Furtivité, -30 CON/PHY, ennemis -20 en Attaque)."
      ],
      3: [
        "Projection du Titan — projette un objet immense, 15 Dégâts à 15m à la ronde, esquivable (Difficile).",
        "Altération divine — variante la plus puissante, 1D10+2 Manches (résistible Difficile) : Taille augmentée (+5 Dégâts, +20 Force, +2 Points de protection, -30 Furtivité, ennemis +20 en Attaque, témoins Test de Force mentale ou Statut Paralysé) ou Taille réduite (-3 Dégâts, +20 Furtivité, -20 CON/PHY, ennemis -10 en Attaque)."
      ],
      4: [
        "Éveil de Goliath — transforme une cible en créature colossale (+8 Dégâts CaC/Pugilat, +4 Points de protection, +30 CON/PHY, -40 Furtivité), dure 1D10+5 Manches (résistible Extrême).",
        "Réduction forcée — réduit une cible à la taille d'une fourmi, indétectable sauf Capacité Sens ésotérique, +20 AGI, ne peut saisir d'objet ni interagir, 1 PV perdu est fatal, dure 1D10+5 Manches."
      ],
      valet: [
        "1 Sort de Niveau de puissance 1, 2 ou 3 au choix.",
        "Appel des Anciens — invoque un Golem pendant 1D6+5 Manches."
      ],
      as: [
        "Grand appel des Anciens — invoque 2 Golems pendant 1D10+5 Manches.",
        "Fortune — relance un Sort de Projection au choix (hors Grand appel des Anciens) et permet de lancer un second Sort de Niveau 3 ou moins au prix d'1 Demi-action supplémentaire."
      ]
    },
    note: "Un Sort d'Altération qui augmente la taille d'une cible détruit son armure et ses vêtements, sauf s'ils sont un Justaucorps extensible."
  },

  pique: {
    nom: "Pique : Sphère de Souveraineté",
    niveaux: {
      1: [
        "Murmure occulte (Mineur) — télépathie à sens unique avec une cible en vue pendant 10 minutes ; résistible via Résilience ésotérique."
      ],
      2: [
        "Murmure occulte (Majeur) — comme Mineur, plus une suggestion télépathique (rien de contraire à l'alignement moral de la cible), résistible (Complexe), oubliée après 20 minutes en cas de Réussite.",
        "Messager du trépas — communique avec l'âme d'un défunt en présence du cadavre (ou d'un fragment), effets 1D10+5 Manches."
      ],
      3: [
        "Murmure occulte (Maître) — comme Majeur, mais résistible via un Test Difficile.",
        "Réanimation mortuaire — ressuscite un mort en Revenant (PNJ obéissant), quel que soit son état de décomposition ; ne peut être re-ranimé une seconde fois s'il est tué."
      ],
      4: [
        "Fragmentation d'âme — altère les souvenirs d'une cible par contact (résistible Complexe) ; en cas d'Échec, elle croit tout ce que le lanceur lui dit pendant 5 minutes.",
        "Main du Démiurge — prend le contrôle total d'une cible par contact (résistible Extrême) pendant 1D10+6 Manches ; le corps du lanceur reste léthargique et vulnérable durant ce temps.",
        "Fil des Moires — lie l'âme d'un défunt à un cadavre (même différent) : PHYSIQUE/CONSTITUTION/AGILITÉ du corps conservées, INTELLIGENCE/VOLONTÉ/CHARISME remplacés par ceux de l'âme greffée, qui garde ses Capacités et Compétences avancées."
      ],
      valet: ["1 Sort de Niveau de puissance 1, 2 ou 3 au choix."],
      as: [
        "1 Sort de la Sphère de Souveraineté au choix.",
        "Résurrection interdite — ressuscite un mort de moins de 48h totalement guéri de ses blessures (membres amputés repoussent), Maladies et Statuts inclus ; rituel de 24h ; Folie Fracture de l'âme au réveil."
      ]
    }
  }
};

/**
 * Types de Sources de Magie (Codex IX, p.220) : détermine le nombre et le
 * Niveau de puissance des cartes qu'un Cartomancien peut récupérer de sa
 * Défausse en y puisant, via un Test de Connaissances (Arcanes).
 */
export const SOURCES_DE_MAGIE = [
  {
    nom: "Source de Magie Mineure",
    capaciteRequise: "Absorption magique",
    test: "Test de Connaissances (Arcanes)",
    recompense: "2 cartes au choix de Niveau de puissance 1"
  },
  {
    nom: "Source de Magie Majeure",
    capaciteRequise: "Absorption magique majeure",
    test: "Test de Connaissances (Arcanes) Complexe (-10)",
    recompense: "Au choix : 3 cartes de Niveau 1, OU 2 cartes de Niveau 2, OU 1 carte de Niveau 3"
  },
  {
    nom: "Source de Magie Cataclysmique",
    capaciteRequise: "Absorption magique suprême",
    test: "Test de Connaissances (Arcanes) Difficile (-20)",
    recompense: "Au choix : 4 cartes de Niveau 1, OU 3 cartes de Niveau 2, OU 2 cartes de Niveau 3, OU 1 carte de Niveau 4"
  }
];
