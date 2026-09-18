/**
 * Les 8 Classes de Legacy of the Crown (Codex IV, p.61-131).
 *
 * Syntaxe des champs "competencesAvancees" et "capacites" : une entrée par
 * ligne, séparée par des barres verticales " | " :
 *   competencesAvancees : Nom | caractéristique (phy/con/agi/int/cha/vol) | Valeur brute
 *   capacites            : Nom | passive/active | Description
 *
 * Fidélité des données : les Rangs 1 (et la plupart des Rangs 2) sont
 * retranscrits fidèlement depuis le livre. Plusieurs Classes se ramifient
 * en spécialisations distinctes à partir du Rang 2 ou 3 (indiqué dans le
 * champ "nom" et "prerequis" de chaque Rang concerné) : pour ces Rangs,
 * seule une des branches est détaillée, et les autres sont résumées.
 * Avant de lancer une campagne, il est recommandé de relire directement
 * le Codex IV pour vérifier/compléter les Rangs 3 à 5 de la Classe choisie
 * par vos joueurs, directement dans la Fiche d'objet en jeu.
 */
export const CLASSES_DE_BASE = [
  {
    nom: "Alchimiste",
    resume: "Le Cercle de Fer, communauté de savants voués à l'étude du Veredium (Alchimie), de la Quintessence et des Rituels. Bonus de création : +5 Augmentations en CONSTITUTION et INTELLIGENCE. Nécessite de lire le Codex X : La Science du Cercle.",
    rangs: [
      {
        rang: 1,
        nom: "Adepte",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en CONSTITUTION et en INTELLIGENCE.",
        competencesAvancees: "Connaissances (Alchimie) | int | 15",
        capacites:
          "Élixirologie | passive | Permet de préparer des Élixirs avec le matériel adéquat (voir Codex X).\n" +
          "Conducteur de Rituels | passive | Permet d'effectuer des Rituels au moyen de Cercles alchimiques Mineurs (voir Codex X).",
        dotations: "Blouse de l'Alchimiste, Reliquaire d'Alchimiste, 5 Fioles d'Alchimie, Flacon de Quintessence (10 extraits), Éclat de Quintessence, 1 Recette au choix, Nexus Alchimia, 200£."
      },
      {
        rang: 2,
        nom: "Chercheur",
        prerequis: "Niveau de notoriété Notable, Connaissances (Alchimie) 40, Métabolisme 30, Résilience ésotérique 30.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Collecteur | passive | Bonus de +10 aux Tests de Perception pour repérer des Composants du Nexus Alchimia.\n" +
          "Adepte de Rituels | passive | Bonus de +10 aux Tests de Connaissances (Alchimie) pour tracer un Cercle alchimique ; permet les Rituels via des Cercles alchimiques Majeurs.\n" +
          "Bourreau de travail | active | Test de Force mentale pour résister à l'Épuisement pendant un nombre d'heures égal aux DR obtenus.",
        dotations: "Revolver polyvalent (6 munitions), 5 Fioles d'Alchimie, 2 Seringues de Sérum de Vérité, 1 Recette au choix, 330£."
      },
      {
        rang: 3,
        nom: "Hermétiste (voie Rituels) ou Polymathe (voie Recettes) — spécialisation au choix",
        prerequis: "Niveau de notoriété Connu, Connaissances (Alchimie) 60, INTELLIGENCE 20/50, plus Capacité Collecteur et Métabolisme 60 (voie Hermétiste) OU Capacité Adepte de Rituels et Résilience ésotérique 60 (voie Polymathe).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Métabolisme de fer (Hermétiste) | passive | Bonus de +10 aux Tests de Métabolisme en consommant un Élixir.\n" +
          "Résonance vitale (Polymathe) | passive | Bonus de +10 aux Tests de Résilience ésotérique pour effectuer un Rituel.\n" +
          "(Chaque voie a aussi une Capacité active propre : Sang réactif / Accoutumance pour l'Hermétiste, Catalyseur / La Marque pour le Polymathe — voir le livre p.68.)",
        dotations: "Revolver polyvalent, 5 Fioles d'Alchimie, 2 Seringues de Sérum de Vérité, 1 Recette au choix, 330£ (Hermétiste) ; Atelier d'Alchimie Niveau 1, 10 Fioles, 2 Flacons de Quintessence, Havresac, 2 Recettes, 330£ (Polymathe)."
      },
      {
        rang: 4,
        nom: "Philosophe (issu d'Hermétiste) ou Démiurge (issu de Polymathe)",
        prerequis: "Niveau de notoriété Célèbre, Connaissances (Alchimie) 80, INTELLIGENCE 30/50, plus Personnage du Rang Hermétiste, Capacité Sang réactif et Métabolisme 80 (voie Philosophe) OU Personnage du Rang Polymathe, Capacité Spécialiste de Rituels, Capacité La Marque et Résilience ésotérique 80 (voie Démiurge).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites: "Selon la voie : Métabolisme d'acier / Savant fou (Philosophe), ou Laboratoire de chair / Catalyseur (Démiurge) — voir le livre p.68-69 pour le détail complet.",
        dotations: "Armure du Cercle Supérieur, Atelier d'Alchimie Niveau 2, matériel d'Alchimie, 400£ (à vérifier p.69)."
      },
      {
        rang: 5,
        nom: "Thaumaturge",
        prerequis: "Niveau de notoriété Mythique, toutes les Capacités des Rangs précédents (selon spécialisation), Connaissances (Alchimie) 100, Résilience ésotérique 100.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Vaisseau de Vérité | passive | Bonus de +20 aux Tests de Résilience ésotérique pour effectuer un Rituel.\n" +
          "Privilège d'ancienneté | passive | Réduction de 50% sur les équipements et le matériel de la Classe Alchimiste.\n" +
          "Insensibilité | active | 1 fois/jour, Test de Force mentale Complexe (-10) pour devenir immunisé à l'Intimidation et au Stress pendant 1D6 heures.",
        dotations: "Atelier d'Alchimie Niveau 3, 5 Fioles, 4 Seringues de Sérum de Vérité, Cristal de Quintessence, 5 Éclats de Quintessence, 2 Flacons de Quintessence, 4 Recettes au choix, 500£."
      }
    ]
  },

  {
    nom: "Assassin",
    resume: "Tueurs à gages de la Ligue des Ombres, mystérieuse organisation criminelle du Grand Royaume. Bonus de création : +5 Augmentations en AGILITÉ et CHARISME.",
    rangs: [
      {
        rang: 1,
        nom: "Lame",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en AGILITÉ et en CHARISME.",
        competencesAvancees: "Connaissances (Réseaux) | int | 15",
        capacites:
          "Assassin-né | passive | Permet de réaliser un Assassinat via un Test de Corps-à-corps sans le Modificateur Difficile.\n" +
          "Attaque sournoise | passive | Une Attaque dans le dos avec une Arme à une main ignore les Points de protection de l'armure de la cible.",
        dotations: "1 Maîtrise supplémentaire au choix, Bracelet fantôme, 2 Gadgets pour Bracelet fantôme, Uniforme de la Ligue, 150£."
      },
      {
        rang: 2,
        nom: "Tueur à gages",
        prerequis: "Niveau de notoriété Notable, Connaissances (Réseaux) 40, Furtivité 40.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Notoriété clandestine | passive | Bonus de +10 aux Tests de Compétences liées au CHARISME avec des personnages de réseaux criminels ou clandestins.\n" +
          "Frappe chirurgicale | active | Test d'Attaque (1 Action complète, Arme à une main) qui ignore tous les Points de protection de l'armure de la cible en cas de Réussite.",
        dotations: "1 Gadget pour Bracelet fantôme, Tenue sinistre, 300£."
      },
      {
        rang: 3,
        nom: "Exécuteur (voie Meurtre) ou Murmure (voie Infiltration) — spécialisation au choix",
        prerequis: "Niveau de notoriété Connu, Connaissances (Réseaux) 60, Furtivité 60, plus Capacité Expert du meurtre et Corps-à-corps 40 (voie Exécuteur) OU CHARISME 20/50 (voie Murmure).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Expert du meurtre (Exécuteur) | passive | Les Attaques dans le dos infligent 2 Dégâts supplémentaires automatiquement.\n" +
          "Prédateur des ombres (Murmure) | passive | Bonus de +10 aux Tests de Furtivité pour être Dissimulé.",
        dotations: "1 Gadget pour Bracelet fantôme, Tenue sinistre ou Armure d'ombre selon la voie, 300£ (à vérifier p.75)."
      },
      {
        rang: 4,
        nom: "Ombre (issu d'Exécuteur) ou Soupir (issu de Murmure)",
        prerequis: "Niveau de notoriété Célèbre, plus Personnage du Rang Exécuteur, Capacité Frappe chirurgicale, Connaissances (Réseaux) 80, Furtivité 70, Corps-à-corps 70 (voie Ombre) OU Personnage du Rang Murmure, Capacité Faussement banal, Connaissances (Réseaux) 80, Furtivité 70, CHARISME 35/50 (voie Soupir).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Danse macabre (Ombre) | active | Une cible tuée par une Attaque permet une seconde Attaque immédiate sur un autre ennemi à moins de 3 mètres.\n" +
          "Infiltré (Soupir) | passive | Bonus de +10 aux Tests de Tromperie pour se déguiser en un personnage d'une autre Faction.",
        dotations: "1 Maîtrise supplémentaire ou 1 Gadget pour Bracelet fantôme, 500£ (à vérifier p.75-76)."
      },
      {
        rang: 5,
        nom: "Maître Assassin",
        prerequis: "Niveau de notoriété Mythique, toutes les Capacités des Rangs précédents (selon spécialisation), Connaissances (Réseaux) 100, Furtivité 100, plus Corps-à-corps 90 (si issu d'Ombre) ou CHARISME 45/50 (si issu de Soupir).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Maître fantôme | passive | 1 Demi-action supplémentaire par Tour en Confrontation pour utiliser un Gadget de Bracelet fantôme.\n" +
          "Tueur téméraire | passive | Permet de réaliser des Assassinats pendant les Confrontations (1 Action complète, en étant Dissimulé).",
        dotations: "Équipement de Maître Assassin (voir Équipement de Classe : Assassin, p.76)."
      }
    ]
  },

  {
    nom: "Cartomancien",
    resume: "Mages de l'Université théurgique de Birmingham, spécialistes de la Magie canalisée à travers des cartes à jouer. Bonus de création : +5 Augmentations en INTELLIGENCE et VOLONTÉ. Nécessite de lire le Codex IX : Maîtriser la Magie.",
    rangs: [
      {
        rang: 1,
        nom: "Apprenti",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en INTELLIGENCE et en VOLONTÉ.",
        competencesAvancees: "Connaissances (Arcanes) | int | 15\nIncantation | vol | 10",
        capacites: "Énergie ésotérique | passive | Permet d'utiliser la Magie et les cartes du Brassard de l'Arcaniste (voir Codex IX).",
        dotations: "Uniforme de l'Université, Brassard de l'Arcaniste (jeu de 54 cartes), 150£."
      },
      {
        rang: 2,
        nom: "Disciple",
        prerequis: "Niveau de notoriété Notable, Connaissances (Arcanes) 40, Incantation 40.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Absorption magique | active | Absorbe l'énergie d'une Source de Magie Mineure pour récupérer des cartes de la Défausse (jusqu'à 2 fois/jour).\n" +
          "Annulation magique | passive | Réaction défensive via un Test d'Incantation pour dissiper un Sort ciblant le personnage (renvoyé au lanceur en cas de Réussite critique).\n" +
          "Sens ésotérique | active | Test de Connaissances (Arcanes) pour détecter une influence magique sur un objet, un lieu ou une personne.",
        dotations: "Robe de théurgie, Tatouage de l'Arcaniste, 200£."
      },
      {
        rang: 3,
        nom: "Incantateur",
        prerequis: "Niveau de notoriété Connu, Capacité Absorption magique, Connaissances (Arcanes) 60, Incantation 60, Résilience ésotérique 40.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Absorption magique majeure | active | Puise l'énergie d'une Source de Magie Majeure, jusqu'à 3 fois/jour.\n" +
          "Révocation magique | active | Test de Résilience ésotérique Complexe (-10) et 1 Action complète pour dissiper un Sort dont l'effet dure plus d'1 Tour.\n" +
          "Enfant du Destin | active | Après un repos complet, permet de piocher et choisir parmi 2 cartes visibles pour lancer un Sort.",
        dotations: "La Dame ajoutée à toutes les Sphères, 1 élément supplémentaire pour la Sphère d'Union, Brassard de l'Illuminé, 300£."
      },
      {
        rang: 4,
        nom: "Illuminé",
        prerequis: "Niveau de notoriété Célèbre, Capacité Absorption magique majeure, Connaissances (Arcanes) 80, Incantation 80, Résilience ésotérique 60.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Absorption magique suprême | passive | Puise l'énergie d'une Source de Magie Cataclysmique, jusqu'à 3 fois/jour.\n" +
          "Volonté impérieuse | active | 1 fois/jour, si insatisfait de la carte piochée, permet d'influencer le Destin (placer la carte en fin de paquet et repiocher).\n" +
          "Adepte du Destin | passive | Utilise Enfant du Destin sur un troisième paquet de cartes.",
        dotations: "Le Roi ajouté à toutes les Sphères, 1 élément supplémentaire pour la Sphère d'Union, Talisman d'Imgür, 400£."
      },
      {
        rang: 5,
        nom: "Archimage",
        prerequis: "Niveau de notoriété Mythique, toutes les Capacités des Rangs précédents.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Volonté transcendante | passive | Avant de piocher, permet de regarder dans un paquet et choisir la carte à jouer.\n" +
          "Maître du Destin | passive | Utilise Enfant du Destin sur tous les paquets de cartes (remplace Adepte du Destin).",
        dotations: "L'As ajouté à toutes les Sphères, Robe d'Archimage, Cœur ésotérique, Couronne de Domination, 800£."
      }
    ]
  },

  {
    nom: "Médecin de Rouille",
    resume: "L'Ordre des Médecins du Grand Royaume, chargé de soigner la population et de contenir le Fléau de la Rouille — parfois par des moyens radicaux. Bonus de création : +5 Augmentations en CONSTITUTION et INTELLIGENCE.",
    rangs: [
      {
        rang: 1,
        nom: "Étudiant de l'Ordre",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en CONSTITUTION et en INTELLIGENCE.",
        competencesAvancees: "Connaissances (Médecine) | int | 15\nSoin | int | 10",
        capacites:
          "Guérisseur | passive | Lors d'un Test de Soin réussi, lance 1D6 au lieu d'1D4.\n" +
          "Soins d'urgence | active | Permet d'utiliser Soin pendant les Confrontations (1 Action complète), à condition qu'aucun ennemi ne soit à moins de 5 mètres.",
        dotations: "Tenue de Médecin, Trousse de soin, Montre rouillée, 200£."
      },
      {
        rang: 2,
        nom: "Médecin de terrain (voie Cabinet) ou Corbeau (voie Combat) — spécialisation au choix",
        prerequis: "Niveau de notoriété Notable, Connaissances (Médecine) 40, Soin 40, + Force mentale 20 (Corbeau) — à vérifier p.90.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Grand guérisseur (Corbeau) | passive | Lors d'un Test de Soin réussi, lance 1D8 au lieu d'1D6.\n" +
          "Auto-soins | active | Permet de se soigner soi-même via un Test de Soin Complexe (-10).\n" +
          "Suture | active | Test de Soin (1 Action complète) pour guérir un allié du Statut Hémorragie avec 1 Dose de soin ; récupère aussi 1D4 PV.",
        dotations: "Masque de Rouille, Mallette médicale, 3 Filtres respiratoires, 200£."
      },
      {
        rang: 3,
        nom: "Chirurgien (issu de Médecin de terrain) ou Scalpel (issu de Corbeau)",
        prerequis: "Niveau de notoriété Connu, Rang précédent correspondant, Connaissances (Médecine) 60, Soin 50-60, Corps-à-corps 30-50 selon la voie — à vérifier p.91-92.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Opération chirurgicale (Chirurgien) | active | Permet d'amputer un membre ou de greffer une Prothèse mécanique via un Test cumulatif de Soin (Objectif 15).\n" +
          "Anatomiste | active | Test de Perception (1 Demi-action) pour identifier un point faible ; une Attaque visée à cet endroit inflige 3 Dégâts supplémentaires.\n" +
          "Tranche-artère (Scalpel) | passive | Les Attaques de Corps-à-corps infligent 1 Dégât supplémentaire ; une Réussite critique inflige le Statut Hémorragie.",
        dotations: "Tenue de Chirurgien ou Tenue de Corbeau, Masque de pureté ou équivalent, Mallette/Trousse médicale, 400£ (à vérifier p.91-92)."
      },
      {
        rang: 4,
        nom: "Chef de Clinique (issu de Chirurgien) ou Moissonneur (issu de Scalpel)",
        prerequis: "Niveau de notoriété Célèbre, Rang précédent correspondant, Connaissances (Médecine) 80, Soin 80 — à vérifier p.93.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Prodige des soins (Chef de Clinique) | passive | Lors d'un Test de Soin réussi, lance 2D6 au lieu d'1D10.\n" +
          "Thérapie de purification | active | Soigne des Points de Contamination via un traitement de 24h et 3 doses d'Anesthésiant.\n" +
          "Feu d'enfer (Moissonneur) | active | Avec une Arme à projection, inflige les Dégâts et les effets Incendiaires à toute cible en face du personnage.",
        dotations: "Tenue de Chef de Clinique ou Tenue de Moissonneur (avec Masque de noirceur), matériel médical avancé, 500£."
      },
      {
        rang: 5,
        nom: "Héraut d'Hippocrate",
        prerequis: "Niveau de notoriété Mythique, toutes les Capacités des Rangs précédents (selon spécialisation), Connaissances (Médecine) 100, Soin 100 (si issu de Chef de Clinique) ou Corps-à-corps 100 (si issu de Moissonneur), CHARISME 45/50.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "À l'affût de symptômes | passive | Identifie toute Maladie ou tout Poison affectant un personnage, ainsi que le traitement nécessaire, sans effectuer de Test.\n" +
          "Ennemi du Fléau | passive | Bonus de +20 à tous les Tests de Contamination (cumulable avec la Capacité Dérouilleur).\n" +
          "(Capacité supplémentaire, nom illisible dans le PDF) | passive | Tous les personnages en présence du Médecin bénéficient d'un Bonus de +20 à leurs Tests de Stress.",
        dotations: "Siège au Conseil de l'Ordre des Médecins, Valise médicale, 2 Seringues de Stimulants, 10 Filtres respiratoires, 1000£."
      }
    ]
  },

  {
    nom: "Mercenaire",
    resume: "Combattant indépendant vendant ses services au plus offrant. Ne dépend d'aucune Faction : pas de Dotation de Rang au-delà du Rang 1, mais peut acheter librement l'équipement de toutes les Factions.",
    rangs: [
      {
        rang: 1,
        nom: "Vagabond",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en PHYSIQUE et en CONSTITUTION à la Création de personnage.",
        competencesAvancees:
          "Connaissances (Art de la guerre) | int | 15\n" +
          "Connaissances (Réseaux) | int | 15\n" +
          "Soin | int | 10",
        capacites:
          "Provocation | active | Au prix d'1 Demi-action, Test d'Éloquence opposé à la Force mentale d'une cible. En cas de Réussite, la cible est contrainte de vous cibler de toutes ses Attaques pendant 1D4 Manches.",
        dotations: "1 Maîtrise supplémentaire au choix. 2 armes au choix d'une valeur combinée ≤ 350£ (l'argent restant constitue le pécule de départ), avec 10 munitions/contenants associés."
      },
      {
        rang: 2,
        nom: "Brute",
        prerequis: "Niveau de notoriété Notable, et l'une des conditions suivantes : Connaissances (Art de la guerre) 40, Connaissances (Réseaux) 40, Corps-à-corps 40, Pugilat 40 ou Tir/Lancer 40 (à vérifier dans le livre).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Couteau suisse | passive | Le coût en XP pour acquérir une nouvelle Maîtrise ou une Amélioration de Maîtrise est réduit de moitié.",
        dotations: "1 Maîtrise supplémentaire au choix OU 1 Amélioration de Maîtrise."
      },
      {
        rang: 3,
        nom: "Chasseur de primes",
        prerequis: "Niveau de notoriété Connu, et l'une des conditions suivantes : Capacité Attaque puissante, Connaissances (Art de la guerre) 60, Connaissances (Réseaux) 60, Corps-à-corps 60, Pugilat 60 ou Tir/Lancer 60 (à vérifier dans le livre).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Attaque puissante | active | Au prix d'1 Action complète, Test d'Attaque basé sur le Corps-à-corps ou le Pugilat. Jusqu'à la fin de cette Attaque, la Force de frappe est doublée.",
        dotations: "1 Maîtrise supplémentaire au choix OU 1 Amélioration de Maîtrise."
      },
      {
        rang: 4,
        nom: "Vétéran",
        prerequis: "À vérifier dans le livre (Codex IV, p.101).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Guerrier reconnu | passive | Bonus de +10 à tous les Tests de Compétences liées au CHARISME lorsque vous interagissez avec des mercenaires, des soldats ou des personnages en quête d'un mercenaire.\n" +
          "Touche-à-tout | passive | Vous pouvez dépenser vos PI pour acheter des armes de toutes les Factions (y compris les Mains de Dieu), sous réserve des Prérequis de Rang.\n" +
          "Double attaque | active | Au prix d'1 Action complète, avec une Arme à une main ou de pugilat dans chaque main, effectuez 2 Attaques successives sur une même cible (main directrice puis non-directrice).",
        dotations: "1 Maîtrise supplémentaire au choix OU 1 Amélioration de Maîtrise."
      },
      {
        rang: 5,
        nom: "Légende",
        prerequis: "À vérifier dans le livre (Codex IV, p.101).",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Partenaire de la Mort | active | 1 fois par jour, lorsque vous êtes sur le point de subir un coup potentiellement fatal, vous pouvez dépenser 1 Chance pour y échapper miraculeusement, de la manière de votre choix.",
        dotations: "2 Maîtrises supplémentaires au choix ET 2 Améliorations de Maîtrise."
      }
    ]
  },

  {
    nom: "Rôdeur",
    resume: "Tribus vivant en autarcie dans les forêts du Grand Royaume, hostiles à la Prouesse victorienne et vouées à Mère Nature. Bonus de création : +5 Augmentations en CONSTITUTION et AGILITÉ. Nécessite de lire le Codex XI : La Vie sauvage.",
    rangs: [
      {
        rang: 1,
        nom: "Éclaireur",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en CONSTITUTION et en AGILITÉ.",
        competencesAvancees: "Connaissances (Nature) | int | 15\nDressage | cha | 10",
        capacites:
          "Ami des bêtes | passive | Permet d'apprivoiser un Compagnon de Catégorie 1.\n" +
          "Sauvageon | passive | Permet de préparer des Concoctions avec le matériel adéquat.\n" +
          "Œil du survivaliste | passive | Bonus de +10 aux Tests de Perception pour trouver des Composants du Nexus Naturae.",
        dotations: "Maîtrise Armes de tir, Arc, Petit carquois (10 Flèches), Tunique du sauvage, Kit de l'herboriste, Mortier, Outre, Sacoche (Composants), Nexus Naturae, 150£."
      },
      {
        rang: 2,
        nom: "Dresseur",
        prerequis: "Niveau de notoriété Notable, avoir passé l'Épreuve de la Communion sauvage, Connaissances (Nature) 40, Dressage 40.",
        bonusCreation: "",
        competencesAvancees: "Soin | int | 10",
        capacites:
          "Allié des bêtes | passive | Permet d'apprivoiser jusqu'à 2 Compagnons, y compris de Catégorie 2.\n" +
          "Formateur d'animaux savants | passive | Permet d'inculquer des Réflexes aux Compagnons.\n" +
          "Soins animaliers | active | Permet d'utiliser Soin pour soigner des animaux au prix d'1 Kit vétérinaire.",
        dotations: "Arc chatoyant, Fourrure, Bottes de chasseur, Kit du vétérinaire, 10 Friandises pour animaux, 1 Recette au choix, 180£."
      },
      {
        rang: 3,
        nom: "Dompteur (voie Animaux) ou Limier (voie Infiltration) — spécialisation au choix",
        prerequis: "Niveau de notoriété Connu ou Célèbre, avoir passé l'épreuve correspondante, Connaissances (Nature) 40-50, Dressage 40 ou Furtivité 50 selon la voie.",
        bonusCreation: "",
        competencesAvancees: "Connaissances (Réseaux) | int | 15",
        capacites:
          "Maître des bêtes (Dompteur) | passive | Permet d'apprivoiser jusqu'à 3 Compagnons, y compris de Catégorie 3.\n" +
          "Sabotage (Limier) | active | Test de Dextérité pour saboter un objet de la Prouesse ou une infrastructure en 2D10 minutes.",
        dotations: "Long couteau du Traqueur, Armure de cuir renforcée, matériel vétérinaire ou Kit de sabotage, 200£ (à vérifier p.107-108)."
      },
      {
        rang: 4,
        nom: "Druide (issu de Dompteur) ou Renard (issu de Limier)",
        prerequis: "Niveau de notoriété Célèbre, Rang précédent correspondant, Connaissances (Nature) 80 ou Furtivité 70 selon la voie.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Transe méditative (Druide) | active | Permet de dormir 1D4 heures pour récupérer 1D4+DR PS de Stress.\n" +
          "Instinct territorial (Renard) | active | Bonus de +20 aux Tests de Corps-à-corps, Pugilat et Intimidation pour défendre son territoire (coûte 1 PS/Tour).",
        dotations: "Talisman de la Racine, matériel vétérinaire ou Tenue d'aristocrate, 400£."
      },
      {
        rang: 5,
        nom: "Élu",
        prerequis: "Niveau de notoriété Mythique, avoir passé l'Épreuve du Rite d'Ascension, toutes les Capacités des Rangs précédents (selon spécialisation), Connaissances (Nature) 100, Dressage 100 (si issu de Druide) ou Connaissances (Réseaux) 100 (si issu de Renard), Folklore 90.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Peau dure | passive | Bonus de +2 en Résistance physique.\n" +
          "Héraut de Mère Nature | passive | Tout animal sur le point d'attaquer le personnage doit réussir un Test de Force mentale Extrême (-30) ou se replier aussitôt.\n" +
          "Cœur des bêtes | passive | Bonus de +20 aux Tests de Dressage pour apprivoiser un animal sauvage ou apprendre un Réflexe ; permet d'utiliser les Compétences de CHARISME sur les animaux non corrompus par la Rouille (remplace Aura apaisante).",
        dotations: "Toge d'Élu, Couronne de bois, Globe de Mère Nature, 2 Recettes au choix, 500£."
      }
    ]
  },

  {
    nom: "Soldat de la Couronne",
    resume: "La Royal Army, plus grande armée du monde, au service de Sa Majesté la Reine Victoria. Bonus de création : +5 Augmentations en PHYSIQUE et AGILITÉ. Réservé aux personnages d'origine britannique.",
    rangs: [
      {
        rang: 1,
        nom: "Recrue",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en PHYSIQUE et en AGILITÉ.",
        competencesAvancees: "Connaissances (Art de la guerre) | int | 15\nSoin | int | 10",
        capacites:
          "Rechargement rapide | active | Au prix d'1 Demi-action, Test de Tir/Lancer pour recharger une Arme à feu maîtrisée (munitions supplémentaires égales aux DR obtenus).",
        dotations: "Maîtrise Armes à feu (Fusils), Fusil Lee-Enfield Mk. I (10 munitions), Uniforme militaire, Casque militaire, Kit de soin, Codex du Brave, 150£."
      },
      {
        rang: 2,
        nom: "Soldat — spécialisation au choix : Fantassin, Sapeur ou Tireur d'élite",
        prerequis: "Niveau de notoriété Notable, Connaissances (Art de la guerre) 40, + conditions propres à la spécialisation choisie (Maîtrise d'armes notamment — voir p.116-117).",
        bonusCreation: "",
        competencesAvancees: "Pilotage (Voitures) | agi | 10",
        capacites:
          "Tir de suppression (Fantassin) | active | 1 Action complète, Attaque avec une Arme Automatique qui touche toute cible en face à Portée.\n" +
          "Technicien de la Prouesse (Sapeur) | passive | Permet de réparer des objets de la Prouesse (MEKAs, véhicules) sans le Modificateur Complexe.\n" +
          "Artiste de la destruction (Sapeur) | passive | Bonus aux Tests liés aux Armes explosives.\n" +
          "As du tir / Tir de précision (Tireur d'élite) | passive/active | Bonus de +10 après une Visée ; Bonus de +30 au prochain Test d'Attaque après concentration.",
        dotations: "Selon spécialisation : Mitrailleuse Vickers (Fantassin), Lance-flammes/Mine/Charge explosive (Sapeur), ou Fusil Whitworth (Tireur d'élite), plus Kit de soin, 200£."
      },
      {
        rang: 3,
        nom: "Officier",
        prerequis: "Niveau de notoriété Connu, Maîtrise Niveau 2+ selon arme de spécialité, Connaissances (Art de la guerre) 60, Tir/Lancer ou Artisanat 60 selon spécialisation, Commandement 50, INTELLIGENCE 20/50.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Éducation patriotique | passive | Bonus de +10 aux Tests de Folklore liés à l'histoire de la Couronne.\n" +
          "Discours inspirant | active | 1 Action complète, Test de Commandement : les alliés deviennent immunisés au Statut Terrifié pendant un nombre de Manches égal aux DR (Bonus supplémentaire en cas de Réussite critique).",
        dotations: "Revolver Magnum S&W 1858 (6 munitions), Tenue d'Officier de la Royal Army, Kit de soin, 300£."
      },
      {
        rang: 4,
        nom: "Centurion",
        prerequis: "Niveau de notoriété Célèbre, Capacité Discours inspirant, Connaissances (Art de la guerre) 80, Tir/Lancer 70, Commandement 70, INTELLIGENCE 35/50.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Chef adoré | passive | Un subordonné à moins de 5 mètres tentera d'intercepter à votre place un coup potentiellement fatal (Test d'Esquive).\n" +
          "Virtuose des armes | passive | Toutes les armes équipées sont d'Encombrement nul.",
        dotations: "Fusil d'assaut Vickers (30 munitions), Armure de Centurion, Kit de soin, 500£."
      },
      {
        rang: 5,
        nom: "Lord Commander",
        prerequis: "Niveau de notoriété Légendaire, disparition de l'un des Lords Commanders actuels, toutes les Capacités des Rangs précédents, Maîtrise Niveau 3 des Mains de Dieu, Connaissances (Art de la guerre) 100, Tir/Lancer 100, Commandement 100, Initiative 80.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Aura galvanisante | passive | Les alliés à portée de vue bénéficient d'un Bonus de +20 à tous leurs Tests de Force mentale.\n" +
          "Mise à mort | passive | Toutes les Attaques deviennent des Attaques critiques et infligent 1 Dégât supplémentaire (2 sur une véritable Réussite critique).\n" +
          "Stratège de la Reine | active | Au prix de 400 PI, audience privée avec la Reine pour prononcer une réforme militaire.",
        dotations: "Épée sacrée de la Couronne, Pistolet de la Couronne (8 munitions), Tenue de Lord, 1000£."
      }
    ]
  },

  {
    nom: "Technodiacre",
    resume: "L'Église d'Ascendance, institution ecclésiastique officielle qui prêche la Foi caréenne et maîtrise la Prouesse victorienne (Mains de Dieu, Drones, MEKAs). Bonus de création : +5 Augmentations en INTELLIGENCE et CHARISME. Nécessite de lire le Codex XIII : La Prouesse victorienne.",
    rangs: [
      {
        rang: 1,
        nom: "Moine de fer",
        prerequis: "Aucun (Rang de départ).",
        bonusCreation: "+5 Augmentations de Caractéristique supplémentaires en INTELLIGENCE et en CHARISME.",
        competencesAvancees: "Connaissances (Prouesse) | int | 15\nPilotage (Drones) | agi | 10",
        capacites:
          "Ingénierie | passive | Permet d'utiliser Artisanat pour réparer des objets de la Prouesse (MEKAs, véhicules) sans le Modificateur Complexe.\n" +
          "De chair et d'acier | passive | Aucun Malus lié à la greffe d'une Prothèse mécanique.",
        dotations: "Maîtrise Mains de Dieu, Robe monacale, Drone de surveillance, Boîtier de commande (Drones), Mallette de réparation, Ascendance caréenne, 200£."
      },
      {
        rang: 2,
        nom: "Prêtre de l'acier",
        prerequis: "Niveau de notoriété Notable, avoir fait l'objet du Premier Sacrement, Connaissances (Prouesse) 40, Pilotage (Drones) 25, Artisanat 25, Résilience ésotérique 25.",
        bonusCreation: "",
        competencesAvancees: "Main du Démon | int | 10",
        capacites:
          "Érudition religieuse | passive | Bonus de +20 aux Tests de Folklore liés à l'Église d'Ascendance.\n" +
          "Piratage | active | 1 Action complète, Test de Connaissances (Prouesse) Complexe (-10) avec un Parasite cuivré pour prendre le contrôle d'un Drone ou MEKA ennemi.",
        dotations: "Soutane victorienne, Trousse de réparation, Malette d'amélioration, 5 Perles de Veredium, Pupille de la Reine, Atelier d'artisanat Niveau 1, 280£."
      },
      {
        rang: 3,
        nom: "Meta-Vicaire",
        prerequis: "Niveau de notoriété Connu, avoir fait l'objet du Deuxième Sacrement, Capacité Ingénierie des Drones, Connaissances (Prouesse) 60, Pilotage (Drones) 60, Main du Démon 40, Résilience ésotérique 50.",
        bonusCreation: "",
        competencesAvancees: "Soin | int | 10",
        capacites:
          "Héraut de la Prouesse | passive | Permet de fabriquer/améliorer des Mains de Dieu de Niveau de Veredium 2.\n" +
          "Prêcheur | passive | Un interlocuteur qui résiste à un discours sur les bienfaits de la Prouesse subit un Malus, sinon il est convaincu.\n" +
          "Chirurgie mécanique | active | Permet d'utiliser Soin pour greffer une Prothèse mécanique à un autre personnage.",
        dotations: "Valise de réparation, Malette d'amélioration, 6 Perles de Veredium, Relique d'absolution, Atelier d'artisanat Niveau 2, 300£."
      },
      {
        rang: 4,
        nom: "Meta-Cardinal",
        prerequis: "Niveau de notoriété Célèbre, avoir fait l'objet du Troisième Sacrement, Capacité Héraut de la Prouesse, Connaissances (Prouesse) 80, Pilotage (Drones) 80, Main du Démon 60, Résilience ésotérique 70.",
        bonusCreation: "",
        competencesAvancees: "Pilotage (MEKAs) | agi | 10",
        capacites:
          "Idole caréenne | passive | 1D4 Soldats de la Couronne accourent défendre le personnage s'il est agressé dans une zone où la Prouesse est développée.\n" +
          "Champion de la Prouesse | passive | Permet de fabriquer/améliorer des Mains de Dieu de Niveau 3 ainsi que des MEKAs.",
        dotations: "Valise de réparation, Malette d'amélioration, 6 Perles de Veredium, 3 Éclats de Veredium raffiné, Parasite cuivré, 3 Alarmes magiques, Atelier d'artisanat Niveau 3, 400£."
      },
      {
        rang: 5,
        nom: "Archevêque de la Prouesse",
        prerequis: "Niveau de notoriété Légendaire, avoir fait l'objet du Quatrième Sacrement, toutes les Capacités des Rangs précédents, Connaissances (Prouesse) 100, Pilotage (MEKAs) 80, Main du Démon 100, Artisanat 100.",
        bonusCreation: "",
        competencesAvancees: "",
        capacites:
          "Sainteté | passive | Immunité totale et permanente à la Rouille (Jauge de Contamination bloquée à 0). Toute tentative d'agression, mensonge ou nuisance contre le personnage exige un Test de Force mentale Extrême (-30) de l'agresseur, sous peine de Statut Terrifié.\n" +
          "Immaculé | passive | Immunité totale et permanente à la Rouille.\n" +
          "Conseiller de la Reine | active | Au prix de 400 PI, audience privée avec la Reine pour prononcer une réforme religieuse.",
        dotations: "Manteau du pontife, Valise de réparation, Valise d'amélioration, 5 Perles de Veredium, 5 Éclats de Veredium raffiné, Atelier des Merveilles."
      }
    ]
  }
];
