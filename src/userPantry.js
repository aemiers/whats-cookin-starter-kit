// const Ingredient = require('./src/ingredient');

class UserPantry {
  constructor(usersData) {
    this.pantry = usersData.pantry;

  }

  compareIngredients() {

  }

  cookRecipe() {
    console.log('cook!');
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
