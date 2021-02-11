const Ingredient = require('../src/ingredient');
const Recipe = require('./recipe');
const ingredients = require('../data/ingredients');

class RecipeRepository {
  constructor(recipes) {
    this.rawData = recipes;
    this.recipeList = [];
    this.filteredList = []

  }

  addRecipesToRepository() {
    this.rawData.forEach(recipe => {
      const newRecipe = new Recipe(recipe)
      this.recipeList.push(newRecipe)
    })
  }

  filterRecipesByTags(keywords) {
    const searchWords = keywords;
    const splitSearch = searchWords.split(' ');
    splitSearch.forEach(word => {
      const foundRecipe = this.recipeList.filter(recipe => recipe.tags.includes(word))
      foundRecipe.forEach(recipe => this.filteredList.push(recipe))

    })
  }

  filterRecipesByIngredients(keywords) {
    const searchWords = keywords;
    const splitSearch = searchWords.split(' ');
  }

  filterRecipesByName(name) {
    const searchName = name;
    console.log('searchName:', searchName)
    const splitName = searchName.split(' ');
    console.log('splitName:', splitName)
    splitName.forEach(word => {
      const foundRecipe = this.recipeList.filter(recipe => recipe.name.includes(word))
      console.log('name:', this.recipeList[0].name)
      console.log('foundRecipe:', foundRecipe)
      foundRecipe.forEach(recipe => this.filteredList.push(recipe))
      console.log('filteredList:', this.filteredList)

//to lowercase, fix redundancy

    })
  }
}



if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
