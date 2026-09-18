import { LotcActor } from "./documents/actor.mjs";
import { LotcItem } from "./documents/item.mjs";
import { LotcCombat } from "./documents/combat.mjs";
import { LotcActorSheet } from "./sheets/actor-sheet.mjs";
import { LotcItemSheet } from "./sheets/item-sheet.mjs";
import { COMPETENCES_DE_BASE } from "./data/competences-de-base.mjs";
import { CLASSES_DE_BASE } from "./data/classes-de-base.mjs";
import { SORTS_PAR_SPHERE, SOURCES_DE_MAGIE } from "./data/sorts-de-magie.mjs";

Hooks.once("init", () => {
  console.log("Legacy of the Crown | Initialisation du système");

  game.lotc = { COMPETENCES_DE_BASE };

  Handlebars.registerHelper("eq", (a, b) => a === b);

  CONFIG.Actor.documentClass = LotcActor;
  CONFIG.Item.documentClass = LotcItem;
  CONFIG.Combat.documentClass = LotcCombat;

  // Les anciennes feuilles (Application V1) sont retirées au profit des
  // nôtres, construites avec l'API moderne ActorSheetV2 / ItemSheetV2.
  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("legacy-of-the-crown", LotcActorSheet, {
    types: ["personnage", "pnj"],
    makeDefault: true,
    label: "LOTC.Feuille.Personnage"
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("legacy-of-the-crown", LotcItemSheet, {
    types: ["competence", "equipement", "arme", "capacite", "maitrise", "classe"],
    makeDefault: true,
    label: "LOTC.Feuille.Objet"
  });
});

/**
 * Quand un nouveau Personnage Joueur est créé sans aucune Compétence,
 * on lui attribue automatiquement les 27 Compétences de base du Codex II
 * (Valeur brute à 0, prête à être développée pendant la Création de
 * personnage).
 */
Hooks.on("createActor", async (actor) => {
  if (actor.type !== "personnage") return;
  if (actor.items.size > 0) return;

  const items = COMPETENCES_DE_BASE.map(c => ({
    name: c.nom,
    type: "competence",
    system: {
      cle: c.cle,
      caracteristique: c.caracteristique,
      valeurBrute: 0,
      estDeBase: true
    }
  }));
  await actor.createEmbeddedDocuments("Item", items);
});

/**
 * Crée automatiquement, une seule fois, les Classes d'exemple fournies
 * avec le système (voir module/data/classes-de-base.mjs) dans le
 * Répertoire d'objets du monde, prêtes à être glissées sur une Fiche de
 * personnage.
 */
Hooks.once("ready", async () => {
  if (!game.user.isGM) return;
  for (const c of CLASSES_DE_BASE) {
    const existe = game.items.find(i => i.type === "classe" && i.name === c.nom);
    if (existe) continue;
    await Item.create({ name: c.nom, type: "classe", system: { resume: c.resume, rangs: c.rangs } });
    console.log(`Legacy of the Crown | Classe d'exemple créée : ${c.nom}`);
  }
});
