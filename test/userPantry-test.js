const chai = require('chai');
const expect = chai.expect;
const RecipeRepository = require('../src/recipeRepository');
const User = require('../src/userClass');
const superFakeIngredientData = require('../data/fakeIngredientData');
const fakeRecipeData = require('../data/fakeRecipeData');
const fakeUserData = require('../data/fakeUserData');
const Ingredient = require('../src/ingredient');
const UserPantry = require('../src/userPantry');
const ingredientData = require('../data/ingredients');

describe('UserPantry', function () {
  let user;
  let userPantry;
  let recipeRepository;
  let recipe1;
  let recipe2;
  beforeEach(function () {
    user = new User(fakeUserData[0]);
    recipeRepository = new RecipeRepository(fakeRecipeData);
    recipeRepository.addRecipesToRepository();
    recipe1 = recipeRepository.recipeList[0];
    recipe2 = recipeRepository.recipeList[1];
    userPantry = new UserPantry(user);
  });

  it('should be a function', function () {
    expect(UserPantry).to.be.a('function');
  });

  it('should be an instance of UserPantry', function () {
    expect(userPantry).to.be.an.instanceof(UserPantry);
  });

  it('should start off with an empty neededIngredients array', function () {
    expect(userPantry.neededIngredients).to.deep.equal([]);
  })

  it('should have items in the user pantry', function () {
    expect(userPantry.pantry.length).to.deep.equal(user.pantry.length);
  })

  it('should have different items in a different user pantry', function () {
    let user2 = new User(fakeUserData[1]);
    userPantry = new UserPantry(user2);
    expect(userPantry.pantry.length).to.deep.equal(user2.pantry.length);
  })

  it('should add ingredients to the needed ingredients array when the user does not have the ingredient or enought of the ingredient in their pantry', function () {
    userPantry.populatePantryIngredientIDs();
    userPantry.compareIngredients(recipe1);
    expect(userPantry.neededIngredients).to.deep.equal([
      { id: 19206, quantity: { amount: 3, unit: 'Tbsp' } },
      { id: 19334, quantity: { amount: 0.5, unit: 'c' } },
      { id: 1012047, quantity: { amount: 24, unit: 'servings' } },
      { id: 10019903, quantity: { amount: 2, unit: 'c' } }
    ]);
  })

  it('should be able to check for ingredients when given a different recipe', function () {
    userPantry.populatePantryIngredientIDs();
    userPantry.compareIngredients(recipe2);
    expect(userPantry.neededIngredients).to.deep.equal([
      { id: 1009016, quantity: { amount: 1.5, unit: 'cups' } },
      { id: 20027, quantity: { amount: 1, unit: 'tablespoon' } },
      { id: 1002046, quantity: { amount: 1, unit: 'tablespoon' } },
      { id: 1012046, quantity: { amount: 1, unit: 'tablespoon' } },
      { id: 19911, quantity: { amount: 0.25, unit: 'cup' } },
      { id: 16112, quantity: { amount: 1, unit: 'tablespoon' } },
      { id: 10010062, quantity: { amount: 24, unit: 'ounce' } },
      { id: 1102047, quantity: { amount: 4, unit: 'servings' } },
      { id: 16124, quantity: { amount: 1, unit: 'tablespoon' } },
      { id: 1016168, quantity: { amount: 1, unit: 'tablespoon' } }
    ]);
  })
});
