class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.cost = ingredient.cost;
  }

}


if (typeof module !== 'undefined') {
  module.exports = Ingredient;
}
