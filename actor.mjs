/**
 * Extension de la classe Actor pour Legacy of the Crown.
 * Calcule les Caractéristiques dérivées (PV, Force de frappe, Vitesse, etc.)
 * à partir des Compétences, et gère les Tests de Compétence (jets de D100).
 */
import { SORTS_PAR_SPHERE } from "../data/sorts-de-magie.mjs";

export class LotcActor extends Actor {

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.type === "personnage" || this.type === "pnj") {
      this._calculerValeursReelles();
      this._calculerCaracteristiquesDerivees();
      if (this.type === "personnage") {
        this.system.niveauDeNotoriete = LotcActor.niveauDeNotorieteDepuisTotal(this.system.influence?.total ?? 0);
      }
    }
  }

  /**
   * Calcule la Valeur réelle de chaque Compétence possédée par l'acteur :
   * Valeur réelle = Valeur de la Caractéristique associée + Valeur brute.
   */
  _calculerValeursReelles() {
    const caracteristiques = this.system.caracteristiques;
    for (const item of this.items) {
      if (item.type !== "competence") continue;
      const car = caracteristiques[item.system.caracteristique];
      const valeurCar = car ? car.value : 0;
      item.system.valeurReelle = Math.min(100, valeurCar + item.system.valeurBrute);
    }
  }

  /**
   * Retrouve la Valeur réelle d'une Compétence de base à partir de sa clé
   * technique (voir competences-de-base.mjs). Renvoie 0 si l'acteur ne
   * possède pas cette Compétence.
   */
  _valeurReellePar(cle) {
    const item = this.items.find(i => i.type === "competence" && i.system.cle === cle);
    return item?.system.valeurReelle ?? 0;
  }

  /**
   * Applique les formules du Codex III (Créer son personnage) pour calculer
   * les Caractéristiques dérivées à partir des Compétences correspondantes.
   */
  _calculerCaracteristiquesDerivees() {
    const d = this.system.derivees;

    const vitalite = this._valeurReellePar("vitalite");
    const force = this._valeurReellePar("force");
    const resistance = this._valeurReellePar("resistance");
    const athletisme = this._valeurReellePar("athletisme");
    const vigueur = this._valeurReellePar("vigueur");
    const forceMentale = this._valeurReellePar("forceMentale");
    const resilienceEsoterique = this._valeurReellePar("resilienceEsoterique");

    // PV = 5 + 1 tous les 5 points de Vitalité
    d.pv.max = 5 + Math.floor(vitalite / 5);
    // Force de frappe = +2 tous les 25 points de Force
    d.forceDeFrappe.value = Math.floor(force / 25) * 2;
    // Résistance physique = +1 tous les 25 points de Résistance
    d.resistancePhysique.value = Math.floor(resistance / 25);
    // Vitesse = 6m + 1m tous les 5 points d'Athlétisme
    d.vitesse.value = 6 + Math.floor(athletisme / 5);
    // Encombrement max = +1 tous les 5 points de Force
    d.encombrementMax.value = Math.floor(force / 5);
    // Endurance = +1 tous les 10 points de Vigueur
    d.endurance.max = Math.floor(vigueur / 10);
    // Jauge de Stress = +1 emplacement tous les 5 points de Force mentale
    d.stress.max = Math.floor(forceMentale / 5);
    // Jauge de Contamination = +1 emplacement tous les 5 points de Résilience ésotérique
    d.contamination.max = Math.floor(resilienceEsoterique / 5);

    // On ne laisse jamais les valeurs actuelles dépasser leur maximum
    d.pv.value = Math.min(d.pv.value ?? d.pv.max, d.pv.max);
    d.endurance.value = Math.min(d.endurance.value ?? d.endurance.max, d.endurance.max);
    d.stress.value = Math.min(d.stress.value ?? 0, d.stress.max);
    d.contamination.value = Math.min(d.contamination.value ?? 0, d.contamination.max);
  }

  /**
   * Effectue un Test de Compétence (Codex II, p.30) :
   * - Jette 1D100.
   * - Compare le résultat à la Difficulté (Valeur réelle + Modificateurs).
   * - Calcule les Degrés de réussite et détecte les Critiques.
   * Affiche le résultat dans le chat.
   *
   * @param {Item} competence  L'Item de type "competence" à tester.
   * @param {number} modificateur  Bonus (positif) ou Malus (négatif) manuel.
   */
  async testerCompetence(competence, modificateur = 0) {
    const difficulte = Math.max(0, Math.min(100, competence.system.valeurReelle + modificateur));

    const jet = new Roll("1d100");
    await jet.evaluate();
    const resultat = jet.total;

    const reussite = resultat <= difficulte;
    // "00" (traité comme 100) et les autres chiffres doubles sont des Critiques
    const estCritique = (resultat % 11 === 0);

    const dizaineDifficulte = Math.floor(difficulte / 10);
    const dizaineResultat = Math.floor(resultat / 10);
    const degresReussite = dizaineDifficulte - dizaineResultat;

    let issue;
    if (reussite && estCritique) issue = "Réussite critique";
    else if (reussite) issue = "Réussite";
    else if (estCritique) issue = "Échec critique";
    else issue = "Échec";

    const contenu = `
      <div class="lotc-jet">
        <h3>${competence.name}</h3>
        <p><strong>Difficulté :</strong> ${difficulte}${modificateur ? ` (Valeur réelle ${competence.system.valeurReelle} ${modificateur > 0 ? "+" : ""}${modificateur})` : ""}</p>
        <p><strong>Résultat du D100 :</strong> ${resultat}</p>
        <p class="lotc-issue lotc-issue--${reussite ? "reussite" : "echec"}"><strong>${issue}</strong>${reussite ? ` (${degresReussite} Degré${Math.abs(degresReussite) > 1 ? "s" : ""} de réussite)` : ""}</p>
      </div>
    `;

    await jet.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: contenu
    });

    return { reussite, estCritique, degresReussite, resultat, difficulte };
  }

  // ---------------------------------------------------------------------
  // CODEX VI : CONFRONTATIONS
  // ---------------------------------------------------------------------

  /**
   * Tableau des Localisations (Codex VI, p.163). Renvoie le nom de la
   * partie du corps touchée pour un résultat de 1D100 donné.
   */
  static localisationDepuisD100(resultat) {
    if (resultat <= 10) return "Tête";
    if (resultat <= 25) return "Bras droit";
    if (resultat <= 40) return "Bras gauche";
    if (resultat <= 70) return "Torse";
    if (resultat <= 85) return "Jambe droite";
    return "Jambe gauche";
  }

  /**
   * Effectue un Test opposé (Codex II, p.33) entre cet acteur et une cible,
   * chacun utilisant l'une de ses Compétences. Le vainqueur est celui qui
   * obtient le plus de Degrés de réussite ; en cas d'égalité de DR, celui
   * dont le résultat aux dés est le plus proche de 1 ; en cas de nouvelle
   * égalité, celui dont la Valeur de Compétence est la plus haute.
   *
   * @returns {object} { gagnant: "attaquant"|"defenseur", attaquant:{...}, defenseur:{...} }
   */
  async testerOppose(competenceAttaquant, cible, competenceDefenseur) {
    const jetA = new Roll("1d100");
    await jetA.evaluate();
    const resultatA = jetA.total;
    const difficulteA = competenceAttaquant.system.valeurReelle;
    const drA = Math.floor(difficulteA / 10) - Math.floor(resultatA / 10);
    const critiqueA = (resultatA % 11 === 0);

    const jetD = new Roll("1d100");
    await jetD.evaluate();
    const resultatD = jetD.total;
    const difficulteD = competenceDefenseur.system.valeurReelle;
    const drD = Math.floor(difficulteD / 10) - Math.floor(resultatD / 10);
    const critiqueD = (resultatD % 11 === 0);

    let gagnant;
    if (drA !== drD) gagnant = drA > drD ? "attaquant" : "defenseur";
    else if (resultatA !== resultatD) gagnant = resultatA < resultatD ? "attaquant" : "defenseur";
    else gagnant = difficulteA >= difficulteD ? "attaquant" : "defenseur";

    return {
      gagnant,
      attaquant: { competence: competenceAttaquant, resultat: resultatA, difficulte: difficulteA, dr: drA, critique: critiqueA, reussite: resultatA <= difficulteA },
      defenseur: { competence: competenceDefenseur, resultat: resultatD, difficulte: difficulteD, dr: drD, critique: critiqueD, reussite: resultatD <= difficulteD }
    };
  }

  /**
   * Résout une Attaque complète contre une cible (Codex VI, p.162-166) :
   * Test d'Attaque opposé au Test de Parade/Esquive de la cible, calcul des
   * Dégâts, application de la Résistance physique, et mise à jour des PV
   * de la cible. Poste un compte-rendu détaillé dans le chat.
   *
   * @param {Item} arme  L'Item de type "arme" utilisé pour l'Attaque.
   * @param {LotcActor} cible  L'acteur visé.
   * @param {string} [competenceDefenseCle="esquive"]  Compétence utilisée
   *   par la cible pour se défendre. Utilisez "corpsACorps" ou "pugilat"
   *   pour une Parade, si la cible manie une arme adaptée.
   */
  async attaquerAvec(arme, cible, competenceDefenseCle = "esquive") {
    if (!cible) {
      ui.notifications.warn("Sélectionnez d'abord une cible (touche T) avant d'attaquer.");
      return;
    }

    const cleCompetence = arme.system.competenceAssociee || "corpsACorps";
    const competenceAttaque = this.items.find(i => i.type === "competence" && i.system.cle === cleCompetence);
    const competenceDefense = cible.items.find(i => i.type === "competence" && i.system.cle === competenceDefenseCle);

    if (!competenceAttaque || !competenceDefense) {
      ui.notifications.error("Compétence d'Attaque ou de Défense introuvable sur l'une des Fiches de personnage.");
      return;
    }

    const oppose = await this.testerOppose(competenceAttaque, cible, competenceDefense);

    let contenu = `
      <div class="lotc-jet lotc-attaque">
        <h3>${this.name} attaque ${cible.name} (${arme.name})</h3>
        <p><strong>Test d'Attaque (${competenceAttaque.name})</strong> : ${oppose.attaquant.resultat} / ${oppose.attaquant.difficulte} → ${oppose.attaquant.dr} DR${oppose.attaquant.critique ? " (Critique !)" : ""}</p>
        <p><strong>Réaction défensive (${competenceDefense.name})</strong> : ${oppose.defenseur.resultat} / ${oppose.defenseur.difficulte} → ${oppose.defenseur.dr} DR${oppose.defenseur.critique ? " (Critique !)" : ""}</p>
    `;

    if (oppose.gagnant === "defenseur") {
      contenu += `<p class="lotc-issue lotc-issue--reussite"><strong>${cible.name} évite l'Attaque !</strong></p></div>`;
    } else {
      const attaqueCritique = oppose.attaquant.critique && oppose.attaquant.reussite;

      const jetDegats = new Roll(arme.system.degats || "1d4");
      await jetDegats.evaluate();

      const estMelee = ["corpsACorps", "pugilat"].includes(cleCompetence);
      const bonusFF = estMelee ? (this.system.derivees.forceDeFrappe.value ?? 0) : 0;
      const bonusDR = Math.max(oppose.attaquant.dr, 0);

      let degats = jetDegats.total + bonusFF + bonusDR;
      degats -= (cible.system.derivees.resistancePhysique.value ?? 0);
      degats = Math.max(0, degats);

      const jetLocalisation = new Roll("1d100");
      await jetLocalisation.evaluate();
      const localisation = LotcActor.localisationDepuisD100(jetLocalisation.total);

      contenu += `
        <p><strong>${attaqueCritique ? "Attaque critique !" : "Attaque réussie."}</strong></p>
        <p>Dégâts de l'arme (${arme.system.degats}) : ${jetDegats.total}${bonusFF ? ` + ${bonusFF} (Force de frappe)` : ""}${bonusDR ? ` + ${bonusDR} (Degrés de réussite)` : ""} − ${cible.system.derivees.resistancePhysique.value ?? 0} (Résistance physique de la cible)</p>
        <p><strong>Localisation :</strong> ${localisation} (1D100 : ${jetLocalisation.total})</p>
        <p class="lotc-issue lotc-issue--echec"><strong>${degats} Dégâts infligés à ${cible.name}.</strong></p>
      `;

      if (degats > 0) {
        const nouveauxPV = Math.max(-5, (cible.system.derivees.pv.value ?? cible.system.derivees.pv.max) - degats);
        await cible.update({ "system.derivees.pv.value": nouveauxPV });
        if (nouveauxPV <= 0) {
          contenu += `<p class="lotc-issue lotc-issue--echec"><strong>${cible.name} entre en État critique !</strong> (voir Codex VII : Gérer sa santé)</p>`;
        }
      }
      contenu += `</div>`;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: contenu
    });
  }

  // ---------------------------------------------------------------------
  // CODEX IV : LES CLASSES
  // ---------------------------------------------------------------------

  /**
   * Tableau des Niveaux de notoriété (Codex IV, p.63), en fonction du
   * total de Points d'Influence (PI) accumulés depuis la Création du
   * personnage (ce total ne diminue jamais, même quand des PI sont
   * dépensés depuis la réserve disponible).
   */
  static NIVEAU_DE_NOTORIETE = [
    { seuil: 500, nom: "Légendaire" },
    { seuil: 300, nom: "Mythique" },
    { seuil: 150, nom: "Célèbre" },
    { seuil: 50, nom: "Connu" },
    { seuil: 10, nom: "Notable" },
    { seuil: 0, nom: "Inconnu" }
  ];

  static niveauDeNotorieteDepuisTotal(total) {
    return LotcActor.NIVEAU_DE_NOTORIETE.find(n => total >= n.seuil)?.nom ?? "Inconnu";
  }

  /**
   * Ajoute des Points d'Influence au personnage : augmente à la fois le
   * total (qui détermine le Niveau de notoriété et ne baisse jamais) et la
   * réserve disponible (qui peut être dépensée pour de l'Équipement de
   * Classe). Utilisez un montant négatif pour dépenser de la réserve
   * disponible sans toucher au total (ex : achat d'Équipement de Classe).
   */
  async ajusterInfluence({ total = 0, disponible = total } = {}) {
    const inf = this.system.influence;
    await this.update({
      "system.influence.total": Math.max(0, (inf.total ?? 0) + total),
      "system.influence.disponible": Math.max(0, (inf.disponible ?? 0) + disponible)
    });
  }

  /** Convertit un code court (phy/con/agi/int/cha/vol) en clé de Caractéristique. */
  static #CARACTERISTIQUE_DEPUIS_CODE = {
    phy: "physique", con: "constitution", agi: "agilite",
    int: "intelligence", cha: "charisme", vol: "volonte"
  };

  /**
   * Analyse le texte "Nom | code | valeur" (une entrée par ligne) d'un
   * champ Compétences avancées d'un Rang de Classe.
   */
  static #analyserCompetencesAvancees(texte) {
    return (texte || "").split("\n").map(l => l.trim()).filter(Boolean).map(ligne => {
      const [nom, code, valeur] = ligne.split("|").map(s => s.trim());
      return {
        nom,
        caracteristique: LotcActor.#CARACTERISTIQUE_DEPUIS_CODE[code?.toLowerCase()] || "intelligence",
        valeurBrute: Number(valeur) || 0
      };
    });
  }

  /**
   * Analyse le texte "Nom | passive/active | Description" (une entrée par
   * ligne) d'un champ Capacités d'un Rang de Classe.
   */
  static #analyserCapacites(texte) {
    return (texte || "").split("\n").map(l => l.trim()).filter(Boolean).map(ligne => {
      const [nom, type, ...reste] = ligne.split("|").map(s => s.trim());
      return { nom, type: (type || "passive").toLowerCase(), description: reste.join(" | ") };
    });
  }

  /**
   * Octroie au personnage les Compétences avancées et Capacités de tous les
   * Rangs de sa Classe jusqu'à son Rang actuel (inclus), conformément au
   * Codex IV (p.63) : elles sont toutes acquises automatiquement, sans
   * coût en XP, quel que soit le Rang.
   *
   * N'ajoute que ce qui manque encore sur la Fiche (ne duplique jamais une
   * Compétence ou une Capacité déjà présente, reconnue par son nom).
   */
  async synchroniserClasse() {
    const classe = this.items.find(i => i.type === "classe");
    if (!classe) {
      ui.notifications.warn("Ce personnage n'a pas encore de Classe. Glissez un Item de type Classe sur sa Fiche.");
      return;
    }

    const rangActuel = this.system.rang || 1;
    const aCreer = [];

    for (const rang of classe.system.rangs) {
      if (rang.rang > rangActuel) continue;

      for (const c of LotcActor.#analyserCompetencesAvancees(rang.competencesAvancees)) {
        if (!c.nom) continue;
        const existe = this.items.some(i => i.type === "competence" && i.name === c.nom);
        if (!existe) aCreer.push({ name: c.nom, type: "competence", system: { caracteristique: c.caracteristique, valeurBrute: c.valeurBrute, estDeBase: false } });
      }

      for (const c of LotcActor.#analyserCapacites(rang.capacites)) {
        if (!c.nom) continue;
        const existe = this.items.some(i => i.type === "capacite" && i.name === c.nom);
        if (!existe) aCreer.push({ name: c.nom, type: "capacite", system: { type: c.type, rang: rang.rang, description: c.description } });
      }
    }

    if (aCreer.length === 0) {
      ui.notifications.info("Rien de nouveau à ajouter : la Fiche est déjà à jour pour ce Rang.");
      return;
    }

    await this.createEmbeddedDocuments("Item", aCreer);
    ui.notifications.info(`${aCreer.length} élément(s) de Classe ajouté(s) à la Fiche (Rang ${rangActuel}).`);
  }

  // ---------------------------------------------------------------------
  // CODEX IX : MAÎTRISER LA MAGIE (Cartomancien — et PNJ lanceurs de sorts)
  // ---------------------------------------------------------------------

  static SPHERES_DE_MAGIE = {
    coeur: "Cœur : Sphère de Rémission",
    trefle: "Trèfle : Sphère d'Union",
    carreau: "Carreau : Sphère de Projection",
    pique: "Pique : Sphère de Souveraineté"
  };

  /** Niveau de puissance (1 à 4) d'une valeur de carte (2-10, valet, dame, roi, as, joker). */
  static niveauDePuissance(valeur) {
    if (["dame", "roi", "as"].includes(valeur)) return 4;
    if (["10", "valet"].includes(valeur)) return 3;
    if (["7", "8", "9"].includes(valeur)) return 2;
    if (["joker"].includes(valeur)) return "spécial (n'importe quel Sort de la Sphère, sauf As)";
    return 1;
  }

  /**
   * (Re)construit les 4 paquets de Cartomancien à partir du Rang du
   * personnage (Codex IX, p.208-209 + dotations de Rang du Codex IV) :
   * - Base (tous Rangs) : 2 à Valet dans chaque Sphère.
   * - Rang 3+ : la Dame est ajoutée à toutes les Sphères.
   * - Rang 4+ : le Roi est ajouté à toutes les Sphères.
   * - Rang 5 (Archimage) : l'As est ajouté à toutes les Sphères.
   * - 2 paquets "favoris" (au choix) reçoivent chacun 1 Joker.
   * Mélange chaque paquet obtenu et vide toutes les Défausses.
   */
  async initialiserPaquetsDeMagie(rangCartomancien = this.system.rang || 1) {
    const valeursBase = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "valet"];
    if (rangCartomancien >= 3) valeursBase.push("dame");
    if (rangCartomancien >= 4) valeursBase.push("roi");
    if (rangCartomancien >= 5) valeursBase.push("as");

    const favoris = this.system.magie?.paquetsFavoris ?? ["coeur", "trefle"];
    const paquets = {};
    for (const sphere of Object.keys(LotcActor.SPHERES_DE_MAGIE)) {
      const cartes = [...valeursBase];
      if (favoris.includes(sphere)) cartes.push("joker");
      paquets[sphere] = { pioche: LotcActor.#melanger(cartes), defausse: [] };
    }

    await this.update({ "system.magie.paquets": paquets, "system.magie.carteEnMain": null });
    ui.notifications.info("Paquets de Cartomancien initialisés et mélangés.");
  }

  static #melanger(tableau) {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
  }

  /** Retrouve la Compétence Incantation du personnage (par clé technique ou, à défaut, par nom). */
  _competenceIncantation() {
    return this.items.find(i => i.type === "competence" && (i.system.cle === "incantation" || i.name === "Incantation"));
  }

  /**
   * Pioche la première carte du paquet d'une Sphère (Action gratuite,
   * Codex IX p.210). La carte piochée est placée dans carteEnMain, en
   * attente d'être lancée ou défaussée.
   */
  async piocherCarte(sphere) {
    const paquet = this.system.magie?.paquets?.[sphere];
    if (!paquet) return;

    if (paquet.pioche.length === 0) {
      ui.notifications.warn(`Le paquet ${LotcActor.SPHERES_DE_MAGIE[sphere]} est épuisé. Récupérez des cartes de la Défausse, ou remélangez-le.`);
      return;
    }

    const incantation = this._competenceIncantation();
    const limiteJournaliere = Math.floor((incantation?.system.valeurReelle ?? 0) / 10);
    const dejaTirees = this.system.magie?.cartesTireesAujourdhui ?? 0;
    if (limiteJournaliere > 0 && dejaTirees >= limiteJournaliere) {
      ui.notifications.warn(`${this.name} a déjà pioché ${dejaTirees} carte(s) aujourd'hui, la limite (dizaine d'Incantation) est de ${limiteJournaliere}. Un nouveau jour doit commencer pour repiocher (bouton "Nouveau jour").`);
      return;
    }

    const nouvellePioche = [...paquet.pioche];
    const carte = nouvellePioche.shift();

    await this.update({
      [`system.magie.paquets.${sphere}.pioche`]: nouvellePioche,
      "system.magie.carteEnMain": { sphere, valeur: carte },
      "system.magie.cartesTireesAujourdhui": dejaTirees + 1
    });

    const niveau = LotcActor.niveauDePuissance(carte);
    const listeSorts = LotcActor.#listeSortsPour(sphere, carte, niveau);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="lotc-jet"><h3>${this.name} pioche une carte (${LotcActor.SPHERES_DE_MAGIE[sphere]})</h3><p><strong>Carte :</strong> ${carte.toUpperCase()} — Niveau de puissance ${niveau}</p>${listeSorts}<p>Choisissez un Sort dans la liste ci-dessus, puis cliquez sur « Lancer le Sort » ou « Ne pas lancer ».</p></div>`
    });
  }

  /** Construit la liste HTML des Sorts disponibles pour la carte piochée (Valet et As ajoutent leur liste spéciale à celle du Niveau normal). */
  static #listeSortsPour(sphere, carte, niveau) {
    const donnees = SORTS_PAR_SPHERE[sphere];
    if (!donnees?.niveaux) return "";

    let sorts = [...(donnees.niveaux[niveau] ?? [])];
    if (carte === "valet") sorts = sorts.concat(donnees.niveaux.valet ?? []);
    if (carte === "as") sorts = sorts.concat(donnees.niveaux.as ?? []);

    if (sorts.length === 0) return "<p><em>Consultez le Codex IX pour la liste des Sorts de ce Niveau.</em></p>";
    return `<ul>${sorts.map(s => `<li>${s}</li>`).join("")}</ul>`;
  }

  /**
   * Lance le Sort correspondant à la carte actuellement en main : Test
   * d'Incantation (Codex IX, p.210). En cas de Réussite critique, la carte
   * retourne dans la pioche (paquet remélangé) ; sinon elle va en Défausse.
   */
  async lancerSort(modificateur = 0) {
    const carteEnMain = this.system.magie?.carteEnMain;
    if (!carteEnMain) {
      ui.notifications.warn("Aucune carte en main. Piochez d'abord une carte.");
      return;
    }
    const incantation = this._competenceIncantation();
    if (!incantation) {
      ui.notifications.error("Ce personnage n'a pas de Compétence Incantation.");
      return;
    }

    const resultat = await this.testerCompetence(incantation, modificateur);
    const { sphere, valeur } = carteEnMain;

    if (resultat.reussite && resultat.estCritique) {
      const paquet = this.system.magie.paquets[sphere];
      const nouvellePioche = LotcActor.#melanger([...paquet.pioche, valeur]);
      await this.update({
        [`system.magie.paquets.${sphere}.pioche`]: nouvellePioche,
        "system.magie.carteEnMain": null
      });
      ui.notifications.info("Réussite critique : la carte retourne dans la pioche (paquet remélangé).");
    } else {
      const paquet = this.system.magie.paquets[sphere];
      await this.update({
        [`system.magie.paquets.${sphere}.defausse`]: [...paquet.defausse, valeur],
        "system.magie.carteEnMain": null
      });
    }

    return resultat;
  }

  /** Défausse la carte en main sans lancer de Sort (Codex IX, p.210). */
  async defausserCarte() {
    const carteEnMain = this.system.magie?.carteEnMain;
    if (!carteEnMain) return;
    const { sphere, valeur } = carteEnMain;
    const paquet = this.system.magie.paquets[sphere];
    await this.update({
      [`system.magie.paquets.${sphere}.defausse`]: [...paquet.defausse, valeur],
      "system.magie.carteEnMain": null
    });
  }

  /**
   * Récupère 1 carte de la Défausse d'une Sphère vers sa pioche (méthode
   * laissée au choix du MJ/joueur : PI, argent, Source de Magie — Codex
   * IX, p.211). Remélange la pioche après ajout.
   */
  async recupererCarteDefausse(sphere) {
    const paquet = this.system.magie?.paquets?.[sphere];
    if (!paquet || paquet.defausse.length === 0) {
      ui.notifications.warn("Aucune carte à récupérer dans cette Défausse.");
      return;
    }
    const nouvelleDefausse = [...paquet.defausse];
    const carte = nouvelleDefausse.pop();
    const nouvellePioche = LotcActor.#melanger([...paquet.pioche, carte]);
    await this.update({
      [`system.magie.paquets.${sphere}.pioche`]: nouvellePioche,
      [`system.magie.paquets.${sphere}.defausse`]: nouvelleDefausse
    });
  }

  /** Réinitialise le compteur de cartes piochées (à utiliser au début d'une nouvelle journée/session). */
  async nouveauJourDeMagie() {
    await this.update({ "system.magie.cartesTireesAujourdhui": 0 });
  }

  /** Poste dans le chat le tableau de référence des Sources de Magie (Codex IX, p.220). */
  static async afficherSourcesDeMagie() {
    const { SOURCES_DE_MAGIE } = await import("../data/sorts-de-magie.mjs");
    const lignes = SOURCES_DE_MAGIE.map(s => `<li><strong>${s.nom}</strong> (nécessite la Capacité ${s.capaciteRequise}) — ${s.test} : récupère ${s.recompense}.</li>`).join("");
    await ChatMessage.create({ content: `<div class="lotc-jet"><h3>Sources de Magie</h3><ul>${lignes}</ul></div>` });
  }
}

