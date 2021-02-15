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

  sortFavorites() {

  }

  addFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.unshift(recipe)
      console.log('liked', this.favoriteRecipes)
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
