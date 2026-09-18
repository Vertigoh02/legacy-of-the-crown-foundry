export class LotcItem extends Item {
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.type === "competence" && this.system.valeurReelle === undefined) {
      // Valeur par défaut avant le premier calcul par l'Actor parent
      this.system.valeurReelle = this.system.valeurBrute ?? 0;
    }
  }
}
