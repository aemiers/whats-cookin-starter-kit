// const Ingredient = require('../src/ingredient');
// const Recipe = require('./recipe');
// const ingredients = require('../data/ingredients');

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
    const searchWords = keywords.toLowerCase();
    const splitSearch = searchWords.split(' ');
    splitSearch.forEach(word => {
      const foundRecipe = this.recipeList.filter(recipe => recipe.tags.includes(word))
      foundRecipe.forEach(recipe => {
        if (!this.filteredList.includes(recipe)) {
          this.filteredList.push(recipe)
        }
      })
    })
    console.log(this.filteredList)
  }

  filterRecipesByIngredients(keywords) {
    const searchWords = keywords;
    const splitSearch = searchWords.split(' ');
  }

  filterRecipesByName(name) {
    const searchName = name.toLowerCase();
    const splitName = searchName.split(' ');
    splitName.forEach(word => {
      const foundRecipe = this.recipeList.filter(recipe => recipe.name.toLowerCase().includes(word))
      foundRecipe.forEach(recipe => {
        if (!this.filteredList.includes(recipe)) {
          this.filteredList.push(recipe)
        }
      })
    })
  }
}



// if (typeof module !== 'undefined') {
//   module.exports = RecipeRepository;
// }
