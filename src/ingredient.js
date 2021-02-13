// const ingredientsData = require('../data/ingredients');

class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.cost = ingredient.estimatedCostInCents;
    // this.ingredientsData = ingredientsData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
}
