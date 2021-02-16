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
    // const newRepository = new RecipeRepository(fakeRecipeData);
    // newRepository.addRecipesToRepository();
    // this.resetRecipes();
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

  // findRecipeById(favoritedRecipeName, recipeData) {
  //   console.log(favoritedRecipeName)
  //   recipeData.map(recipe => {
  //     if (recipe.name === favoritedRecipeName) {
  //       this.favoriteRecipes.push(recipe)
  //     }
  //   })
  //   console.log('favorite array', this.favoriteRecipes);
  // }

  addToCookQueue(recipe) {
    this.recipesToCook.push(recipe)
  }

}




if (typeof module !== 'undefined') {
  module.exports = User;
}
