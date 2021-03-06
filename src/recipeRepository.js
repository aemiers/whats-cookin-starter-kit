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

  filterRecipesByTags(keywords, searchList, pushListR) {
    const searchWords = keywords.toLowerCase();
    const splitSearch = searchWords.split(' ');
    splitSearch.forEach(word => {
      const foundRecipe = searchList.filter(recipe => recipe.tags.toString().includes(word))
      foundRecipe.forEach(recipe => {
        const recipeExist = pushListR.some(filteredRecipe => filteredRecipe.id === recipe.id)
        if (!recipeExist) {
          pushListR.push(recipe)
        }
      })
    })
  }

  matchID(keywords, ingredientData, pushListI) {
    const splitWords = keywords.split(' ')
    splitWords.forEach(word => {
      const searchWordsFormatted = word.toLowerCase();
      ingredientData.map(ingredient => {
        if (ingredient.name.includes(searchWordsFormatted) || ingredient.name.includes(keywords)) {
          pushListI.push(ingredient.id)
        }
      })
    })
  }

  filterRecipesByIngredients(keywords, ingredientData, pushListI, recipeData, pushListR, searchList) {
    this.matchID(keywords, ingredientData, pushListI);
    pushListI.forEach(ingredientId => {
      searchList.map(recipe => {
        recipe.ingredients.map(ingredient => {
          const recipeExist = pushListR.some(filteredRecipe => filteredRecipe.id === recipe.id)
          if (ingredient.id === ingredientId && !recipeExist) {
            pushListR.push(recipe)
          }
        })
      })
    })
  }

  filterRecipesByName(keywords, searchList, pushListR) {
    const searchName = keywords.toLowerCase();
    const splitName = searchName.split(' ');
    splitName.forEach(word => {
      const foundRecipe = searchList.filter(recipe => recipe.name.toLowerCase().includes(word))
      foundRecipe.forEach(recipe => {
        const recipeExist = pushListR.some(filteredRecipe => filteredRecipe.id === recipe.id)
        if (!recipeExist) {
          pushListR.push(recipe)
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
  }

  findRecipeByRecipeID(recipeId) {
    let foundClickedHeartRecipe = this.recipeList.find(foundClickedHeartRecipe =>
      foundClickedHeartRecipe.id === recipeId);
    return foundClickedHeartRecipe;
  }

  searchRecipes(keywords, ingredientData, recipeData, pushListI, pushListR, searchList) {
    this.filterRecipesByTags(keywords, searchList, pushListR);
    this.filterRecipesByIngredients(keywords, ingredientData, pushListI, recipeData, pushListR, searchList);
    this.filterRecipesByName(keywords, searchList, pushListR);
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepository;
}
