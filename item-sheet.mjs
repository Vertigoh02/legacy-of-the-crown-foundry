const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

export class LotcItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["legacy-of-the-crown", "sheet", "item"],
    position: { width: 480, height: "auto" },
    form: { submitOnChange: true }
  };

  static PARTS = {
    feuille: { template: "systems/legacy-of-the-crown/templates/item/item-sheet.hbs" }
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.systeme = this.item.system;
    context.caracteristiques = {
      physique: "Physique",
      constitution: "Constitution",
      agilite: "Agilité",
      intelligence: "Intelligence",
      charisme: "Charisme",
      volonte: "Volonté"
    };
    return context;
  }
}
