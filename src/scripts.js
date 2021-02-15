// const RecipeRepository = require("./recipeRepository");
// const recipeData = require("../data/recipeData");
const newUser = new User(usersData[getRandomIndex(usersData)]);
const newRepository = new RecipeRepository(recipeData);
newRepository.addRecipesToRepository();
// PAGES
const homePage = document.querySelector('#homePage');
const recipeDetailPage = document.querySelector('#recipeDetailPage');
const favoritesPage = document.querySelector('#favoritesPage');
const searchResultsPage = document.querySelector('#searchResultsPage');
const userPantryPage = document.querySelector('#userPantryPage');
const cookinQueuePage = document.querySelector('#cookinQueuePage');
// HEADER
const headerLogo = document.querySelector('#headerLogo');
const searchBar = document.querySelector('#searchBar');
const homeButtonInHeader = document.querySelector('#homeButton');
const favoriteButtonInHeader = document.querySelector('#favoriteButton');
const queueButtonInHeader = document.querySelector('#queueButton');
const pantryButtonInHeader = document.querySelector('#pantryButton');
// BODY
const trendingDisplay = document.querySelector('#trendingDisplay');
const browseMealsGrid = document.querySelector('#allMeals');
const searchResultGrid = document.querySelector('#searchResultMeals');
const favoritesGrid = document.querySelector('#searchResultMeals');
const favoritesMealsGrid = document.querySelector('#favoritesMealsGrid');
const favoritesSearchBar = document.querySelector('#favoritesSearchBar');

// SEARCH BY TAG ICONS
const appetizerTagIcon = document.querySelector('#appetizer');
const breakfastTagIcon = document.querySelector('#breakfast');
const lunchTagIcon = document.querySelector('#lunch');
const dinnerTagIcon = document.querySelector('#dinner');
const dessertTagIcon = document.querySelector('#dessert');
const sidesTagIcon = document.querySelector('#sides');


const recipeTarget = document.querySelector('#recipeTarget');

const recipeDetailsName = document.querySelector('#recipeDetailsName');
const recipeDetailsImage = document.querySelector('#recipeDetailsImage');
const recipeDetailsTags = document.querySelector('#recipePageTags');
const ingredientRow = document.querySelector('#ingredientRow');
const ingredientRowText = document.querySelector('#ingredientRowText');
const recipeInstructions = document.querySelector('#recipeInstructions');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function populateMain() {
  const randomRecipe1 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  const randomRecipe2 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  const randomRecipe3 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  pushToTrendingDisplay(randomRecipe1, randomRecipe2, randomRecipe3)
  randomize(newRepository.recipeList)
  populateAll(newRepository.recipeList, browseMealsGrid)
}

function randomize(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * i)
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp;
  }
}

function resetInnerHTML(location) {
  location.innerHTML = ''
}
function pushToTrendingDisplay(recipe1, recipe2, recipe3) {
  trendingDisplay.innerHTML = `
    <section id="${recipe1.id}" class="large-image-section recipe-target">
      <div class="image-section-wrapper">
        <img src="${recipe1.image}" alt="Meal 1" class="large-image">
        <div class="heart-overlay">
          <img src="assets/grey-heart.png" class="heart large-image-heart">
        </div>
      </div>
      <button class="queue-button">Add to My Cookin' Queue</button>
      <h2  class="section-name-heading" id="recipeTarget">${recipe1.name}</h2>
    </section>
    <section class="side-images">
      <section id="${recipe2.id}" class="top-side-image recipe-target">
        <div class="image-section-wrapper">
          <img src="${recipe2.image}" alt="Meal2" class="side-image">
          <div class="heart-overlay">
            <img src="assets/grey-heart.png" class="heart side-heart">
          </div>
        </div>
        <button class="queue-button">Add to My Cookin' Queue</button>
        <h2 class="section-name-heading" id="recipeTarget">${recipe2.name}</h2>
      </section>
      <section id="${recipe3.id}" class="bottom-side-image recipe-target">
        <div class="image-section-wrapper">
          <img src="${recipe3.image}" alt="Meal 3" class="side-image">
          <div class="heart-overlay">
            <img src="assets/grey-heart.png" class="heart side-heart">
          </div>
        </div>
        <button class="queue-button">Add to My Cookin' Queue</button>
        <h2 class="section-name-heading" id="recipeTarget">${recipe3.name}</h2>
      </section>
    </section>
  `
}

function displayFavoritedHearts() {
  if (recipe.favorited) {
    recipe.src = 'assets/pink-heart.png';
    recipe.id = 'pinkHeart';
  }
}

function populateAll(recipes, location) {
  recipes.forEach(recipe => {
    location.innerHTML += `
      <article id="${recipe.id}" class="mini-recipe recipe-target">
        <div class="mini-recipe-image-container">
          <img class="mini-recipe-img" src="${recipe.image}" id="defaultId">
          <div class="heart-overlay">
            <img src="${recipe.heartImage}" id="greyHeart" class="heart mini-heart">
          </div>
        </div>
          <button class="queue-button">Add to My Cookin' Queue</button>
          <h4 class="mini-recipe-tag">${recipe.tags[getRandomIndex(recipe.tags)]}</h4>
          <h2 class="mini-recipe-title" id="recipeTarget">${recipe.name}</h2>
      </article>
    `
  })
}

function displayIngredients(recipe) {
  ingredientRow.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const ingredientName = recipe.findIngredientName(ingredient.id);
    const ingredientPrice = recipe.findIngredientCost(ingredient.id);
    populateMeasurements(ingredient, ingredientName, ingredientPrice);
  })
  displayInstructions(recipe)
}

function displayInstructions(recipe) {
  recipeInstructions.innerHTML = ''
  recipe.instructions.forEach(step => {
    recipeInstructions.innerHTML += `
      <section class="numbered-recipe-chunk">
        <p class="recipe-number">${step.number}</p>
        <p>${step.instruction}</p>
      </section>
    `
  })
}

function populateMeasurements(ingredient, name, price) {
  ingredientRow.innerHTML += `
  <div class="ingredient-row-left-side">
    <div class="check-box">
      <img class="check-x" id="check" src="assets/check.png" alt="green check" >
      <img class="check-x hidden" id="x" src="assets/x.png" alt="red x" >
    </div>
    <p class="ingredient-row-text">${ingredient.quantity.amount} ${ingredient.quantity.unit} ${name}</p>
    <p id="ingredientRowText"class="ingredient-row-price">$${((ingredient.quantity.amount * price) / 100).toFixed(2)}</p>
  </div>
  `
}

function displayTags(recipe) {
  recipe.tags.forEach(tag => {
    recipeDetailsTags.innerHTML += `
      <li class="recipe-tag">${tag}</li>
    `
  })
}

function recipeDetails(recipe) {
  recipeDetailsName.innerText = `${recipe.name}`;
  recipeDetailsImage.src = `${recipe.image}`;
  displayTags(recipe);
  displayIngredients(recipe);
}



function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'));
}

function showHide(page1, page2, page3, page4, page5, page6) {
  show([page1]);
  hide([page2, page3, page4, page5, page6]);
}

function goHome() {
  showHide(homePage, recipeDetailPage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage)
}

function enlargeRecipe() {
  showHide(recipeDetailPage, homePage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage)
  newRepository.recipeList.forEach(recipe => {
    if (parseInt(event.target.closest('.recipe-target').id) === recipe.id) {
      recipeDetails(recipe)
    }
  })
}

function displayPantry() {
  showHide(userPantryPage, homePage, recipeDetailPage, favoritesPage, searchResultsPage, cookinQueuePage)
}

function displayQueue() {
  showHide(cookinQueuePage, homePage, recipeDetailPage, favoritesPage, searchResultsPage, userPantryPage)
}

function searchBarSearch() {
  showHide(searchResultsPage, homePage, recipeDetailPage, favoritesPage, userPantryPage, cookinQueuePage);
  resetInnerHTML(searchResultGrid);
  let searchBarInput = searchBar.value;
  newRepository.searchRecipes(searchBarInput, ingredientsData, recipeData);
  populateAll(newRepository.filteredList, searchResultGrid)
}

function favoritesSearchBarSearch() {
  showHide(favoritesPage, homePage, searchResultsPage, recipeDetailPage, userPantryPage, cookinQueuePage);
  populateAll(newRepository.recipeList, favoritesGrid);
  resetInnerHTML(favoritesGrid);
  let searchBarInput = favoritesSearchBar.value;
  newRepository.searchRecipes(searchBarInput, ingredientsData, recipeData);
  populateAll(newRepository.filteredList, favoritesGrid)
}


function tagSearch(event) {
  showHide(searchResultsPage, homePage, recipeDetailPage, favoritesPage, userPantryPage, cookinQueuePage);
  resetInnerHTML(searchResultGrid);
  let tagSearchInput = event;
  console.log('tagSearchInput', tagSearchInput)
  newRepository.searchRecipes(event);
  populateAll(newRepository.filteredList, searchResultGrid);
}

function favoriteRecipeHandler(event) {
  let clickedHeartRecipeID = parseInt(event.target.parentNode.parentNode.parentNode.id);
  let clickedRecipe = newRepository.findRecipeByRecipeID(clickedHeartRecipeID);
  newRepository.updateFavoriteOnRecipe(clickedRecipe);
  if (clickedRecipe.favorited === false) {
    event.target.src = 'assets/grey-heart.png';
    // event.target.id = 'greyHeart';
    newUser.removeFavorite(clickedRecipe);
  } else if (clickedRecipe.favorited) {
    event.target.src = 'assets/pink-heart.png';
    // event.target.id = 'pinkHeart';
    newUser.addFavorite(clickedRecipe);
  }
}




function displayFavorites() {
  showHide(favoritesPage, homePage, searchResultsPage, recipeDetailPage, userPantryPage, cookinQueuePage);
  populateAll(newUser.favoriteRecipes, favoritesMealsGrid);
}

function addToCookinQueue() {
  console.log('Recipe has been added to your Cookin\' Queue!')
}

function recipeCardFunctionalityHandler(event) {
  if (event.target.closest('.heart')) {
    favoriteRecipeHandler(event);
  } else if (event.target.closest('.recipe-target') && !event.target.closest('.queue-button')) {
    enlargeRecipe();
    // } else if (event.target.closest('.mini-recipe-tag')) {
    //   enlargeRecipe();
    // } else if (event.target.closest('.mini-recipe-title')) {
    //   enlargeRecipe();
  } else if (event.target.closest('.queue-button')) {
    addToCookinQueue();
  }
}

window.addEventListener('load', populateMain);
headerLogo.addEventListener('click', goHome);
homeButtonInHeader.addEventListener('click', goHome);
favoriteButtonInHeader.addEventListener('click', displayFavorites);
queueButtonInHeader.addEventListener('click', displayQueue);
pantryButtonInHeader.addEventListener('click', displayPantry);
browseMealsGrid.addEventListener('click', recipeCardFunctionalityHandler);
searchResultGrid.addEventListener('click', recipeCardFunctionalityHandler);
favoritesGrid.addEventListener('click', recipeCardFunctionalityHandler);

trendingDisplay.addEventListener('click', recipeCardFunctionalityHandler);
favoritesMealsGrid.addEventListener('click', recipeCardFunctionalityHandler);

appetizerTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
})
breakfastTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
lunchTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
dinnerTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
dessertTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
sidesTagIcon.addEventListener('click', tagSearch);

searchBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    searchBarSearch();
  }
})

favoritesSearchBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    favoritesSearchBarSearch();
  }
})
