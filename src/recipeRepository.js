const Ingredient = require('../src/ingredient');
const Recipe = require('./recipe');

class RecipeRepository {
  constructor(recipes) {
    this.rawData = recipes;
    this.recipeList = [];

  }

  addRecipesToRepository() {
    this.rawData.forEach(recipe => {
      const newRecipe = new Recipe(recipe)
      this.recipeList.push(newRecipe)
    })
  }

  filterRecipesByKeywords() {

  }

}



if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
