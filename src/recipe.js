const Ingredient = require('./src/ingredient');

class Recipe {
  construcor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.pic = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  findIngredientName() {

  }

  findIngredientCost() {

  }

  listCookingInstructions() {

  }
}


if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
