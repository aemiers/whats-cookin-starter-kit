const chai = require('chai');
const expect = chai.expect;
const RecipeRepository = require('../src/recipeRepository');
const Recipe = require('../src/recipe');
const Ingredient = require('../src/ingredient');
const recipes = require('../data/fakeRecipeData');
const superFakeIngredientData = require('../data/fakeIngredientData');

describe('RecipeRepository', function () {
  let recipeRepository;

  beforeEach(function () {
    recipeRepository = new RecipeRepository(recipes);
    recipeRepository.addRecipesToRepository();
  });

  it('should be a function', function () {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of RecipeRepository', function () {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should be able to accept an array of recipe data', function () {
    expect(recipeRepository.rawData).to.deep.equal(recipes);
  });

  it('should be able to turn raw data into recipes', function () {
    expect(recipeRepository.recipeList[1]).to.be.an.instanceof(Recipe);
    expect(recipeRepository.recipeList[2].name).to.equal("Dirty Steve's Original Wing Sauce");
  });

  it('should filter recipes by tags', function () {
    recipeRepository.filterRecipesByTags("starter Sauce snack Appetizer");
    expect(recipeRepository.filteredList.length).to.equal(2);
    expect(recipeRepository.filteredList[1]).to.deep.equal(recipes[2])
  });

  it('should be able to filter recipes by name', function () {
    recipeRepository.filterRecipesByName('Cookie Pudding Pork');
    expect(recipeRepository.filteredList.length).to.equal(2);
    expect(recipeRepository.filteredList).to.deep.equal([recipes[0], recipes[1]]);
  });

  it('should be able to see if search words are in the ingredients file', function () {
    recipeRepository.filterRecipesByIngredients(['wheat', 'of']);
  })

  it('should filter recipes by ingredients', function () {
    recipeRepository.filterRecipesByIngredients(['wheat']);
    expect(recipeRepository.filteredList.length).to.equal(1);
  });

  it('should filter recipes by ingredients only once if multiple ingredients are in the same recipe', function () {
    recipeRepository.filterRecipesByIngredients(['wheat', 'of']);
    expect(recipeRepository.filteredList.length).to.equal(1);
  });
});