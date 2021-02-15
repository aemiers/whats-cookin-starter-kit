// const Ingredient = require('../src/ingredient');
// const UserPantry = require('../src/userPantry')
// const ingredientsData = require('../data/fakeIngredientData');
// const fakeRecipeData = require('../data/fakeRecipeData');
// const Recipe = require('./recipe');

class RecipeRepository {
  constructor(recipes) {
    this.rawData = recipes;
    this.recipeList = [];
    this.filteredList = [];
    this.filteredIngredientID = [];
  }

  resetFilteredList() {
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
      const foundRecipe = this.recipeList.filter(recipe => recipe.tags.includes(word) || recipe.tags.includes(keywords))
      foundRecipe.forEach(recipe => {
        if (!this.filteredList.includes(recipe)) {
          this.filteredList.push(recipe)
        }
      })
    })
  }

  matchID(keywords, ingredientData) {
    const splitWords = keywords.split(' ')
    splitWords.forEach(word => {
      const searchWordsFormatted = word.toLowerCase();
      ingredientData.map(ingredient => {
        if (ingredient.name.includes(searchWordsFormatted) || ingredient.name.includes(keywords)) {
          this.filteredIngredientID.push(ingredient.id)
        }
      })
    })
  }

  filterRecipesByIngredients(keywords, ingredientData, recipeData) {
    this.matchID(keywords, ingredientData);
    this.filteredIngredientID.forEach(ingredientId => {
      recipeData.map(recipe => {
        recipe.ingredients.map(ingredient => {
          if (ingredient.id === ingredientId && !this.filteredList.includes(recipe)) {
            this.filteredList.push(recipe)
          }
        })
      })
    })
  }

  filterRecipesByName(keywords) {
    const searchName = keywords.toLowerCase();
    const splitName = searchName.split(' ');
    splitName.forEach(word => {
      const foundRecipe = this.recipeList.filter(recipe => recipe.name.toLowerCase().includes(word))
      foundRecipe.forEach(recipe => {
        const recipeExist = this.filteredList.some(filteredRecipe => filteredRecipe.id === recipe.id)
        if (!recipeExist) {
          this.filteredList.push(recipe)
        }
      })
    })

  }

  updateFavoriteOnRecipe(recipe) {
    if (recipe.favorited === false) {
      recipe.favorited = true;
      recipe.heartImage = 'assets/pink-heart.png';
    } else if (recipe.favorited) {
      recipe.favorited = false;
      recipe.heartImage = 'assets/grey-heart.png';
    }
    console.log(recipe.favorited)
  }

  findRecipeByRecipeID(recipeId) {
    let foundClickedHeartRecipe = this.recipeList.find(foundClickedHeartRecipe =>
      foundClickedHeartRecipe.id === recipeId);
    return foundClickedHeartRecipe;
  }

  searchRecipes(keywords, ingredientData, recipeData) {
    this.resetFilteredList();
    this.filterRecipesByTags(keywords);
    this.filterRecipesByIngredients(keywords, ingredientData, recipeData);
    this.filterRecipesByName(keywords);
  }


}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
