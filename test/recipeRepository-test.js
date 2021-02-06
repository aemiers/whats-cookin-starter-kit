const chai = require('chai');
const expect = chai.expect;
const RecipeRepository = require('../src/recipeRepository');


describe('RecipeRepository', function() {
  let recipeRepository;
  beforeEach(function() {
    recipeRepository = new RecipeRepository();
  });
  it('should be a function', function() {
    expect(RecipeRepository).to.be.a('function');
  });
  it('should be an instance of RecipeRepository', function() {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

});
