const chai = require('chai');
const expect = chai.expect;
const RecipeRepository = require('../src/recipeRepository');


describe('Class', function() {
  let class;
  beforeEach(function() {
    class = new Class();
  });
  it('should be a function', function() {
    expect(Class).to.be.a('function');
  });
  it('should be an instance of Class', function() {
    expect(class).to.be.an.instanceof(Class);
  });

});
