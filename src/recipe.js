const Ingredient = require('../src/ingredient');
const ingredients = require('../data/ingredients');
class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.pic = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
  }

  findIngredientInfo(ingredientID){
    const ingredientInfo = ingredients.filter(ingredient => ingredient.id === ingredientID)
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

  }
}


if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
