// const RecipeRepository = require('./recipeRepository');
// const UserPantry = require('./userPantry');
// const fakeRecipeData = require('../data/fakeRecipeData');
class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry
    this.favoriteRecipes = [];
    this.filteredFavorites = [];
    this.recipesToCook = [];
    this.filteredIngredientID = [];
  }

  resetRecipes() {
    this.filteredFavorites = [];
    this.filteredIngredientID = [];
  }

  sortFavorites(keywords, ingredientData, recipeData, pushListI, pushListR, searchList) {
    newRepository.searchRecipes(keywords, ingredientData, recipeData, pushListI, pushListR, searchList)
  }

  addFavorite(recipe) {
    const recipeExist = this.favoriteRecipes.some(filteredRecipe => filteredRecipe.id === recipe.id)
    if (!recipeExist) {
      this.favoriteRecipes.unshift(recipe)
    }
  }

  removeFavorite(badRecipe) {
    this.favoriteRecipes.forEach((recipe, i) => {
      if (recipe.id === badRecipe.id) {
        this.favoriteRecipes.splice(i, 1);
      }
    })
    console.log('unliked', this.favoriteRecipes)

  }

  addToCookQueue(recipe) {
    this.recipesToCook.push(recipe)
  }

}




if (typeof module !== 'undefined') {
  module.exports = User;
}
