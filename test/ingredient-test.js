const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/ingredient');

describe('Ingredient', function() {
  let ingredient;
  beforeEach(function() {
    const fakeIngredientData = [{
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    },
    {
      "id": 18372,
      "name": "bicarbonate of soda",
      "estimatedCostInCents": 582
    },
    {
      "id": 1123,
      "name": "eggs",
      "estimatedCostInCents": 472
    }]
    ingredient = new Ingredient(fakeIngredientData[2]);
  });

  it('should be a function', function() {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', function() {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', function() {
    expect(ingredient.id).to.deep.equal(1123);
  });

});
