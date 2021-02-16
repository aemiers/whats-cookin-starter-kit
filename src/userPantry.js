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
    // console.log(this.neededIngredients)
  }

  populatePantryIngredientIDs() {
    this.pantryIngredientIDs = [];
    this.pantry.forEach(item => {
      this.pantryIngredientIDs.push(item.ingredient);
    })
    // console.log(this.pantryIngredientIDs);
  }

  compareIngredients(recipe) {
    recipe.ingredients.forEach(ingredient => {
      if (!this.pantryIngredientIDs.includes(ingredient.id)) {
        this.neededIngredients.push(ingredient)
      }
    })
  }


  // THIS WORKS
  // compareIngredients() {
  //   this.neededIngredients.forEach(neededIngredient => {
  //     let array = [];
  //     console.log(recipe.ingredients)
  //     if (!this.pantryIngredientIDs.includes(neededIngredient.id)) {
  //       // this.neededIngredients.splice(neededIngredient);
  //       array.push(neededIngredient)
  //       // console.log(array)
  //     }
  //   })
  //   // console.log(this.neededIngredients)
  //   // console.log(this.pantryIngredientIds)
  // }

  // input: comparing an array of objects to an array of objects
  //for each neededIngredient, go through user's pantry
  //if neededIngredient instance.id === user pantry.ingredient(it's a number), slice
  //for each ingredient in the recipe, loop through the user's pantry by id.
  // once the match is found - if recipe.ingredients.amount is greater than the user's pantry, return "No"
  //else if the amount is = or less than what's in user's pantry, return "yes"

  // if no match is found, return Hellz no 


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
