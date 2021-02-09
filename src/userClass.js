const RecipeRepository = require('./src/recipeRepository');
const UserPantry = require('./src/userPantry');

class User {
  constructor(usersData) {
    this.id = uderData.id;
    this.name = usersData.name;
    this.pantry = new UserPantry()
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  sortFavorites() {

  }

  addFavorite() {

  }

  addToCookQueue() {

  }

}




if (typeof module !== 'undefined') {
  module.exports = User;
}
