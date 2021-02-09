class Ingredient {
  construcor(id, name, cost) {
    this.id = id;
    this.name = name;
    this.cost = cost;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Ingredient;
}
