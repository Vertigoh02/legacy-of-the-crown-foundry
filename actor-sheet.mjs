const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class LotcActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["legacy-of-the-crown", "sheet", "actor"],
    position: { width: 720, height: 820 },
    window: { resizable: true },
    actions: {
      rouleCompetence: LotcActorSheet.#surRoulerCompetence,
      creerObjet: LotcActorSheet.#surCreerObjet,
      modifierObjet: LotcActorSheet.#surModifierObjet,
      supprimerObjet: LotcActorSheet.#surSupprimerObjet,
      equiperObjet: LotcActorSheet.#surEquiperObjet,
      attaquer: LotcActorSheet.#surAttaquer,
      synchroniserClasse: LotcActorSheet.#surSynchroniserClasse,
      ajusterInfluence: LotcActorSheet.#surAjusterInfluence,
      initialiserMagie: LotcActorSheet.#surInitialiserMagie,
      piocherCarte: LotcActorSheet.#surPiocherCarte,
      lancerSort: LotcActorSheet.#surLancerSort,
      defausserCarte: LotcActorSheet.#surDefausserCarte,
      recupererCarte: LotcActorSheet.#surRecupererCarte,
      nouveauJourMagie: LotcActorSheet.#surNouveauJourMagie,
      sourcesDeMagie: LotcActorSheet.#surSourcesDeMagie
    },
    form: {
      submitOnChange: true
    }
  };

  static PARTS = {
    feuille: { template: "systems/legacy-of-the-crown/templates/actor/character-sheet.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.systeme = this.actor.system;
    context.items = this.actor.items;

    // Regroupe les Compétences par Caractéristique pour l'affichage
    const parCaracteristique = {};
    for (const item of this.actor.items) {
      if (item.type !== "competence") continue;
      const car = item.system.caracteristique;
      parCaracteristique[car] ??= [];
      parCaracteristique[car].push(item);
    }
    for (const liste of Object.values(parCaracteristique)) {
      liste.sort((a, b) => a.name.localeCompare(b.name));
    }
    context.competencesParCaracteristique = parCaracteristique;

    context.armes = this.actor.items.filter(i => i.type === "arme");
    context.equipements = this.actor.items.filter(i => i.type === "equipement");
    context.capacites = this.actor.items.filter(i => i.type === "capacite");
    context.maitrises = this.actor.items.filter(i => i.type === "maitrise");
    context.classe = this.actor.items.find(i => i.type === "classe");
    context.pratiqueLaMagie = this.actor.items.some(i => i.type === "competence" && (i.system.cle === "incantation" || i.name === "Incantation"));
    context.spheres = { coeur: "Cœur", trefle: "Trèfle", carreau: "Carreau", pique: "Pique" };
    context.compteurMagie = {};
    for (const cle of Object.keys(context.spheres)) {
      const paquet = this.actor.system.magie?.paquets?.[cle] ?? { pioche: [], defausse: [] };
      context.compteurMagie[cle] = { pioche: paquet.pioche.length, defausse: paquet.defausse.length };
    }

    return context;
  }

  static async #surRoulerCompetence(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const competence = this.actor.items.get(itemId);
    if (!competence) return;
    this.actor.testerCompetence(competence);
  }

  static async #surCreerObjet(event, target) {
    const type = target.dataset.type;
    const noms = {
      competence: "Nouvelle Compétence",
      arme: "Nouvelle arme",
      equipement: "Nouvel équipement",
      capacite: "Nouvelle Capacité",
      maitrise: "Nouvelle Maîtrise",
      classe: "Nouvelle Classe"
    };
    await this.actor.createEmbeddedDocuments("Item", [{ name: noms[type] ?? "Nouvel objet", type }]);
  }

  static async #surModifierObjet(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    this.actor.items.get(itemId)?.sheet.render(true);
  }

  static async #surSupprimerObjet(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const confirme = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Supprimer" },
      content: `<p>Supprimer <strong>${item.name}</strong> de la Fiche de personnage ?</p>`
    });
    if (confirme) item.delete();
  }

  static async #surEquiperObjet(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const champ = item.type === "arme" ? "equipee" : "equipe";
    await item.update({ [`system.${champ}`]: !item.system[champ] });
  }

  /**
   * Attaque la cible actuellement ciblée (touche T sur son Token) avec
   * l'arme sur laquelle le joueur a cliqué. Demande quelle Compétence de
   * défense utiliser si la cible dispose de plusieurs options.
   */
  static async #surAttaquer(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const arme = this.actor.items.get(itemId);
    if (!arme) return;

    const cibleToken = game.user.targets.first();
    const cible = cibleToken?.actor;
    if (!cible) {
      ui.notifications.warn("Ciblez d'abord un adversaire (touche T) avant d'attaquer.");
      return;
    }

    const estMelee = ["corpsACorps", "pugilat"].includes(arme.system.competenceAssociee);
    let competenceDefenseCle = "esquive";

    if (estMelee) {
      const options = [
        { cle: "esquive", label: "Esquive" },
        { cle: "corpsACorps", label: "Parade (Corps-à-corps)" },
        { cle: "pugilat", label: "Parade (Pugilat)" }
      ].filter(o => cible.items.some(i => i.type === "competence" && i.system.cle === o.cle));

      if (options.length > 1) {
        const champSelect = options.map(o => `<option value="${o.cle}">${o.label}</option>`).join("");
        competenceDefenseCle = await foundry.applications.api.DialogV2.prompt({
          window: { title: `Défense de ${cible.name}` },
          content: `<p>Quelle Réaction défensive ${cible.name} utilise-t-il/elle ?</p><select name="defense">${champSelect}</select>`,
          ok: {
            label: "Confirmer",
            callback: (event, button) => button.form.elements.defense.value
          }
        });
      }
    }

    this.actor.attaquerAvec(arme, cible, competenceDefenseCle);
  }

  static async #surSynchroniserClasse() {
    this.actor.synchroniserClasse();
  }

  /**
   * Ouvre une boîte de dialogue pour ajouter (ou retirer) des Points
   * d'Influence. "Gagner de l'Influence" augmente le total ET la réserve
   * disponible ; "Dépenser de la réserve" ne touche qu'à la réserve
   * disponible (le Niveau de notoriété du personnage n'en est pas affecté).
   */
  static async #surAjusterInfluence() {
    const resultat = await foundry.applications.api.DialogV2.prompt({
      window: { title: "Points d'Influence" },
      content: `
        <p>Combien de PI le personnage gagne-t-il (positif) ou dépense-t-il de sa réserve disponible (négatif) ?</p>
        <div class="form-group">
          <label><input type="radio" name="mode" value="gagner" checked> Gagner de l'Influence (augmente le total et la réserve)</label>
          <label><input type="radio" name="mode" value="depenser"> Dépenser de la réserve (achat d'Équipement de Classe, n'affecte pas le total)</label>
        </div>
        <input type="number" name="montant" value="0" style="width:100%">
      `,
      ok: {
        label: "Valider",
        callback: (event, button) => ({
          mode: button.form.elements.mode.value,
          montant: Number(button.form.elements.montant.value) || 0
        })
      }
    });
    if (!resultat) return;

    if (resultat.mode === "gagner") {
      await this.actor.ajusterInfluence({ total: resultat.montant, disponible: resultat.montant });
    } else {
      await this.actor.ajusterInfluence({ total: 0, disponible: -Math.abs(resultat.montant) });
    }
  }

  static async #surInitialiserMagie() {
    this.actor.initialiserPaquetsDeMagie();
  }

  static async #surPiocherCarte(event, target) {
    this.actor.piocherCarte(target.dataset.sphere);
  }

  static async #surLancerSort() {
    this.actor.lancerSort();
  }

  static async #surDefausserCarte() {
    this.actor.defausserCarte();
  }

  static async #surRecupererCarte(event, target) {
    this.actor.recupererCarteDefausse(target.dataset.sphere);
  }

  static async #surNouveauJourMagie() {
    this.actor.nouveauJourDeMagie();
  }

  static async #surSourcesDeMagie() {
    this.actor.constructor.afficherSourcesDeMagie();
  }
}
