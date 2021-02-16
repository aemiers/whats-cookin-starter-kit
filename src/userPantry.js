// const Ingredient = require('./src/ingredient');

class UserPantry {
  constructor(usersData) {
    this.pantry = usersData.pantry;

  }

  compareIngredients() {

  }

  useIngredients() {
    console.log('cook!');
    // if (parseInt(event.target.closest('.recipe-target').id) === recipe.id) {

  }
}



if (typeof module !== 'undefined') {
  module.exports = UserPantry;
}
