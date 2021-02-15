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

  sortFavorites(keywords, ingredientData, recipeData, pushListI, pushListR, searchList) {
    const newRepository = new RecipeRepository(fakeRecipeData);
    newRepository.addRecipesToRepository();
    newRepository.searchRecipes(keywords, ingredientData, recipeData, pushListI, pushListR, searchList)
  }

  addFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
    this.favoriteRecipes.unshift(recipe)
    }
  }

  removeFavorite(badRecipe) {
    let i = 0;
    this.favoriteRecipes.forEach(recipe => {
      if (recipe.id === badRecipe.id) {
        this.favoriteRecipes.splice(i, 1);
      }
      i++
    })
  }

  addToCookQueue(recipe) {
    this.recipesToCook.push(recipe)
  }

}




if (typeof module !== 'undefined') {
  module.exports = User;
}
