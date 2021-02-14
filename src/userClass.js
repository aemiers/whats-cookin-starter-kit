// const RecipeRepository = require('./recipeRepository');
// const UserPantry = require('./userPantry');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  sortFavorites(keywords, ingredientData, recipeData) {
    newRepository.searchRecipes(keywords, ingredientData, recipeData)
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
