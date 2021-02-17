// const Ingredient = require('../src/ingredient');
// const ingredientsData = require('../data/ingredients');
class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
    this.favorited = false;
    this.heartImage = 'assets/grey-heart.png';
  }

  findIngredientInfo(ingredientID) {
    const ingredientInfo = ingredientsData.filter(ingredient => ingredient.id === ingredientID);
    const newIngredient = new Ingredient(ingredientInfo[0]);
    return newIngredient
  }

  findIngredientName(ingredientID) {
    return this.findIngredientInfo(ingredientID).name
  }

  findIngredientCost(ingredientID) {
    return this.findIngredientInfo(ingredientID).cost
  }

  listCookingInstructions() {
    return this.instructions
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
