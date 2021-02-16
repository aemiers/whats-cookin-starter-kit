// const Ingredient = require('./src/ingredient');
const RecipeRepository = require('./recipeRepository');
const fakeRecipeData = require('../data/fakeRecipeData');
const fakeUserClass = require('../data/fakeUserData');
// import user class and then instantiate it.
class UserPantry {
  constructor(usersData) {
    this.pantry = usersData.pantry;
    this.pantryIngredientIDs;
    this.neededIngredients = [];
  }

  populateNeededIngredients(recipe) {
    this.neededIngredients = recipe.ingredients;
  }

  populatePantryIngredientIDs() {
    this.pantryIngredientIDs = [];
    this.pantry.forEach(item => {
      this.pantryIngredientIDs.push(item.ingredient);
    })
  }

  compareIngredients(recipe) {
    recipe.ingredients.forEach(ingredient => {
      if (!this.pantryIngredientIDs.includes(ingredient.id)) {
        this.neededIngredients.push(ingredient)
      }
    })
  }

  useIngredients() {
    //for each ingredient
    //find ingredient by id
    //subtract amount used in recipe from user's pantry
    //if pantry ingredient amount <= 0, splice at that index 1 element
  }
}



if (typeof module !== 'undefined') {
  module.exports = UserPantry;
}
