// const Ingredient = require('./src/ingredient');
// const RecipeRepository = require('./recipeRepository');
// const fakeRecipeData = require('../data/fakeRecipeData');
// const fakeUserClass = require('../data/fakeUserData');
// import user class and then instantiate it.
class UserPantry {
  constructor(usersData) {
    this.pantry = usersData.pantry;
    this.pantryIngredientIDs;
    this.neededIngredients = [];
  }

  populatePantryIngredientIDs() {
    this.pantryIngredientIDs = [];
    this.pantry.forEach(item => {
      this.pantryIngredientIDs.push(item.ingredient);
    })
  }

  compareIngredients(recipe) {
    recipe.ingredients.forEach(ingredient => {
      if (this.pantryIngredientIDs.indexOf(ingredient.id) === -1) {
        this.neededIngredients.push(ingredient);
      } else {
        let index = this.pantryIngredientIDs.indexOf(ingredient.id);
        if (this.pantry[index].amount < ingredient.quantity.amount) {
          this.neededIngredients.push(ingredient);
        }
      }
    })
  }

  cookRecipe(recipe) {
    this.compareIngredients(recipe);
    this.subtractIngredients(recipe);
    this.removeZeroIngredients()
  }

  subtractIngredients(recipe) {
    if (this.neededIngredients.length === 0) {
      recipe.ingredients.forEach((ingredient) => {
        let index = this.pantryIngredientIDs.indexOf(ingredient.id);
        let ingredientQuantity = ingredient.quantity.amount;
        let pantryQuantity = this.pantry[index].amount;
        this.pantry[index].amount = pantryQuantity - ingredientQuantity;
        this.pantry[index].amount = pantryQuantity - ingredientQuantity;
      })
    }
  }

  removeZeroIngredients() {
    this.pantry = this.pantry.filter(ingredient => ingredient.amount > 0);
  }


  findIngredientInfo(ingredientID) {
    const ingredientInfo = ingredientsData.filter(ingredient => ingredient.id === ingredientID)
    const newIngredient = new Ingredient(ingredientInfo[0]);
    return newIngredient
  }

  findIngredientName(ingredientID) {
    return this.findIngredientInfo(ingredientID).name
  }

  findIngredientCost(ingredientID) {
    return this.findIngredientInfo(ingredientID).cost
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserPantry;
}
