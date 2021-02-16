// const chai = require('chai');
// const expect = chai.expect;
// const Ingredient = require('../src/ingredient');
// const superFakeIngredientData = require('../data/fakeIngredientData');

describe('Ingredient', function () {
  let ingredient;
  beforeEach(function () {
    ingredient = new Ingredient(superFakeIngredientData[2]);
  });

  it('should be a function', function () {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', function () {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', function () {
    expect(ingredient.id).to.deep.equal(1123);
  });

});
