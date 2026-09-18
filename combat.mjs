/**
 * Ordre de passage (Codex VI, p.159) :
 * - Chaque participant effectue un Test d'Initiative.
 * - Le classement se fait par Degrés de réussite décroissants.
 * - En cas d'égalité de DR : priorité à la plus haute Valeur d'Initiative,
 *   puis, en cas de nouvelle égalité, au PJ plutôt qu'au PNJ.
 *
 * Pour que Foundry (qui trie simplement par valeur décroissante) respecte
 * cet ordre, on encode le DR et la Valeur réelle dans un seul nombre :
 * initiative = DR * 1000 + ValeurRéelle (+ 0.1 pour avantager un PJ en cas
 * d'égalité totale). Le DR et le résultat brut restent affichés dans le
 * chat pour que la table puisse vérifier le calcul.
 */
export class LotcCombat extends Combat {

  /** @override */
  async rollInitiative(ids, options = {}) {
    ids = typeof ids === "string" ? [ids] : ids;

    for (const id of ids) {
      const combattant = this.combatants.get(id);
      const acteur = combattant?.actor;
      if (!acteur) continue;

      const initiative = acteur.items.find(i => i.type === "competence" && i.system.cle === "initiative");
      const valeurReelle = initiative?.system.valeurReelle ?? 0;

      const jet = new Roll("1d100");
      await jet.evaluate();
      const resultat = jet.total;

      const reussite = resultat <= valeurReelle;
      const estCritique = (resultat % 11 === 0);
      const degresReussite = Math.floor(valeurReelle / 10) - Math.floor(resultat / 10);

      const bonusPJ = acteur.hasPlayerOwner ? 0.1 : 0;
      const initiativeEncodee = degresReussite * 1000 + valeurReelle + bonusPJ;

      let note = "";
      if (reussite && estCritique) note = " — Réussite critique : 1 Action bonus à utiliser sur une Manche au choix.";
      else if (!reussite && estCritique) note = " — Échec critique : seulement 1 Demi-action lors de son premier Tour.";

      await combattant.update({ initiative: initiativeEncodee });

      await jet.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: acteur }),
        flavor: `<strong>Test d'Initiative — ${acteur.name}</strong><br>Résultat : ${resultat} (Valeur ${valeurReelle}) → ${degresReussite} DR${note}`
      });
    }

    return this;
  }
}
