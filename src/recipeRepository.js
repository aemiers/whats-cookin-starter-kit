// const Ingredient = require('../src/ingredient');
// const UserPantry = require('../src/userPantry')
const ingredientsData = require('../data/fakeIngredientData');
const fakeRecipeData = require('../data/fakeRecipeData');
const Recipe = require('./recipe');

class RecipeRepository {
  constructor(recipes) {
    this.rawData = recipes;
    this.recipeList = [];
    this.filteredList = [];
    this.filteredIngredientID = [];
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
  }

  matchID(searchWords) {
    const splitWords = searchWords.split(' ')
    splitWords.forEach(word => {
      const searchWordsFormatted = word.toLowerCase();
      ingredientsData.map(ingredient => {
        if (ingredient.name.includes(searchWordsFormatted)) {
          this.filteredIngredientID.push(ingredient.id)
        }
      })
    })
  }

  filterRecipesByIngredients(searchWords) {
    this.matchID(searchWords);
    console.log('filteredID:', this.filteredIngredientID)
    this.filteredIngredientID.forEach(ingredientId => {
      fakeRecipeData.map(recipe => {
        recipe.ingredients.map(ingredient => {
          if (ingredient.id === ingredientId && !this.filteredList.includes(recipe)) {
            this.filteredList.push(recipe)
          }
        })
      })
    })
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

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
