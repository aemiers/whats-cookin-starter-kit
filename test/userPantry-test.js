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
    expect(userPantry.neededIngredients.length).to.equal(0);
  })

  it('should have items in the user pantry', function () {
    expect(userPantry.pantry.length).to.equal(36);
  })

  it('should have different items in a different user pantry', function () {
    let user2 = new User(fakeUserData[1]);
    userPantry = new UserPantry(user2);
    expect(userPantry.pantry.length).to.equal(58);
  })

  it('should add ingredients to the needed ingredients array when the user does not have the ingredient in their pantry', function () {
    userPantry.populatePantryIngredientIDs();
    userPantry.compareIngredients(recipe1);
    expect(userPantry.neededIngredients.length).to.equal(4);
    expect(userPantry.neededIngredients[0].id).to.equal(19206);
    expect(userPantry.neededIngredients[2].id).to.equal(1012047);
  })

  it('should put ingredients in the needed ingredients array when the user does not have enough of it in their pantry', function () {
    userPantry.populatePantryIngredientIDs();
    userPantry.compareIngredients(recipe1);
    expect(userPantry.neededIngredients[0].id).to.equal(19206);
    expect(userPantry.neededIngredients.length).to.equal(4);
  })
});
