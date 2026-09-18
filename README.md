# Legacy of the Crown — Système Foundry VTT (v0.6.0, prototype)

Ce dossier est un **vrai système de jeu Foundry VTT**, installable comme
n'importe quel système officiel : une fois publié, il apparaîtra dans la
recherche « Legacy of the Crown » de la fenêtre d'installation des systèmes.

## Ce qui fonctionne déjà

### Phase 1 — Moteur de base (Codex II et III)
- Fiche de Personnage Joueur et fiche de PNJ.
- Les 6 Caractéristiques et les 27 Compétences de base, ajoutées
  automatiquement à la création d'un personnage.
- Calcul automatique de la Valeur réelle et des Caractéristiques dérivées
  (PV, Force de frappe, Résistance physique, Vitesse, Encombrement maximal,
  Endurance, Jauges de Stress et de Contamination).
- Test de Compétence en un clic (1D100, Degrés de réussite, Critiques).

### Phase 2 — Confrontations (Codex VI)
- **Ordre de passage** : le bouton « Lancer l'Initiative » du Traqueur de
  combat Foundry effectue désormais un vrai Test de Compétence d'Initiative
  et classe les participants par Degrés de réussite décroissants (avec
  gestion des égalités), comme dans les règles. Un message de chat signale
  les Réussites/Échecs critiques (Action bonus, Demi-action en moins).
- **Attaquer un adversaire** : depuis la liste d'Armes de la Fiche de
  personnage, ciblez un adversaire (touche T), cliquez sur l'icône
  d'explosion à côté d'une arme. Le système effectue le Test d'Attaque
  opposé au Test de Parade/Esquive de la cible, calcule les Dégâts (arme +
  Force de frappe si Corps-à-corps/Pugilat + Degrés de réussite − Résistance
  physique de la cible), détermine la Localisation par 1D100, et applique
  automatiquement la perte de PV sur la Fiche de la cible.

**Limites connues de la Phase 2** (choix assumés pour avancer vite ; à
affiner dans une prochaine étape) :
- Pas encore de gestion des Actions/Demi-actions par Tour, ni des Actions
  bonus effectivement utilisables (seul le message d'info est affiché).
- Pas encore de Malus de blessure persistant, de Statuts (Hémorragie,
  Étourdi, Inconscient…), ni d'armure/Points de protection (Codex VII).
- La Visée, la Charge, le Sprint, les Attaques d'opportunité, l'Assommement
  et la Contre-attaque sur Parade critique ne sont pas encore automatisés.
- Utiliser une arme sans Maîtrise ne donne pas encore le Malus de -20 (les
  Maîtrises ne sont pour l'instant qu'un Item informatif).

### Phase 3 — Classes (Codex IV) : personnage jouable de bout en bout
- Nouvel Item de type **Classe**, avec ses 5 Rangs (nom, Prérequis, Bonus de
  création, Compétences avancées, Capacités de Classe, Dotations),
  entièrement éditable en jeu.
- **La Classe Mercenaire est fournie en exemple complet** (Rang 1 « Vagabond »
  fidèlement retranscrit du livre ; Rangs 2 à 5 résumés — leurs Prérequis
  exacts sont à vérifier/compléter directement dans la Fiche, le texte du
  PDF étant sur plusieurs colonnes à cet endroit). Elle est créée
  automatiquement dans le Répertoire d'objets du monde au premier lancement.
- Sur la Fiche de personnage : glissez la Classe « Mercenaire » (ou toute
  autre Classe que vous créez sur ce modèle) depuis le Répertoire d'objets,
  réglez le Rang (1 à 5), puis cliquez sur « Synchroniser la Classe » : le
  système ajoute automatiquement à la Fiche toutes les Compétences avancées
  et Capacités de Classe des Rangs atteints (sans jamais dupliquer).
- **Un personnage Mercenaire de Rang 1 est donc désormais jouable de bout
  en bout** : Caractéristiques, Compétences (de base + avancées), Capacité
  de Classe, arme équipée, Attaque et Initiative fonctionnels.

**Pour saisir les 8 autres Classes du livre** (Alchimiste, Assassin,
Cartomancien, Médecin de Rouille, Rôdeur, Soldat de la Couronne,
Technodiacre, Cartomancien...) : créez un Item de type Classe, et
remplissez chaque Rang avec la syntaxe indiquée sur sa Fiche (une
Compétence ou Capacité par ligne, séparée par des « | »). Le fichier
`module/data/classes-de-base.mjs` montre l'exemple du Mercenaire si vous
préférez les préremplir dans le code plutôt qu'en jeu.

**Limites connues de la Phase 3** :
- Le coût en Points d'expérience pour les Capacités des Rangs 2+ n'est pas
  encore géré (Codex II : Expérience) : la synchronisation les octroie
  gratuitement pour l'instant.
- L'Influence (Points d'Influence, Niveau de notoriété) n'est pas encore
  suivie sur la Fiche.
- Les Prérequis de Rang ne sont pas vérifiés automatiquement (à la
  discrétion du MJ pour l'instant, comme le prévoit d'ailleurs le livre).

### Phase 4 — Les 8 Classes et l'Influence (Codex IV complet)
- **Les 8 Classes du livre sont maintenant fournies** : Alchimiste, Assassin,
  Cartomancien, Médecin de Rouille, Mercenaire, Rôdeur, Soldat de la
  Couronne, Technodiacre. Toutes sont créées automatiquement dans le
  Répertoire d'objets au premier lancement.
- **Fidélité des données** : les Rangs 1 (et la plupart des Rangs 2) sont
  retranscrits fidèlement depuis le livre. Plusieurs Classes se ramifient en
  spécialisations à partir du Rang 2 ou 3 (Alchimiste, Assassin, Médecin de
  Rouille, Rôdeur) : pour ces Rangs, une branche est détaillée et les autres
  sont résumées avec la mention « à vérifier ». Avant de lancer une
  campagne avec un personnage de Rang 3+, relisez le Codex IV pour
  compléter/corriger directement le Rang concerné dans la Fiche d'objet en
  jeu (chaque champ est éditable en clair, pas besoin de toucher au code).
  Le Rang 5 du Médecin de Rouille (Héraut d'Hippocrate) et du Rôdeur
  (Élu) ont depuis été complétés, ainsi que les Prérequis précis des
  Rangs 3-4 de l'Alchimiste et de l'Assassin.
- **Influence (Codex IV, p.63)** : chaque Personnage a maintenant un total
  de Points d'Influence (PI, qui ne diminue jamais et détermine le Niveau
  de notoriété — Inconnu, Notable, Connu, Célèbre, Mythique, Légendaire) et
  une réserve de PI disponibles (qui peut être dépensée, par exemple pour
  de l'Équipement de Classe). Un bouton « Gagner / Dépenser des PI » sur la
  Fiche permet de gérer les deux.

**Limites connues de la Phase 4** :
- Le coût en XP pour les Capacités des Rangs 2+ n'est toujours pas
  automatisé : la synchronisation les octroie gratuitement.
- Les Prérequis de Rang ne sont pas vérifiés automatiquement.
- L'achat d'Équipement de Classe avec des PI n'est pas encore relié à un
  catalogue d'objets (à faire au moment du Codex V : Équipement).

### Phase 5 — Magie à cartes (Codex IX), utilisable par PJ et PNJ
- **4 paquets virtuels** (Cœur/Rémission, Trèfle/Union, Carreau/Projection,
  Pique/Souveraineté), reconstruits et mélangés automatiquement selon le
  Rang du personnage : cartes 2 à Valet dès le Rang 1, + Dame au Rang 3,
  + Roi au Rang 4, + As au Rang 5 (Archimage), conformément aux Dotations
  de Rang du Cartomancien. 2 paquets « favoris » reçoivent chacun 1 Joker.
- **Le bloc « Magie » apparaît sur toute Fiche (Personnage ou PNJ) possédant
  une Compétence Incantation** — donc utilisable aussi bien par un PJ
  Cartomancien que par un PNJ lanceur de sorts auquel le MJ ajoute
  simplement une Compétence « Incantation ».
- **Piocher une carte** (par Sphère) : la limite journalière (dizaine de la
  Valeur réelle d'Incantation) est vérifiée, la carte piochée s'affiche
  avec son Niveau de puissance dans le chat. Le joueur choisit alors le
  Sort correspondant directement dans le Codex IX (la liste complète des
  dizaines de Sorts n'est pas recopiée dans le système).
- **Lancer le Sort** : effectue le Test d'Incantation (même moteur que les
  Tests de Compétence), gère la Réussite critique (la carte retourne dans
  la pioche, paquet remélangé) et l'Échec/la Réussite normale (carte en
  Défausse).
- **Récupérer une carte de la Défausse**, en bouton libre (représente au
  choix du MJ/joueur : dépense de PI, d'argent, ou usage d'une Source de
  Magie — toutes des décisions narratives non automatisées).
- **Nouveau jour** : réinitialise le compteur de cartes piochées.

**Limites connues de la Phase 5** :
- Les Sorts eux-mêmes (dizaines d'entrées par Sphère, avec effets précis)
  ne sont pas encodés : le système gère le tirage et le Test, mais le
  choix et l'effet du Sort restent à consulter dans le livre et à
  appliquer manuellement (Dégâts, soins, etc. via les boutons existants du
  Codex VI si besoin).
- Les éléments de la Sphère d'Union (Feu/Eau/Terre/Glace/Foudre/Vent) et
  leurs combinaisons ne sont pas encore suivis sur la Fiche.
- Les Invocations (créatures magiques) ne sont pas gérées.

### Phase 6 — Liste complète des Sorts (Codex IX, p.212-220)
- **Les ~50 Sorts des 4 Sphères sont maintenant intégrés** (Cœur/Rémission,
  Trèfle/Union avec ses 6 éléments et leurs combinaisons, Carreau/
  Projection, Pique/Souveraineté), sous forme de résumés mécaniques
  reformulés (pas une recopie du livre).
- **Quand un joueur pioche une carte, le message de chat affiche
  directement la liste des Sorts disponibles pour ce Niveau de puissance**
  (Valet et As affichent en plus leur liste spéciale) : il n'est donc plus
  nécessaire d'avoir le livre ouvert à côté pour savoir quoi choisir.
- **Bouton « Sources de Magie »** : rappelle dans le chat les 3 types de
  Sources (Mineure/Majeure/Cataclysmique), la Capacité requise pour
  chacune, le Test à effectuer et ce qu'elles permettent de récupérer.

**Limite assumée** : les résumés sont mécaniques (Dégâts, durées, Tests,
conditions), pas le texte d'ambiance du livre — pour la narration exacte
de chaque Sort, gardez le Codex IX à portée de main. Si un Niveau de
puissance précis semble ambigu pour un Sort donné (quelques-uns étaient à
cheval sur deux colonnes dans le PDF), il est signalé dans le fichier
`module/data/sorts-de-magie.mjs`.

## Ce qui n'est pas encore fait

1. **Malus de blessure, Statuts et Points de vie critiques (Codex VI fin +
   VII)**.
2. **Coût en XP des Capacités de Rang 2+** (Codex II : Expérience).
3. **Alchimie (Codex X)**, **Vie sauvage / Compagnons (Codex XI)**,
   **Prouesse victorienne (Codex XIII)** — mêmes limites que précédemment
   pour l'Alchimiste, le Rôdeur et le Technodiacre.
4. **Santé mentale, Rouille, Mutations (Codex VII-VIII)**.
5. **Compendiums de contenu complets** : équipement, recettes, bestiaire
   (Codex V, XI, XVI).
6. **Icônes et habillage graphique** définitifs.

## Installer le prototype pour le tester

1. Repérez le dossier `Data/systems/` de votre installation Foundry.
2. Copiez tout ce dossier `legacy-of-the-crown` à l'intérieur de
   `Data/systems/` (le nom du dossier doit rester exactement
   `legacy-of-the-crown`).
3. Redémarrez/rechargez Foundry, créez un monde avec le système
   « Legacy of the Crown », créez un ou deux Acteurs de type « Personnage ».
   Les 8 Classes du livre apparaissent automatiquement dans le Répertoire
   d'objets du monde.
4. Réglez les Caractéristiques, donnez une Valeur brute à quelques
   Compétences (au minimum Initiative, Esquive, et une Compétence d'Attaque
   comme Corps-à-corps), équipez une arme.
5. Glissez une Classe (par exemple « Mercenaire », la plus simple pour
   tester) sur la Fiche du personnage, cliquez sur « Synchroniser la
   Classe » pour récupérer sa Compétence avancée et sa Capacité de Rang 1.
6. Ajoutez les deux Acteurs à un Combat (Traqueur de combat), cliquez sur
   « Lancer l'Initiative » pour tous, puis ciblez l'un des deux avec l'autre
   et cliquez sur l'icône d'attaque à côté de son arme.

## Prochaine étape

Dites-moi ce qui vous serait le plus utile maintenant : finir le Codex
VI-VII (Malus de blessure, Statuts, État critique), vérifier/compléter
avec vous les Rangs 3-5 des Classes qui se ramifient, ou avancer sur un des
sous-systèmes de Classe (Magie à cartes, Alchimie, Vie sauvage/Compagnons,
Prouesse victorienne).

