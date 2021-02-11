const Ingredient = require('../src/ingredient');
const Recipe = require('./recipe');

class RecipeRepository {
  constructor(recipes) {
    this.rawData = recipes;
    this.recipeList = [];
    this.filterList = []

  }

  addRecipesToRepository() {
    this.rawData.forEach(recipe => {
      const newRecipe = new Recipe(recipe)
      this.recipeList.push(newRecipe)
    })
  }

  filterRecipesByTags(keywords) {
    const searchWords = keywords;
    const splitSearch = searchWords.split(' ');
    splitSearch.forEach(word => {
      const foundRecipe = this.recipeList.filter(recipe => recipe.tags.includes(word))
      this.filterList.push(foundRecipe[0])
    })
    return this.filterList
  }

  filterRecipesByIngredients() {

  }

}



if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
