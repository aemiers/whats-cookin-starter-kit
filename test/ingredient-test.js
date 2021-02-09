const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/ingredient');


describe('Ingredient', function() {
  let ingredient;
  beforeEach(function() {
    ingredient = new Ingredient();
  });

  it('should be a function', function() {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', function() {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

});
