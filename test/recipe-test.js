const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/recipe');
const recipes = require('../data/fakeRecipeData');
const superFakeIngredientData = require('../data/fakeIngredientData');

describe('Recipe', function() {
  let recipe;
  beforeEach(function() {
    recipe = new Recipe(recipes[2]);
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', function() {
    expect(recipe.id).to.deep.equal(412309);
  });

  it('should have a name', function() {
    expect(recipe.name).to.deep.equal("Dirty Steve's Original Wing Sauce");
  });

  it ('should have multiple ingredients', function() {
    expect(recipe.ingredients.length).to.equal(13);
  });

  it ('should have have a set of instructions', function() {
    expect(recipe.instructions[0].number).to.deep.equal(1);
  });

  it('should be able to find an ingredient name', function() {
    expect(recipe.findIngredientName(recipe.ingredients[5].id)).to.equal('chicken wing');
  });

  it('should be able to find an ingredient cost', function() {
    expect(recipe.findIngredientCost(recipe.ingredients[5].id)).to.equal(593);
  });

  it('should be able to return directions', function() {
    expect(recipe.listCookingInstructions()).to.deep.equal()
  });

});
