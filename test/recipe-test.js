const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/recipe');
const recipes = require('../data/recipes');
const recipeInstance = recipes.recipeData;


describe('Recipe', function() {
  let recipe;
  beforeEach(function() {
    console.log(recipes[0].id);

    console.log(fakeRecipeData.id);
    recipe = new Recipe();
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
    console.log(recipe)
  });

  it('should have an id', function() {
    expect(recipe.id).to.deep.equal(595736);
  });

});
