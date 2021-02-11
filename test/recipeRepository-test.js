const chai = require('chai');
const expect = chai.expect;
const RecipeRepository = require('../src/recipeRepository');
const Recipe = require('../src/recipe');
const recipes = require('../data/fakeRecipeData');

describe('RecipeRepository', function() {
  let recipeRepository;
  beforeEach(function() {
    recipeRepository = new RecipeRepository(recipes);
    recipeRepository.addRecipesToRepository();
  });
  it('should be a function', function() {
    expect(RecipeRepository).to.be.a('function');
  });
  it('should be an instance of RecipeRepository', function() {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should be able to accept an array of data', function() {
    expect(recipeRepository.rawData).to.deep.equal(recipes);
  });

  it('should be able to turn raw data into recipes', function() {
    expect(recipeRepository.recipeList[1]).to.be.an.instanceof(Recipe);
    expect(recipeRepository.recipeList[2].name).to.equal("Dirty Steve's Original Wing Sauce")
  });

  it('should filter recipes by tags', function() {
    recipeRepository.filterRecipesByTags('starter sauce')
    expect(recipeRepository.filterList.length).to.equal(2);
    expect(recipeRepository.filterList[1]).to.deep.equal(recipes[2])
  });


});
