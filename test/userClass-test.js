// const chai = require('chai');
// const expect = chai.expect;
// const RecipeRepository = require('../src/recipeRepository');
// const User = require('../src/userClass');
// const superFakeIngredientData = require('../data/fakeIngredientData');
// const fakeRecipeData = require('../data/fakeRecipeData');
// const fakeUserData = require('../data/fakeUserData');
// const ingredientData = require('../data/ingredients');

describe('User', function() {
  let user;
  let recipe1;
  let recipe2;
  beforeEach(function() {
    user = new User(fakeUserData[1]);
    recipeRepository = new RecipeRepository(fakeRecipeData);
    recipeRepository.addRecipesToRepository();
    recipe1 = recipeRepository.recipeList[1]
    recipe2 = recipeRepository.recipeList[0]
    user.addFavorite(recipe1);
    user.addFavorite(recipe2);
  });

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to add favorite recipes', function() {
    expect(user.favoriteRecipes.length).to.equal(2);
    expect(user.favoriteRecipes).to.deep.equal([recipe2, recipe1])
  });

  it('should not add redundant recipes', function() {
    user.addFavorite(recipe2);
    expect(user.favoriteRecipes.length).to.equal(2);
    expect(user.favoriteRecipes).to.deep.equal([recipe2, recipe1]);
  });

  it('should be able to unfavorite recipe', function() {
    user.removeFavorite(recipe1);
    expect(user.favoriteRecipes).to.deep.equal([recipe2]);
  });

  it('should be able to unfavorite another recipe', function() {
    user.removeFavorite(recipe2);
    expect(user.favoriteRecipes).to.deep.equal([recipe1]);
  });


  it('should not remove any recipe if there is no match', function() {
    user.removeFavorite(recipeRepository.recipeList[2]);
    expect(user.favoriteRecipes).to.deep.equal([recipe2, recipe1]);
  });

  it('should be able to add recipe to be cooked', function() {
  user.addToCookQueue(recipe2);
  expect(user.recipesToCook).to.deep.equal([recipe2])
  });

  it('should be able to search favorites for recipes', function() {
    user.sortFavorites('POtato poRK Lunch dinner', superFakeIngredientData, fakeRecipeData,
    user.filteredIngredientID, user.filteredFavorites, user.favoriteRecipes)
    console.log(user.filteredFavorites)
    expect(user.filteredFavorites.length).to.equal(1);
    expect(user.filteredFavorites).to.deep.equal([recipe1]);
  });

  it('should be able to search favorites for more recipes', function() {
    user.sortFavorites('dinner flour lunch', superFakeIngredientData, fakeRecipeData,
    user.filteredIngredientID, user.filteredFavorites, user.favoriteRecipes)
    expect(user.filteredFavorites.length).to.equal(2);
    expect(user.filteredFavorites).to.deep.equal([recipe1, recipe2]);
  });

});
